// Public types for images and videos (strict, explicit)

export type MediaKind = 'image' | 'video';

// Image source variants
export type UrlImageSource = {
  kind: 'url';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  metadata?: Record<string, unknown>;
};

export type UnsplashImageSource = {
  kind: 'unsplash';
  // raw provider data returned from Unsplash API (kept optional)
  raw: Record<string, unknown>;
};

export type ImageSource = UrlImageSource | UnsplashImageSource;

export interface NormalizedImage {
  kind: 'image';
  id?: string;
  description?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  color?: string | null;
  blurHash?: string | null;
  urls: Record<string, string>;
  author?: string | null;
  authorUrl?: string | null;
  downloadUrl?: string | null;
  source: ImageSource['kind'];
  rawProviderData?: unknown;
}

// Video source variants
export type UrlVideoSource = {
  kind: 'url';
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  duration?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
};

export type VideoSource = UrlVideoSource; // future: extensible provider sources

export interface NormalizedVideo {
  kind: 'video';
  id?: string;
  title?: string | null;
  description?: string | null;
  src: string;
  poster?: string | null;
  mimeType?: string | null;
  duration?: number | null;
  width?: number | null;
  height?: number | null;
  credits?: { author?: string; authorUrl?: string } | null;
  metadata?: Record<string, unknown> | null;
  source: VideoSource['kind'];
  rawProviderData?: unknown;
}

export type RemoteImage = NormalizedImage;
export type RemoteVideo = NormalizedVideo;
