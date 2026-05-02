import type { NormalizedImage } from '../../types.js';

export interface UnsplashProviderOptions {
  accessKey?: string;
  fetchImpl?: typeof fetch;
}

const DEFAULT_FETCH = typeof fetch !== 'undefined' ? fetch.bind(globalThis) : undefined as unknown as typeof fetch;

export class UnsplashImageProvider {
  #accessKey?: string;
  #fetch: typeof fetch;

  constructor(options: UnsplashProviderOptions = {}) {
    this.#accessKey = options.accessKey;
    this.#fetch = options.fetchImpl ?? DEFAULT_FETCH;
  }

  private ensureKey() {
    if (!this.#accessKey) {
      throw new Error('Unsplash access key is required. Provide it via UnsplashImageProvider options.');
    }
  }

  async search(query: string, page = 1, perPage = 10): Promise<NormalizedImage[]> {
    this.ensureKey();
    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.set('query', query);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));

    const res = await this.#fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${this.#accessKey}` },
    });

    if (!res.ok) {
      throw new Error(`Unsplash search failed: ${res.status} ${res.statusText}`);
    }

    const payload = (await res.json()) as { results?: unknown[] };
    const results = Array.isArray(payload.results) ? payload.results : [];

    return results.map((r: unknown) => normalizeUnsplash(r as Record<string, unknown>));
  }

  async random(count = 1): Promise<NormalizedImage[]> {
    this.ensureKey();
    const url = new URL('https://api.unsplash.com/photos/random');
    url.searchParams.set('count', String(count));

    const res = await this.#fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${this.#accessKey}` },
    });

    if (!res.ok) {
      throw new Error(`Unsplash random failed: ${res.status} ${res.statusText}`);
    }

    const payload = await res.json();
    const items = Array.isArray(payload) ? (payload as unknown[]) : [payload as unknown];
    return items.map((r: unknown) => normalizeUnsplash(r as Record<string, unknown>));
  }
}

function normalizeUnsplash(raw: Record<string, unknown>): NormalizedImage {
  const urls: Record<string, string> = {};
  const rawUrls = raw.urls as Record<string, unknown> | undefined;
  if (rawUrls && typeof rawUrls === 'object') {
    for (const k of Object.keys(rawUrls)) {
      const v = rawUrls[k];
      if (typeof v === 'string') urls[k] = v;
    }
  }

  const rawUser = raw.user as Record<string, unknown> | undefined;
  const rawLinks = raw.links as Record<string, unknown> | undefined;
  const userLinks = rawUser?.links as Record<string, unknown> | undefined;

  return {
    kind: 'image',
    id: typeof raw.id === 'string' ? raw.id : undefined,
    description: (raw.description as string | null | undefined) ?? (raw.alt_description as string | null | undefined) ?? null,
    alt: (raw.alt_description as string | null | undefined) ?? null,
    width: typeof raw.width === 'number' ? raw.width : null,
    height: typeof raw.height === 'number' ? raw.height : null,
    color: (raw.color as string | null | undefined) ?? null,
    blurHash: (raw.blur_hash as string | null | undefined) ?? null,
    urls,
    author: (rawUser?.name as string | undefined) ?? null,
    authorUrl: (userLinks?.html as string | undefined) ?? null,
    downloadUrl: (rawLinks?.download as string | undefined) ?? null,
    source: 'unsplash',
    rawProviderData: raw,
  };
}
