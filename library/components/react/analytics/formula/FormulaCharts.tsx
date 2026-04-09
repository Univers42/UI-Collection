/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FormulaCharts.tsx                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:26:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:26:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../../icons/react/cn.js';

export interface FormulaTypeAnalyticsItem {
  resultType: string;
}

export interface FormulaErrorAnalyticsItem {
  propName: string;
  total: number;
  errors: number;
}

export interface FormulaComplexityAnalyticsItem {
  propName: string;
  expression: string;
}

const FORMULA_TYPE_COLORS: Record<string, string> = {
  number: 'var(--color-chart-1, #2563EB)',
  boolean: 'var(--color-chart-5, #10B981)',
  text: 'var(--color-chart-2, #7C3AED)',
  mixed: 'var(--color-chart-7, #EF4444)',
};

export function FormulaTypePie({ items }: Readonly<{ items: FormulaTypeAnalyticsItem[] }>) {
  const counts: Record<string, number> = {};

  items.forEach((item) => {
    counts[item.resultType] = (counts[item.resultType] ?? 0) + 1;
  });

  const entries = Object.entries(counts).sort((left, right) => right[1] - left[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (total === 0) {
    return <p className={cn('text-sm text-ink-muted text-center py-4')}>No formulas</p>;
  }

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const size = 120;
  let cumulativePercent = 0;

  return (
    <div className={cn('flex items-center gap-4')}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={cn('shrink-0')}>
        {entries.map(([type, count]) => {
          const percent = count / total;
          const dasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
          const rotation = cumulativePercent * 360 - 90;
          cumulativePercent += percent;

          return (
            <circle
              key={type}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={FORMULA_TYPE_COLORS[type] ?? 'var(--color-chart-8, #6366F1)'}
              strokeWidth={18}
              strokeDasharray={dasharray}
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            />
          );
        })}
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle" className={cn('text-lg font-bold fill-fill-primary')}>
          {total}
        </text>
      </svg>
      <div className={cn('flex flex-col gap-2')}>
        {entries.map(([type, count]) => (
          <div key={type} className={cn('flex items-center gap-2 text-xs')}>
            <div
              className={cn('w-3 h-3 rounded-full')}
              style={{ backgroundColor: FORMULA_TYPE_COLORS[type] ?? 'var(--color-chart-8, #6366F1)' }}
            />
            <span className={cn('text-ink-body capitalize font-medium')}>{type}</span>
            <span className={cn('text-ink-muted tabular-nums')}>
              {count} ({Math.round((count / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorBarChart({ items }: Readonly<{ items: FormulaErrorAnalyticsItem[] }>) {
  const entries = [...items].sort((left, right) => right.errors - left.errors);

  return (
    <div className={cn('flex flex-col gap-2.5 overflow-auto max-h-52')}>
      {entries.map((item) => {
        const errorRate = item.total > 0 ? (item.errors / item.total) * 100 : 0;
        const successRate = 100 - errorRate;

        return (
          <div key={item.propName}>
            <div className={cn('flex justify-between text-xs mb-0.5')}>
              <span className={cn('text-ink-body font-medium truncate')}>{item.propName}</span>
              <span className={cn(`tabular-nums ${item.errors > 0 ? 'text-danger-text-soft font-bold' : 'text-ink-muted'}`)}>
                {item.errors > 0 ? `${item.errors} err (${Math.round(errorRate)}%)` : '0 errors'}
              </span>
            </div>
            <div className={cn('w-full bg-surface-tertiary rounded-full h-2 overflow-hidden flex')}>
              <div className={cn('h-2 bg-success-vivid')} style={{ width: `${successRate}%` }} />
              {item.errors > 0 ? <div className={cn('h-2 bg-danger-vivid')} style={{ width: `${errorRate}%` }} /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getComplexityColor(percent: number): string {
  if (percent > 70) {
    return 'var(--color-chart-7, #EF4444)';
  }

  if (percent > 40) {
    return 'var(--color-chart-4, #F59E0B)';
  }

  return 'var(--color-chart-5, #10B981)';
}

export function ComplexityChart({ items }: Readonly<{ items: FormulaComplexityAnalyticsItem[] }>) {
  const entries = items
    .map((item) => {
      const functionCalls = (item.expression.match(/[a-zA-Z]+\(/g) || []).length;
      const depth = Math.max(
        ...Array.from(item.expression).reduce(
          (accumulator, character) => {
            const previousDepth = accumulator[accumulator.length - 1];

            if (character === '(') {
              accumulator.push((previousDepth ?? 0) + 1);
            } else if (character === ')') {
              accumulator.push((previousDepth ?? 1) - 1);
            }

            return accumulator;
          },
          [0] as number[],
        ),
      );

      return {
        name: item.propName,
        functionCalls,
        depth,
        score: functionCalls * 10 + depth * 5 + item.expression.length,
      };
    })
    .sort((left, right) => right.score - left.score);
  const maxScore = Math.max(...entries.map((entry) => entry.score), 1);

  return (
    <div className={cn('flex flex-col gap-2.5 overflow-auto max-h-52')}>
      {entries.map((entry) => {
        const percent = (entry.score / maxScore) * 100;

        return (
          <div key={entry.name}>
            <div className={cn('flex justify-between text-xs mb-0.5')}>
              <span className={cn('text-ink-body font-medium truncate')}>{entry.name}</span>
              <span className={cn('text-ink-muted tabular-nums')}>
                {entry.functionCalls} fn · depth {entry.depth}
              </span>
            </div>
            <div className={cn('w-full bg-surface-tertiary rounded-full h-2')}>
              <div
                className={cn('h-2 rounded-full transition-all')}
                style={{
                  width: `${percent}%`,
                  backgroundColor: getComplexityColor(percent),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
