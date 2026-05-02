import type { ImageSource, NormalizedImage } from '../types.js';
import { normalizeUnsplashImage } from './providers/unsplash.js';
import { normalizeUrlImage } from './providers/url.js';

export function normalizeImageSource(source: ImageSource): NormalizedImage {
  switch (source.kind) {
    case 'unsplash':
      return normalizeUnsplashImage(source.raw);
    case 'url':
      return normalizeUrlImage(source);
    default: {
      const exhaustive: never = source;
      throw new Error(`Unsupported image source: ${String(exhaustive)}`);
    }
  }
}

export function resolveImageThumbnailUrl(
  image: Pick<NormalizedImage, 'thumbnailUrl' | 'previewUrl' | 'fullUrl'>,
): string {
  return image.thumbnailUrl || image.previewUrl || image.fullUrl;
}

export function resolveImagePreviewUrl(
  image: Pick<NormalizedImage, 'previewUrl' | 'fullUrl' | 'thumbnailUrl'>,
): string {
  return image.previewUrl || image.fullUrl || image.thumbnailUrl;
}

export function resolveImageFullUrl(
  image: Pick<NormalizedImage, 'fullUrl' | 'previewUrl' | 'thumbnailUrl'>,
): string {
  return image.fullUrl || image.previewUrl || image.thumbnailUrl;
}
