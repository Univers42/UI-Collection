import { emojisCollection } from './emojis.js';
import { otherMediaCollection } from './other-media.js';
import { photosCollection } from './photos.js';
import { svgCollection } from './svg.js';
import { videosCollection } from './videos.js';
import { createMediaRegistry } from '../registry.js';
import type {
  MediaCollection,
  MediaCollectionName,
  MediaItem,
  MediaProvider,
  MediaSearchFilters,
} from '../types.js';

export const mediaCollections: MediaCollection[] = [
  svgCollection,
  emojisCollection,
  photosCollection,
  videosCollection,
  otherMediaCollection,
];

export const mediaRegistry = createMediaRegistry(mediaCollections);
export const mediaLibrary = mediaRegistry.index;

export function getMediaItem(id: string): MediaItem | undefined {
  return mediaRegistry.getItem(id);
}

export function getMediaCollection(name: MediaCollectionName): MediaItem[] {
  return mediaRegistry.getCollection(name);
}

export function getMediaByKind(kind: string): MediaItem[] {
  return mediaRegistry.getByKind(kind);
}

export function getMediaByProvider(provider: MediaProvider): MediaItem[] {
  return mediaRegistry.getByProvider(provider);
}

export function searchMedia(
  query: string,
  filters?: MediaSearchFilters,
): MediaItem[] {
  return mediaRegistry.search(query, filters);
}

export function extendMediaLibrary(
  collections: MediaCollection[],
): ReturnType<typeof createMediaRegistry> {
  return mediaRegistry.extend(collections);
}
