# UI Collection Library

Reusable asset library for static media and React-based SVG icons.

## Goals

- Reusable across screens and features.
- Scalable through collection-based manifests.
- Extensible with custom providers, collections, and resolvers.
- Fast to consume with prebuilt indexes by id and collection.
- Easy to use with one reference format: `provider:value`.

## Media (images & videos)

This folder provides provider-driven media types, normalizers, curated presets, and remote
sample collections focused on pickable images and videos.

- `library/media/index.ts` now exports `images` and `videos` namespaces.
- The code intentionally does not bundle heavy binary assets or apply styling.

Images

- `images.normalizeUrlImage(...)` — normalize a direct image URL into a pickable `NormalizedImage` shape with `thumbnailUrl`, `previewUrl`, and `fullUrl`.
- `images.UnsplashImageProvider` — client that requires an `accessKey` and returns normalized images from Unsplash.
- `images.imageCollectionPresets` — curated query presets for Japanese prints, NASA/space, art deco, and nature.

Videos

- `videos.normalizeUrlVideo(...)` — normalize a direct video URL into a pickable `NormalizedVideo` shape with `videoUrl`, `thumbnailUrl`, `posterUrl`, and `previewUrl`.
- `videos.normalizeExternalVideo(...)` — future-ready external provider normalizer without inventing Unsplash video support.
- `videos.curatedVideoCollections` — remote direct-URL video examples with lightweight poster metadata.

Consumers are responsible for rendering and styling; this module only provides types, normalizers and lightweight providers.
