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
import { assetValueToBoardValue } from './assetValues.js';
import type {
  AssetPickerBoardAppearance,
  AssetPickerBoardItem,
  AssetPickerBoardMessages,
  AssetPickerBoardSelection,
  AssetPickerBoardSlot,
  AssetPickerBoardSlotClassNames,
  AssetPickerBoardSlotProps,
  AssetPickerBoardSlotStyles,
  AssetPickerBoardTab,
  AssetPickerBoardValue,
  AssetPickerItemLabelVisibility,
  AssetPickerLayoutOptions,
  AssetPickerLayoutPreset,
  AssetPickerTabLayout,
} from './types.js';

export interface AssetPickerBoardProps {
  tabs?: AssetPickerBoardTab[];
  value?: AssetPickerBoardValue | string;
  defaultValue?: AssetPickerBoardValue | string;
  defaultTabId?: string;
  onChange?: (selection: AssetPickerBoardSelection) => void;
  onChangeComplete?: (selection: AssetPickerBoardSelection) => void;
  onSerializedValueChange?: (value: string) => void;
  onTabChange?: (tab: AssetPickerBoardTab) => void;
  label?: string;
  showSearch?: boolean;
  showTabs?: boolean;
  showHeader?: boolean;
  showSelectionPreview?: boolean;
  showStatusBar?: boolean;
  columns?: number;
  width?: number | string;
  className?: string;
  appearance?: AssetPickerBoardAppearance;
  classNames?: AssetPickerBoardSlotClassNames;
  styles?: AssetPickerBoardSlotStyles;
  slotProps?: AssetPickerBoardSlotProps;
  messages?: AssetPickerBoardMessages;
  locale?: string;
  layout?: AssetPickerTabLayout;
  itemLabelVisibility?: AssetPickerItemLabelVisibility;
}

export type { DefaultAssetPickerTabsOptions };

interface ResolvedLayout {
  type: AssetPickerLayoutPreset;
  columns: number;
  previewSize: number;
  cellSize: number;
  aspectRatio: number;
  objectFit: CSSProperties['objectFit'];
  gap: number;
}

const srOnlyStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function normalizeBoardValueInput(
  input: AssetPickerBoardProps['value'] | AssetPickerBoardProps['defaultValue'],
  tabs: AssetPickerBoardTab[],
): AssetPickerBoardValue | undefined {
  if (!input) {
    return undefined;
  }

  if (typeof input === 'string') {
    return assetValueToBoardValue(input, tabs);
  }

  return input;
}

function getSearchText(
  item: AssetPickerBoardItem,
  locale?: string,
): string {
  const localizedValues = locale
    ? [item.localizedLabels?.[locale] ?? '']
    : Object.values(item.localizedLabels ?? {});

  return [
    item.id,
    item.value,
    item.label,
    item.group ?? '',
    ...(item.aliases ?? []),
    ...(item.keywords ?? []),
    ...localizedValues,
  ].join(' ').toLowerCase();
}

function renderItemPreview(
  item: AssetPickerBoardItem,
  size: number,
  objectFit: CSSProperties['objectFit'],
) {
  const { preview } = item;

  if (preview.kind === 'emoji') {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{preview.value}</span>;
  }

  if (preview.kind === 'image') {
    return (
      <img
        src={preview.src}
        alt={preview.alt ?? item.label}
        style={{ width: size, height: size, objectFit }}
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
    serializedValue: item.value,
  };
}

function getInitialSelectedByTab(
  value: AssetPickerBoardValue | undefined,
  defaultValue: AssetPickerBoardValue | undefined,
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

function getLayoutDefaults(layout: AssetPickerLayoutPreset): ResolvedLayout {
  switch (layout) {
    case 'emoji':
      return {
        type: 'emoji',
        columns: 8,
        previewSize: 24,
        cellSize: 56,
        aspectRatio: 1,
        objectFit: 'contain',
        gap: 8,
      };
    case 'icon':
      return {
        type: 'icon',
        columns: 6,
        previewSize: 22,
        cellSize: 64,
        aspectRatio: 1,
        objectFit: 'contain',
        gap: 10,
      };
    case 'media':
      return {
        type: 'media',
        columns: 4,
        previewSize: 60,
        cellSize: 112,
        aspectRatio: 4 / 3,
        objectFit: 'contain',
        gap: 12,
      };
    case 'cover':
      return {
        type: 'cover',
        columns: 3,
        previewSize: 72,
        cellSize: 136,
        aspectRatio: 3 / 4,
        objectFit: 'cover',
        gap: 12,
      };
    case 'grid':
    default:
      return {
        type: 'grid',
        columns: 5,
        previewSize: 24,
        cellSize: 76,
        aspectRatio: 1,
        objectFit: 'contain',
        gap: 10,
      };
  }
}

function resolveLayout(
  tab: AssetPickerBoardTab,
  globalLayout: AssetPickerTabLayout | undefined,
  columns: number | undefined,
): ResolvedLayout {
  const requestedLayout = tab.layout ?? globalLayout ?? 'grid';
  const layoutObject =
    typeof requestedLayout === 'string'
      ? { type: requestedLayout }
      : requestedLayout;
  const defaults = getLayoutDefaults(layoutObject.type ?? 'grid');

  return {
    ...defaults,
    ...layoutObject,
    columns:
      layoutObject.columns ??
      tab.columns ??
      columns ??
      defaults.columns,
    previewSize:
      layoutObject.previewSize ??
      defaults.previewSize,
    cellSize:
      layoutObject.cellSize ??
      defaults.cellSize,
    aspectRatio:
      layoutObject.aspectRatio ??
      defaults.aspectRatio,
    objectFit:
      layoutObject.objectFit ??
      defaults.objectFit,
    gap:
      layoutObject.gap ??
      defaults.gap,
  };
}

function joinClassNames(...values: Array<string | undefined>): string | undefined {
  const className = values.filter(Boolean).join(' ').trim();
  return className || undefined;
}

export function AssetPickerBoard({
  tabs = DEFAULT_ASSET_PICKER_TABS,
  value,
  defaultValue,
  defaultTabId,
  onChange,
  onChangeComplete,
  onSerializedValueChange,
  onTabChange,
  label = 'Asset picker',
  showSearch = true,
  showTabs,
  showHeader = true,
  showSelectionPreview = true,
  showStatusBar = true,
  columns,
  width = 352,
  className,
  appearance = 'default',
  classNames,
  styles,
  slotProps,
  messages,
  locale,
  layout,
  itemLabelVisibility = 'visible',
}: Readonly<AssetPickerBoardProps>) {
  const availableTabs = tabs.length > 0 ? tabs : DEFAULT_ASSET_PICKER_TABS;
  const normalizedValue = normalizeBoardValueInput(value, availableTabs);
  const normalizedDefaultValue = normalizeBoardValueInput(defaultValue, availableTabs);
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId ?? normalizedValue?.tabId ?? normalizedDefaultValue?.tabId ?? availableTabs[0]?.id ?? '',
  );
  const [selectedByTab, setSelectedByTab] = useState<Record<string, string>>(
    () => getInitialSelectedByTab(normalizedValue, normalizedDefaultValue),
  );
  const [query, setQuery] = useState('');

  function getSlotStyle(
    slot: AssetPickerBoardSlot,
    structuralStyle: CSSProperties = {},
    decorativeStyle: CSSProperties = {},
  ): CSSProperties {
    return {
      ...structuralStyle,
      ...(appearance === 'default' ? decorativeStyle : {}),
      ...(styles?.[slot] ?? {}),
      ...((slotProps?.[slot]?.style as CSSProperties | undefined) ?? {}),
    };
  }

  function getSlotProps(slot: AssetPickerBoardSlot): Record<string, unknown> {
    const props = slotProps?.[slot] ?? {};

    return {
      ...props,
      className: joinClassNames(
        classNames?.[slot],
        props.className as string | undefined,
      ),
    };
  }

  useEffect(() => {
    if (!normalizedValue) {
      return;
    }

    setSelectedByTab((current) => {
      if (current[normalizedValue.tabId] === normalizedValue.itemId) {
        return current;
      }

      return {
        ...current,
        [normalizedValue.tabId]: normalizedValue.itemId,
      };
    });
  }, [normalizedValue]);

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

    return activeTab.items.filter((item) => getSearchText(item, locale).includes(normalizedQuery));
  }, [activeTab, locale, query]);

  const activeSelectedId = activeTab
    ? (normalizedValue?.tabId === activeTab.id ? normalizedValue.itemId : selectedByTab[activeTab.id])
    : undefined;
  const activeItem =
    filteredItems.find((item) => item.id === activeSelectedId) ??
    filteredItems[0] ??
    activeTab?.items[0] ??
    null;
  const shouldShowTabs = showTabs ?? availableTabs.length > 1;
  const resolvedLayout = activeTab
    ? resolveLayout(activeTab, layout, columns)
    : getLayoutDefaults('grid');
  const resolvedLabelVisibility =
    activeTab?.itemLabelVisibility ?? itemLabelVisibility;

  const groupedItems = useMemo(() => {
    if (!activeTab) {
      return [];
    }

    if (!activeTab.showGroups) {
      return [{ key: activeTab.label, label: activeTab.label, items: filteredItems }];
    }

    const groups = new Map<string, AssetPickerBoardItem[]>();

    for (const item of filteredItems) {
      const groupKey = item.group ?? 'Other';
      const groupItems = groups.get(groupKey) ?? [];
      groupItems.push(item);
      groups.set(groupKey, groupItems);
    }

    const orderedGroupKeys = [
      ...(activeTab.groupOrder ?? []),
      ...Array.from(groups.keys()).filter((key) => !(activeTab.groupOrder ?? []).includes(key)),
    ].filter((key, index, array) => array.indexOf(key) === index && groups.has(key));

    return orderedGroupKeys.map((groupKey) => ({
      key: groupKey,
      label: activeTab.groupLabels?.[groupKey] ?? groupKey,
      items: groups.get(groupKey) ?? [],
    }));
  }, [activeTab, filteredItems]);

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
    onSerializedValueChange?.(selection.serializedValue);
  }

  if (!activeTab) {
    return null;
  }

  return (
    <section
      {...getSlotProps('root')}
      className={joinClassNames(className, getSlotProps('root').className as string | undefined)}
      style={getSlotStyle(
        'root',
        {
          width,
          position: 'relative',
        },
        {
          padding: 16,
          borderRadius: 24,
          border: '1px solid rgba(148, 163, 184, 0.22)',
          background:
            'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28)',
          color: '#E2E8F0',
          fontFamily:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      )}
      aria-label={label}
    >
      {showHeader ? (
        <div
          {...getSlotProps('header')}
          style={getSlotStyle(
            'header',
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
            },
          )}
        >
          <div
            {...getSlotProps('headerText')}
            style={getSlotStyle('headerText')}
          >
            <div
              {...getSlotProps('eyebrow')}
              style={getSlotStyle(
                'eyebrow',
                {},
                {
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                },
              )}
            >
              {messages?.boardEyebrow ?? 'Unified Picker Board'}
            </div>
            <h3
              {...getSlotProps('title')}
              style={getSlotStyle(
                'title',
                {
                  margin: '6px 0 0',
                },
                {
                  fontSize: 20,
                  lineHeight: 1.1,
                },
              )}
            >
              {label}
            </h3>
          </div>
          {showSelectionPreview && activeItem ? (
            <div
              {...getSlotProps('selectionPreview')}
              style={getSlotStyle(
                'selectionPreview',
                {
                  minWidth: 96,
                  display: 'grid',
                  justifyItems: 'center',
                  gap: 6,
                },
                {
                  padding: '10px 12px',
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                },
              )}
            >
              <span style={{ display: 'grid', placeItems: 'center', minHeight: 30, color: '#F8FAFC' }}>
                {renderItemPreview(activeItem, 28, resolvedLayout.objectFit)}
              </span>
              <span style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.1, textAlign: 'center' }}>
                {activeItem.label}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      {shouldShowTabs ? (
        <div
          {...getSlotProps('tabList')}
          role="tablist"
          aria-label={`${label} tabs`}
          style={getSlotStyle(
            'tabList',
            {
              display: 'flex',
              gap: 8,
              marginBottom: 14,
              overflowX: 'auto',
              paddingBottom: 2,
            },
          )}
        >
          {availableTabs.map((tab) => {
            const isActiveTab = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                {...getSlotProps('tabButton')}
                type="button"
                role="tab"
                aria-selected={isActiveTab}
                onClick={() => {
                  handleTabChange(tab);
                }}
                style={getSlotStyle(
                  'tabButton',
                  {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  },
                  {
                    border: isActiveTab
                      ? '1px solid rgba(255, 255, 255, 0.4)'
                      : '1px solid rgba(148, 163, 184, 0.18)',
                    background: isActiveTab
                      ? tab.activeBackground ?? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.04)',
                    color: '#F8FAFC',
                  },
                )}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>{tab.label}</span>
                <span style={{ fontSize: 11, color: '#CBD5E1' }}>{tab.items.length}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {showSearch ? (
        <label
          {...getSlotProps('searchField')}
          style={getSlotStyle(
            'searchField',
            {
              display: 'grid',
              gap: 8,
              marginBottom: 14,
            },
          )}
        >
          <span
            {...getSlotProps('searchLabel')}
            style={getSlotStyle(
              'searchLabel',
              {},
              {
                fontSize: 12,
                fontWeight: 600,
                opacity: 0.78,
              },
            )}
          >
            {activeTab.searchLabel ?? messages?.searchLabel ?? `Search ${activeTab.label.toLowerCase()}`}
          </span>
          <input
            {...getSlotProps('searchInput')}
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
            }}
            placeholder={
              activeTab.searchPlaceholder ??
              messages?.searchPlaceholder ??
              'Search by name, group or keyword'
            }
            style={getSlotStyle(
              'searchInput',
              {
                height: 42,
                borderRadius: 14,
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
              },
              {
                border: '1px solid rgba(148, 163, 184, 0.22)',
                background: 'rgba(15, 23, 42, 0.45)',
                color: '#F8FAFC',
              },
            )}
          />
        </label>
      ) : null}

      {showStatusBar ? (
        <div
          {...getSlotProps('statusBar')}
          style={getSlotStyle(
            'statusBar',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            },
            {
              fontSize: 12,
              color: '#94A3B8',
            },
          )}
        >
          <span>
            {filteredItems.length} {activeTab.countLabel ?? activeTab.label.toLowerCase()}
          </span>
          <span>{activeItem?.group ?? activeTab.label}</span>
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <div
          {...getSlotProps('emptyState')}
          style={getSlotStyle(
            'emptyState',
            {
              minHeight: 120,
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              padding: 16,
            },
            {
              borderRadius: 16,
              border: '1px solid rgba(148, 163, 184, 0.18)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#CBD5E1',
            },
          )}
        >
          {activeTab.emptyStateLabel ?? messages?.emptyStateLabel ?? 'No items match the current search.'}
        </div>
      ) : (
        groupedItems.map((group) => (
          <div
            key={group.key}
            {...getSlotProps('groupSection')}
            style={getSlotStyle(
              'groupSection',
              {
                display: 'grid',
                gap: 10,
                marginBottom: activeTab.showGroups ? 18 : 0,
              },
            )}
          >
            {activeTab.showGroups ? (
              <div
                {...getSlotProps('groupLabel')}
                style={getSlotStyle(
                  'groupLabel',
                  {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  {
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#CBD5E1',
                    letterSpacing: '0.02em',
                  },
                )}
              >
                <span>{group.label}</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>{group.items.length}</span>
              </div>
            ) : null}
            <div
              {...getSlotProps('grid')}
              style={getSlotStyle(
                'grid',
                {
                  display: 'grid',
                  gridTemplateColumns: `repeat(${resolvedLayout.columns}, minmax(0, 1fr))`,
                  gap: resolvedLayout.gap,
                },
              )}
            >
              {group.items.map((item) => {
                const isActive = item.id === activeItem?.id;
                const previewAspectRatio =
                  item.previewAspectRatio ?? resolvedLayout.aspectRatio;
                const previewSize = Math.min(
                  resolvedLayout.previewSize,
                  resolvedLayout.cellSize - 16,
                );

                return (
                  <button
                    key={item.id}
                    {...getSlotProps('itemButton')}
                    type="button"
                    onClick={() => {
                      handleItemSelect(item);
                    }}
                    title={item.label}
                    style={getSlotStyle(
                      'itemButton',
                      {
                        display: 'grid',
                        gap: resolvedLabelVisibility === 'visible' ? 8 : 0,
                        justifyItems: 'center',
                        alignContent: 'start',
                        minHeight: resolvedLayout.cellSize,
                        padding: '12px 8px',
                        position: 'relative',
                      },
                      {
                        borderRadius: 16,
                        border: isActive
                          ? '1px solid rgba(255, 255, 255, 0.48)'
                          : '1px solid rgba(148, 163, 184, 0.18)',
                        background: isActive
                          ? activeTab.activeBackground ?? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(255, 255, 255, 0.04)',
                        color: '#F8FAFC',
                        cursor: 'pointer',
                      },
                    )}
                  >
                    <span
                      {...getSlotProps('itemPreview')}
                      style={getSlotStyle(
                        'itemPreview',
                        {
                          display: 'grid',
                          placeItems: 'center',
                          width: '100%',
                          minHeight: previewSize,
                          aspectRatio: `${previewAspectRatio}`,
                        },
                      )}
                    >
                      {renderItemPreview(
                        item,
                        previewSize,
                        resolvedLayout.objectFit,
                      )}
                    </span>
                    {resolvedLabelVisibility === 'hidden' ? null : (
                      <span
                        {...getSlotProps('itemLabel')}
                        style={getSlotStyle(
                          'itemLabel',
                          resolvedLabelVisibility === 'sr-only'
                            ? srOnlyStyle
                            : {
                                fontSize: 10,
                                lineHeight: 1.15,
                                textAlign: 'center',
                              },
                          {
                            color: '#CBD5E1',
                          },
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
