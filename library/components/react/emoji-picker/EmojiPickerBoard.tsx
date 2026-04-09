import { useMemo } from 'react';
import {
  AssetPickerBoard,
  createEmojiPickerTab,
  type AssetPickerBoardValue,
} from '../asset-picker/index.js';
import {
  DEFAULT_EMOJI_PICKER_ITEMS,
  type EmojiPickerItem,
} from './emojiPickerData.js';

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
}

function resolveSelectionValue(
  items: EmojiPickerItem[],
  requestedValue: string | undefined,
): AssetPickerBoardValue | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const selectedItem =
    items.find((item) => item.value === requestedValue) ??
    items[0];

  return {
    tabId: 'emojis',
    itemId: selectedItem.id,
  };
}

export function EmojiPickerBoard({
  value,
  defaultValue,
  onChange,
  onChangeComplete,
  items = DEFAULT_EMOJI_PICKER_ITEMS,
  label = 'Emoji picker',
  showSearch = true,
  columns = 6,
  className,
}: Readonly<EmojiPickerBoardProps>) {
  const tab = useMemo(
    () => createEmojiPickerTab(items, { columns }),
    [columns, items],
  );
  const boardValue = resolveSelectionValue(items, value);
  const boardDefaultValue = resolveSelectionValue(items, defaultValue);

  return (
    <AssetPickerBoard
      tabs={[tab]}
      value={boardValue}
      defaultValue={boardDefaultValue}
      label={label}
      showSearch={showSearch}
      showTabs={false}
      columns={columns}
      className={className}
      onChange={(selection) => {
        onChange?.(selection.item.value);
      }}
      onChangeComplete={(selection) => {
        onChangeComplete?.(selection.item.value);
      }}
    />
  );
}
