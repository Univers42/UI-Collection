import type { CSSProperties, ReactNode } from 'react';

export type AssetPickerBoardAppearance = 'default' | 'unstyled';
export type AssetPickerItemLabelVisibility = 'visible' | 'hidden' | 'sr-only';
export type AssetPickerLayoutPreset = 'grid' | 'emoji' | 'icon' | 'media' | 'cover';

export interface AssetPickerLayoutOptions {
  type?: AssetPickerLayoutPreset;
  columns?: number;
  previewSize?: number;
  cellSize?: number;
  aspectRatio?: number;
  objectFit?: CSSProperties['objectFit'];
  gap?: number;
}

export type AssetPickerTabLayout =
  | AssetPickerLayoutPreset
  | AssetPickerLayoutOptions;

export const ASSET_PICKER_BOARD_SLOTS = [
  'root',
  'header',
  'headerText',
  'eyebrow',
  'title',
  'selectionPreview',
  'tabList',
  'tabButton',
  'searchField',
  'searchLabel',
  'searchInput',
  'statusBar',
  'groupSection',
  'groupLabel',
  'grid',
  'itemButton',
  'itemPreview',
  'itemLabel',
  'emptyState',
] as const;

export type AssetPickerBoardSlot =
  (typeof ASSET_PICKER_BOARD_SLOTS)[number];

export type AssetPickerBoardSlotClassNames =
  Partial<Record<AssetPickerBoardSlot, string>>;

export type AssetPickerBoardSlotStyles =
  Partial<Record<AssetPickerBoardSlot, CSSProperties>>;

export type AssetPickerBoardSlotProps =
  Partial<Record<AssetPickerBoardSlot, Record<string, unknown>>>;

export interface AssetPickerBoardMessages {
  boardEyebrow?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyStateLabel?: string;
  recentGroupLabel?: string;
}

export type AssetPickerBoardItemPreview =
  | { kind: 'emoji'; value: string }
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'text'; value: string }
  | { kind: 'node'; render: (size: number) => ReactNode };

export interface AssetPickerBoardItem<TData = unknown> {
  id: string;
  value: string;
  label: string;
  aliases?: string[];
  group?: string;
  keywords?: string[];
  localizedLabels?: Record<string, string>;
  preview: AssetPickerBoardItemPreview;
  previewAspectRatio?: number;
  data?: TData;
}

export interface AssetPickerBoardTab<TData = unknown> {
  id: string;
  label: string;
  items: AssetPickerBoardItem<TData>[];
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
}

export interface AssetPickerBoardValue {
  tabId: string;
  itemId: string;
}

export interface AssetPickerBoardSelection<TData = unknown> {
  tab: AssetPickerBoardTab<TData>;
  item: AssetPickerBoardItem<TData>;
  value: AssetPickerBoardValue;
  serializedValue: string;
}
