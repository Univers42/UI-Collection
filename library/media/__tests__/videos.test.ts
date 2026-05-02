import { normalizeUrlVideo } from '../videos/index.js';

// Helper for assertions
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

// Basic normalization from URL
const source = { kind: 'url', src: 'https://cdn.example.com/video.mp4', poster: 'https://cdn.example.com/poster.jpg' } as const;
const normalized = normalizeUrlVideo(source);

assert(normalized.kind === 'video', 'normalized.kind should be video');
assert(normalized.src === 'https://cdn.example.com/video.mp4', 'src should match');
assert(normalized.poster === 'https://cdn.example.com/poster.jpg', 'poster should match');

// Missing src should throw
try {
  // @ts-expect-error - missing src to test runtime error
  normalizeUrlVideo({ kind: 'url' });
  throw new Error('Expected to throw missing src error');
} catch (e: unknown) {
  if (!String((e as Error).message).includes('UrlVideoSource must include a non-empty `src`')) {
    throw e;
  }
}

console.log('videos.test passed');
