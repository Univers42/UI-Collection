import { useMemo } from 'react';
import {
  AssetPickerBoard,
  type AssetPickerBoardProps,
  createIconPickerTab,
  type AssetPickerValueFormat,
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
  valueFormat?: AssetPickerValueFormat;
  boardProps?: Partial<
    Omit<
      AssetPickerBoardProps,
      'tabs' | 'value' | 'defaultValue' | 'onChange' | 'onChangeComplete' | 'label' | 'showTabs' | 'showSearch' | 'className'
    >
  >;
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
  valueFormat = 'canonical',
  boardProps,
}: Readonly<IconPickerBoardProps>) {
  const tab = useMemo(
    () =>
      createIconPickerTab(items, {
        columns,
        valueFormat,
        itemLabelVisibility: boardProps?.itemLabelVisibility,
        layout: boardProps?.layout,
      }),
    [boardProps?.itemLabelVisibility, boardProps?.layout, columns, items, valueFormat],
  );

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
        onChange?.(selection.serializedValue);
      }}
      onChangeComplete={(selection) => {
        onChangeComplete?.(selection.serializedValue);
      }}
    />
  );
}
