/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   IconPickerBoard.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 11:38:08 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 11:49:25 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentType,
  type CSSProperties,
  type ReactElement,
} from 'react';
import {
  IconAudio,
  IconBoard,
  IconBookmark,
  IconBreadcrumb,
  IconBullet,
  IconCallout,
  IconCode,
  IconColumns,
  IconDivider,
  IconEmbed,
  IconEquation,
  IconFile,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconImage,
  IconLinkToPage,
  IconNumbered,
  IconPage,
  IconQuote,
  IconSpacer,
  IconTOC,
  IconTable,
  IconText,
  IconTodo,
  IconToggle,
  IconVideo,
} from '../../../icons/react/slash-menu/index.js';

export interface IconPickerItem {
  id: string;
  label: string;
  icon: ComponentType;
  keywords?: string[];
  group?: string;
}

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

export const DEFAULT_ICON_PICKER_ITEMS: IconPickerItem[] = [
  { id: 'text', label: 'Text', icon: IconText, keywords: ['paragraph', 'plain'], group: 'basic' },
  { id: 'heading-1', label: 'Heading 1', icon: IconH1, keywords: ['title', 'h1'], group: 'basic' },
  { id: 'heading-2', label: 'Heading 2', icon: IconH2, keywords: ['subtitle', 'h2'], group: 'basic' },
  { id: 'heading-3', label: 'Heading 3', icon: IconH3, keywords: ['headline', 'h3'], group: 'basic' },
  { id: 'heading-4', label: 'Heading 4', icon: IconH4, keywords: ['headline', 'h4'], group: 'basic' },
  { id: 'heading-5', label: 'Heading 5', icon: IconH5, keywords: ['headline', 'h5'], group: 'basic' },
  { id: 'heading-6', label: 'Heading 6', icon: IconH6, keywords: ['headline', 'h6'], group: 'basic' },
  { id: 'bullet', label: 'Bulleted List', icon: IconBullet, keywords: ['unordered', 'list'], group: 'lists' },
  { id: 'numbered', label: 'Numbered List', icon: IconNumbered, keywords: ['ordered', 'list'], group: 'lists' },
  { id: 'todo', label: 'To-do', icon: IconTodo, keywords: ['checkbox', 'task'], group: 'lists' },
  { id: 'toggle', label: 'Toggle', icon: IconToggle, keywords: ['collapse', 'disclosure'], group: 'lists' },
  { id: 'page', label: 'Page', icon: IconPage, keywords: ['document', 'sheet'], group: 'basic' },
  { id: 'callout', label: 'Callout', icon: IconCallout, keywords: ['tip', 'hint'], group: 'blocks' },
  { id: 'quote', label: 'Quote', icon: IconQuote, keywords: ['blockquote', 'citation'], group: 'blocks' },
  { id: 'table', label: 'Table', icon: IconTable, keywords: ['grid', 'database'], group: 'blocks' },
  { id: 'divider', label: 'Divider', icon: IconDivider, keywords: ['separator', 'rule'], group: 'blocks' },
  { id: 'link', label: 'Link to Page', icon: IconLinkToPage, keywords: ['navigation', 'reference'], group: 'blocks' },
  { id: 'image', label: 'Image', icon: IconImage, keywords: ['media', 'photo'], group: 'media' },
  { id: 'video', label: 'Video', icon: IconVideo, keywords: ['media', 'clip'], group: 'media' },
  { id: 'audio', label: 'Audio', icon: IconAudio, keywords: ['sound', 'voice'], group: 'media' },
  { id: 'code', label: 'Code', icon: IconCode, keywords: ['developer', 'snippet'], group: 'advanced' },
  { id: 'file', label: 'File', icon: IconFile, keywords: ['document', 'attachment'], group: 'advanced' },
  { id: 'bookmark', label: 'Bookmark', icon: IconBookmark, keywords: ['save', 'favorite'], group: 'advanced' },
  { id: 'board', label: 'Board', icon: IconBoard, keywords: ['kanban', 'cards'], group: 'layout' },
  { id: 'columns', label: 'Columns', icon: IconColumns, keywords: ['layout', 'grid'], group: 'layout' },
  { id: 'toc', label: 'Table of Contents', icon: IconTOC, keywords: ['outline', 'index'], group: 'advanced' },
  { id: 'equation', label: 'Equation', icon: IconEquation, keywords: ['math', 'formula'], group: 'advanced' },
  { id: 'spacer', label: 'Spacer', icon: IconSpacer, keywords: ['gap', 'space'], group: 'layout' },
  { id: 'embed', label: 'Embed', icon: IconEmbed, keywords: ['external', 'iframe'], group: 'advanced' },
  { id: 'breadcrumb', label: 'Breadcrumb', icon: IconBreadcrumb, keywords: ['path', 'navigation'], group: 'layout' },
];

function renderSizedIcon(Icon: ComponentType, size: number): ReactElement {
  const element = <Icon />;

  if (!isValidElement(element)) {
    return <span />;
  }

  return cloneElement(
    element as ReactElement<Record<string, unknown>>,
    {
      className: undefined,
      width: size,
      height: size,
      style: {
        width: size,
        height: size,
        display: 'block',
      },
    },
  );
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
}: IconPickerBoardProps) {
  const fallbackId = items[0]?.id ?? '';
  const initialValue = value ?? defaultValue ?? fallbackId;
  const [internalValue, setInternalValue] = useState(initialValue);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const activeId = value ?? internalValue;

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const haystack = [
        item.id,
        item.label,
        item.group ?? '',
        ...(item.keywords ?? []),
      ].join(' ').toLowerCase();

      return haystack.includes(normalized);
    });
  }, [items, query]);

  const activeItem =
    items.find((item) => item.id === activeId) ??
    filteredItems[0] ??
    items[0] ??
    null;

  function selectItem(nextId: string): void {
    if (value === undefined) {
      setInternalValue(nextId);
    }

    onChange?.(nextId);
    onChangeComplete?.(nextId);
  }

  const rootStyle: CSSProperties = {
    width: 352,
    padding: 16,
    borderRadius: 24,
    border: '1px solid rgba(148, 163, 184, 0.22)',
    background:
      'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28)',
    color: '#E2E8F0',
    fontFamily:
      'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  return (
    <section className={className} style={rootStyle} aria-label={label}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
            Picker Board
          </div>
          <h3 style={{ margin: '6px 0 0', fontSize: 20, lineHeight: 1.1 }}>{label}</h3>
        </div>
        {activeItem ? (
          <div
            style={{
              minWidth: 96,
              padding: '10px 12px',
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(148, 163, 184, 0.18)',
              display: 'grid',
              justifyItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ color: '#F8FAFC' }}>{renderSizedIcon(activeItem.icon, 26)}</span>
            <span style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.1 }}>{activeItem.label}</span>
          </div>
        ) : null}
      </div>

      {showSearch ? (
        <label style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.78 }}>Search icons</span>
          <input
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
            }}
            placeholder="Search by name, group or keyword"
            style={{
              height: 42,
              borderRadius: 14,
              border: '1px solid rgba(148, 163, 184, 0.22)',
              background: 'rgba(15, 23, 42, 0.45)',
              color: '#F8FAFC',
              padding: '0 14px',
              fontSize: 14,
              outline: 'none',
            }}
          />
        </label>
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          fontSize: 12,
          color: '#94A3B8',
        }}
      >
        <span>{filteredItems.length} icons</span>
        <span>{activeItem?.group ?? 'picker'}</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: 10,
        }}
      >
        {filteredItems.map((item) => {
          const isActive = item.id === activeItem?.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                selectItem(item.id);
              }}
              title={item.label}
              style={{
                display: 'grid',
                gap: 8,
                justifyItems: 'center',
                minHeight: 76,
                padding: '12px 8px',
                borderRadius: 16,
                border: isActive
                  ? '1px solid rgba(255, 255, 255, 0.48)'
                  : '1px solid rgba(148, 163, 184, 0.18)',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(79, 70, 229, 0.32) 0%, rgba(37, 99, 235, 0.18) 100%)'
                  : 'rgba(255, 255, 255, 0.04)',
                color: '#F8FAFC',
                cursor: 'pointer',
              }}
            >
              <span>{renderSizedIcon(item.icon, 22)}</span>
              <span style={{ fontSize: 10, lineHeight: 1.15, color: '#CBD5E1' }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
