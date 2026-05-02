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

Media: images and videos

This package now exposes a focused, provider-driven media API under:

- `@univers42/ui-collection/library/media` — exports `images` and `videos` namespaces.

Images

Use the helpers and providers under `images` to normalize and consume remote images. The library provides:

- `images.normalizeUrlImage(source)` — normalize a direct image URL to a pickable `NormalizedImage` model with `thumbnailUrl`, `previewUrl`, and `fullUrl`.
- `images.UnsplashImageProvider` — a minimal client that requires an `accessKey` passed by the consumer and returns normalized images from Unsplash.
- `images.imageCollectionPresets` — curated query presets for Japanese prints, NASA/space, art deco, nature, and animals.

Example — normalize a URL image:

```ts
import { images } from '@univers42/ui-collection/library/media';

const normalized = images.normalizeUrlImage({ kind: 'url', url: 'https://example.com/photo.jpg', alt: 'Example' });
console.log(normalized.thumbnailUrl, normalized.previewUrl, normalized.fullUrl);
```

Example — search Unsplash (consumer must supply access key):

```ts
import { images } from '@univers42/ui-collection/library/media';

const provider = new images.UnsplashImageProvider({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
const results = await provider.search('mountains', 1, 10);
console.log(results[0]?.thumbnailUrl, results[0]?.previewUrl, results[0]?.fullUrl);
```

Videos

Videos are separate and support direct remote URLs plus future-ready external provider entries.

Example — normalize a URL video:

```ts
import { videos } from '@univers42/ui-collection/library/media';

const normalized = videos.normalizeUrlVideo({
  kind: 'url',
  src: 'https://cdn.example.com/video.mp4',
  thumbnailUrl: 'https://cdn.example.com/video-thumb.jpg',
  posterUrl: 'https://cdn.example.com/poster.jpg',
});
console.log(normalized.videoUrl, normalized.thumbnailUrl, normalized.posterUrl);
```

Notes

- Unsplash is only used for images — there is no Unsplash video integration.
- The library does not bundle binary media files. Prefer remote URLs.
- The library does not apply styles or render UI; it only provides types, normalizers, and providers. Consumers decide rendering and styling.
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
  parseAssetValue,
  resolveAssetValue,
  serializeAssetSelection,
  SLASH_ITEMS,
  SECTION_LABELS,
  // media APIs changed: use images and videos providers
  images,
  videos,
  DEFAULT_ASSET_PICKER_TABS,
  DEFAULT_COLOR_PRESETS,
  DEFAULT_ICON_PICKER_ITEMS,
  EMOJI_PICKER_GROUPS,
  DEFAULT_EMOJI_PICKER_ITEMS,
} from '@univers42/ui-collection';
```

### Import a specific module

```tsx
import * as media from '@univers42/ui-collection/library/media';
// Use `media.images` and `media.videos` providers and normalizers.
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
 - media values should be treated as opaque provider refs or direct `url:`/absolute URLs. For direct images/videos use the
   new `library/media` helpers (`images` / `videos`) to normalize remote assets; rendering and styling remain the consumer's responsibility.

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

`ColorPickerBoard` now defaults to a visually agnostic circular chromatic wheel built from octagonal swatches. Use `variant="classic"` if you want the legacy square HSV board. If you want the packaged dark skin from this library, opt in with `appearance="default"`. Otherwise, leave the default behavior and provide `classNames` or `styles` from the consumer.

```tsx
<ColorPickerBoard
  label="Brand palette"
  styles={{
    root: { width: 320 },
    input: { border: '1px solid var(--border)' },
    inputButton: { padding: '0.5rem 0.75rem' },
  }}
/>
```

If the host application does not want any board chrome from this package, import `ChromaticWheel` directly. It only ships the wheel geometry and color swatches, so the surrounding layout and active-state styling can come entirely from the consumer theme.

```tsx
import { ChromaticWheel } from '@univers42/ui-collection';

export function Demo() {
  return (
    <ChromaticWheel
      value="#2563EB"
      onChange={(hex) => console.log(hex)}
      className="brand-wheel"
    />
  );
}
```

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
- `package`
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

The media registry previously exposed collection and resolver utilities. That implementation was removed
and replaced by a focused images/videos API. See the "Media: images and videos" section above for
examples showing how to normalize URL images, use the `UnsplashImageProvider`, and normalize URL videos.

Current curated asset inventory:

- `svg`: 154 items
- `emojis`: 4 items
- `photos`: 55 items
- `videos`: 59 items
- `other-media`: 69 items

The `photos` collection is curated around stable, reusable themes such as `portraits`, `workspace`, `travel`, `architecture`, `nature`, `food`, `products`, `abstract`, `lifestyle`, `pets`, `james-webb`, `japanese-print`, and `art-deco`. It supports a hybrid model: downloaded packaged assets resolve through `package:media/photos/optimized/*`, while the remaining entries continue to fall back to stable remote sources from Wikimedia Commons and NASA.

To turn the photo catalog into packaged local assets, run `npm run sync:photo-assets`. The generated manifests let the same collection switch from remote source URLs to packaged `package:media/photos/optimized/*` refs without changing the public API, while still resolving to bundler-safe asset URLs in consumer apps.

Curated external asset sources are documented in [library/media/SOURCES.md](/home/settes/cursus/trascendence/UI-Collection/library/media/SOURCES.md).

Current sources:

- Heroicons
- Unsplash
- Wikimedia Commons
- NASA Science
- NASA
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
  parseAssetValue,
} from '@univers42/ui-collection';

// The legacy media registry was removed. Use `library/media` (`images` / `videos`) helpers
// to normalize and consume remote image and video URLs as shown in the "Media: images and videos" section.
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
