# UI Collection Library

Reusable asset library for static media and React-based SVG icons.

## Goals

- Reusable across screens and features.
- Scalable through collection-based manifests.
- Extensible with custom providers, collections, and resolvers.
- Fast to consume with prebuilt indexes by id and collection.
- Easy to use with one reference format: `provider:value`.

## Media (images & videos)

This folder provides a minimal, provider-driven media API focused on remote images and videos.

- `library/media/index.ts` now exports `images` and `videos` namespaces.
- The code intentionally does not bundle heavy binary assets or apply styling.

Images

- `images.normalizeUrlImage(...)` — normalize a direct image URL into the `NormalizedImage` shape.
- `images.UnsplashImageProvider` — client that requires an `accessKey` and returns normalized images from Unsplash.

Videos

- `videos.normalizeUrlVideo(...)` — normalize a direct video URL into the `NormalizedVideo` shape.

Consumers are responsible for rendering and styling; this module only provides types, normalizers and lightweight providers.
