import { useMemo } from 'react';
import {
  AssetPickerBoard,
  createIconPickerTab,
  type AssetPickerBoardValue,
} from '../asset-picker/index.js';
import {
  DEFAULT_ICON_PICKER_ITEMS,
  type IconPickerItem,
} from './iconPickerData.js';

export interface IconPickerBoardProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  items?: IconPickerItem[];
  label?: string;
  showSearch?: boolean;
  columns?: number;
  className?: string;
}

function resolveSelectionValue(
  items: IconPickerItem[],
  requestedId: string | undefined,
): AssetPickerBoardValue | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const selectedItem =
    items.find((item) => item.id === requestedId) ??
    items[0];

  return {
    tabId: 'icons',
    itemId: selectedItem.id,
  };
}

export function IconPickerBoard({
  value,
  defaultValue,
  onChange,
  onChangeComplete,
  items = DEFAULT_ICON_PICKER_ITEMS,
  label = 'Icon picker',
  showSearch = true,
  columns = 5,
  className,
}: Readonly<IconPickerBoardProps>) {
  const tab = useMemo(
    () => createIconPickerTab(items, { columns }),
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
