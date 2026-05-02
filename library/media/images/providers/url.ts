import type { UrlImageSource, NormalizedImage } from '../../types.js';

export function normalizeUrlImage(source: UrlImageSource): NormalizedImage {
  if (!source.url) {
    throw new Error('UrlImageSource must include a non-empty `url`.');
  }

  const urls: Record<string, string> = { original: source.url };

  return {
    kind: 'image',
    id: undefined,
    description: null,
    alt: source.alt ?? null,
    width: source.width ?? null,
    height: source.height ?? null,
    color: null,
    blurHash: null,
    urls,
    author: null,
    authorUrl: null,
    downloadUrl: source.url,
    source: 'url',
    rawProviderData: source.metadata ?? null,
  };
}
