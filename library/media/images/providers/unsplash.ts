import type { NormalizedImage } from '../../types.js';
import {
  compactRecord,
  createMediaId,
  firstString,
  humanizeSlug,
  isRecord,
  resolveAspectRatio,
} from '../../internal.js';

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

    return results.map((r: unknown) => normalizeUnsplashImage(r as Record<string, unknown>));
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
    return items.map((r: unknown) => normalizeUnsplashImage(r as Record<string, unknown>));
  }
}

export function normalizeUnsplashImage(raw: Record<string, unknown>): NormalizedImage {
  const urls: Record<string, string> = {};
  const rawUrls = isRecord(raw.urls) ? raw.urls : undefined;
  if (rawUrls) {
    for (const k of Object.keys(rawUrls)) {
      const v = rawUrls[k];
      if (typeof v === 'string' && v.trim()) {
        urls[k] = v;
      }
    }
  }

  const rawUser = isRecord(raw.user) ? raw.user : undefined;
  const rawLinks = isRecord(raw.links) ? raw.links : undefined;
  const userLinks = isRecord(rawUser?.links) ? rawUser.links : undefined;
  const userProfile = isRecord(rawUser?.profile_image) ? rawUser.profile_image : undefined;

  const width = typeof raw.width === 'number' ? raw.width : undefined;
  const height = typeof raw.height === 'number' ? raw.height : undefined;
  const title = firstString(
    humanizeSlug(typeof raw.slug === 'string' ? raw.slug : undefined),
    raw.description as string | undefined,
    raw.alt_description as string | undefined,
  );
  const description = firstString(
    raw.description as string | undefined,
    raw.alt_description as string | undefined,
  );
  const thumbnailUrl = firstString(urls.thumb, urls.small, urls.regular, urls.full, urls.raw);
  const previewUrl = firstString(urls.small, urls.regular, urls.full, urls.raw, urls.thumb);
  const fullUrl = firstString(urls.full, urls.raw, urls.regular, urls.small, urls.thumb);

  if (!thumbnailUrl || !previewUrl || !fullUrl) {
    throw new Error('Unsplash image payload did not include usable image URLs.');
  }

  return {
    id: typeof raw.id === 'string' ? raw.id : createMediaId('image-unsplash', title, fullUrl),
    kind: 'image',
    source: 'unsplash',
    title,
    description,
    alt: firstString(raw.alt_description as string | undefined, title, description) ?? '',
    thumbnailUrl,
    previewUrl,
    fullUrl,
    width,
    height,
    aspectRatio: resolveAspectRatio(width, height),
    dominantColor: raw.color as string | undefined,
    blurHash: raw.blur_hash as string | undefined,
    author: rawUser?.name as string | undefined,
    authorUrl: userLinks?.html as string | undefined,
    providerName: 'Unsplash',
    providerImageUrl: firstString(
      userProfile?.medium as string | undefined,
      userProfile?.small as string | undefined,
      userProfile?.large as string | undefined,
    ),
    downloadLocation: rawLinks?.download_location as string | undefined,
    metadata: compactRecord({
      slug: typeof raw.slug === 'string' ? raw.slug : undefined,
      username: rawUser?.username as string | undefined,
      createdAt: raw.created_at as string | undefined,
      downloadUrl: rawLinks?.download as string | undefined,
      htmlUrl: rawLinks?.html as string | undefined,
      urls,
      raw,
    }),
  };
}
