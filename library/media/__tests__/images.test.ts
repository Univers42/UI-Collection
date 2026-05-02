import { normalizeUrlImage, UnsplashImageProvider } from '../images/index.js';

// Helper for assertions
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

// Basic normalization from URL
const urlSource = { kind: 'url', url: 'https://example.com/photo.jpg', alt: 'Alt text' } as const;
const normalized = normalizeUrlImage(urlSource);
assert(normalized.kind === 'image', 'normalized.kind should be image');
assert(normalized.urls.original === 'https://example.com/photo.jpg', 'original URL should match');
assert(normalized.alt === 'Alt text', 'alt text should match');

// Unsplash provider without key should throw
try {
  new UnsplashImageProvider().search('test');
  throw new Error('Expected to throw Unsplash key error');
} catch (e: unknown) {
  if (!String((e as Error).message).includes('Unsplash access key is required')) {
    throw e;
  }
}

console.log('images.test passed');
