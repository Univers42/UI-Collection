import type { ExternalVideoSource, NormalizedVideo } from '../../types.js';
import {
  compactRecord,
  createMediaId,
  humanizeSlug,
  resolveAspectRatio,
} from '../../internal.js';

export function normalizeExternalVideo(source: ExternalVideoSource): NormalizedVideo {
  if (!source.videoUrl) {
    throw new Error('ExternalVideoSource must include a non-empty `videoUrl`.');
  }

  return {
    id: source.id ?? createMediaId('video-external', source.providerId, source.title, source.videoUrl),
    kind: 'video',
    source: 'external',
    title: source.title,
    description: source.description,
    videoUrl: source.videoUrl,
    thumbnailUrl: source.thumbnailUrl ?? source.posterUrl ?? source.previewUrl,
    posterUrl: source.posterUrl ?? source.thumbnailUrl ?? source.previewUrl,
    previewUrl: source.previewUrl ?? source.posterUrl ?? source.thumbnailUrl,
    width: source.width,
    height: source.height,
    aspectRatio: resolveAspectRatio(source.width, source.height),
    duration: source.duration,
    mimeType: source.mimeType,
    author: source.author,
    authorUrl: source.authorUrl,
    providerName: source.providerName ?? humanizeSlug(source.providerId) ?? 'External Provider',
    providerImageUrl: source.providerImageUrl,
    metadata: compactRecord({
      providerId: source.providerId,
      embedUrl: source.embedUrl,
      ...source.metadata,
    }),
  };
}
