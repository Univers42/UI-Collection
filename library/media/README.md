Library media — images & videos

This module provides a minimal, provider-oriented API to normalize remote images
and videos for consumers. The library intentionally does not render or apply
styles; consumers decide how to display assets.

Public API (examples):

- `import { images, videos } from '@univers42/ui-collection/library/media'`
- `images.normalizeUrlImage({ kind: 'url', url, alt })` → `NormalizedImage`
- `new images.UnsplashImageProvider({ accessKey })` → call `.search()` or `.random()`
- `videos.normalizeUrlVideo({ kind: 'url', src, poster, mimeType })` → `NormalizedVideo`

Design notes:

- Unsplash access keys must be supplied by the consumer (no secrets in the package).
- The library does not include or bundle heavy binary assets.
- The library avoids closed/styled components; it only exposes types, providers and
  normalization helpers.
