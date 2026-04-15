const DEFAULT_COLOR = '#4F46E5';

interface HsvaColor {
  h: number;
  s: number;
  v: number;
}

interface ColorWheelCell {
  id: string;
  label: string;
  hex: string;
  color: HsvaColor;
  x: number;
  y: number;
  size: number;
}

interface ColorWheelRingDefinition {
  count: number;
  saturation: number;
  value: number;
  rotationOffset: number;
}

const COLOR_WHEEL_RINGS: readonly ColorWheelRingDefinition[] = [
  { count: 8, saturation: 18, value: 100, rotationOffset: -90 },
  { count: 12, saturation: 34, value: 100, rotationOffset: -75 },
  { count: 16, saturation: 48, value: 100, rotationOffset: -79 },
  { count: 20, saturation: 62, value: 97, rotationOffset: -81 },
  { count: 24, saturation: 76, value: 94, rotationOffset: -83 },
  { count: 28, saturation: 92, value: 90, rotationOffset: -85 },
  { count: 32, saturation: 94, value: 74, rotationOffset: -86 },
  { count: 36, saturation: 92, value: 56, rotationOffset: -87 },
] as const;

const COLOR_WHEEL_NEUTRALS = [
  { id: 'neutral-white', label: 'White', value: '#FFFFFF' },
  { id: 'neutral-cloud', label: 'Cloud', value: '#F8FAFC' },
  { id: 'neutral-slate-100', label: 'Slate 100', value: '#E2E8F0' },
  { id: 'neutral-slate-300', label: 'Slate 300', value: '#CBD5E1' },
  { id: 'neutral-slate-500', label: 'Slate 500', value: '#94A3B8' },
  { id: 'neutral-slate-700', label: 'Slate 700', value: '#475569' },
  { id: 'neutral-slate-900', label: 'Slate 900', value: '#0F172A' },
] as const;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeHexColor(value: string | undefined): string | null {
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

export function hexToHsva(hex: string): HsvaColor {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsva(r, g, b);
}

export function hsvaToHex(color: HsvaColor): string {
  const { r, g, b } = hsvaToRgb(color);
  return rgbToHex(r, g, b);
}

export function getReadableTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.62 ? '#0F172A' : '#FFFFFF';
}

function getCircularHueDistance(a: number, b: number): number {
  const delta = Math.abs(a - b) % 360;
  return Math.min(delta, 360 - delta);
}

export function createColorWheelCells(size: number): ColorWheelCell[] {
  const cells: ColorWheelCell[] = [];
  const center = size / 2;
  const maxRadius = size / 2 - 18;
  const ringSpacing = maxRadius / (COLOR_WHEEL_RINGS.length + 1.3);
  const neutralRadius = ringSpacing * 0.78;
  const neutralCellSize = clamp(ringSpacing * 0.92, 16, 24);

  COLOR_WHEEL_NEUTRALS.forEach((neutral, index) => {
    if (index === 0) {
      cells.push({
        id: neutral.id,
        label: neutral.label,
        hex: neutral.value,
        color: hexToHsva(neutral.value),
        x: center - neutralCellSize / 2,
        y: center - neutralCellSize / 2,
        size: neutralCellSize,
      });
      return;
    }

    const angle =
      ((index - 1) / (COLOR_WHEEL_NEUTRALS.length - 1)) * Math.PI * 2 - Math.PI / 2;

    cells.push({
      id: neutral.id,
      label: neutral.label,
      hex: neutral.value,
      color: hexToHsva(neutral.value),
      x: center + Math.cos(angle) * neutralRadius - neutralCellSize / 2,
      y: center + Math.sin(angle) * neutralRadius - neutralCellSize / 2,
      size: neutralCellSize,
    });
  });

  COLOR_WHEEL_RINGS.forEach((ring, ringIndex) => {
    const radius = ringSpacing * (ringIndex + 1.45);
    const baseCellSize = ringSpacing * 0.94;
    const circumferentialCellSize = ((2 * Math.PI * radius) / ring.count) * 0.86;
    const cellSize = clamp(Math.min(baseCellSize, circumferentialCellSize), 16, 28);

    for (let slot = 0; slot < ring.count; slot += 1) {
      const hue = ((slot / ring.count) * 360 + ring.rotationOffset + 360) % 360;
      const angle = (hue - 90) * (Math.PI / 180);
      const color: HsvaColor = {
        h: hue,
        s: ring.saturation,
        v: ring.value,
      };
      const hex = hsvaToHex(color);

      cells.push({
        id: `ring-${ringIndex}-${slot}`,
        label: `Hue ${Math.round(hue)} / ${ring.saturation}% / ${ring.value}%`,
        hex,
        color,
        x: center + Math.cos(angle) * radius - cellSize / 2,
        y: center + Math.sin(angle) * radius - cellSize / 2,
        size: cellSize,
      });
    }
  });

  return cells;
}

export function getClosestColorWheelCell(
  target: HsvaColor,
  cells: readonly ColorWheelCell[],
): ColorWheelCell | null {
  if (cells.length === 0) {
    return null;
  }

  let closest = cells[0];
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (const cell of cells) {
    const hueDistance = getCircularHueDistance(target.h, cell.color.h) / 180;
    const saturationDistance = Math.abs(target.s - cell.color.s) / 100;
    const valueDistance = Math.abs(target.v - cell.color.v) / 100;
    const distance =
      hueDistance * 0.65 + saturationDistance * 0.2 + valueDistance * 0.25;

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = cell;
    }
  }

  return closest;
}

export function getClosestColorWheelCellFromPoint(
  clientX: number,
  clientY: number,
  container: HTMLDivElement,
  cells: readonly ColorWheelCell[],
): ColorWheelCell | null {
  const rect = container.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;

  let closest: ColorWheelCell | null = null;
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (const cell of cells) {
    const centerX = cell.x + cell.size / 2;
    const centerY = cell.y + cell.size / 2;
    const distance = Math.hypot(localX - centerX, localY - centerY);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = cell;
    }
  }

  return closest;
}

export type { ColorWheelCell, HsvaColor };
export { DEFAULT_COLOR };
