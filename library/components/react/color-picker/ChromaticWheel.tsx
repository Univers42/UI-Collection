import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import {
  DEFAULT_COLOR,
  createColorWheelCells,
  getClosestColorWheelCell,
  getClosestColorWheelCellFromPoint,
  hexToHsva,
  normalizeHexColor,
  type ColorWheelCell,
} from './colorMath.js';

const OCTAGON_CLIP_PATH =
  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

export type ChromaticWheelSlot = 'root' | 'cell';
export type ChromaticWheelSlotClassNames = Partial<Record<ChromaticWheelSlot, string>>;
export type ChromaticWheelSlotStyles = Partial<Record<ChromaticWheelSlot, CSSProperties>>;

export interface ChromaticWheelCellState {
  cell: ColorWheelCell;
  isActive: boolean;
}

export interface ChromaticWheelProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  size?: number;
  className?: string;
  ariaLabel?: string;
  classNames?: ChromaticWheelSlotClassNames;
  styles?: ChromaticWheelSlotStyles;
  getCellStyle?: (state: ChromaticWheelCellState) => CSSProperties | undefined;
}

function joinClassNames(...values: Array<string | undefined>): string | undefined {
  const className = values.filter(Boolean).join(' ').trim();

  return className.length > 0 ? className : undefined;
}

export function ChromaticWheel({
  value,
  defaultValue = DEFAULT_COLOR,
  onChange,
  onChangeComplete,
  size = 280,
  className,
  ariaLabel = 'Chromatic wheel',
  classNames,
  styles,
  getCellStyle,
}: ChromaticWheelProps) {
  const initialHex =
    normalizeHexColor(value) ?? normalizeHexColor(defaultValue) ?? DEFAULT_COLOR;
  const [internalHex, setInternalHex] = useState(initialHex);
  const [isDragging, setIsDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const activeHex = normalizeHexColor(value) ?? internalHex;
  const normalizedActiveHex = normalizeHexColor(activeHex) ?? DEFAULT_COLOR;
  const activeColor = useMemo(() => hexToHsva(normalizedActiveHex), [normalizedActiveHex]);
  const wheelCells = useMemo(() => createColorWheelCells(size), [size]);
  const activeWheelCell = useMemo(
    () => getClosestColorWheelCell(activeColor, wheelCells),
    [activeColor, wheelCells],
  );

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    const normalized =
      normalizeHexColor(value) ?? normalizeHexColor(defaultValue) ?? DEFAULT_COLOR;

    setInternalHex(normalized);
  }, [value, defaultValue]);

  function commitHex(nextHex: string, notifyComplete = false): void {
    const normalized = normalizeHexColor(nextHex);

    if (!normalized) {
      return;
    }

    if (value === undefined) {
      setInternalHex(normalized);
    }

    onChange?.(normalized);

    if (notifyComplete) {
      onChangeComplete?.(normalized);
    }
  }

  function updateFromPointer(
    clientX: number,
    clientY: number,
    notifyComplete = false,
  ): void {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const nextCell = getClosestColorWheelCellFromPoint(clientX, clientY, root, wheelCells);

    if (!nextCell) {
      return;
    }

    commitHex(nextCell.hex, notifyComplete);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromPointer(event.clientX, event.clientY);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!isDragging) {
      return;
    }

    updateFromPointer(event.clientX, event.clientY);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!isDragging) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    updateFromPointer(event.clientX, event.clientY, true);
  }

  function handleCellClick(event: MouseEvent<HTMLButtonElement>, cell: ColorWheelCell): void {
    if (event.detail !== 0) {
      return;
    }

    commitHex(cell.hex, true);
  }

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={ariaLabel}
      className={joinClassNames(className, classNames?.root)}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'crosshair',
        touchAction: 'none',
        ...styles?.root,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {wheelCells.map((cell) => {
        const isActive = activeWheelCell?.id === cell.id;

        return (
          <button
            key={cell.id}
            type="button"
            title={`${cell.label}: ${cell.hex}`}
            aria-label={`${cell.label}: ${cell.hex}`}
            aria-pressed={isActive}
            data-active={isActive ? 'true' : undefined}
            className={classNames?.cell}
            style={{
              position: 'absolute',
              left: cell.x,
              top: cell.y,
              width: cell.size,
              height: cell.size,
              clipPath: OCTAGON_CLIP_PATH,
              margin: 0,
              padding: 0,
              appearance: 'none',
              border: 'none',
              background: cell.hex,
              cursor: 'pointer',
              transform: isActive ? 'scale(1.08)' : 'scale(1)',
              transformOrigin: 'center',
              transition: 'transform 120ms ease',
              ...getCellStyle?.({ cell, isActive }),
              ...styles?.cell,
            }}
            onClick={(event) => {
              handleCellClick(event, cell);
            }}
          />
        );
      })}
    </div>
  );
}
