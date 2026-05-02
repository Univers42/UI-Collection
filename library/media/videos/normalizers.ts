import type { NormalizedVideo, VideoSource } from '../types.js';
import { normalizeExternalVideo } from './providers/external.js';
import { normalizeUrlVideo } from './providers/url.js';

export function normalizeVideoSource(source: VideoSource): NormalizedVideo {
  switch (source.kind) {
    case 'external':
      return normalizeExternalVideo(source);
    case 'url':
      return normalizeUrlVideo(source);
    default: {
      const exhaustive: never = source;
      throw new Error(`Unsupported video source: ${String(exhaustive)}`);
    }
  }
}

export function resolveVideoThumbnailUrl(
  video: Pick<NormalizedVideo, 'thumbnailUrl' | 'posterUrl' | 'previewUrl'>,
  fallbackUrl?: string,
): string | undefined {
  return video.thumbnailUrl ?? video.posterUrl ?? video.previewUrl ?? fallbackUrl;
}

export function resolveVideoPosterUrl(
  video: Pick<NormalizedVideo, 'posterUrl' | 'thumbnailUrl' | 'previewUrl'>,
  fallbackUrl?: string,
): string | undefined {
  return video.posterUrl ?? video.thumbnailUrl ?? video.previewUrl ?? fallbackUrl;
}

export function resolveVideoPreviewUrl(
  video: Pick<NormalizedVideo, 'previewUrl' | 'posterUrl' | 'thumbnailUrl'>,
  fallbackUrl?: string,
): string | undefined {
  return video.previewUrl ?? video.posterUrl ?? video.thumbnailUrl ?? fallbackUrl;
}
