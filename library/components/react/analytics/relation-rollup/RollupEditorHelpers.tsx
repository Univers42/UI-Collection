/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RollupEditorHelpers.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:28:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:28:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../../icons/react/cn.js';

export type RollupFunctionGroup = 'Show' | 'Count' | 'Percent' | 'Math';
export type RollupDisplayAs = 'number' | 'bar' | 'ring';

export interface RollupFunctionOption {
  value: string;
  label: string;
  group: RollupFunctionGroup;
}

export interface RollupDisplayOption {
  value: RollupDisplayAs;
  label: string;
  icon: React.ReactNode;
}

function ChevronDownIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6.5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HashIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5.25 2.5L4 13.5M11.75 2.5L10.5 13.5M2.5 6h11M2 10h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2.5 13.5h11M4 11V7.5M8 11V4.5M12 11V6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="2" strokeDasharray="34.56 34.56" strokeDashoffset="8.64" />
    </svg>
  );
}

export const DEFAULT_ROLLUP_FUNCTIONS: RollupFunctionOption[] = [
  { value: 'show_original', label: 'Show original', group: 'Show' },
  { value: 'show_unique', label: 'Show unique values', group: 'Show' },
  { value: 'count_all', label: 'Count all', group: 'Count' },
  { value: 'count_values', label: 'Count values', group: 'Count' },
  { value: 'count_unique', label: 'Count unique values', group: 'Count' },
  { value: 'count_empty', label: 'Count empty', group: 'Count' },
  { value: 'count_not_empty', label: 'Count not empty', group: 'Count' },
  { value: 'percent_empty', label: 'Percent empty', group: 'Percent' },
  { value: 'percent_not_empty', label: 'Percent not empty', group: 'Percent' },
  { value: 'percent_checked', label: 'Percent checked', group: 'Percent' },
  { value: 'percent_unchecked', label: 'Percent unchecked', group: 'Percent' },
  { value: 'sum', label: 'Sum', group: 'Math' },
  { value: 'average', label: 'Average', group: 'Math' },
  { value: 'median', label: 'Median', group: 'Math' },
  { value: 'min', label: 'Minimum', group: 'Math' },
  { value: 'max', label: 'Maximum', group: 'Math' },
  { value: 'range', label: 'Range', group: 'Math' },
];

export const DISPLAY_OPTIONS: RollupDisplayOption[] = [
  { value: 'number', label: 'Number', icon: <HashIcon className={cn('w-3.5 h-3.5')} /> },
  { value: 'bar', label: 'Bar', icon: <BarIcon className={cn('w-3.5 h-3.5')} /> },
  { value: 'ring', label: 'Ring', icon: <RingIcon className={cn('w-3.5 h-3.5')} /> },
];

export function SectionHeader({ label }: Readonly<{ label: string }>) {
  return (
    <div className={cn('flex items-center px-3 pt-3 pb-1')}>
      <span className={cn('text-[11px] font-semibold text-ink-muted uppercase tracking-wider')}>{label}</span>
    </div>
  );
}

export function DropdownButton({
  label,
  muted,
  disabled,
  open,
  onClick,
}: Readonly<{
  label: string;
  muted?: boolean;
  disabled?: boolean;
  open?: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `w-full flex items-center justify-between px-2.5 py-2 rounded-md text-sm transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hover-surface cursor-pointer'
        } ${open ? 'bg-surface-secondary' : ''}`,
      )}
    >
      <span className={cn(`truncate ${muted ? 'text-ink-muted' : 'text-ink-body'}`)}>{label}</span>
      <ChevronDownIcon className={cn(`w-3.5 h-3.5 text-ink-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`)} />
    </button>
  );
}

export function PickerList({
  children,
  maxHeight = 192,
}: Readonly<{
  children: React.ReactNode;
  maxHeight?: number | string;
}>) {
  return (
    <div
      className={cn('mt-1 bg-surface-secondary rounded-lg border border-line-light overflow-y-auto')}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}

export function PickerItem({
  children,
  selected,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `w-full flex items-center gap-2 px-2.5 py-1.5 text-sm transition-colors ${
          selected ? 'bg-accent-soft text-accent-text font-medium' : 'text-ink-body hover:bg-hover-surface-white'
        }`,
      )}
    >
      {children}
    </button>
  );
}

export function FunctionSelector({
  value,
  onChange,
  showPicker,
  setShowPicker,
  functionOptions = DEFAULT_ROLLUP_FUNCTIONS,
}: Readonly<{
  value: string;
  onChange: (value: string) => void;
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
  functionOptions?: RollupFunctionOption[];
}>) {
  const selectedOption = functionOptions.find((option) => option.value === value);

  return (
    <>
      <SectionHeader label="Calculate" />
      <div className={cn('px-2 pb-1')}>
        <DropdownButton
          label={selectedOption?.label ?? 'Show original'}
          open={showPicker}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker ? (
          <PickerList maxHeight={224}>
            {(['Show', 'Count', 'Percent', 'Math'] as const).map((group) => {
              const items = functionOptions.filter((option) => option.group === group);

              return (
                <React.Fragment key={group}>
                  <div className={cn('px-2 pt-2 pb-0.5 text-[10px] font-semibold text-ink-muted uppercase tracking-wider')}>{group}</div>
                  {items.map((option) => (
                    <PickerItem
                      key={option.value}
                      selected={option.value === value}
                      onClick={() => {
                        onChange(option.value);
                        setShowPicker(false);
                      }}
                    >
                      <span className={cn('truncate')}>{option.label}</span>
                    </PickerItem>
                  ))}
                </React.Fragment>
              );
            })}
          </PickerList>
        ) : null}
      </div>
    </>
  );
}

export function DisplaySelector({
  fn,
  value,
  onChange,
  showPicker,
  setShowPicker,
  displayOptions = DISPLAY_OPTIONS,
  hideForFunctions = ['show_original', 'show_unique'],
}: Readonly<{
  fn?: string;
  value: RollupDisplayAs;
  onChange: (value: RollupDisplayAs) => void;
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
  displayOptions?: RollupDisplayOption[];
  hideForFunctions?: string[];
}>) {
  if (fn && hideForFunctions.includes(fn)) {
    return null;
  }

  return (
    <>
      <SectionHeader label="Display as" />
      <div className={cn('px-2 pb-2')}>
        <DropdownButton
          label={displayOptions.find((option) => option.value === value)?.label ?? 'Number'}
          open={showPicker}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker ? (
          <PickerList>
            {displayOptions.map((option) => (
              <PickerItem
                key={option.value}
                selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setShowPicker(false);
                }}
              >
                <span className={cn('text-ink-muted')}>{option.icon}</span>
                <span>{option.label}</span>
              </PickerItem>
            ))}
          </PickerList>
        ) : null}
      </div>
    </>
  );
}
