/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BarCharts.tsx                                      :+:      :+:    :+:   */
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

export interface BarChartProps {
  chartData: ChartDataItem[];
  maxValue: number;
}

export function VerticalBarChart({ chartData, maxValue }: Readonly<BarChartProps>) {
  const safeMaxValue = Math.max(maxValue, 1);
  const barWidth = Math.max(24, Math.min(64, 600 / Math.max(chartData.length, 1)));
  const chartWidth = Math.max(600, chartData.length * (barWidth + 16));
  const chartHeight = 300;

  return (
    <div className={cn('flex-1 overflow-auto p-8 bg-surface-primary')}>
      <div className={cn('flex flex-col items-center')}>
        <svg width={chartWidth} height={chartHeight + 60} className={cn('overflow-visible')}>
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <g key={pct}>
              <line
                x1={40}
                y1={chartHeight * (1 - pct) + 10}
                x2={chartWidth - 20}
                y2={chartHeight * (1 - pct) + 10}
                stroke="var(--color-chart-grid, #CBD5E1)"
                strokeWidth={1}
              />
              <text
                x={36}
                y={chartHeight * (1 - pct) + 14}
                textAnchor="end"
                fontSize={11}
                fill="var(--color-chart-tick, #64748B)"
              >
                {Math.round(safeMaxValue * pct)}
              </text>
            </g>
          ))}

          {chartData.map((datum, index) => {
            const barHeight = (datum.value / safeMaxValue) * chartHeight;
            const x = 50 + index * (barWidth + 16);
            const y = chartHeight - barHeight + 10;

            return (
              <g key={datum.label}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={datum.color}
                  rx={4}
                  className={cn('transition-all duration-200 hover:opacity-80')}
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 28}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--color-chart-label, #334155)"
                  className={cn('select-none')}
                >
                  {datum.label.length > 10 ? `${datum.label.slice(0, 10)}…` : datum.label}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--color-chart-axis, #0F172A)"
                  fontWeight={600}
                >
                  {datum.value % 1 === 0 ? datum.value : datum.value.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function HorizontalBarChart({ chartData, maxValue }: Readonly<BarChartProps>) {
  const safeMaxValue = Math.max(maxValue, 1);
  const barHeight = 28;
  const chartWidth = 500;
  const labelWidth = 120;

  return (
    <div className={cn('flex-1 overflow-auto p-8 bg-surface-primary')}>
      <div className={cn('max-w-2xl mx-auto')}>
        <svg width={chartWidth + labelWidth + 60} height={chartData.length * (barHeight + 8) + 20}>
          {chartData.map((datum, index) => {
            const barWidth = (datum.value / safeMaxValue) * chartWidth;
            const y = index * (barHeight + 8) + 10;

            return (
              <g key={datum.label}>
                <text
                  x={labelWidth - 8}
                  y={y + barHeight / 2 + 4}
                  textAnchor="end"
                  fontSize={12}
                  fill="var(--color-chart-axis, #0F172A)"
                >
                  {datum.label.length > 16 ? `${datum.label.slice(0, 16)}…` : datum.label}
                </text>
                <rect
                  x={labelWidth}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={datum.color}
                  rx={4}
                  className={cn('transition-all duration-200 hover:opacity-80')}
                />
                <text
                  x={labelWidth + barWidth + 8}
                  y={y + barHeight / 2 + 4}
                  fontSize={12}
                  fill="var(--color-chart-axis, #0F172A)"
                  fontWeight={600}
                >
                  {datum.value % 1 === 0 ? datum.value : datum.value.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
