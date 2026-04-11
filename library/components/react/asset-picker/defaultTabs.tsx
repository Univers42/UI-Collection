import {
  getMediaCollection,
  mediaCollections,
  resolveMediaUrl,
  type MediaCollectionName,
  type MediaItem,
} from '../../../media/index.js';
import {
  DEFAULT_EMOJI_PICKER_ITEMS,
  EMOJI_PICKER_GROUPS,
  type EmojiPickerItem,
} from '../emoji-picker/emojiPickerData.js';
import {
  DEFAULT_ICON_PICKER_ITEMS,
  renderSizedIcon,
  type IconPickerItem,
} from '../icon-picker/iconPickerData.js';
import type {
  AssetPickerBoardTab,
  AssetPickerItemLabelVisibility,
  AssetPickerTabLayout,
} from './types.js';

const ICON_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(79, 70, 229, 0.32) 0%, rgba(37, 99, 235, 0.18) 100%)';
const EMOJI_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(16, 185, 129, 0.28) 0%, rgba(14, 165, 233, 0.16) 100%)';
const SVG_ACTIVE_BACKGROUND = 'linear-gradient(180deg, rgba(245, 158, 11, 0.28) 0%, rgba(249, 115, 22, 0.16) 100%)';

export type AssetPickerValueFormat = 'canonical' | 'legacy';

export interface AssetPickerTabOptions {
  id?: string;
  label?: string;
  columns?: number;
  countLabel?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyStateLabel?: string;
  activeBackground?: string;
  layout?: AssetPickerTabLayout;
  itemLabelVisibility?: AssetPickerItemLabelVisibility;
  showGroups?: boolean;
  groupOrder?: string[];
  groupLabels?: Record<string, string>;
  valueFormat?: AssetPickerValueFormat;
}

export interface DefaultAssetPickerTabsOptions {
  iconItems?: IconPickerItem[];
  emojiItems?: EmojiPickerItem[];
  svgItems?: MediaItem[];
  includeIcons?: boolean;
  includeEmojis?: boolean;
  includeSvg?: boolean;
  iconTabOptions?: AssetPickerTabOptions;
  emojiTabOptions?: AssetPickerTabOptions;
  svgTabOptions?: AssetPickerTabOptions;
}

function getCollectionLabel(collectionName: MediaCollectionName): string {
  return mediaCollections.find((collection) => collection.name === collectionName)?.label ?? collectionName;
}

function getSerializedIconValue(
  item: IconPickerItem,
  valueFormat: AssetPickerValueFormat = 'canonical',
): string {
  return valueFormat === 'legacy' ? item.id : `icon:${item.id}`;
}

function getSerializedEmojiValue(
  item: EmojiPickerItem,
  valueFormat: AssetPickerValueFormat = 'canonical',
): string {
  void valueFormat;
  return item.value;
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
    layout: options.layout ?? 'icon',
    itemLabelVisibility: options.itemLabelVisibility,
    showGroups: options.showGroups ?? false,
    groupOrder: options.groupOrder,
    groupLabels: options.groupLabels,
    items: items.map((item) => ({
      id: item.id,
      value: getSerializedIconValue(item, options.valueFormat),
      label: item.label,
      group: item.group,
      aliases: [item.id],
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
    columns: options.columns ?? 8,
    countLabel: options.countLabel ?? 'emojis',
    searchLabel: options.searchLabel ?? 'Search emojis',
    searchPlaceholder: options.searchPlaceholder ?? 'Search by glyph, alias, group or keyword',
    emptyStateLabel: options.emptyStateLabel ?? 'No emojis match the current search.',
    activeBackground: options.activeBackground ?? EMOJI_ACTIVE_BACKGROUND,
    layout: options.layout ?? 'emoji',
    itemLabelVisibility: options.itemLabelVisibility,
    showGroups: options.showGroups ?? true,
    groupOrder: options.groupOrder ?? [...EMOJI_PICKER_GROUPS],
    groupLabels: options.groupLabels,
    items: items.map((item) => ({
      id: item.id,
      value: getSerializedEmojiValue(item, options.valueFormat),
      label: item.label,
      aliases: [item.id, ...(item.aliases ?? [])],
      group: item.group,
      keywords: item.keywords,
      localizedLabels: item.localizedLabels,
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
    layout: options.layout ?? (collectionName === 'photos' ? 'cover' : 'media'),
    itemLabelVisibility: options.itemLabelVisibility,
    showGroups: options.showGroups ?? false,
    groupOrder: options.groupOrder,
    groupLabels: options.groupLabels,
    items: items.map((item) => ({
      id: item.id,
      value: item.ref,
      label: item.label,
      aliases: [item.id],
      group: item.category,
      keywords: item.tags,
      preview: {
        kind: 'image',
        src: resolveMediaUrl(item.thumbnailRef ?? item.ref),
        alt: item.alt ?? item.label,
      },
      previewAspectRatio: item.width && item.height ? item.width / item.height : undefined,
      data: item,
    })),
  };
}

export function createDefaultAssetPickerTabs(
  options: DefaultAssetPickerTabsOptions = {},
): AssetPickerBoardTab[] {
  const tabs: AssetPickerBoardTab[] = [];

  if (options.includeEmojis !== false) {
    tabs.push(createEmojiPickerTab(options.emojiItems, options.emojiTabOptions));
  }

  if (options.includeSvg !== false) {
    tabs.push(
      createMediaCollectionPickerTab(
        'svg',
        options.svgItems,
        options.svgTabOptions,
      ),
    );
  }

  if (options.includeIcons !== false) {
    tabs.push(createIconPickerTab(options.iconItems, options.iconTabOptions));
  }

  return tabs;
}

export const DEFAULT_ASSET_PICKER_TABS = createDefaultAssetPickerTabs();
