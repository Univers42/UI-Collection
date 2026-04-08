import { emojisCollection } from './emojis';
import { otherMediaCollection } from './other-media';
import { photosCollection } from './photos';
import { svgCollection } from './svg';
import { videosCollection } from './videos';
import { createMediaRegistry } from '../registry';
import type {
  MediaCollection,
  MediaCollectionName,
  MediaItem,
  MediaProvider,
  MediaSearchFilters,
} from '../types';

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
