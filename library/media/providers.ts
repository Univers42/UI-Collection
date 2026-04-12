import {
  BUILTIN_MEDIA_PROVIDERS,
  type MediaProvider,
  type MediaRef,
} from './types.js';

export type MediaUrlResolver = (value: string, provider: MediaProvider) => string;
export type MediaResolverMap = Record<string, MediaUrlResolver>;

const BUILTIN_MEDIA_PROVIDER_SET = new Set<string>(BUILTIN_MEDIA_PROVIDERS);
const PACKAGE_MEDIA_ROOT_RELATIVE_PATH = '../../../';

function normalizePackagedMediaPath(value: string): string {
  return value.replace(/^\/+/u, '');
}

export const DEFAULT_MEDIA_RESOLVERS: MediaResolverMap = {
  local: (value) => value,
  package: (value) => resolvePackagedMediaUrl(value),
  url: (value) => value,
  api: (value) => value,
  unsplash: (value) => value,
  picker: (value) => value,
};

export function isBuiltinMediaProvider(value: string): value is MediaProvider {
  return BUILTIN_MEDIA_PROVIDER_SET.has(value);
}

export function createMediaRef(provider: MediaProvider, value: string): MediaRef {
  return `${provider}:${value}` as MediaRef;
}

export function createPackageMediaRef(path: string): MediaRef {
  return createMediaRef('package', normalizePackagedMediaPath(path));
}

export function parseMediaRef(ref: MediaRef | string): {
  provider: MediaProvider;
  value: string;
} {
  const separatorIndex = ref.indexOf(':');

  if (separatorIndex <= 0) {
    throw new Error(`Invalid media ref "${ref}". Expected "provider:value".`);
  }

  const provider = ref.slice(0, separatorIndex);
  const value = ref.slice(separatorIndex + 1);

  return { provider: provider as MediaProvider, value };
}

export function createMediaResolver(
  resolvers: Partial<MediaResolverMap> = {},
): (ref: MediaRef | string) => string {
  const mergedResolvers = { ...DEFAULT_MEDIA_RESOLVERS, ...resolvers };

  return (ref: MediaRef | string) => {
    const { provider, value } = parseMediaRef(ref);
    const resolver = mergedResolvers[provider];

    if (!resolver) {
      return value;
    }

    return resolver(value, provider);
  };
}

export function resolvePackagedMediaUrl(
  value: string,
  baseUrl: string | URL = import.meta.url,
): string {
  const normalizedBaseUrl = typeof baseUrl === 'string' ? baseUrl : baseUrl.toString();
  const normalizedValue = normalizePackagedMediaPath(value);

  return new URL(
    `${PACKAGE_MEDIA_ROOT_RELATIVE_PATH}${normalizedValue}`,
    normalizedBaseUrl,
  ).toString();
}

export function resolveMediaUrl(
  ref: MediaRef | string,
  resolvers?: Partial<MediaResolverMap>,
): string {
  return createMediaResolver(resolvers)(ref);
}
