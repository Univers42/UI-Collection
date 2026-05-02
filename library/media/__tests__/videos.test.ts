import {
  curatedVideoCollections,
  normalizeExternalVideo,
  normalizeUrlVideo,
  normalizeVideoSource,
  resolveVideoPosterUrl,
  resolveVideoPreviewUrl,
  resolveVideoThumbnailUrl,
  videoProviderPresets,
} from '../videos/index.js';

// Helper for assertions
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

// Basic normalization from URL
const source = {
  kind: 'url',
  src: 'https://cdn.example.com/video.mp4',
  title: 'Ocean Motion',
  thumbnailUrl: 'https://cdn.example.com/video-thumb.jpg',
  posterUrl: 'https://cdn.example.com/video-poster.jpg',
  previewUrl: 'https://cdn.example.com/video-preview.jpg',
  width: 1920,
  height: 1080,
} as const;
const normalized = normalizeUrlVideo(source);

assert(normalized.kind === 'video', 'normalized.kind should be video');
assert(normalized.videoUrl === 'https://cdn.example.com/video.mp4', 'videoUrl should match');
assert(normalized.thumbnailUrl === 'https://cdn.example.com/video-thumb.jpg', 'thumbnail should match');
assert(normalized.posterUrl === 'https://cdn.example.com/video-poster.jpg', 'poster should match');
assert(normalized.previewUrl === 'https://cdn.example.com/video-preview.jpg', 'preview should match');
assert(normalized.aspectRatio === 1920 / 1080, 'aspect ratio should be inferred');
assert(resolveVideoThumbnailUrl(normalized) === normalized.thumbnailUrl, 'thumbnail resolver should prefer thumbnail');
assert(resolveVideoPosterUrl(normalized) === normalized.posterUrl, 'poster resolver should prefer poster');
assert(resolveVideoPreviewUrl(normalized) === normalized.previewUrl, 'preview resolver should prefer preview');

const external = normalizeExternalVideo({
  kind: 'external',
  providerId: 'youtube',
  providerName: 'YouTube',
  title: 'External Space Demo',
  videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  thumbnailUrl: 'https://dummyimage.com/480x270/1e293b/f8fafc.png&text=External+Space+Demo',
  posterUrl: 'https://dummyimage.com/1280x720/1e293b/f8fafc.png&text=External+Space+Demo',
});

assert(external.source === 'external', 'external source should be preserved');
assert(external.providerName === 'YouTube', 'external provider name should match');
assert(
  normalizeVideoSource(source).videoUrl === normalized.videoUrl,
  'dispatcher should normalize URL videos',
);
assert(
  videoProviderPresets.some((preset) => preset.source === 'external'),
  'video provider presets should expose external future provider support',
);
assert(curatedVideoCollections[0]?.items.length >= 4, 'curated video collection should expose multiple entries');

// Missing src should throw
try {
  normalizeUrlVideo({ kind: 'url' });
  throw new Error('Expected to throw missing src error');
} catch (e: unknown) {
  if (!String((e as Error).message).includes('UrlVideoSource must include a non-empty `src` or `videoUrl`')) {
    throw e;
  }
}

console.log('videos.test passed');
