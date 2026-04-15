import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import {
  DEFAULT_COLOR,
  clamp,
  createColorWheelCells,
  getClosestColorWheelCell,
  getClosestColorWheelCellFromPoint,
  getReadableTextColor,
  hexToHsva,
  hsvaToHex,
  normalizeHexColor,
  type HsvaColor,
} from './colorMath.js';

const OCTAGON_CLIP_PATH = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

export interface ColorPickerPreset {
  label: string;
  value: string;
}

export type ColorPickerBoardAppearance = 'default' | 'unstyled';
export type ColorPickerBoardVariant = 'wheel' | 'classic';
export type ColorPickerBoardSlot =
  | 'root'
  | 'header'
  | 'eyebrow'
  | 'title'
  | 'selectedValue'
  | 'wheel'
  | 'wheelCell'
  | 'board'
  | 'boardSaturationOverlay'
  | 'boardValueOverlay'
  | 'boardHandle'
  | 'hue'
  | 'hueHandle'
  | 'inputRow'
  | 'inputLabel'
  | 'inputLabelText'
  | 'input'
  | 'inputButton'
  | 'presets'
  | 'presetButton'
  | 'presetSwatch'
  | 'presetLabel';
export type ColorPickerBoardSlotClassNames = Partial<
  Record<ColorPickerBoardSlot, string>
>;
export type ColorPickerBoardSlotStyles = Partial<
  Record<ColorPickerBoardSlot, CSSProperties>
>;

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
  variant?: ColorPickerBoardVariant;
  appearance?: ColorPickerBoardAppearance;
  classNames?: ColorPickerBoardSlotClassNames;
  styles?: ColorPickerBoardSlotStyles;
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

function joinClassNames(...values: Array<string | undefined>): string | undefined {
  const className = values.filter(Boolean).join(' ').trim();

  return className.length > 0 ? className : undefined;
}

export function ColorPickerBoard({
  value,
  defaultValue = DEFAULT_COLOR,
  onChange,
  onChangeComplete,
  presets = DEFAULT_COLOR_PRESETS,
  label = 'Color picker',
  showInput = true,
  size = 280,
  className,
  variant = 'wheel',
  appearance = 'default',
  classNames,
  styles,
}: ColorPickerBoardProps) {
  const initialHex = normalizeHexColor(value) ?? normalizeHexColor(defaultValue) ?? DEFAULT_COLOR;
  const [internalHex, setInternalHex] = useState(initialHex);
  const [currentColor, setCurrentColor] = useState<HsvaColor>(hexToHsva(initialHex));
  const [inputValue, setInputValue] = useState(initialHex);
  const [isBoardDragging, setIsBoardDragging] = useState(false);
  const [isHueDragging, setIsHueDragging] = useState(false);
  const [isPaletteDragging, setIsPaletteDragging] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  const resolvedHex = normalizeHexColor(value) ?? internalHex;
  const activeHex = normalizeHexColor(resolvedHex) ?? DEFAULT_COLOR;
  const wheelCells = useMemo(() => createColorWheelCells(size), [size]);
  const activeWheelCell = useMemo(
    () => getClosestColorWheelCell(currentColor, wheelCells),
    [currentColor, wheelCells],
  );

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
      h: ((nextColor.h % 360) + 360) % 360,
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

  function updateWheelFromPointer(clientX: number, clientY: number, notifyComplete = false): void {
    const palette = paletteRef.current;

    if (!palette) {
      return;
    }

    const nextCell = getClosestColorWheelCellFromPoint(clientX, clientY, palette, wheelCells);

    if (!nextCell) {
      return;
    }

    commitColor(nextCell.color, notifyComplete);
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

  function handleWheelPointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPaletteDragging(true);
    updateWheelFromPointer(event.clientX, event.clientY);
  }

  function handleWheelPointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!isPaletteDragging) {
      return;
    }

    updateWheelFromPointer(event.clientX, event.clientY);
  }

  function handleWheelPointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!isPaletteDragging) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsPaletteDragging(false);
    updateWheelFromPointer(event.clientX, event.clientY, true);
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

  function getSlotStyle(
    slot: ColorPickerBoardSlot,
    defaultStyle: CSSProperties,
    unstyledStyle: CSSProperties = {},
  ): CSSProperties {
    return {
      ...(appearance === 'unstyled' ? unstyledStyle : defaultStyle),
      ...styles?.[slot],
    };
  }

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

  const wheelStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'crosshair',
    touchAction: 'none',
    background:
      'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(148, 163, 184, 0.06) 34%, rgba(15, 23, 42, 0.25) 72%, rgba(15, 23, 42, 0.6) 100%)',
    boxShadow:
      'inset 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 12px 36px rgba(255, 255, 255, 0.04)',
  };

  return (
    <section
      className={joinClassNames(className, classNames?.root)}
      style={getSlotStyle('root', rootStyle, { width: size + 32 })}
      aria-label={label}
    >
      <div
        className={classNames?.header}
        style={getSlotStyle(
          'header',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 16,
          },
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 16,
          },
        )}
      >
        <div>
          <div
            className={classNames?.eyebrow}
            style={getSlotStyle(
              'eyebrow',
              {
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: 0.7,
              },
              {},
            )}
          >
            {variant === 'wheel' ? 'Chromatic Wheel' : 'Picker Board'}
          </div>
          <h3
            className={classNames?.title}
            style={getSlotStyle(
              'title',
              { margin: '6px 0 0', fontSize: 20, lineHeight: 1.1 },
              { margin: '6px 0 0' },
            )}
          >
            {label}
          </h3>
        </div>
        <div
          className={classNames?.selectedValue}
          aria-label={`Selected color ${activeHex}`}
          style={getSlotStyle(
            'selectedValue',
            {
              minWidth: 88,
              padding: '10px 12px',
              borderRadius: 16,
              background: activeHex,
              color: textColor,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 700,
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
            },
            {
              minWidth: 88,
              background: activeHex,
              color: textColor,
              textAlign: 'center',
            },
          )}
        >
          {activeHex}
        </div>
      </div>

      {variant === 'wheel' ? (
        <div
          ref={paletteRef}
          role="presentation"
          className={classNames?.wheel}
          style={getSlotStyle(
            'wheel',
            wheelStyle,
            {
              position: 'relative',
              width: size,
              height: size,
              borderRadius: '50%',
              overflow: 'hidden',
              cursor: 'crosshair',
              touchAction: 'none',
            },
          )}
          onPointerDown={handleWheelPointerDown}
          onPointerMove={handleWheelPointerMove}
          onPointerUp={handleWheelPointerUp}
          onPointerCancel={handleWheelPointerUp}
        >
          {wheelCells.map((cell) => {
            const isActive = activeWheelCell?.id === cell.id;

            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => {
                  commitColor(cell.color, true);
                }}
                title={`${cell.label}: ${cell.hex}`}
                aria-label={`${cell.label}: ${cell.hex}`}
                className={classNames?.wheelCell}
                style={getSlotStyle(
                  'wheelCell',
                  {
                    position: 'absolute',
                    left: cell.x,
                    top: cell.y,
                    width: cell.size,
                    height: cell.size,
                    clipPath: OCTAGON_CLIP_PATH,
                    border: 'none',
                    padding: 0,
                    background: cell.hex,
                    boxShadow: isActive
                      ? '0 0 0 2px rgba(248, 250, 252, 0.95), 0 0 0 6px rgba(15, 23, 42, 0.55), 0 10px 22px rgba(15, 23, 42, 0.32)'
                      : '0 0 0 1px rgba(15, 23, 42, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 120ms ease, box-shadow 120ms ease',
                    cursor: 'pointer',
                  },
                  {
                    position: 'absolute',
                    left: cell.x,
                    top: cell.y,
                    width: cell.size,
                    height: cell.size,
                    clipPath: OCTAGON_CLIP_PATH,
                    border: 'none',
                    padding: 0,
                    background: cell.hex,
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    cursor: 'pointer',
                  },
                )}
              />
            );
          })}
        </div>
      ) : (
        <>
          <div
            ref={boardRef}
            role="presentation"
            className={classNames?.board}
            style={getSlotStyle(
              'board',
              boardStyle,
              {
                position: 'relative',
                width: size,
                height: size,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'crosshair',
                backgroundColor: boardHue,
                touchAction: 'none',
              },
            )}
            onPointerDown={handleBoardPointerDown}
            onPointerMove={handleBoardPointerMove}
            onPointerUp={handleBoardPointerUp}
            onPointerCancel={handleBoardPointerUp}
          >
            <div
              className={classNames?.boardSaturationOverlay}
              style={getSlotStyle(
                'boardSaturationOverlay',
                {
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
                },
                {
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
                },
              )}
            />
            <div
              className={classNames?.boardValueOverlay}
              style={getSlotStyle(
                'boardValueOverlay',
                {
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
                },
                {
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
                },
              )}
            />
            <div
              className={classNames?.boardHandle}
              style={getSlotStyle(
                'boardHandle',
                {
                  position: 'absolute',
                  left: boardHandleLeft,
                  top: boardHandleTop,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF',
                  boxShadow:
                    '0 0 0 1px rgba(15, 23, 42, 0.35), 0 4px 14px rgba(15, 23, 42, 0.35)',
                  transform: 'translate(-50%, -50%)',
                },
                {
                  position: 'absolute',
                  left: boardHandleLeft,
                  top: boardHandleTop,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF',
                  transform: 'translate(-50%, -50%)',
                },
              )}
            />
          </div>

          <div
            ref={hueRef}
            role="presentation"
            className={classNames?.hue}
            style={getSlotStyle(
              'hue',
              {
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
              },
              {
                position: 'relative',
                width: size,
                height: 18,
                marginTop: 14,
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, #FF0000 0%, #FFFF00 16.66%, #00FF00 33.33%, #00FFFF 50%, #0000FF 66.66%, #FF00FF 83.33%, #FF0000 100%)',
                cursor: 'ew-resize',
                touchAction: 'none',
              },
            )}
            onPointerDown={handleHuePointerDown}
            onPointerMove={handleHuePointerMove}
            onPointerUp={handleHuePointerUp}
            onPointerCancel={handleHuePointerUp}
          >
            <div
              className={classNames?.hueHandle}
              style={getSlotStyle(
                'hueHandle',
                {
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
                },
                {
                  position: 'absolute',
                  left: hueHandleLeft,
                  top: '50%',
                  width: 14,
                  height: 26,
                  borderRadius: 999,
                  background: '#FFFFFF',
                  border: '1px solid currentColor',
                  transform: 'translate(-50%, -50%)',
                },
              )}
            />
          </div>
        </>
      )}

      {showInput ? (
        <div
          className={classNames?.inputRow}
          style={getSlotStyle(
            'inputRow',
            { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginTop: 16 },
            { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginTop: 16 },
          )}
        >
          <label
            className={classNames?.inputLabel}
            style={getSlotStyle('inputLabel', { display: 'grid', gap: 8 }, { display: 'grid', gap: 8 })}
          >
            <span
              className={classNames?.inputLabelText}
              style={getSlotStyle(
                'inputLabelText',
                { fontSize: 12, fontWeight: 600, opacity: 0.78 },
                {},
              )}
            >
              HEX
            </span>
            <input
              className={classNames?.input}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={commitInputValue}
              onKeyDown={handleInputKeyDown}
              spellCheck={false}
              style={getSlotStyle(
                'input',
                {
                  height: 42,
                  borderRadius: 14,
                  border: '1px solid rgba(148, 163, 184, 0.22)',
                  background: 'rgba(15, 23, 42, 0.45)',
                  color: '#F8FAFC',
                  padding: '0 14px',
                  fontSize: 14,
                  outline: 'none',
                },
                {},
              )}
            />
          </label>
          <button
            type="button"
            onClick={commitInputValue}
            className={classNames?.inputButton}
            style={getSlotStyle(
              'inputButton',
              {
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
              },
              { alignSelf: 'end' },
            )}
          >
            Apply
          </button>
        </div>
      ) : null}

      <div
        className={classNames?.presets}
        style={getSlotStyle(
          'presets',
          {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 10,
            marginTop: 18,
          },
          {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 10,
            marginTop: 18,
          },
        )}
      >
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
              className={classNames?.presetButton}
              style={getSlotStyle(
                'presetButton',
                {
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
                },
                {
                  display: 'grid',
                  gap: 6,
                  justifyItems: 'center',
                  cursor: 'pointer',
                },
              )}
            >
              <span
                className={classNames?.presetSwatch}
                style={getSlotStyle(
                  'presetSwatch',
                  {
                    width: 28,
                    height: 28,
                    borderRadius: 10,
                    background: presetValue,
                    boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.12)',
                  },
                  {
                    width: 28,
                    height: 28,
                    borderRadius: 10,
                    background: presetValue,
                  },
                )}
              />
              <span
                className={classNames?.presetLabel}
                style={getSlotStyle('presetLabel', { fontSize: 11, lineHeight: 1.2 }, {})}
              >
                {preset.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
