Library media — images & videos

This module provides provider-oriented media types, normalizers, curated query presets,
and remote sample collections for consumers that need pickable media data. The library
intentionally does not render or apply styles; consumers decide how to display assets.

Public API (examples):

- `import { images, videos } from '@univers42/ui-collection/library/media'`
- `images.normalizeUrlImage({ kind: 'url', url, thumbnailUrl, previewUrl })` → `NormalizedImage`
- `new images.UnsplashImageProvider({ accessKey })` → call `.search()` or `.random()`
- `images.imageCollectionPresets` → curated Unsplash queries for Japanese prints, NASA/space, art deco, nature, animals
- `videos.normalizeUrlVideo({ kind: 'url', src, posterUrl, thumbnailUrl, mimeType })` → `NormalizedVideo`
- `videos.curatedVideoCollections` → direct URL sample videos with poster/thumbnail metadata
- `videos.normalizeExternalVideo({ kind: 'external', providerId, videoUrl, title })` → future-ready external provider model

Design notes:

- Unsplash access keys must be supplied by the consumer (no secrets in the package).
- Unsplash is used for image search only. No fake Unsplash video API is exposed.
- Images normalize to `thumbnailUrl`, `previewUrl`, and `fullUrl` for gallery/grid pickers.
- Videos normalize to `videoUrl` plus `thumbnailUrl` / `posterUrl` / `previewUrl` fallbacks.
- The library does not include or bundle heavy binary assets.
- The library avoids closed/styled components; it only exposes types, providers and
  normalization helpers.
