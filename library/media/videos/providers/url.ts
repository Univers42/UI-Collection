import type { UrlVideoSource, NormalizedVideo } from '../../types.js';
import {
  createMediaId,
  deriveTitleFromUrl,
  firstString,
  resolveAspectRatio,
} from '../../internal.js';

export function normalizeUrlVideo(source: UrlVideoSource): NormalizedVideo {
  const videoUrl = firstString(source.videoUrl, source.src);

  if (!videoUrl) {
    throw new Error('UrlVideoSource must include a non-empty `src` or `videoUrl`.');
  }

  const title = firstString(source.title, deriveTitleFromUrl(videoUrl), 'Untitled Video') ?? 'Untitled Video';

  return {
    id: source.id ?? createMediaId('video', title, videoUrl),
    kind: 'video',
    source: 'url',
    title,
    description: source.description,
    videoUrl,
    thumbnailUrl: firstString(
      source.thumbnailUrl,
      source.posterUrl,
      source.poster,
      source.previewUrl,
    ),
    posterUrl: firstString(
      source.posterUrl,
      source.poster,
      source.thumbnailUrl,
      source.previewUrl,
    ),
    previewUrl: firstString(
      source.previewUrl,
      source.posterUrl,
      source.poster,
      source.thumbnailUrl,
    ),
    width: source.width,
    height: source.height,
    aspectRatio: resolveAspectRatio(source.width, source.height),
    duration: source.duration,
    mimeType: source.mimeType,
    author: source.author,
    authorUrl: source.authorUrl,
    providerName: source.providerName ?? 'Direct URL',
    providerImageUrl: source.providerImageUrl,
    metadata: source.metadata,
  };
}
