/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ColorPickerBoard.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 11:33:25 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 11:49:25 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

const DEFAULT_COLOR = '#4F46E5';

export interface ColorPickerPreset {
  label: string;
  value: string;
}

export interface ColorPickerBoardProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  presets?: ColorPickerPreset[];
  label?: string;
  showInput?: boolean;
  size?: number;
  className?: string;
}

interface HsvaColor {
  h: number;
  s: number;
  v: number;
}

export const DEFAULT_COLOR_PRESETS: ColorPickerPreset[] = [
  { label: 'Indigo', value: '#4F46E5' },
  { label: 'Sky', value: '#0EA5E9' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Rose', value: '#F43F5E' },
  { label: 'Slate', value: '#334155' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Black', value: '#0F172A' },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeHexColor(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();

  if (/^#[0-9A-F]{6}$/.test(normalized)) {
    return normalized;
  }

  const shortMatch = normalized.match(/^#([0-9A-F]{3})$/);

  if (!shortMatch) {
    return null;
  }

  const [r, g, b] = shortMatch[1].split('');

  return `#${r}${r}${g}${g}${b}${b}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHexColor(hex) ?? DEFAULT_COLOR;

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

function rgbToHsva(r: number, g: number, b: number): HsvaColor {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r1) {
      h = 60 * (((g1 - b1) / delta) % 6);
    } else if (max === g1) {
      h = 60 * ((b1 - r1) / delta + 2);
    } else {
      h = 60 * ((r1 - g1) / delta + 4);
    }
  }

  if (h < 0) {
    h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;

  return { h, s, v };
}

function hsvaToRgb(color: HsvaColor): { r: number; g: number; b: number } {
  const h = color.h;
  const s = clamp(color.s, 0, 100) / 100;
  const v = clamp(color.v, 0, 100) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
  } else if (h >= 120 && h < 180) {
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    b1 = c;
  } else {
    r1 = c;
    b1 = x;
  }

  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255,
  };
}

function hexToHsva(hex: string): HsvaColor {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsva(r, g, b);
}

function hsvaToHex(color: HsvaColor): string {
  const { r, g, b } = hsvaToRgb(color);
  return rgbToHex(r, g, b);
}

function getReadableTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.62 ? '#0F172A' : '#FFFFFF';
}

export function ColorPickerBoard({
  value,
  defaultValue = DEFAULT_COLOR,
  onChange,
  onChangeComplete,
  presets = DEFAULT_COLOR_PRESETS,
  label = 'Color picker',
  showInput = true,
  size = 240,
  className,
}: ColorPickerBoardProps) {
  const initialHex = normalizeHexColor(value) ?? normalizeHexColor(defaultValue) ?? DEFAULT_COLOR;
  const [internalHex, setInternalHex] = useState(initialHex);
  const [currentColor, setCurrentColor] = useState<HsvaColor>(hexToHsva(initialHex));
  const [inputValue, setInputValue] = useState(initialHex);
  const [isBoardDragging, setIsBoardDragging] = useState(false);
  const [isHueDragging, setIsHueDragging] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const resolvedHex = normalizeHexColor(value) ?? internalHex;
  const activeHex = normalizeHexColor(resolvedHex) ?? DEFAULT_COLOR;

  useEffect(() => {
    const normalized = normalizeHexColor(value) ?? normalizeHexColor(defaultValue) ?? DEFAULT_COLOR;

    if (value === undefined) {
      return;
    }

    setCurrentColor(hexToHsva(normalized));
    setInputValue(normalized);
  }, [value, defaultValue]);

  function commitColor(nextColor: HsvaColor, notifyComplete = false): void {
    const normalizedColor = {
      h: clamp(nextColor.h, 0, 360),
      s: clamp(nextColor.s, 0, 100),
      v: clamp(nextColor.v, 0, 100),
    };
    const nextHex = hsvaToHex(normalizedColor);

    setCurrentColor(normalizedColor);
    setInputValue(nextHex);

    if (value === undefined) {
      setInternalHex(nextHex);
    }

    onChange?.(nextHex);

    if (notifyComplete) {
      onChangeComplete?.(nextHex);
    }
  }

  function updateBoardFromPointer(clientX: number, clientY: number, notifyComplete = false): void {
    const board = boardRef.current;

    if (!board) {
      return;
    }

    const rect = board.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);

    commitColor(
      {
        ...currentColor,
        s: (x / rect.width) * 100,
        v: 100 - (y / rect.height) * 100,
      },
      notifyComplete,
    );
  }

  function updateHueFromPointer(clientX: number, notifyComplete = false): void {
    const hue = hueRef.current;

    if (!hue) {
      return;
    }

    const rect = hue.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);

    commitColor(
      {
        ...currentColor,
        h: (x / rect.width) * 360,
      },
      notifyComplete,
    );
  }

  function handleBoardPointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsBoardDragging(true);
    updateBoardFromPointer(event.clientX, event.clientY);
  }

  function handleBoardPointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!isBoardDragging) {
      return;
    }

    updateBoardFromPointer(event.clientX, event.clientY);
  }

  function handleBoardPointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!isBoardDragging) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsBoardDragging(false);
    updateBoardFromPointer(event.clientX, event.clientY, true);
  }

  function handleHuePointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsHueDragging(true);
    updateHueFromPointer(event.clientX);
  }

  function handleHuePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!isHueDragging) {
      return;
    }

    updateHueFromPointer(event.clientX);
  }

  function handleHuePointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!isHueDragging) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsHueDragging(false);
    updateHueFromPointer(event.clientX, true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value.toUpperCase());
  }

  function commitInputValue(): void {
    const normalized = normalizeHexColor(inputValue);

    if (!normalized) {
      setInputValue(activeHex);
      return;
    }

    commitColor(hexToHsva(normalized), true);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== 'Enter') {
      return;
    }

    commitInputValue();
  }

  const boardHandleLeft = `${currentColor.s}%`;
  const boardHandleTop = `${100 - currentColor.v}%`;
  const hueHandleLeft = `${(currentColor.h / 360) * 100}%`;
  const boardHue = hsvaToHex({ h: currentColor.h, s: 100, v: 100 });
  const textColor = getReadableTextColor(activeHex);

  const rootStyle: CSSProperties = {
    width: size + 32,
    padding: 16,
    borderRadius: 24,
    border: '1px solid rgba(148, 163, 184, 0.22)',
    background:
      'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28)',
    color: '#E2E8F0',
    fontFamily:
      'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const boardStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'crosshair',
    backgroundColor: boardHue,
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
    touchAction: 'none',
  };

  return (
    <section className={className} style={rootStyle} aria-label={label}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
            Picker Board
          </div>
          <h3 style={{ margin: '6px 0 0', fontSize: 20, lineHeight: 1.1 }}>{label}</h3>
        </div>
        <div
          aria-label={`Selected color ${activeHex}`}
          style={{
            minWidth: 88,
            padding: '10px 12px',
            borderRadius: 16,
            background: activeHex,
            color: textColor,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 700,
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
          }}
        >
          {activeHex}
        </div>
      </div>

      <div
        ref={boardRef}
        role="presentation"
        style={boardStyle}
        onPointerDown={handleBoardPointerDown}
        onPointerMove={handleBoardPointerMove}
        onPointerUp={handleBoardPointerUp}
        onPointerCancel={handleBoardPointerUp}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: boardHandleLeft,
            top: boardHandleTop,
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.35), 0 4px 14px rgba(15, 23, 42, 0.35)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div
        ref={hueRef}
        role="presentation"
        style={{
          position: 'relative',
          width: size,
          height: 18,
          marginTop: 14,
          borderRadius: 999,
          background:
            'linear-gradient(90deg, #FF0000 0%, #FFFF00 16.66%, #00FF00 33.33%, #00FFFF 50%, #0000FF 66.66%, #FF00FF 83.33%, #FF0000 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          cursor: 'ew-resize',
          touchAction: 'none',
        }}
        onPointerDown={handleHuePointerDown}
        onPointerMove={handleHuePointerMove}
        onPointerUp={handleHuePointerUp}
        onPointerCancel={handleHuePointerUp}
      >
        <div
          style={{
            position: 'absolute',
            left: hueHandleLeft,
            top: '50%',
            width: 14,
            height: 26,
            borderRadius: 999,
            background: '#FFFFFF',
            border: '1px solid rgba(15, 23, 42, 0.18)',
            boxShadow: '0 6px 18px rgba(15, 23, 42, 0.28)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {showInput ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginTop: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.78 }}>HEX</span>
            <input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={commitInputValue}
              onKeyDown={handleInputKeyDown}
              spellCheck={false}
              style={{
                height: 42,
                borderRadius: 14,
                border: '1px solid rgba(148, 163, 184, 0.22)',
                background: 'rgba(15, 23, 42, 0.45)',
                color: '#F8FAFC',
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </label>
          <button
            type="button"
            onClick={commitInputValue}
            style={{
              alignSelf: 'end',
              height: 42,
              padding: '0 14px',
              border: '1px solid rgba(148, 163, 184, 0.22)',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#F8FAFC',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Apply
          </button>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginTop: 18 }}>
        {presets.map((preset) => {
          const presetValue = normalizeHexColor(preset.value) ?? DEFAULT_COLOR;
          const isActive = presetValue === activeHex;

          return (
            <button
              key={`${preset.label}-${presetValue}`}
              type="button"
              onClick={() => {
                commitColor(hexToHsva(presetValue), true);
              }}
              title={`${preset.label}: ${presetValue}`}
              style={{
                display: 'grid',
                gap: 6,
                justifyItems: 'center',
                padding: '10px 8px',
                borderRadius: 16,
                border: isActive
                  ? '1px solid rgba(255, 255, 255, 0.5)'
                  : '1px solid rgba(148, 163, 184, 0.18)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 10,
                  background: presetValue,
                  boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.12)',
                }}
              />
              <span style={{ fontSize: 11, lineHeight: 1.2 }}>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
