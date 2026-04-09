/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   LineChart.tsx                                      :+:      :+:    :+:   */
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

export interface LineChartProps {
  chartData: ChartDataItem[];
  maxValue: number;
}

export function LineChart({ chartData, maxValue }: Readonly<LineChartProps>) {
  const safeMaxValue = Math.max(maxValue, 1);
  const chartWidth = Math.max(600, chartData.length * 80);
  const chartHeight = 300;
  const padding = { top: 20, right: 20, bottom: 50, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const points = chartData.map((datum, index) => ({
    x: padding.left + (index / Math.max(chartData.length - 1, 1)) * innerWidth,
    y: padding.top + innerHeight - (datum.value / safeMaxValue) * innerHeight,
    ...datum,
  }));

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const lastPoint = points[points.length - 1];
  const area =
    path +
    ` L ${lastPoint?.x ?? 0} ${padding.top + innerHeight}` +
    ` L ${points[0]?.x ?? 0} ${padding.top + innerHeight} Z`;

  return (
    <div className={cn('flex-1 overflow-auto p-8 bg-surface-primary')}>
      <div className={cn('flex flex-col items-center')}>
        <svg width={chartWidth} height={chartHeight}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-1, #2563EB)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--color-chart-1, #2563EB)" stopOpacity={0} />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line
                x1={padding.left}
                y1={padding.top + innerHeight * (1 - pct)}
                x2={padding.left + innerWidth}
                y2={padding.top + innerHeight * (1 - pct)}
                stroke="var(--color-chart-grid, #CBD5E1)"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={padding.top + innerHeight * (1 - pct) + 4}
                textAnchor="end"
                fontSize={11}
                fill="var(--color-chart-tick, #64748B)"
              >
                {Math.round(safeMaxValue * pct)}
              </text>
            </g>
          ))}
          {points.length > 1 ? <path d={area} fill="url(#lineGrad)" /> : null}
          {points.length > 1 ? (
            <path d={path} fill="none" stroke="var(--color-chart-1, #2563EB)" strokeWidth={2.5} />
          ) : null}
          {points.map((point) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r={4}
                fill="var(--color-chart-1, #2563EB)"
                stroke="white"
                strokeWidth={2}
              />
              <text
                x={point.x}
                y={padding.top + innerHeight + 20}
                textAnchor="middle"
                fontSize={11}
                fill="var(--color-chart-label, #334155)"
              >
                {point.label.length > 8 ? `${point.label.slice(0, 8)}…` : point.label}
              </text>
              <text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fontSize={11}
                fill="var(--color-chart-axis, #0F172A)"
                fontWeight={600}
              >
                {point.value % 1 === 0 ? point.value : point.value.toFixed(1)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
