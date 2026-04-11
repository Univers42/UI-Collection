import { useEffect, useMemo, useState } from 'react';
import {
  AssetPickerBoard,
  type AssetPickerBoardProps,
  createEmojiPickerTab,
  getEmojiPickerRecentItems,
  type AssetPickerValueFormat,
} from '../asset-picker/index.js';
import {
  DEFAULT_EMOJI_PICKER_ITEMS,
  EMOJI_PICKER_GROUPS,
  type EmojiPickerItem,
} from './emojiPickerData.js';

const RECENT_GROUP_KEY = '__recent__';

export interface EmojiPickerBoardProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  items?: EmojiPickerItem[];
  label?: string;
  showSearch?: boolean;
  columns?: number;
  className?: string;
  valueFormat?: AssetPickerValueFormat;
  recentStorageKey?: string;
  recentLimit?: number;
  boardProps?: Partial<
    Omit<
      AssetPickerBoardProps,
      'tabs' | 'value' | 'defaultValue' | 'onChange' | 'onChangeComplete' | 'label' | 'showTabs' | 'showSearch' | 'className'
    >
  >;
}

function readRecentIds(storageKey: string, limit: number): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === 'string').slice(0, limit);
  } catch {
    return [];
  }
}

function writeRecentIds(storageKey: string, ids: string[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(ids));
}

export function EmojiPickerBoard({
  value,
  defaultValue,
  onChange,
  onChangeComplete,
  items = DEFAULT_EMOJI_PICKER_ITEMS,
  label = 'Emoji picker',
  showSearch = true,
  columns = 8,
  className,
  valueFormat = 'canonical',
  recentStorageKey,
  recentLimit = 24,
  boardProps,
}: Readonly<EmojiPickerBoardProps>) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    if (!recentStorageKey) {
      setRecentIds([]);
      return;
    }

    setRecentIds(readRecentIds(recentStorageKey, recentLimit));
  }, [recentLimit, recentStorageKey]);

  const recentItems = useMemo(() => {
    if (!recentStorageKey) {
      return [];
    }

    return getEmojiPickerRecentItems(recentIds, items).map((item) => ({
      ...item,
      id: `recent:${item.id}`,
      group: RECENT_GROUP_KEY,
    }));
  }, [items, recentIds, recentStorageKey]);

  const mergedItems = useMemo(
    () => [...recentItems, ...items],
    [items, recentItems],
  );

  const tab = useMemo(
    () =>
      createEmojiPickerTab(mergedItems, {
        columns,
        valueFormat,
        layout: boardProps?.layout,
        itemLabelVisibility: boardProps?.itemLabelVisibility,
        showGroups: true,
        groupOrder: recentItems.length > 0
          ? [RECENT_GROUP_KEY, ...EMOJI_PICKER_GROUPS]
          : [...EMOJI_PICKER_GROUPS],
        groupLabels: recentItems.length > 0
          ? {
              [RECENT_GROUP_KEY]:
                boardProps?.messages?.recentGroupLabel ?? 'Recent',
            }
          : undefined,
      }),
    [
      boardProps?.itemLabelVisibility,
      boardProps?.layout,
      boardProps?.messages?.recentGroupLabel,
      columns,
      mergedItems,
      recentItems.length,
      valueFormat,
    ],
  );

  function registerRecentEmoji(serializedValue: string): void {
    if (!recentStorageKey) {
      return;
    }

    const matchedItem = items.find((item) => item.value === serializedValue);

    if (!matchedItem) {
      return;
    }

    setRecentIds((current) => {
      const next = [
        matchedItem.id,
        ...current.filter((id) => id !== matchedItem.id),
      ].slice(0, recentLimit);

      writeRecentIds(recentStorageKey, next);
      return next;
    });
  }

  return (
    <AssetPickerBoard
      {...boardProps}
      tabs={[tab]}
      value={value}
      defaultValue={defaultValue}
      label={label}
      showSearch={showSearch}
      showTabs={false}
      className={className}
      onChange={(selection) => {
        registerRecentEmoji(selection.serializedValue);
        onChange?.(selection.serializedValue);
      }}
      onChangeComplete={(selection) => {
        onChangeComplete?.(selection.serializedValue);
      }}
    />
  );
}
