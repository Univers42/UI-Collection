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
- a release guide in [RELEASING.md](/home/settes/cursus/trascendence/UI-Collection/RELEASING.md)

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
  ColorPickerBoard,
  IconPickerBoard,
  EmojiPickerBoard,
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
  createMediaCollectionPickerTab,
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
- `ColorPickerBoard`
- `IconPickerBoard`
- `EmojiPickerBoard`
- `DEFAULT_ASSET_PICKER_TABS`
- `DEFAULT_COLOR_PRESETS`
- `DEFAULT_ICON_PICKER_ITEMS`
- `DEFAULT_EMOJI_PICKER_ITEMS`
- `AssetPickerBoardProps`
- `AssetPickerBoardTab`
- `AssetPickerBoardItem`
- `AssetPickerBoardValue`
- `AssetPickerBoardSelection`
- `ColorPickerBoardProps`
- `ColorPickerPreset`
- `IconPickerBoardProps`
- `IconPickerItem`
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
- `DEFAULT_ICON_PICKER_ITEMS`: 30 icons
- `DEFAULT_EMOJI_PICKER_ITEMS`: 24 emojis

#### Unified Asset Picker

`AssetPickerBoard` is the shared board used for asset selection. The default configuration groups emojis, SVGs, and icons into one tabbed picker, and the `asset-picker` subpath exposes factory helpers so new asset families can be added without duplicating UI.

```tsx
import {
  AssetPickerBoard,
  DEFAULT_ASSET_PICKER_TABS,
} from '@univers42/ui-collection';

export function Demo() {
  return (
    <AssetPickerBoard
      label="Block asset picker"
      tabs={DEFAULT_ASSET_PICKER_TABS}
      onChange={({ tab, item }) => console.log(tab.id, item.value)}
    />
  );
}
```

#### Which Picker Should You Import?

Use `AssetPickerBoard` when you want the general-purpose board with all default asset families in one place. You do not need to import `IconPickerBoard` or `EmojiPickerBoard` to use the unified board.

```tsx
import { AssetPickerBoard } from '@univers42/ui-collection';

export function Demo() {
  return (
    <AssetPickerBoard
      label="Block asset picker"
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
      <IconPickerBoard label="Slash icons" onChange={(iconId) => console.log(iconId)} />
      <EmojiPickerBoard label="Reaction picker" onChange={(emoji) => console.log(emoji)} />
    </>
  );
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

- `svg`: 5 items
- `emojis`: 4 items
- `photos`: 2 items
- `videos`: 3 items
- `other-media`: 6 items

Curated external asset sources are documented in [library/media/SOURCES.md](/home/settes/cursus/trascendence/UI-Collection/library/media/SOURCES.md).

Current sources:

- Heroicons
- MDN Shared Assets
- Twemoji
- W3C
- Khronos glTF Sample Assets

## Root Export Summary

Importing from `@univers42/ui-collection` gives you:

- the unified `AssetPickerBoard`
- the color, icon, and emoji picker wrappers
- the React slash-menu icons
- `SLASH_ITEMS` and `SECTION_LABELS`
- the media registry and helpers
- the default color, icon, emoji, and asset-picker datasets

## Full Example

```tsx
import {
  AssetPickerBoard,
  ColorPickerBoard,
  DEFAULT_ASSET_PICKER_TABS,
  DEFAULT_ICON_PICKER_ITEMS,
  EmojiPickerBoard,
  IconPickerBoard,
  SLASH_ITEMS,
  getMediaCollection,
  getMediaItem,
  resolveMediaUrl,
} from '@univers42/ui-collection';

const heroVideo = getMediaItem('video-mdn-flower');
const emojiAssets = getMediaCollection('emojis');
const src = heroVideo ? resolveMediaUrl(heroVideo.ref) : '';

console.log(DEFAULT_ICON_PICKER_ITEMS.length);
console.log(SLASH_ITEMS.length);
console.log(emojiAssets.length);
console.log(src);

export function Demo() {
  return (
    <>
      <AssetPickerBoard
        label="Unified asset picker"
        tabs={DEFAULT_ASSET_PICKER_TABS}
      />
      <ColorPickerBoard label="Brand palette" />
      <IconPickerBoard label="Slash icon picker" />
      <EmojiPickerBoard label="Emoji picker" />
    </>
  );
}
```
