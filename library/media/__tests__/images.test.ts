import {
  imageCollectionPresets,
  normalizeImageSource,
  normalizeUnsplashImage,
  normalizeUrlImage,
  resolveImageFullUrl,
  resolveImagePreviewUrl,
  resolveImageThumbnailUrl,
  UnsplashImageProvider,
} from '../images/index.js';

// Helper for assertions
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

// Basic normalization from URL
const urlSource = {
  kind: 'url',
  url: 'https://example.com/photo.jpg',
  thumbnailUrl: 'https://example.com/photo-thumb.jpg',
  previewUrl: 'https://example.com/photo-preview.jpg',
  fullUrl: 'https://example.com/photo-full.jpg',
  alt: 'Alt text',
  width: 1600,
  height: 900,
} as const;
const normalized = normalizeUrlImage(urlSource);
assert(normalized.kind === 'image', 'normalized.kind should be image');
assert(normalized.thumbnailUrl === 'https://example.com/photo-thumb.jpg', 'thumbnail URL should match');
assert(normalized.previewUrl === 'https://example.com/photo-preview.jpg', 'preview URL should match');
assert(normalized.fullUrl === 'https://example.com/photo-full.jpg', 'full URL should match');
assert(normalized.alt === 'Alt text', 'alt text should match');
assert(normalized.aspectRatio === 1600 / 900, 'aspect ratio should be inferred');
assert(resolveImageThumbnailUrl(normalized) === normalized.thumbnailUrl, 'thumbnail resolver should prefer thumbnail');
assert(resolveImagePreviewUrl(normalized) === normalized.previewUrl, 'preview resolver should prefer preview');
assert(resolveImageFullUrl(normalized) === normalized.fullUrl, 'full resolver should prefer full');

const unsplashRaw = {
  id: 'abc123',
  slug: 'japanese-woodblock-print',
  description: 'Japanese woodblock print',
  alt_description: 'Traditional Japanese print artwork',
  width: 2400,
  height: 3000,
  color: '#112233',
  blur_hash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH',
  urls: {
    thumb: 'https://images.unsplash.com/photo-thumb',
    small: 'https://images.unsplash.com/photo-small',
    regular: 'https://images.unsplash.com/photo-regular',
    full: 'https://images.unsplash.com/photo-full',
    raw: 'https://images.unsplash.com/photo-raw',
  },
  user: {
    name: 'Artist Example',
    username: 'artist-example',
    links: {
      html: 'https://unsplash.com/@artist-example',
    },
    profile_image: {
      small: 'https://images.unsplash.com/profile-small',
      medium: 'https://images.unsplash.com/profile-medium',
    },
  },
  links: {
    html: 'https://unsplash.com/photos/abc123',
    download: 'https://unsplash.com/photos/abc123/download',
    download_location: 'https://api.unsplash.com/photos/abc123/download',
  },
} as const;

const normalizedUnsplash = normalizeUnsplashImage(unsplashRaw);
assert(normalizedUnsplash.source === 'unsplash', 'unsplash source should be preserved');
assert(normalizedUnsplash.thumbnailUrl === unsplashRaw.urls.thumb, 'Unsplash thumb should map to thumbnail');
assert(normalizedUnsplash.previewUrl === unsplashRaw.urls.small, 'Unsplash small should map to preview');
assert(normalizedUnsplash.fullUrl === unsplashRaw.urls.full, 'Unsplash full should map to full URL');
assert(normalizedUnsplash.downloadLocation === unsplashRaw.links.download_location, 'download tracking URL should be exposed');

const normalizedViaDispatcher = normalizeImageSource(urlSource);
assert(normalizedViaDispatcher.fullUrl === normalized.fullUrl, 'dispatcher should normalize URL images');
assert(
  imageCollectionPresets.some((preset) => preset.id === 'japanese-prints')
    && imageCollectionPresets.some((preset) => preset.id === 'nasa-space')
    && imageCollectionPresets.some((preset) => preset.id === 'art-deco')
    && imageCollectionPresets.some((preset) => preset.id === 'nature-landscapes'),
  'expected curated image presets should exist',
);

// Unsplash provider without key should reject
try {
  await new UnsplashImageProvider().search('test');
  throw new Error('Expected to throw Unsplash key error');
} catch (e: unknown) {
  if (!String((e as Error).message).includes('Unsplash access key is required')) {
    throw e;
  }
}

console.log('images.test passed');
