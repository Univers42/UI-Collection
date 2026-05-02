import type { UrlVideoSource, NormalizedVideo } from '../../types.js';

export function normalizeUrlVideo(source: UrlVideoSource): NormalizedVideo {
  if (!source.src) {
    throw new Error('UrlVideoSource must include a non-empty `src`.');
  }

  return {
    kind: 'video',
    id: undefined,
    title: source.title ?? null,
    description: source.description ?? null,
    src: source.src,
    poster: source.poster ?? null,
    mimeType: source.mimeType ?? null,
    duration: source.duration ?? null,
    width: source.width ?? null,
    height: source.height ?? null,
    credits: null,
    metadata: source.metadata ?? null,
    source: 'url',
    rawProviderData: source,
  };
}
