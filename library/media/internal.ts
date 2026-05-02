const NON_ALPHANUMERIC = /[^a-z0-9]+/g;

export function firstString(...values: Array<string | null | undefined>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }

  return undefined;
}

export function createMediaId(
  prefix: string,
  ...parts: Array<string | null | undefined>
): string {
  const slug = parts
    .map((part) => slugify(part))
    .filter((part): part is string => Boolean(part))
    .join('-');

  return slug ? `${prefix}-${slug}` : `${prefix}-item`;
}

export function resolveAspectRatio(
  width?: number,
  height?: number,
  aspectRatio?: number,
): number | undefined {
  if (typeof aspectRatio === 'number' && Number.isFinite(aspectRatio) && aspectRatio > 0) {
    return aspectRatio;
  }

  if (
    typeof width === 'number'
    && Number.isFinite(width)
    && width > 0
    && typeof height === 'number'
    && Number.isFinite(height)
    && height > 0
  ) {
    return width / height;
  }

  return undefined;
}

export function humanizeSlug(value?: string | null): string | undefined {
  const token = slugify(value);
  if (!token) {
    return undefined;
  }

  return token
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function deriveTitleFromUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const lastSegment = parsed.pathname.split('/').filter(Boolean).pop();
    if (!lastSegment) {
      return undefined;
    }

    return humanizeSlug(lastSegment.replace(/\.[a-z0-9]+$/i, ''));
  } catch {
    return undefined;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function compactRecord(
  record: Record<string, unknown>,
): Record<string, unknown> | undefined {
  const entries = Object.entries(record).filter(([, value]) => value !== undefined);
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function slugify(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\?.*$/, '')
    .replace(/#.*$/, '')
    .replace(NON_ALPHANUMERIC, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return normalized || undefined;
}
