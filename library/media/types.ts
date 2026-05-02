export type MediaKind = 'image' | 'video';

export type ImageSourceKind = 'url' | 'unsplash';
export type VideoSourceKind = 'url' | 'external';

export interface MediaCollectionBase<TKind extends MediaKind, TSource extends string, TItem> {
  id: string;
  kind: TKind;
  label: string;
  description?: string;
  source: TSource;
  tags?: string[];
  queries?: string[];
  items?: TItem[];
}

export type UrlImageSource = {
  kind: 'url';
  id?: string;
  url: string;
  title?: string;
  description?: string;
  alt?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  fullUrl?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  dominantColor?: string;
  blurHash?: string;
  author?: string;
  authorUrl?: string;
  providerName?: string;
  providerImageUrl?: string;
  metadata?: Record<string, unknown>;
};

export type UnsplashImageSource = {
  kind: 'unsplash';
  raw: Record<string, unknown>;
};

export type ImageSource = UrlImageSource | UnsplashImageSource;

export interface NormalizedImage {
  id: string;
  kind: 'image';
  source: ImageSourceKind;
  title?: string;
  description?: string;
  alt: string;
  thumbnailUrl: string;
  previewUrl: string;
  fullUrl: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  dominantColor?: string;
  blurHash?: string;
  author?: string;
  authorUrl?: string;
  providerName: string;
  providerImageUrl?: string;
  downloadLocation?: string;
  metadata?: Record<string, unknown>;
}

export type UrlVideoSource = {
  kind: 'url';
  id?: string;
  src?: string;
  videoUrl?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  poster?: string;
  posterUrl?: string;
  previewUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  mimeType?: string;
  author?: string;
  authorUrl?: string;
  providerName?: string;
  providerImageUrl?: string;
  metadata?: Record<string, unknown>;
};

export type ExternalVideoSource = {
  kind: 'external';
  id?: string;
  providerId: string;
  providerName?: string;
  providerImageUrl?: string;
  videoUrl: string;
  embedUrl?: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  posterUrl?: string;
  previewUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  mimeType?: string;
  author?: string;
  authorUrl?: string;
  metadata?: Record<string, unknown>;
};

export type VideoSource = UrlVideoSource | ExternalVideoSource;

export interface NormalizedVideo {
  id: string;
  kind: 'video';
  source: VideoSourceKind;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  posterUrl?: string;
  previewUrl?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  duration?: number;
  mimeType?: string;
  author?: string;
  authorUrl?: string;
  providerName: string;
  providerImageUrl?: string;
  metadata?: Record<string, unknown>;
}

export type ImageCollectionPreset = MediaCollectionBase<'image', ImageSourceKind, NormalizedImage>;
export type VideoCollectionPreset = MediaCollectionBase<'video', VideoSourceKind, NormalizedVideo> & {
  items: NormalizedVideo[];
};

export type RemoteImage = NormalizedImage;
export type RemoteVideo = NormalizedVideo;
