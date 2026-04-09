import type {
  MediaCollection,
  MediaCollectionInput,
  MediaItem,
  MediaLibraryIndex,
  MediaSearchFilters,
} from './types.js';
import { parseMediaRef } from './providers.js';

function groupMediaItems(
  items: MediaItem[],
  getKey: (item: MediaItem) => string,
): Record<string, MediaItem[]> {
  return items.reduce<Record<string, MediaItem[]>>((acc, item) => {
    const key = getKey(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function defineMediaCollection(
  input: MediaCollectionInput,
): MediaCollection {
  return {
    name: input.name,
    label: input.label,
    items: input.items.map((item) => ({
      ...item,
      collection: item.collection ?? input.name,
    })),
  };
}

export function createMediaLibraryIndex(
  collections: MediaCollection[],
): MediaLibraryIndex {
  const all = collections.flatMap((collection) => collection.items);

  const byId = all.reduce<Record<string, MediaItem>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const byCollection = groupMediaItems(all, (item) => item.collection);
  const byKind = groupMediaItems(all, (item) => item.kind);
  const byProvider = groupMediaItems(all, (item) => parseMediaRef(item.ref).provider);

  return { all, byId, byCollection, byKind, byProvider };
}

export function filterMediaItems(
  items: MediaItem[],
  filters: MediaSearchFilters = {},
): MediaItem[] {
  return items.filter((item) => {
    const provider = parseMediaRef(item.ref).provider;

    if (filters.collection && item.collection !== filters.collection) {
      return false;
    }

    if (filters.category && item.category !== filters.category) {
      return false;
    }

    if (filters.kind && item.kind !== filters.kind) {
      return false;
    }

    if (filters.provider && provider !== filters.provider) {
      return false;
    }

    if (filters.tags?.length) {
      const itemTags = new Set(item.tags ?? []);
      const hasAllTags = filters.tags.every((tag) => itemTags.has(tag));

      if (!hasAllTags) {
        return false;
      }
    }

    return true;
  });
}

export function searchMediaItems(
  items: MediaItem[],
  query: string,
  filters: MediaSearchFilters = {},
): MediaItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = filterMediaItems(items, filters);

  if (!normalizedQuery) {
    return filteredItems;
  }

  return filteredItems.filter((item) => {
    const { provider } = parseMediaRef(item.ref);
    const haystacks = [
      item.id,
      item.label,
      item.collection,
      item.category,
      item.kind,
      provider,
      item.alt ?? '',
      ...(item.tags ?? []),
    ];

    return haystacks.some((value) => value.toLowerCase().includes(normalizedQuery));
  });
}
