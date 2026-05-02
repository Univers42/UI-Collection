import type { UrlImageSource, NormalizedImage } from '../../types.js';
import {
  createMediaId,
  deriveTitleFromUrl,
  firstString,
  resolveAspectRatio,
} from '../../internal.js';

export function normalizeUrlImage(source: UrlImageSource): NormalizedImage {
  if (!source.url) {
    throw new Error('UrlImageSource must include a non-empty `url`.');
  }

  const fullUrl = firstString(source.fullUrl, source.url);
  const previewUrl = firstString(source.previewUrl, fullUrl);
  const thumbnailUrl = firstString(source.thumbnailUrl, previewUrl, fullUrl);

  if (!fullUrl || !previewUrl || !thumbnailUrl) {
    throw new Error('UrlImageSource could not resolve thumbnail, preview, and full URLs.');
  }

  const title = firstString(source.title, deriveTitleFromUrl(fullUrl));

  return {
    id: source.id ?? createMediaId('image', title, fullUrl),
    kind: 'image',
    source: 'url',
    title,
    description: source.description,
    alt: firstString(source.alt, title, source.description) ?? '',
    thumbnailUrl,
    previewUrl,
    fullUrl,
    width: source.width,
    height: source.height,
    aspectRatio: resolveAspectRatio(source.width, source.height, source.aspectRatio),
    dominantColor: source.dominantColor,
    blurHash: source.blurHash,
    author: source.author,
    authorUrl: source.authorUrl,
    providerName: source.providerName ?? 'Direct URL',
    providerImageUrl: source.providerImageUrl,
    metadata: source.metadata,
  };
}
