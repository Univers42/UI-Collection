import {
  getMediaCollection,
  mediaCollections,
  resolveMediaUrl,
  type MediaCollectionName,
  type MediaItem,
} from '../../../media/index.js';
import {
  DEFAULT_EMOJI_PICKER_ITEMS,
  type EmojiPickerItem,
} from '../emoji-picker/emojiPickerData.js';
import {
  DEFAULT_ICON_PICKER_ITEMS,
  renderSizedIcon,
  type IconPickerItem,
} from '../icon-picker/iconPickerData.js';
import type { AssetPickerBoardTab } from './types.js';

const ICON_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(79, 70, 229, 0.32) 0%, rgba(37, 99, 235, 0.18) 100%)';
const EMOJI_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(16, 185, 129, 0.28) 0%, rgba(14, 165, 233, 0.16) 100%)';
const SVG_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(245, 158, 11, 0.28) 0%, rgba(249, 115, 22, 0.16) 100%)';

export interface AssetPickerTabOptions {
  id?: string;
  label?: string;
  columns?: number;
  countLabel?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyStateLabel?: string;
  activeBackground?: string;
}

export interface DefaultAssetPickerTabsOptions {
  iconItems?: IconPickerItem[];
  emojiItems?: EmojiPickerItem[];
  svgItems?: MediaItem[];
  includeIcons?: boolean;
  includeEmojis?: boolean;
  includeSvg?: boolean;
}

function getCollectionLabel(collectionName: MediaCollectionName): string {
  return mediaCollections.find((collection) => collection.name === collectionName)?.label ?? collectionName;
}

export function createIconPickerTab(
  items: IconPickerItem[] = DEFAULT_ICON_PICKER_ITEMS,
  options: AssetPickerTabOptions = {},
): AssetPickerBoardTab<IconPickerItem> {
  return {
    id: options.id ?? 'icons',
    label: options.label ?? 'Icons',
    columns: options.columns ?? 5,
    countLabel: options.countLabel ?? 'icons',
    searchLabel: options.searchLabel ?? 'Search icons',
    searchPlaceholder: options.searchPlaceholder ?? 'Search by name, group or keyword',
    emptyStateLabel: options.emptyStateLabel ?? 'No icons match the current search.',
    activeBackground: options.activeBackground ?? ICON_ACTIVE_BACKGROUND,
    items: items.map((item) => ({
      id: item.id,
      value: item.id,
      label: item.label,
      group: item.group,
      keywords: item.keywords,
      preview: {
        kind: 'node',
        render: (size) => renderSizedIcon(item.icon, size),
      },
      data: item,
    })),
  };
}

export function createEmojiPickerTab(
  items: EmojiPickerItem[] = DEFAULT_EMOJI_PICKER_ITEMS,
  options: AssetPickerTabOptions = {},
): AssetPickerBoardTab<EmojiPickerItem> {
  return {
    id: options.id ?? 'emojis',
    label: options.label ?? 'Emojis',
    columns: options.columns ?? 6,
    countLabel: options.countLabel ?? 'emojis',
    searchLabel: options.searchLabel ?? 'Search emojis',
    searchPlaceholder: options.searchPlaceholder ?? 'Search by name, group or keyword',
    emptyStateLabel: options.emptyStateLabel ?? 'No emojis match the current search.',
    activeBackground: options.activeBackground ?? EMOJI_ACTIVE_BACKGROUND,
    items: items.map((item) => ({
      id: item.id,
      value: item.value,
      label: item.label,
      group: item.group,
      keywords: item.keywords,
      preview: item.src
        ? {
            kind: 'image',
            src: item.src,
            alt: item.label,
          }
        : {
            kind: 'emoji',
            value: item.value,
          },
      data: item,
    })),
  };
}

export function createMediaCollectionPickerTab(
  collectionName: MediaCollectionName,
  items: MediaItem[] = getMediaCollection(collectionName),
  options: AssetPickerTabOptions = {},
): AssetPickerBoardTab<MediaItem> {
  const collectionLabel = getCollectionLabel(collectionName);

  return {
    id: options.id ?? collectionName,
    label: options.label ?? collectionLabel,
    columns: options.columns ?? 4,
    countLabel: options.countLabel ?? collectionLabel.toLowerCase(),
    searchLabel: options.searchLabel ?? `Search ${collectionLabel.toLowerCase()}`,
    searchPlaceholder: options.searchPlaceholder ?? `Search ${collectionLabel.toLowerCase()} by name, category or tag`,
    emptyStateLabel: options.emptyStateLabel ?? `No ${collectionLabel.toLowerCase()} items match the current search.`,
    activeBackground: options.activeBackground ?? SVG_ACTIVE_BACKGROUND,
    items: items.map((item) => ({
      id: item.id,
      value: item.ref,
      label: item.label,
      group: item.category,
      keywords: item.tags,
      preview: {
        kind: 'image',
        src: resolveMediaUrl(item.thumbnailRef ?? item.ref),
        alt: item.alt ?? item.label,
      },
      data: item,
    })),
  };
}

export function createDefaultAssetPickerTabs(
  options: DefaultAssetPickerTabsOptions = {},
): AssetPickerBoardTab[] {
  const tabs: AssetPickerBoardTab[] = [];

  if (options.includeEmojis !== false) {
    tabs.push(createEmojiPickerTab(options.emojiItems));
  }

  if (options.includeSvg !== false) {
    tabs.push(createMediaCollectionPickerTab('svg', options.svgItems));
  }

  if (options.includeIcons !== false) {
    tabs.push(createIconPickerTab(options.iconItems));
  }

  return tabs;
}

export const DEFAULT_ASSET_PICKER_TABS = createDefaultAssetPickerTabs();
