export const BUILTIN_MEDIA_PROVIDERS = [
  'local',
  'package',
  'url',
  'api',
  'unsplash',
  'picker',
] as const;

export const BUILTIN_MEDIA_COLLECTIONS = [
  'svg',
  'emojis',
  'photos',
  'videos',
  'other-media',
] as const;

export const BUILTIN_MEDIA_KINDS = [
  'svg',
  'emoji',
  'photo',
  'video',
  'audio',
  'document',
  'lottie',
  'model-3d',
  'other',
] as const;

export type ExtensibleString<T extends string> = T | (string & {});

export type BuiltinMediaProvider = (typeof BUILTIN_MEDIA_PROVIDERS)[number];
export type BuiltinMediaCollectionName = (typeof BUILTIN_MEDIA_COLLECTIONS)[number];
export type BuiltinMediaKind = (typeof BUILTIN_MEDIA_KINDS)[number];

export type MediaProvider = ExtensibleString<BuiltinMediaProvider>;
export type MediaCollectionName = ExtensibleString<BuiltinMediaCollectionName>;
export type MediaKind = ExtensibleString<BuiltinMediaKind>;
export type MediaRef = `${string}:${string}`;

export interface MediaItem {
  id: string;
  label: string;
  collection: MediaCollectionName;
  category: string;
  kind: MediaKind;
  ref: MediaRef;
  alt?: string;
  mimeType?: string;
  thumbnailRef?: MediaRef;
  tags?: string[];
  width?: number;
  height?: number;
}

export interface MediaCollection {
  name: MediaCollectionName;
  label: string;
  items: MediaItem[];
}

export interface MediaCollectionInputItem
  extends Omit<MediaItem, 'collection'> {
  collection?: MediaCollectionName;
}

export interface MediaCollectionInput {
  name: MediaCollectionName;
  label: string;
  items: MediaCollectionInputItem[];
}

export interface MediaLibraryIndex {
  all: MediaItem[];
  byId: Record<string, MediaItem>;
  byCollection: Record<string, MediaItem[]>;
  byKind: Record<string, MediaItem[]>;
  byProvider: Record<string, MediaItem[]>;
}

export interface MediaSearchFilters {
  collection?: MediaCollectionName;
  category?: string;
  kind?: MediaKind;
  provider?: MediaProvider;
  tags?: string[];
}
