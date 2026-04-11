import type { CSSProperties, ReactNode } from 'react';
import { resolveMediaUrl } from '../../../media/index.js';
import { renderSizedIcon } from '../icon-picker/iconPickerData.js';
import { resolveAssetValue } from './assetValues.js';
import type { AssetPickerBoardTab } from './types.js';

export interface AssetRendererProps {
  value: string;
  tabs?: AssetPickerBoardTab[];
  size?: number;
  className?: string;
  style?: CSSProperties;
  objectFit?: CSSProperties['objectFit'];
  fallback?: ReactNode;
}

export function AssetRenderer({
  value,
  tabs,
  size = 24,
  className,
  style,
  objectFit = 'contain',
  fallback = null,
}: Readonly<AssetRendererProps>) {
  const resolved = resolveAssetValue(value, tabs);

  if (!resolved) {
    return <>{fallback}</>;
  }

  if (resolved.iconItem) {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          ...style,
        }}
      >
        {renderSizedIcon(resolved.iconItem.icon, size)}
      </span>
    );
  }

  if (resolved.preview?.kind === 'emoji') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          fontSize: size,
          lineHeight: 1,
          ...style,
        }}
      >
        {resolved.preview.value}
      </span>
    );
  }

  if (resolved.preview?.kind === 'text') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: size,
          minHeight: size,
          fontSize: Math.max(12, size * 0.45),
          lineHeight: 1.15,
          ...style,
        }}
      >
        {resolved.preview.value}
      </span>
    );
  }

  if (resolved.preview?.kind === 'node') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          ...style,
        }}
      >
        {resolved.preview.render(size)}
      </span>
    );
  }

  if (resolved.preview?.kind === 'image') {
    const src = resolved.mediaItem
      ? resolveMediaUrl(resolved.mediaItem.thumbnailRef ?? resolved.mediaItem.ref)
      : resolved.preview.src;

    return (
      <img
        className={className}
        src={src}
        alt={resolved.preview.alt ?? resolved.label}
        style={{
          width: size,
          height: size,
          objectFit,
          display: 'block',
          ...style,
        }}
      />
    );
  }

  return <>{fallback}</>;
}
