/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DonutPieChart.tsx                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:03:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:03:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../icons/react/cn.js';
import type { ChartDataItem } from './chartUtils.js';

export interface DonutPieChartProps {
  chartData: ChartDataItem[];
  total: number;
  isDonut: boolean;
}

export function DonutPieChart({
  chartData,
  total,
  isDonut,
}: Readonly<DonutPieChartProps>) {
  const safeTotal = Math.max(total, 1);
  const size = 300;
  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = isDonut ? outerRadius * 0.55 : 0;

  let startAngle = -Math.PI / 2;
  const slices = chartData.map((datum) => {
    const angle = (datum.value / safeTotal) * Math.PI * 2;
    const slice = { ...datum, startAngle, endAngle: startAngle + angle };
    startAngle += angle;
    return slice;
  });

  function arcPath(start: number, end: number, radius: number): string {
    const x = centerX + radius * Math.cos(end);
    const y = centerY + radius * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return `A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y}`;
  }

  return (
    <div className={cn('flex-1 overflow-auto p-8 bg-surface-primary')}>
      <div className={cn('flex items-center justify-center gap-12')}>
        <svg width={size} height={size}>
          {slices.map((slice) => {
            const startX = centerX + outerRadius * Math.cos(slice.startAngle);
            const startY = centerY + outerRadius * Math.sin(slice.startAngle);
            const outerArc = arcPath(slice.startAngle, slice.endAngle, outerRadius);

            let path = '';

            if (innerRadius > 0) {
              const innerX = centerX + innerRadius * Math.cos(slice.endAngle);
              const innerY = centerY + innerRadius * Math.sin(slice.endAngle);
              const innerArc = arcPath(slice.endAngle, slice.startAngle, innerRadius);
              path = `M ${startX} ${startY} ${outerArc} L ${innerX} ${innerY} ${innerArc} L ${startX} ${startY} Z`;
            } else {
              path = `M ${centerX} ${centerY} L ${startX} ${startY} ${outerArc} Z`;
            }

            return (
              <path
                key={slice.label}
                d={path}
                fill={slice.color}
                stroke="white"
                strokeWidth={2}
                className={cn('transition-all duration-200 hover:opacity-80 cursor-pointer')}
              />
            );
          })}
          {isDonut ? (
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={24}
              fontWeight={700}
              fill="var(--color-chart-axis, #0F172A)"
            >
              {total}
            </text>
          ) : null}
        </svg>

        <div className={cn('flex flex-col gap-2')}>
          {chartData.map((datum) => (
            <div key={datum.label} className={cn('flex items-center gap-2')}>
              <div className={cn('w-3 h-3 rounded-sm shrink-0')} style={{ backgroundColor: datum.color }} />
              <span className={cn('text-sm text-ink-body')}>{datum.label}</span>
              <span className={cn('text-sm text-ink-muted tabular-nums ml-1')}>{datum.value}</span>
              <span className={cn('text-xs text-ink-muted')}>
                ({Math.round((datum.value / safeTotal) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
