# @univers42/ui-collection

Libreria reutilizable de UI para:

- registros de media y assets
- iconos React del slash menu
- catalogos de bloques
- tableros picker de color, iconos y emojis

## Instalacion

```bash
npm install @univers42/ui-collection react
```

## Build local

```bash
npm install
npm run build
```

## Entry points

La libreria expone estos entry points:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library`
- `@univers42/ui-collection/library/media`
- `@univers42/ui-collection/library/catalogs`
- `@univers42/ui-collection/library/icons/react`
- `@univers42/ui-collection/library/icons/react/slash-menu`
- `@univers42/ui-collection/library/components/react`
- `@univers42/ui-collection/library/components/react/color-picker`
- `@univers42/ui-collection/library/components/react/icon-picker`
- `@univers42/ui-collection/library/components/react/emoji-picker`

Tambien mantiene reexports legacy:

- `@univers42/ui-collection/components/blocks/ColorPickerBoard`
- `@univers42/ui-collection/components/blocks/IconPickerBoard`
- `@univers42/ui-collection/components/blocks/EmojiPickerBoard`
- `@univers42/ui-collection/components/blocks/SlashMenuIcons`
- `@univers42/ui-collection/components/blocks/SlashMenuIconsBasic`
- `@univers42/ui-collection/components/blocks/SlashMenuIconsExtended`
- `@univers42/ui-collection/components/blocks/slashMenuCatalog`

## Como obtener el contenido

### Obtener todo desde la raiz

```tsx
import {
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
  DEFAULT_COLOR_PRESETS,
  DEFAULT_ICON_PICKER_ITEMS,
  DEFAULT_EMOJI_PICKER_ITEMS,
} from '@univers42/ui-collection';
```

### Obtener solo un modulo concreto

```tsx
import { getMediaItem, searchMedia } from '@univers42/ui-collection/library/media';
import { SLASH_ITEMS } from '@univers42/ui-collection/library/catalogs';
import { IconText, IconBoard } from '@univers42/ui-collection/library/icons/react/slash-menu';
import { ColorPickerBoard } from '@univers42/ui-collection/library/components/react/color-picker';
import { IconPickerBoard } from '@univers42/ui-collection/library/components/react/icon-picker';
import { EmojiPickerBoard } from '@univers42/ui-collection/library/components/react/emoji-picker';
```

### Obtener contenido legacy

```tsx
import { ColorPickerBoard } from '@univers42/ui-collection/components/blocks/ColorPickerBoard';
import { IconText } from '@univers42/ui-collection/components/blocks/SlashMenuIcons';
import { SLASH_ITEMS } from '@univers42/ui-collection/components/blocks/slashMenuCatalog';
```

## Contenido de la libreria

### 1. Componentes React

Disponibles desde:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/components/react`

Componentes incluidos:

- `ColorPickerBoard`
- `IconPickerBoard`
- `EmojiPickerBoard`

Datasets por defecto incluidos:

- `DEFAULT_COLOR_PRESETS`: 8 presets
- `DEFAULT_ICON_PICKER_ITEMS`: 30 iconos
- `DEFAULT_EMOJI_PICKER_ITEMS`: 24 emojis

Props exportadas:

- `ColorPickerBoardProps`
- `ColorPickerPreset`
- `IconPickerBoardProps`
- `IconPickerItem`
- `EmojiPickerBoardProps`
- `EmojiPickerItem`

Ejemplo:

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

### 2. Iconos React del slash menu

Disponibles desde:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/icons/react`
- `@univers42/ui-collection/library/icons/react/slash-menu`
- `@univers42/ui-collection/components/blocks/SlashMenuIcons`

Iconos exportados:

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

Ejemplo:

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

### 3. Catalogos

Disponibles desde:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/catalogs`
- `@univers42/ui-collection/components/blocks/slashMenuCatalog`

Exports:

- `SLASH_ITEMS`
- `SECTION_LABELS`
- `SlashMenuItem`
- `SlashMenuBlockType`
- `SlashMenuSection`

`SLASH_ITEMS` contiene 35 entradas:

#### Basic

- `paragraph`: `Text`
- `heading_1`: `Heading 1`
- `heading_2`: `Heading 2`
- `heading_3`: `Heading 3`
- `heading_4`: `Heading 4`
- `heading_5`: `Heading 5`
- `heading_6`: `Heading 6`
- `bulleted_list`: `Bulleted list`
- `numbered_list`: `Numbered list`
- `to_do`: `To-do list`
- `toggle`: `Toggle list`
- `page`: `Page`
- `callout`: `Callout - Tip`
- `callout`: `Callout - Success`
- `callout`: `Callout - Error`
- `callout`: `Callout - Important`
- `callout`: `Callout - Warning`
- `quote`: `Quote`
- `table_block`: `Table`
- `divider`: `Divider`
- `link_to_page`: `Link to page`

#### Media

- `image`: `Image`
- `video`: `Video`
- `audio`: `Audio`
- `code`: `Code`
- `file`: `File`
- `bookmark`: `Web bookmark`
- `embed`: `Embed`

#### Layout

- `column`: `Columns`
- `spacer`: `Spacer`

#### Advanced

- `table_of_contents`: `Table of contents`
- `equation`: `Equation`
- `breadcrumb`: `Breadcrumb`

#### Database

- `database_inline`: `Database - Inline`
- `database_full_page`: `Database - Full page`

Etiquetas de seccion:

- `basic` -> `Basic blocks`
- `media` -> `Media`
- `layout` -> `Layout`
- `advanced` -> `Advanced`
- `database` -> `Database`

Ejemplo:

```tsx
import { SECTION_LABELS, SLASH_ITEMS } from '@univers42/ui-collection/library/catalogs';

const mediaItems = SLASH_ITEMS.filter((item) => item.section === 'media');
const label = SECTION_LABELS.media;
```

### 4. Media registry y assets

Disponible desde:

- `@univers42/ui-collection`
- `@univers42/ui-collection/library/media`

#### Providers builtin

- `local`
- `url`
- `api`
- `unsplash`
- `picker`

#### Collections builtin

- `svg`
- `emojis`
- `photos`
- `videos`
- `other-media`

#### Kinds builtin

- `svg`
- `emoji`
- `photo`
- `video`
- `audio`
- `document`
- `lottie`
- `model-3d`

#### Tipos y utilidades exportadas

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

#### Como obtener assets por codigo

Obtener un asset por id:

```ts
import { getMediaItem, resolveMediaUrl } from '@univers42/ui-collection/library/media';

const item = getMediaItem('video-intro-loop');
const src = item ? resolveMediaUrl(item.ref) : '';
```

Obtener una coleccion completa:

```ts
import { getMediaCollection } from '@univers42/ui-collection/library/media';

const videos = getMediaCollection('videos');
```

Obtener por kind:

```ts
import { getMediaByKind } from '@univers42/ui-collection/library/media';

const emojis = getMediaByKind('emoji');
```

Obtener por provider:

```ts
import { getMediaByProvider } from '@univers42/ui-collection/library/media';

const externalUrls = getMediaByProvider('url');
```

Buscar por texto o tags:

```ts
import { searchMedia } from '@univers42/ui-collection/library/media';

const results = searchMedia('rocket');
const onlySvg = searchMedia('hero', { collection: 'svg' });
```

Resolver referencias personalizadas:

```ts
import { createMediaResolver } from '@univers42/ui-collection/library/media';

const resolve = createMediaResolver({
  cdn: (value) => `https://cdn.example.com/${value}`,
});

const src = resolve('cdn:icons/logo.svg');
```

Extender la libreria:

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

#### Inventario actual de assets

La libreria incluye 20 assets de ejemplo/uso directo.

##### svg

- `svg-arrow-left`: `Arrow Left`
- `svg-company-mark`: `Company Mark`
- `svg-hero-scene`: `Hero Scene`
- `svg-heroicons-arrow-left`: `Heroicons Arrow Left`
- `svg-heroicons-bolt`: `Heroicons Bolt`

##### emojis

- `emoji-party-parrot`: `Party Parrot`
- `emoji-wave`: `Wave`
- `emoji-wave-twemoji`: `Wave Twemoji`
- `emoji-rocket-twemoji`: `Rocket Twemoji`

##### photos

- `photo-homepage-banner`: `Homepage Banner`
- `photo-team-avatar-01`: `Team Avatar 01`

##### videos

- `video-intro-loop`: `Intro Loop`
- `video-api-demo`: `API Demo Clip`
- `video-mdn-flower`: `MDN Flower`

##### other-media

- `audio-notification-pop`: `Notification Pop`
- `audio-mdn-trex-roar`: `MDN T-Rex Roar`
- `lottie-loader-spinner`: `Loader Spinner`
- `document-api-spec`: `API Spec`
- `document-w3c-dummy-pdf`: `W3C Dummy PDF`
- `model-khronos-duck`: `Khronos Duck`

#### Procedencia de assets curados

Los assets externos curados y verificados estan documentados en:

- `./library/media/SOURCES.md`

Fuentes usadas actualmente:

- Heroicons
- MDN Shared Assets
- Twemoji
- W3C
- Khronos glTF Sample Assets

## Resumen de lo que exporta la raiz

Importar desde `@univers42/ui-collection` te da acceso a:

- los 3 picker boards
- los iconos React del slash menu
- `SLASH_ITEMS` y `SECTION_LABELS`
- el registry de media y sus helpers
- los datasets por defecto de color, iconos y emojis

## Ejemplo completo

```tsx
import {
  ColorPickerBoard,
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
      <ColorPickerBoard label="Brand palette" />
      <IconPickerBoard label="Slash icon picker" />
      <EmojiPickerBoard label="Emoji picker" />
    </>
  );
}
```
