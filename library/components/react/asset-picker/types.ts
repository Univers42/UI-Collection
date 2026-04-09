import type { ReactNode } from 'react';

export type AssetPickerBoardItemPreview =
  | { kind: 'emoji'; value: string }
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'text'; value: string }
  | { kind: 'node'; render: (size: number) => ReactNode };

export interface AssetPickerBoardItem<TData = unknown> {
  id: string;
  value: string;
  label: string;
  group?: string;
  keywords?: string[];
  preview: AssetPickerBoardItemPreview;
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
}

export interface AssetPickerBoardValue {
  tabId: string;
  itemId: string;
}

export interface AssetPickerBoardSelection<TData = unknown> {
  tab: AssetPickerBoardTab<TData>;
  item: AssetPickerBoardItem<TData>;
  value: AssetPickerBoardValue;
}
