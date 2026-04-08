import {
  createMediaResolver,
  type MediaResolverMap,
} from './providers';
import { createMediaLibraryIndex, searchMediaItems } from './utils';
import type {
  MediaCollection,
  MediaCollectionName,
  MediaItem,
  MediaProvider,
  MediaSearchFilters,
} from './types';

export interface MediaRegistryOptions {
  resolvers?: Partial<MediaResolverMap>;
}

export interface MediaRegistry {
  collections: MediaCollection[];
  index: ReturnType<typeof createMediaLibraryIndex>;
  resolve: (ref: string) => string;
  getItem: (id: string) => MediaItem | undefined;
  getCollection: (name: MediaCollectionName) => MediaItem[];
  getByKind: (kind: string) => MediaItem[];
  getByProvider: (provider: MediaProvider) => MediaItem[];
  search: (query: string, filters?: MediaSearchFilters) => MediaItem[];
  extend: (
    collections: MediaCollection[],
    options?: MediaRegistryOptions,
  ) => MediaRegistry;
}

export function createMediaRegistry(
  collections: MediaCollection[],
  options: MediaRegistryOptions = {},
): MediaRegistry {
  const index = createMediaLibraryIndex(collections);
  const resolve = createMediaResolver(options.resolvers);

  return {
    collections,
    index,
    resolve,
    getItem(id) {
      return index.byId[id];
    },
    getCollection(name) {
      return index.byCollection[name] ?? [];
    },
    getByKind(kind) {
      return index.byKind[kind] ?? [];
    },
    getByProvider(provider) {
      return index.byProvider[provider] ?? [];
    },
    search(query, filters) {
      return searchMediaItems(index.all, query, filters);
    },
    extend(extraCollections, nextOptions = {}) {
      return createMediaRegistry([...collections, ...extraCollections], {
        resolvers: {
          ...options.resolvers,
          ...nextOptions.resolvers,
        },
      });
    },
  };
}
