/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ThemeToggle.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:25:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:25:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import { cn } from '../../../icons/react/cn.js';

export type ThemePreference = 'light' | 'dark' | 'system';

export interface ThemeToggleProps {
  value?: ThemePreference;
  defaultValue?: ThemePreference;
  onChange?: (value: ThemePreference) => void;
  className?: string;
  showLabel?: boolean;
  labels?: Partial<Record<ThemePreference, string>>;
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <line x1="8" y1="1" x2="8" y2="2.5" />
      <line x1="8" y1="13.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="2.5" y2="8" />
      <line x1="13.5" y1="8" x2="15" y2="8" />
      <line x1="3.05" y1="3.05" x2="4.11" y2="4.11" />
      <line x1="11.89" y1="11.89" x2="12.95" y2="12.95" />
      <line x1="3.05" y1="12.95" x2="4.11" y2="11.89" />
      <line x1="11.89" y1="4.11" x2="12.95" y2="3.05" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8.5a5.5 5.5 0 1 1-7-7 4.5 4.5 0 0 0 7 7z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2" width="13" height="9" rx="1.5" />
      <line x1="5.5" y1="14" x2="10.5" y2="14" />
      <line x1="8" y1="11" x2="8" y2="14" />
    </svg>
  );
}

const DEFAULT_THEME_LABELS: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const THEME_META: Record<ThemePreference, { icon: React.ReactNode }> = {
  light: { icon: <SunIcon /> },
  dark: { icon: <MoonIcon /> },
  system: { icon: <MonitorIcon /> },
};

export function cycleThemePreference(value: ThemePreference): ThemePreference {
  if (value === 'light') {
    return 'dark';
  }

  if (value === 'dark') {
    return 'system';
  }

  return 'light';
}

export function ThemeToggle({
  value,
  defaultValue = 'system',
  onChange,
  className,
  showLabel = true,
  labels,
}: Readonly<ThemeToggleProps>) {
  const [internalValue, setInternalValue] = useState<ThemePreference>(defaultValue);
  const resolvedValue = value ?? internalValue;
  const nextValue = cycleThemePreference(resolvedValue);
  const mergedLabels = { ...DEFAULT_THEME_LABELS, ...labels };
  const meta = THEME_META[resolvedValue];

  function handleClick() {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Theme: ${mergedLabels[resolvedValue]} - click to cycle`}
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-ink-secondary hover:bg-hover-surface hover:text-ink transition-colors text-xs',
        className,
      )}
    >
      {meta.icon}
      {showLabel ? <span className={cn('hidden sm:inline')}>{mergedLabels[resolvedValue]}</span> : null}
    </button>
  );
}
