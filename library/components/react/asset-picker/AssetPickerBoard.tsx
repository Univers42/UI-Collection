import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from 'react';
import {
  DEFAULT_ASSET_PICKER_TABS,
  type DefaultAssetPickerTabsOptions,
} from './defaultTabs.js';
import type {
  AssetPickerBoardItem,
  AssetPickerBoardSelection,
  AssetPickerBoardTab,
  AssetPickerBoardValue,
} from './types.js';

export interface AssetPickerBoardProps {
  tabs?: AssetPickerBoardTab[];
  value?: AssetPickerBoardValue;
  defaultValue?: AssetPickerBoardValue;
  defaultTabId?: string;
  onChange?: (selection: AssetPickerBoardSelection) => void;
  onChangeComplete?: (selection: AssetPickerBoardSelection) => void;
  onTabChange?: (tab: AssetPickerBoardTab) => void;
  label?: string;
  showSearch?: boolean;
  showTabs?: boolean;
  columns?: number;
  width?: number | string;
  className?: string;
}

export type { DefaultAssetPickerTabsOptions };

function getSearchText(item: AssetPickerBoardItem): string {
  return [
    item.id,
    item.label,
    item.group ?? '',
    ...(item.keywords ?? []),
  ].join(' ').toLowerCase();
}

function renderItemPreview(item: AssetPickerBoardItem, size: number) {
  const { preview } = item;

  if (preview.kind === 'emoji') {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{preview.value}</span>;
  }

  if (preview.kind === 'image') {
    return (
      <img
        src={preview.src}
        alt={preview.alt ?? item.label}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  if (preview.kind === 'text') {
    return (
      <span style={{ fontSize: Math.max(12, size * 0.45), lineHeight: 1.15 }}>
        {preview.value}
      </span>
    );
  }

  return preview.render(size);
}

function createSelection(
  tab: AssetPickerBoardTab,
  item: AssetPickerBoardItem,
): AssetPickerBoardSelection {
  return {
    tab,
    item,
    value: {
      tabId: tab.id,
      itemId: item.id,
    },
  };
}

function getInitialSelectedByTab(
  value?: AssetPickerBoardValue,
  defaultValue?: AssetPickerBoardValue,
): Record<string, string> {
  const selectedByTab: Record<string, string> = {};

  if (defaultValue) {
    selectedByTab[defaultValue.tabId] = defaultValue.itemId;
  }

  if (value) {
    selectedByTab[value.tabId] = value.itemId;
  }

  return selectedByTab;
}

export function AssetPickerBoard({
  tabs = DEFAULT_ASSET_PICKER_TABS,
  value,
  defaultValue,
  defaultTabId,
  onChange,
  onChangeComplete,
  onTabChange,
  label = 'Asset picker',
  showSearch = true,
  showTabs,
  columns,
  width = 352,
  className,
}: Readonly<AssetPickerBoardProps>) {
  const availableTabs = tabs.length > 0 ? tabs : DEFAULT_ASSET_PICKER_TABS;
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId ?? defaultValue?.tabId ?? availableTabs[0]?.id ?? '',
  );
  const [selectedByTab, setSelectedByTab] = useState<Record<string, string>>(
    () => getInitialSelectedByTab(value, defaultValue),
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!value) {
      return;
    }

    setSelectedByTab((current) => {
      if (current[value.tabId] === value.itemId) {
        return current;
      }

      return {
        ...current,
        [value.tabId]: value.itemId,
      };
    });
  }, [value]);

  useEffect(() => {
    if (availableTabs.some((tab) => tab.id === activeTabId)) {
      return;
    }

    setActiveTabId(defaultTabId ?? availableTabs[0]?.id ?? '');
  }, [activeTabId, availableTabs, defaultTabId]);

  const activeTab =
    availableTabs.find((tab) => tab.id === activeTabId) ??
    availableTabs[0] ??
    null;

  useEffect(() => {
    if (!activeTab || activeTab.items.length === 0) {
      return;
    }

    setSelectedByTab((current) => {
      if (current[activeTab.id]) {
        return current;
      }

      return {
        ...current,
        [activeTab.id]: activeTab.items[0].id,
      };
    });
  }, [activeTab]);

  const filteredItems = useMemo(() => {
    if (!activeTab) {
      return [];
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return activeTab.items;
    }

    return activeTab.items.filter((item) => getSearchText(item).includes(normalizedQuery));
  }, [activeTab, query]);

  const activeSelectedId = activeTab
    ? (value?.tabId === activeTab.id ? value.itemId : selectedByTab[activeTab.id])
    : undefined;
  const activeItem =
    filteredItems.find((item) => item.id === activeSelectedId) ??
    filteredItems[0] ??
    activeTab?.items[0] ??
    null;
  const gridColumns = activeTab?.columns ?? columns ?? 5;
  const shouldShowTabs = showTabs ?? availableTabs.length > 1;

  function handleTabChange(nextTab: AssetPickerBoardTab): void {
    setActiveTabId(nextTab.id);
    setQuery('');
    onTabChange?.(nextTab);
  }

  function handleItemSelect(item: AssetPickerBoardItem): void {
    if (!activeTab) {
      return;
    }

    setSelectedByTab((current) => ({
      ...current,
      [activeTab.id]: item.id,
    }));

    const selection = createSelection(activeTab, item);
    onChange?.(selection);
    onChangeComplete?.(selection);
  }

  const rootStyle: CSSProperties = {
    width,
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

  if (!activeTab) {
    return null;
  }

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
            Unified Picker Board
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
            <span style={{ display: 'grid', placeItems: 'center', minHeight: 30, color: '#F8FAFC' }}>
              {renderItemPreview(activeItem, 28)}
            </span>
            <span style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.1, textAlign: 'center' }}>
              {activeItem.label}
            </span>
          </div>
        ) : null}
      </div>

      {shouldShowTabs ? (
        <div
          role="tablist"
          aria-label={`${label} tabs`}
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 14,
            overflowX: 'auto',
            paddingBottom: 2,
          }}
        >
          {availableTabs.map((tab) => {
            const isActiveTab = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActiveTab}
                onClick={() => {
                  handleTabChange(tab);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: isActiveTab
                    ? '1px solid rgba(255, 255, 255, 0.4)'
                    : '1px solid rgba(148, 163, 184, 0.18)',
                  background: isActiveTab ? tab.activeBackground ?? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>{tab.label}</span>
                <span style={{ fontSize: 11, color: '#CBD5E1' }}>{tab.items.length}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {showSearch ? (
        <label style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.78 }}>
            {activeTab.searchLabel ?? `Search ${activeTab.label.toLowerCase()}`}
          </span>
          <input
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
            }}
            placeholder={activeTab.searchPlaceholder ?? 'Search by name, group or keyword'}
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
        <span>
          {filteredItems.length} {activeTab.countLabel ?? activeTab.label.toLowerCase()}
        </span>
        <span>{activeItem?.group ?? activeTab.label}</span>
      </div>

      {filteredItems.length === 0 ? (
        <div
          style={{
            minHeight: 120,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 16,
            border: '1px solid rgba(148, 163, 184, 0.18)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#CBD5E1',
            textAlign: 'center',
            padding: 16,
          }}
        >
          {activeTab.emptyStateLabel ?? 'No items match the current search.'}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
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
                  handleItemSelect(item);
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
                    ? activeTab.activeBackground ?? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'grid', placeItems: 'center', minHeight: 28 }}>
                  {renderItemPreview(item, 24)}
                </span>
                <span style={{ fontSize: 10, lineHeight: 1.15, color: '#CBD5E1', textAlign: 'center' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
