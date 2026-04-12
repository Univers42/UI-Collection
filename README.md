# @univers42/ui-collection

Reusable UI library for:

- media registries and curated assets
- React slash-menu icons
- slash-menu block catalogs
- color picker boards
- a unified tabbed asset picker for emojis, SVGs, icons, and future asset families

## Installation

```bash
npm install @univers42/ui-collection react
```

## Local Build

```bash
npm install
npm run build
npm run release:check
```

## Releases and Upgrades

This package is set up to be consumed as a normal npm package, so downstream repositories can upgrade with:

```bash
npm update @univers42/ui-collection
```

For that to work:

- this repository must publish new semver versions to an npm-compatible registry
- downstream repositories must depend on a semver range such as `^0.1.0`, not an exact pinned version

The repository now includes:

- `prepack` packaging hooks in [package.json](/home/settes/cursus/trascendence/UI-Collection/package.json)
- a publish workflow in [.github/workflows/publish-package.yml](/home/settes/cursus/trascendence/UI-Collection/.github/workflows/publish-package.yml)
- a tarball smoke test in [scripts/smoke-package.mjs](/home/settes/cursus/trascendence/UI-Collection/scripts/smoke-package.mjs)
- a release guide in [RELEASING.md](/home/settes/cursus/trascendence/UI-Collection/RELEASING.md)

### Using This Package in Another Repository

#### 1. Install it

Use a semver range so the dependency can receive future compatible updates:

```bash
npm install @univers42/ui-collection@^1.0.0 react
```

If the current published series is still `0.x`, install the matching range instead:

```bash
npm install @univers42/ui-collection@^0.1.0 react
```

#### 2. Check how it is saved in `package.json`

Recommended:

```json
{
  "dependencies": {
    "@univers42/ui-collection": "^1.0.0"
  }
}
```

Avoid exact pinned versions such as `"1.0.0"` if you want `npm update` to move forward automatically within the allowed semver range.

#### 3. Update it later

When a newer compatible version is published, update it with:

```bash
npm update @univers42/ui-collection
```

Then review the lockfile diff and run the consumer repository checks as usual.

#### 4. If `npm update` does not upgrade anything

Check these points:

- the new version has actually been published to the registry
- the consumer repository depends on a range such as `^1.0.0`
- the new version is still compatible with that range
- the consumer project is using the same registry where this package is published

Example:

- if the consumer has `^1.0.0`, `npm update` can move to `1.1.0` or `1.2.3`
- it will not move to `2.0.0`
- if the consumer has `1.0.0` exactly, it will stay pinned

## Entry Points

The library exposes these entry points:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library`
- `@univers42/ui-collection/library/media`
- `@univers42/ui-collection/library/catalogs`
- `@univers42/ui-collection/library/icons/react`
- `@univers42/ui-collection/library/icons/react/slash-menu`
- `@univers42/ui-collection/library/components/react`
- `@univers42/ui-collection/library/components/react/asset-picker`
- `@univers42/ui-collection/library/components/react/color-picker`
- `@univers42/ui-collection/library/components/react/icon-picker`
- `@univers42/ui-collection/library/components/react/emoji-picker`
- `@univers42/ui-collection/library/components/react/charts`
- `@univers42/ui-collection/library/components/react/analytics`
- `@univers42/ui-collection/library/components/react/analytics/formula`
- `@univers42/ui-collection/library/components/react/analytics/relation-rollup`
- `@univers42/ui-collection/library/components/react/formula`
- `@univers42/ui-collection/library/components/react/primitives`
- `@univers42/ui-collection/library/components/react/theme`

Legacy re-exports are still available:

- `@univers42/ui-collection/components/blocks/ColorPickerBoard`
- `@univers42/ui-collection/components/blocks/IconPickerBoard`
- `@univers42/ui-collection/components/blocks/EmojiPickerBoard`
- `@univers42/ui-collection/components/blocks/SlashMenuIcons`
- `@univers42/ui-collection/components/blocks/SlashMenuIconsBasic`
- `@univers42/ui-collection/components/blocks/SlashMenuIconsExtended`
- `@univers42/ui-collection/components/blocks/slashMenuCatalog`

## Import Patterns

### Import from the root

```tsx
import {
  AssetPickerBoard,
  AssetRenderer,
  ColorPickerBoard,
  IconPickerBoard,
  EmojiPickerBoard,
  assetValueToBoardValue,
  createDefaultAssetPickerTabs,
  createEmojiPickerTab,
  createIconPickerTab,
  createMediaCollectionPickerTab,
  parseAssetValue,
  resolveAssetValue,
  serializeAssetSelection,
  SLASH_ITEMS,
  SECTION_LABELS,
  getMediaItem,
  getMediaCollection,
  getMediaByKind,
  getMediaByProvider,
  searchMedia,
  resolveMediaUrl,
  DEFAULT_ASSET_PICKER_TABS,
  DEFAULT_COLOR_PRESETS,
  DEFAULT_ICON_PICKER_ITEMS,
  EMOJI_PICKER_GROUPS,
  DEFAULT_EMOJI_PICKER_ITEMS,
} from '@univers42/ui-collection';
```

### Import a specific module

```tsx
import { getMediaItem, searchMedia } from '@univers42/ui-collection/library/media';
import { SLASH_ITEMS } from '@univers42/ui-collection/library/catalogs';
import { IconText, IconBoard } from '@univers42/ui-collection/library/icons/react/slash-menu';
import {
  AssetPickerBoard,
  AssetRenderer,
  assetValueToBoardValue,
  createMediaCollectionPickerTab,
  parseAssetValue,
  resolveAssetValue,
  serializeAssetSelection,
} from '@univers42/ui-collection/library/components/react/asset-picker';
import { ColorPickerBoard } from '@univers42/ui-collection/library/components/react/color-picker';
import { IconPickerBoard } from '@univers42/ui-collection/library/components/react/icon-picker';
import { EmojiPickerBoard } from '@univers42/ui-collection/library/components/react/emoji-picker';
import { LineChart } from '@univers42/ui-collection/library/components/react/charts';
import { FormulaTypePie } from '@univers42/ui-collection/library/components/react/analytics/formula';
import { ThemeToggle } from '@univers42/ui-collection/library/components/react/theme';
```

### Import legacy paths

```tsx
import { ColorPickerBoard } from '@univers42/ui-collection/components/blocks/ColorPickerBoard';
import { IconText } from '@univers42/ui-collection/components/blocks/SlashMenuIcons';
import { SLASH_ITEMS } from '@univers42/ui-collection/components/blocks/slashMenuCatalog';
```

## Library Contents

### 1. React Components

Available from:

- `@univers42/ui-collection`: curated root surface
- `@univers42/ui-collection/library/components/react`: full React component catalog

The root API is intentionally small and stable. More specialized modules live under dedicated `library/components/react/*` entry points.

Root exports include:

- `AssetPickerBoard`
- `AssetRenderer`
- `ColorPickerBoard`
- `IconPickerBoard`
- `EmojiPickerBoard`
- `DEFAULT_ASSET_PICKER_TABS`
- `createDefaultAssetPickerTabs`
- `createEmojiPickerTab`
- `createIconPickerTab`
- `createMediaCollectionPickerTab`
- `parseAssetValue`
- `resolveAssetValue`
- `assetValueToBoardValue`
- `serializeAssetSelection`
- `DEFAULT_COLOR_PRESETS`
- `DEFAULT_ICON_PICKER_ITEMS`
- `EMOJI_PICKER_GROUPS`
- `DEFAULT_EMOJI_PICKER_ITEMS`
- `AssetPickerBoardProps`
- `AssetPickerBoardAppearance`
- `AssetPickerBoardTab`
- `AssetPickerBoardItem`
- `AssetPickerBoardValue`
- `AssetPickerBoardSelection`
- `ColorPickerBoardProps`
- `ColorPickerPreset`
- `IconPickerBoardProps`
- `IconPickerItem`
- `EmojiPickerGroup`
- `EmojiPickerBoardProps`
- `EmojiPickerItem`

Full React component exports include:

- `AssetPickerBoard`
- `ColorPickerBoard`
- `IconPickerBoard`
- `EmojiPickerBoard`
- `VerticalBarChart`
- `HorizontalBarChart`
- `LineChart`
- `DonutPieChart`
- `MultiLineChart`
- `DonutChart`
- `AreaChartSVG`
- `ProgressRing`
- `FormulaTypePie`
- `ErrorBarChart`
- `ComplexityChart`
- `TextDistributionCard`
- `KpiCard`
- `DisplayBadge`
- `RollupCellValue`
- `RelationMapSection`
- `FunctionDistSection`
- `DisplayFormatSection`
- `CompletionRingsSection`
- `DataFlowSection`
- `ExampleBlock`
- `SettingsHeader`
- `SettingsSectionLabel`
- `MenuDivider`
- `ViewTypeCard`
- `PanelSectionLabel`
- `ThemeToggle`

Default datasets available from the root:

- `DEFAULT_ASSET_PICKER_TABS`: default tabs for emojis, SVGs, and icons
- `DEFAULT_COLOR_PRESETS`: 8 presets
- `DEFAULT_ICON_PICKER_ITEMS`: 96 icons
- `EMOJI_PICKER_GROUPS`: 9 standard-style emoji categories
- `DEFAULT_EMOJI_PICKER_ITEMS`: 1,981 emojis across smileys, people, animals, food, travel, activities, objects, symbols, and flags

#### Unified Asset Picker

`AssetPickerBoard` is the shared board used for asset selection. The default configuration groups emojis, SVGs, and icons into one tabbed picker, and the `asset-picker` subpath exposes factory helpers so new asset families can be added without duplicating UI.

```tsx
import {
  AssetPickerBoard,
  assetValueToBoardValue,
  createDefaultAssetPickerTabs,
  serializeAssetSelection,
} from '@univers42/ui-collection';

export function Demo() {
  const tabs = createDefaultAssetPickerTabs();

  return (
    <AssetPickerBoard
      label="Block asset picker"
      tabs={tabs}
      value={assetValueToBoardValue('icon:text', tabs)}
      onChange={(selection) => {
        console.log(selection.tab.id);
        console.log(selection.item.value);
        console.log(serializeAssetSelection(selection));
      }}
    />
  );
}
```

#### Canonical Asset Values

The package now emits stable values directly from the library so the consumer does not need local prefixes or wrappers:

- icons serialize as `icon:<id>`, for example `icon:text`
- emojis serialize as the raw glyph, for example `😀`
- media keeps the existing media ref contract, for example `local:/media/svg/icons/arrow-left.svg`

```tsx
import {
  parseAssetValue,
  resolveAssetValue,
} from '@univers42/ui-collection';

const parsed = parseAssetValue('icon:text');
const resolved = resolveAssetValue('icon:text');

console.log(parsed.kind);      // icon
console.log(resolved?.label);  // Text
```

#### Which Picker Should You Import?

Use `AssetPickerBoard` when you want the general-purpose board with all default asset families in one place. You do not need to import `IconPickerBoard` or `EmojiPickerBoard` to use the unified board.

```tsx
import { AssetPickerBoard } from '@univers42/ui-collection';

export function Demo() {
  return (
    <AssetPickerBoard
      label="Block asset picker"
      showSelectionPreview={false}
      showStatusBar={false}
      itemLabelVisibility="hidden"
      appearance="unstyled"
      onChange={({ tab, item }) => {
        console.log(tab.id);     // emojis | svg | icons
        console.log(item.value); // selected value
      }}
    />
  );
}
```

Use `IconPickerBoard` or `EmojiPickerBoard` only when you want a single-family picker with the legacy API shape.

Use the `asset-picker` subpath when you want to customize the tabs or add new asset families while keeping the same shared board UI.

```tsx
import {
  AssetPickerBoard,
  createEmojiPickerTab,
  createIconPickerTab,
  createMediaCollectionPickerTab,
} from '@univers42/ui-collection/library/components/react/asset-picker';

const tabs = [
  createEmojiPickerTab(),
  createMediaCollectionPickerTab('svg'),
  createIconPickerTab(),
];

export function Demo() {
  return <AssetPickerBoard label="Custom asset picker" tabs={tabs} />;
}
```

#### Compatibility Wrappers

`IconPickerBoard` and `EmojiPickerBoard` are still available, but they now wrap the shared unified picker internally. This keeps compatibility while the implementation stays modular and scalable.

```tsx
import {
  ColorPickerBoard,
  IconPickerBoard,
  EmojiPickerBoard,
} from '@univers42/ui-collection';

export function Demo() {
  return (
    <>
      <ColorPickerBoard label="Brand palette" onChange={(hex) => console.log(hex)} />
      <IconPickerBoard label="Slash icons" onChange={(iconValue) => console.log(iconValue)} />
      <EmojiPickerBoard label="Reaction picker" onChange={(emoji) => console.log(emoji)} />
    </>
  );
}
```

`ColorPickerBoard` now defaults to a circular chromatic wheel built from octagonal swatches. Use `variant="classic"` if you want the legacy square HSV board.

`IconPickerBoard` emits canonical icon values by default, for example `icon:text`. `EmojiPickerBoard` emits the raw emoji glyph, and supports grouped sections plus persistent recents through `recentStorageKey`.

#### Host-Themed Asset Picker

This is the recommended integration when the host application owns the visual theme and wants emoji, icon and cover-heavy tabs without visible labels.

```tsx
import {
  AssetPickerBoard,
  AssetRenderer,
  createDefaultAssetPickerTabs,
} from '@univers42/ui-collection';

const tabs = createDefaultAssetPickerTabs({
  emojiTabOptions: {
    itemLabelVisibility: 'hidden',
    layout: 'emoji',
  },
  iconTabOptions: {
    itemLabelVisibility: 'hidden',
    layout: 'icon',
  },
  svgTabOptions: {
    itemLabelVisibility: 'hidden',
    layout: 'cover',
  },
});

export function Demo() {
  return (
    <AssetPickerBoard
      tabs={tabs}
      appearance="unstyled"
      showSelectionPreview={false}
      showStatusBar={false}
      classNames={{
        root: 'asset-picker-root',
        tabButton: 'asset-picker-tab',
        itemButton: 'asset-picker-cell',
      }}
    />
  );
}

export function StoredAssetPreview({ value }: { value: string }) {
  return <AssetRenderer value={value} size={28} />;
}
```

### 2. React Slash-Menu Icons

Available from:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/icons/react`
- `@univers42/ui-collection/library/icons/react/slash-menu`
- `@univers42/ui-collection/components/blocks/SlashMenuIcons`

Exported icons:

- `IconText`
- `IconH1`
- `IconH2`
- `IconH3`
- `IconH4`
- `IconH5`
- `IconH6`
- `IconBullet`
- `IconNumbered`
- `IconTodo`
- `IconToggle`
- `IconPage`
- `IconCallout`
- `IconQuote`
- `IconTable`
- `IconDivider`
- `IconLinkToPage`
- `IconImage`
- `IconVideo`
- `IconAudio`
- `IconCode`
- `IconFile`
- `IconBookmark`
- `IconBoard`
- `IconGallery`
- `IconList`
- `IconColumns`
- `IconTOC`
- `IconEquation`
- `IconSpacer`
- `IconEmbed`
- `IconBreadcrumb`

```tsx
import { IconText, IconBoard, IconImage } from '@univers42/ui-collection';

export function Toolbar() {
  return (
    <div>
      <IconText />
      <IconBoard />
      <IconImage />
    </div>
  );
}
```

### 3. Catalogs

Available from:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/catalogs`
- `@univers42/ui-collection/components/blocks/slashMenuCatalog`

Exports:

- `SLASH_ITEMS`
- `SECTION_LABELS`
- `SlashMenuItem`
- `SlashMenuBlockType`
- `SlashMenuSection`

`SLASH_ITEMS` currently contains 35 entries.

Section labels:

- `basic` -> `Basic blocks`
- `media` -> `Media`
- `layout` -> `Layout`
- `advanced` -> `Advanced`
- `database` -> `Database`

```tsx
import { SECTION_LABELS, SLASH_ITEMS } from '@univers42/ui-collection/library/catalogs';

const mediaItems = SLASH_ITEMS.filter((item) => item.section === 'media');
const label = SECTION_LABELS.media;
```

### 4. Media Registry and Assets

Available from:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/media`

Built-in providers:

- `local`
- `url`
- `api`
- `unsplash`
- `picker`

Built-in collections:

- `svg`
- `emojis`
- `photos`
- `videos`
- `other-media`

Built-in kinds:

- `svg`
- `emoji`
- `photo`
- `video`
- `audio`
- `document`
- `lottie`
- `model-3d`

Exported types and utilities:

- `BUILTIN_MEDIA_PROVIDERS`
- `BUILTIN_MEDIA_COLLECTIONS`
- `BUILTIN_MEDIA_KINDS`
- `MediaProvider`
- `MediaCollectionName`
- `MediaKind`
- `MediaRef`
- `MediaItem`
- `MediaCollection`
- `MediaCollectionInput`
- `MediaLibraryIndex`
- `MediaSearchFilters`
- `MediaUrlResolver`
- `MediaResolverMap`
- `MediaRegistryOptions`
- `MediaRegistry`
- `DEFAULT_MEDIA_RESOLVERS`
- `createMediaRef`
- `parseMediaRef`
- `createMediaResolver`
- `resolveMediaUrl`
- `defineMediaCollection`
- `createMediaLibraryIndex`
- `filterMediaItems`
- `searchMediaItems`
- `createMediaRegistry`
- `mediaCollections`
- `mediaRegistry`
- `mediaLibrary`
- `getMediaItem`
- `getMediaCollection`
- `getMediaByKind`
- `getMediaByProvider`
- `searchMedia`
- `extendMediaLibrary`

Fetch an asset by id:

```ts
import { getMediaItem, resolveMediaUrl } from '@univers42/ui-collection/library/media';

const item = getMediaItem('video-intro-loop');
const src = item ? resolveMediaUrl(item.ref) : '';
```

Fetch a full collection:

```ts
import { getMediaCollection } from '@univers42/ui-collection/library/media';

const videos = getMediaCollection('videos');
```

Filter by kind:

```ts
import { getMediaByKind } from '@univers42/ui-collection/library/media';

const emojis = getMediaByKind('emoji');
```

Filter by provider:

```ts
import { getMediaByProvider } from '@univers42/ui-collection/library/media';

const externalUrls = getMediaByProvider('url');
```

Search by text or tags:

```ts
import { searchMedia } from '@univers42/ui-collection/library/media';

const results = searchMedia('rocket');
const onlySvg = searchMedia('hero', { collection: 'svg' });
```

Resolve custom references:

```ts
import { createMediaResolver } from '@univers42/ui-collection/library/media';

const resolve = createMediaResolver({
  cdn: (value) => `https://cdn.example.com/${value}`,
});

const src = resolve('cdn:icons/logo.svg');
```

Extend the library:

```ts
import {
  createMediaRef,
  defineMediaCollection,
  extendMediaLibrary,
} from '@univers42/ui-collection/library/media';

const stickers = defineMediaCollection({
  name: 'stickers',
  label: 'Stickers',
  items: [
    {
      id: 'sticker-party',
      label: 'Party sticker',
      category: 'custom',
      kind: 'emoji',
      ref: createMediaRef('url', 'https://cdn.example.com/stickers/party.webp'),
    },
  ],
});

const registry = extendMediaLibrary([stickers]);
```

Current curated asset inventory:

- `svg`: 154 items
- `emojis`: 4 items
- `photos`: 168 items
- `videos`: 59 items
- `other-media`: 69 items

The `photos` collection is now fully remote and categorized by theme, including `portraits`, `workspace`, `travel`, `architecture`, `nature`, `fashion`, `gaming`, `interiors`, `wellness`, `james-webb`, `japanese-print`, `art-deco` and `nasa`.

Curated external asset sources are documented in [library/media/SOURCES.md](/home/settes/cursus/trascendence/UI-Collection/library/media/SOURCES.md).

Current sources:

- Heroicons
- Unsplash
- LoremFlickr
- Wikimedia Commons
- NASA Science
- Google Sample Videos
- Samplelib
- SoundHelix
- MDN Shared Assets
- Twemoji
- W3C
- GitHub Raw Content
- Khronos glTF Sample Assets

## Root Export Summary

Importing from `@univers42/ui-collection` gives you:

- the unified `AssetPickerBoard`
- the official `AssetRenderer`
- the color, icon, and emoji picker wrappers
- the React slash-menu icons
- `SLASH_ITEMS` and `SECTION_LABELS`
- the media registry and helpers
- the default color, icon, emoji, and asset-picker datasets
- the canonical asset value helpers for parse, resolve and serialize

## Full Example

```tsx
import {
  AssetPickerBoard,
  AssetRenderer,
  ColorPickerBoard,
  DEFAULT_ICON_PICKER_ITEMS,
  EmojiPickerBoard,
  IconPickerBoard,
  SLASH_ITEMS,
  createDefaultAssetPickerTabs,
  getMediaCollection,
  getMediaItem,
  parseAssetValue,
  resolveMediaUrl,
} from '@univers42/ui-collection';

const heroVideo = getMediaItem('video-mdn-flower');
const emojiAssets = getMediaCollection('emojis');
const src = heroVideo ? resolveMediaUrl(heroVideo.ref) : '';
const tabs = createDefaultAssetPickerTabs();
const parsed = parseAssetValue('icon:text');

console.log(DEFAULT_ICON_PICKER_ITEMS.length);
console.log(SLASH_ITEMS.length);
console.log(emojiAssets.length);
console.log(src);
console.log(parsed.kind);

export function Demo() {
  return (
    <>
      <AssetPickerBoard
        label="Unified asset picker"
        tabs={tabs}
        showSelectionPreview={false}
      />
      <ColorPickerBoard label="Brand palette" />
      <IconPickerBoard label="Slash icon picker" />
      <EmojiPickerBoard label="Emoji picker" recentStorageKey="demo:emoji-recents" />
      <AssetRenderer value="icon:text" size={24} />
    </>
  );
}
```
