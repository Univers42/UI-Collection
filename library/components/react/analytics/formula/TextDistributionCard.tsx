/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TextDistributionCard.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:26:20 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:26:20 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../../icons/react/cn.js';
import { DEFAULT_CHART_COLORS } from '../../charts/chartUtils.js';

export interface TextDistributionCardProps {
  title: string;
  expression: string;
  textValues: Record<string, number>;
  total?: number;
}

function MiniDonut({ data, size = 100 }: Readonly<{ data: [string, number][]; size?: number }>) {
  const total = data.reduce((sum, [, count]) => sum + count, 0);

  if (total === 0) {
    return null;
  }

  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={cn('shrink-0')}>
      {data.map(([label, count], index) => {
        const percent = count / total;
        const dasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
        const rotation = cumulativePercent * 360 - 90;
        cumulativePercent += percent;

        return (
          <circle
            key={label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]}
            strokeWidth={14}
            strokeDasharray={dasharray}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
        );
      })}
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle" className={cn('text-sm font-bold fill-fill-primary')}>
        {total}
      </text>
    </svg>
  );
}

export function TextDistributionCard({
  title,
  expression,
  textValues,
  total,
}: Readonly<TextDistributionCardProps>) {
  const sorted = Object.entries(textValues).sort((left, right) => right[1] - left[1]);
  const displayTotal = total ?? sorted.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5')}>
      <div className={cn('flex items-center gap-2 mb-1')}>
        <h3 className={cn('text-sm font-semibold text-ink')}>{title}</h3>
        <span className={cn('text-[10px] text-ink-muted ml-auto')}>{sorted.length} distinct values</span>
      </div>
      <p className={cn('text-[10px] text-ink-muted font-mono truncate mb-4')} title={expression}>
        {expression}
      </p>
      <div className={cn('flex items-center gap-6')}>
        <MiniDonut data={sorted.slice(0, 8)} size={100} />
        <div className={cn('flex-1 flex flex-col gap-1.5 overflow-auto max-h-48')}>
          {sorted.slice(0, 10).map(([label, count], index) => {
            const percent = displayTotal > 0 ? Math.round((count / displayTotal) * 100) : 0;

            return (
              <div key={label}>
                <div className={cn('flex justify-between text-xs mb-0.5')}>
                  <span className={cn('text-ink-body font-medium truncate max-w-[180px]')}>{label}</span>
                  <span className={cn('text-ink-muted tabular-nums ml-2')}>
                    {count} ({percent}%)
                  </span>
                </div>
                <div className={cn('w-full bg-surface-tertiary rounded-full h-1.5')}>
                  <div
                    className={cn('h-1.5 rounded-full transition-all')}
                    style={{
                      width: `${percent}%`,
                      backgroundColor: DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
