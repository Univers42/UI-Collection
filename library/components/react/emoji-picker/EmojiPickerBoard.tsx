/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   EmojiPickerBoard.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 11:38:08 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 11:49:25 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from 'react';

export interface EmojiPickerItem {
  id: string;
  label: string;
  value: string;
  keywords?: string[];
  group?: string;
  src?: string;
}

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

export const DEFAULT_EMOJI_PICKER_ITEMS: EmojiPickerItem[] = [
  { id: 'wave', label: 'Wave', value: '👋', keywords: ['hello', 'hand'], group: 'gestures' },
  { id: 'thumbs-up', label: 'Thumbs Up', value: '👍', keywords: ['like', 'approve'], group: 'gestures' },
  { id: 'fire', label: 'Fire', value: '🔥', keywords: ['hot', 'trend'], group: 'status' },
  { id: 'sparkles', label: 'Sparkles', value: '✨', keywords: ['shine', 'magic'], group: 'status' },
  { id: 'rocket', label: 'Rocket', value: '🚀', keywords: ['launch', 'speed'], group: 'status' },
  { id: 'party', label: 'Party', value: '🎉', keywords: ['celebrate', 'confetti'], group: 'status' },
  { id: 'check', label: 'Check', value: '✅', keywords: ['done', 'success'], group: 'symbols' },
  { id: 'warning', label: 'Warning', value: '⚠️', keywords: ['alert', 'risk'], group: 'symbols' },
  { id: 'idea', label: 'Idea', value: '💡', keywords: ['tip', 'brainstorm'], group: 'objects' },
  { id: 'brain', label: 'Brain', value: '🧠', keywords: ['thinking', 'smart'], group: 'objects' },
  { id: 'palette', label: 'Palette', value: '🎨', keywords: ['design', 'art'], group: 'objects' },
  { id: 'package', label: 'Package', value: '📦', keywords: ['box', 'delivery'], group: 'objects' },
  { id: 'pin', label: 'Pin', value: '📌', keywords: ['attach', 'note'], group: 'objects' },
  { id: 'paperclip', label: 'Paperclip', value: '📎', keywords: ['attachment', 'file'], group: 'objects' },
  { id: 'puzzle', label: 'Puzzle', value: '🧩', keywords: ['piece', 'integration'], group: 'objects' },
  { id: 'tools', label: 'Tools', value: '🛠️', keywords: ['build', 'fix'], group: 'objects' },
  { id: 'megaphone', label: 'Megaphone', value: '📣', keywords: ['announce', 'broadcast'], group: 'objects' },
  { id: 'heart', label: 'Heart', value: '❤️', keywords: ['love', 'favorite'], group: 'status' },
  { id: 'star', label: 'Star', value: '⭐', keywords: ['favorite', 'quality'], group: 'status' },
  { id: 'moon', label: 'Moon', value: '🌙', keywords: ['night', 'dark'], group: 'nature' },
  { id: 'sun', label: 'Sun', value: '☀️', keywords: ['day', 'light'], group: 'nature' },
  { id: 'leaf', label: 'Leaf', value: '🌿', keywords: ['green', 'fresh'], group: 'nature' },
  { id: 'robot', label: 'Robot', value: '🤖', keywords: ['bot', 'ai'], group: 'faces' },
  { id: 'cool', label: 'Cool', value: '😎', keywords: ['confidence', 'style'], group: 'faces' },
];

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
}: EmojiPickerBoardProps) {
  const fallbackValue = items[0]?.value ?? '';
  const initialValue = value ?? defaultValue ?? fallbackValue;
  const [internalValue, setInternalValue] = useState(initialValue);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const activeValue = value ?? internalValue;

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const haystack = [
        item.id,
        item.label,
        item.value,
        item.group ?? '',
        ...(item.keywords ?? []),
      ].join(' ').toLowerCase();

      return haystack.includes(normalized);
    });
  }, [items, query]);

  const activeItem =
    items.find((item) => item.value === activeValue) ??
    filteredItems[0] ??
    items[0] ??
    null;

  function selectValue(nextValue: string): void {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
    onChangeComplete?.(nextValue);
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
            {activeItem.src ? (
              <img
                src={activeItem.src}
                alt={activeItem.label}
                style={{ width: 30, height: 30, objectFit: 'contain' }}
              />
            ) : (
              <span style={{ fontSize: 28, lineHeight: 1 }}>{activeItem.value}</span>
            )}
            <span style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.1 }}>{activeItem.label}</span>
          </div>
        ) : null}
      </div>

      {showSearch ? (
        <label style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.78 }}>Search emojis</span>
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
        <span>{filteredItems.length} emojis</span>
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
          const isActive = item.value === activeItem?.value;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                selectValue(item.value);
              }}
              title={item.label}
              style={{
                display: 'grid',
                gap: 8,
                justifyItems: 'center',
                minHeight: 72,
                padding: '10px 8px',
                borderRadius: 16,
                border: isActive
                  ? '1px solid rgba(255, 255, 255, 0.48)'
                  : '1px solid rgba(148, 163, 184, 0.18)',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.28) 0%, rgba(14, 165, 233, 0.16) 100%)'
                  : 'rgba(255, 255, 255, 0.04)',
                color: '#F8FAFC',
                cursor: 'pointer',
              }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.label}
                  style={{ width: 28, height: 28, objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: 24, lineHeight: 1 }}>{item.value}</span>
              )}
              <span style={{ fontSize: 10, lineHeight: 1.15, color: '#CBD5E1' }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
