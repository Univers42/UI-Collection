# UI Collection Library

Reusable asset library for static media and React-based SVG icons.

## Goals

- Reusable across screens and features.
- Scalable through collection-based manifests.
- Extensible with custom providers, collections, and resolvers.
- Fast to consume with prebuilt indexes by id and collection.
- Easy to use with one reference format: `provider:value`.

## Media Reference Format

Every asset uses a provider prefix followed by its value:

- `local:/media/svg/icons/arrow-left.svg`
- `package:media/svg/icons/arrow-left.svg`
- `url:https://cdn.example.com/docs/api-spec.pdf`
- `api:https://api.example.com/v1/media/demo-video`
- `unsplash:https://images.unsplash.com/photo-1518770660439-4636190af475`
- `picker:asset://emojis/custom/party-parrot`

## Structure

```text
library/
  media/
    collections/
    index.ts
    providers.ts
    types.ts
    utils.ts
  catalogs/
  icons/
    react/
      slash-menu/
```

Legacy imports remain available through `/components/blocks`, but the source of truth now lives in `/library`.

## Usage

```ts
import { getMediaItem, resolveMediaUrl } from './media';

const item = getMediaItem('video-intro-loop');
const src = item ? resolveMediaUrl(item.ref) : '';
```

## Scaling the Library

```ts
import {
  createMediaRef,
  createMediaRegistry,
  defineMediaCollection,
} from './media';

const stickersCollection = defineMediaCollection({
  name: 'stickers',
  label: 'Stickers',
  items: [
    {
      id: 'sticker-thumbs-up',
      label: 'Thumbs Up',
      category: 'reactions',
      kind: 'emoji',
      ref: createMediaRef('cdn', 'https://cdn.example.com/stickers/thumbs-up.webp'),
      tags: ['reaction', 'sticker'],
    },
  ],
});

const registry = createMediaRegistry([stickersCollection], {
  resolvers: {
    cdn: (value) => value,
  },
});
```
