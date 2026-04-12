# Media Collection

Base structure for static assets with URL-friendly paths.

The reusable asset registry lives in `/library/media`.
React SVG icon components belong in `/library/icons/react`.

## Naming Rules

- Use lowercase names.
- Use `kebab-case`.
- Do not use spaces, accents, or special characters.
- Prefer web-friendly formats:
  - `svg` for vectors
  - `webp` or `jpg` for photos
  - `mp4` or `webm` for videos
  - `json` for lottie files

## URL Examples

- `/media/svg/icons/arrow-left.svg`
- `/media/svg/logos/company-mark.svg`
- `/media/emojis/custom/party-parrot.png`
- `/media/photos/optimized/team-avatar-01.webp`
- `/media/videos/posters/hero-cover.webp`
- `/media/other-media/audio/notification-pop.mp3`

## Provider Reference Examples

- `local:/media/svg/icons/arrow-left.svg`
- `package:media/svg/icons/arrow-left.svg`
- `url:https://cdn.example.com/docs/api-spec.pdf`
- `api:https://api.example.com/v1/media/demo-video`
- `unsplash:https://images.unsplash.com/photo-1518770660439-4636190af475`
- `picker:asset://emojis/custom/party-parrot`

## Structure

```text
media/
  svg/
    icons/
    illustrations/
    logos/
    sprites/
  emojis/
    unicode/
    custom/
    animated/
  photos/
    originals/
    optimized/
    thumbnails/
    banners/
  videos/
    originals/
    optimized/
    thumbnails/
    posters/
  other-media/
    audio/
    documents/
    lottie/
    3d/
```
