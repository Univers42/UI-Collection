import {
  getMediaCollection,
  mediaLibrary,
  resolveMediaUrl,
} from '../../../media/index.js';
import {
  DEFAULT_EMOJI_PICKER_ITEMS,
  type EmojiPickerItem,
} from '../emoji-picker/emojiPickerData.js';
import {
  DEFAULT_ICON_PICKER_ITEMS,
  type IconPickerItem,
} from '../icon-picker/iconPickerData.js';
import { DEFAULT_ASSET_PICKER_TABS } from './defaultTabs.js';
import type {
  AssetPickerBoardItem,
  AssetPickerBoardSelection,
  AssetPickerBoardTab,
  AssetPickerBoardValue,
} from './types.js';

export type AssetValueKind = 'icon' | 'emoji' | 'media' | 'unknown';

export interface ParsedAssetValue {
  kind: AssetValueKind;
  serializedValue: string;
  raw: string;
  iconId?: string;
  emoji?: string;
  mediaRef?: string;
}

export interface AssetValueInput {
  kind: Exclude<AssetValueKind, 'unknown'>;
  value: string;
}

export interface ResolvedAssetValue {
  kind: AssetValueKind;
  serializedValue: string;
  label: string;
  item?: AssetPickerBoardItem;
  tab?: AssetPickerBoardTab;
  iconItem?: IconPickerItem;
  emojiItem?: EmojiPickerItem;
  mediaItem?: (typeof mediaLibrary.all)[number];
  preview?: AssetPickerBoardItem['preview'];
}

const iconItemsById = DEFAULT_ICON_PICKER_ITEMS.reduce<
  Record<string, IconPickerItem>
>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const emojiItemsByValue = DEFAULT_EMOJI_PICKER_ITEMS.reduce<
  Record<string, EmojiPickerItem>
>((acc, item) => {
  acc[item.value] = item;
  return acc;
}, {});

const emojiItemsById = DEFAULT_EMOJI_PICKER_ITEMS.reduce<
  Record<string, EmojiPickerItem>
>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const mediaItemsByRef = mediaLibrary.all.reduce<
  Record<string, (typeof mediaLibrary.all)[number]>
>((acc, item) => {
  acc[item.ref] = item;
  return acc;
}, {});

function isMediaRefCandidate(value: string): boolean {
  return /^[a-z0-9-]+:.+/i.test(value) && !value.startsWith('icon:') && !value.startsWith('emoji:');
}

function findBoardItemBySerializedValue(
  serializedValue: string,
  tabs: AssetPickerBoardTab[],
): {
  tab: AssetPickerBoardTab;
  item: AssetPickerBoardItem;
} | undefined {
  for (const tab of tabs) {
    const item = tab.items.find((entry) => entry.value === serializedValue);

    if (item) {
      return { tab, item };
    }
  }

  return undefined;
}

function normalizeLegacyIconValue(value: string): string {
  if (value.startsWith('icon:')) {
    return value;
  }

  if (iconItemsById[value]) {
    return `icon:${value}`;
  }

  return value;
}

export function serializeAssetValue(input: AssetValueInput | string): string {
  if (typeof input === 'string') {
    const parsed = parseAssetValue(input);
    return parsed.serializedValue;
  }

  if (input.kind === 'icon') {
    return `icon:${input.value}`;
  }

  if (input.kind === 'emoji') {
    return input.value;
  }

  return input.value;
}

export function serializeAssetSelection(
  selection: Pick<AssetPickerBoardSelection, 'serializedValue'> | string,
): string {
  if (typeof selection === 'string') {
    return serializeAssetValue(selection);
  }

  return selection.serializedValue;
}

export function parseAssetValue(value: string): ParsedAssetValue {
  const normalizedValue = normalizeLegacyIconValue(value);

  if (normalizedValue.startsWith('icon:')) {
    return {
      kind: 'icon',
      serializedValue: normalizedValue,
      raw: value,
      iconId: normalizedValue.slice('icon:'.length),
    };
  }

  if (normalizedValue.startsWith('emoji:')) {
    return {
      kind: 'emoji',
      serializedValue: normalizedValue.slice('emoji:'.length),
      raw: value,
      emoji: normalizedValue.slice('emoji:'.length),
    };
  }

  if (emojiItemsByValue[normalizedValue]) {
    return {
      kind: 'emoji',
      serializedValue: normalizedValue,
      raw: value,
      emoji: normalizedValue,
    };
  }

  if (isMediaRefCandidate(normalizedValue)) {
    return {
      kind: 'media',
      serializedValue: normalizedValue,
      raw: value,
      mediaRef: normalizedValue,
    };
  }

  return {
    kind: 'unknown',
    serializedValue: normalizedValue,
    raw: value,
  };
}

export function assetValueToBoardValue(
  value: string | undefined,
  tabs: AssetPickerBoardTab[] = DEFAULT_ASSET_PICKER_TABS,
): AssetPickerBoardValue | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = parseAssetValue(value);
  const match = findBoardItemBySerializedValue(parsed.serializedValue, tabs);

  if (!match) {
    return undefined;
  }

  return {
    tabId: match.tab.id,
    itemId: match.item.id,
  };
}

export function resolveAssetValue(
  value: string,
  tabs: AssetPickerBoardTab[] = DEFAULT_ASSET_PICKER_TABS,
): ResolvedAssetValue | undefined {
  const parsed = parseAssetValue(value);
  const boardMatch = findBoardItemBySerializedValue(parsed.serializedValue, tabs);

  if (boardMatch) {
    return {
      kind: parsed.kind,
      serializedValue: parsed.serializedValue,
      label: boardMatch.item.label,
      item: boardMatch.item,
      tab: boardMatch.tab,
      preview: boardMatch.item.preview,
    };
  }

  if (parsed.kind === 'icon' && parsed.iconId) {
    const iconItem = iconItemsById[parsed.iconId];

    if (!iconItem) {
      return undefined;
    }

    return {
      kind: 'icon',
      serializedValue: parsed.serializedValue,
      label: iconItem.label,
      iconItem,
    };
  }

  if (parsed.kind === 'emoji' && parsed.emoji) {
    const emojiItem = emojiItemsByValue[parsed.emoji] ?? emojiItemsById[parsed.emoji];

    if (!emojiItem) {
      return {
        kind: 'emoji',
        serializedValue: parsed.serializedValue,
        label: parsed.emoji,
        preview: {
          kind: 'emoji',
          value: parsed.emoji,
        },
      };
    }

    return {
      kind: 'emoji',
      serializedValue: parsed.serializedValue,
      label: emojiItem.label,
      emojiItem,
      preview: {
        kind: 'emoji',
        value: emojiItem.value,
      },
    };
  }

  if (parsed.kind === 'media' && parsed.mediaRef) {
    const mediaItem = mediaItemsByRef[parsed.mediaRef];

    return {
      kind: 'media',
      serializedValue: parsed.serializedValue,
      label: mediaItem?.label ?? parsed.mediaRef,
      mediaItem,
      preview: {
        kind: 'image',
        src: resolveMediaUrl(mediaItem?.thumbnailRef ?? parsed.mediaRef),
        alt: mediaItem?.alt ?? mediaItem?.label ?? parsed.mediaRef,
      },
    };
  }

  return undefined;
}

export function getEmojiPickerRecentItems(
  ids: string[],
  items: EmojiPickerItem[] = DEFAULT_EMOJI_PICKER_ITEMS,
): EmojiPickerItem[] {
  const itemsById = items.reduce<Record<string, EmojiPickerItem>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  return ids
    .map((id) => itemsById[id])
    .filter((item): item is EmojiPickerItem => Boolean(item));
}

export function getDefaultMediaItems(collection = 'svg'): ReturnType<typeof getMediaCollection> {
  return getMediaCollection(collection);
}
