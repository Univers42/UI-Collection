/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RelationRollupCards.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:27:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:27:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../../icons/react/cn.js';
import { DEFAULT_CHART_COLORS, safeDisplayText } from '../../charts/chartUtils.js';

export type RelationRollupValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | RelationRollupValue[];

export const RELATION_ROLLUP_COLORS = DEFAULT_CHART_COLORS;

const DISPLAY_BADGE_CLASSES: Record<string, string> = {
  bar: 'bg-accent-soft text-accent-text',
  ring: 'bg-purple-surface text-purple-text-bold',
  number: 'bg-surface-tertiary text-ink-body-light',
};

function formatBoolish(value: RelationRollupValue): string {
  if (value === true) {
    return '✓';
  }

  if (value === false) {
    return '✗';
  }

  return safeDisplayText(value);
}

function getRingStroke(percent: number): string {
  if (percent >= 80) {
    return 'var(--color-progress-high, #10B981)';
  }

  if (percent >= 50) {
    return 'var(--color-chart-1, #2563EB)';
  }

  return 'var(--color-chart-4, #F59E0B)';
}

export interface KpiCardProps {
  label: string;
  value: number | string;
  color?: string;
  className?: string;
}

export function KpiCard({ label, value, color, className }: Readonly<KpiCardProps>) {
  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-4 shadow-sm', className)}>
      <div className={cn('text-2xl font-bold tabular-nums')} style={color ? { color } : undefined}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className={cn('text-xs text-ink-secondary mt-1')}>{label}</div>
    </div>
  );
}

export function DisplayBadge({ format, className }: Readonly<{ format: string; className?: string }>) {
  const backgroundClass = DISPLAY_BADGE_CLASSES[format] ?? 'bg-surface-tertiary text-ink-body-light';
  return <span className={cn(`px-1.5 py-0.5 rounded text-[10px] font-medium ${backgroundClass}`, className)}>{format}</span>;
}

export interface RollupCellValueProps {
  value: RelationRollupValue;
  displayAs?: string;
  barMaxValue?: number;
  className?: string;
}

export function RollupCellValue({
  value,
  displayAs = 'number',
  barMaxValue = 15,
  className,
}: Readonly<RollupCellValueProps>) {
  if (value == null) {
    return <span className={cn('text-ink-disabled', className)}>—</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className={cn('text-ink-disabled', className)}>∅</span>;
    }

    const preview = value.slice(0, 3).map((item) => formatBoolish(item)).join(', ');

    return (
      <span className={cn('text-xs text-ink-secondary', className)} title={value.map((item) => safeDisplayText(item)).join(', ')}>
        [{value.length}] {preview}
        {value.length > 3 ? '…' : ''}
      </span>
    );
  }

  if (typeof value === 'boolean') {
    return <span className={className}>{value ? '✓' : '✗'}</span>;
  }

  if (typeof value === 'number') {
    if (displayAs === 'ring') {
      const percent = Math.min(100, Math.max(0, value));
      const radius = 7;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      return (
        <span className={cn('inline-flex items-center gap-1', className)}>
          <svg width="18" height="18" className={cn('-rotate-90 inline-block')}>
            <circle cx="9" cy="9" r={radius} fill="none" stroke="var(--color-chart-grid, #CBD5E1)" strokeWidth="2.5" />
            <circle
              cx="9"
              cy="9"
              r={radius}
              fill="none"
              stroke={getRingStroke(percent)}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          {percent}%
        </span>
      );
    }

    if (displayAs === 'bar') {
      const percent = Math.min(100, (value / Math.max(barMaxValue, 1)) * 100);

      return (
        <span className={cn('inline-flex items-center gap-1 min-w-[60px]', className)}>
          <span className={cn('inline-block w-10 h-1.5 bg-surface-tertiary rounded-full overflow-hidden')}>
            <span className={cn('block h-full bg-accent rounded-full')} style={{ width: `${percent}%` }} />
          </span>
          {value}
        </span>
      );
    }

    return <span className={className}>{value.toLocaleString()}</span>;
  }

  return <span className={cn('truncate max-w-[120px] inline-block', className)}>{safeDisplayText(value)}</span>;
}
