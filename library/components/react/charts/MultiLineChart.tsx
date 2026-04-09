/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MultiLineChart.tsx                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:24:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:24:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../icons/react/cn.js';
import { DEFAULT_CHART_COLORS, smoothLine } from './chartUtils.js';

export interface MultiLineBucketEntry {
  label: string;
  data: Record<string, number>;
}

export interface MultiLineSourceItem {
  date?: string | Date | null;
  category?: string | null;
}

export interface MultiLineSummaryItem {
  label: string;
  count: number;
}

export interface MultiLineChartProps {
  buckets: MultiLineBucketEntry[];
  categories?: string[];
  width?: number;
  height?: number;
  className?: string;
  showLegend?: boolean;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function buildMultiLineBuckets(
  items: MultiLineSourceItem[],
  categories: string[],
  summary: MultiLineSummaryItem[] = [],
  maxBuckets = 8,
): MultiLineBucketEntry[] {
  const bucketMap = new Map<string, Record<string, number>>();

  items.forEach((item) => {
    if (!item.date || !item.category || !categories.includes(item.category)) {
      return;
    }

    const date = item.date instanceof Date ? item.date : new Date(item.date);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!bucketMap.has(key)) {
      bucketMap.set(key, {});
    }

    const bucket = bucketMap.get(key);

    if (!bucket) {
      return;
    }

    bucket[item.category] = (bucket[item.category] ?? 0) + 1;
  });

  const buckets = Array.from(bucketMap.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-maxBuckets)
    .map(([key, data]) => {
      const [, month] = key.split('-');
      const label = MONTH_LABELS[Number.parseInt(month, 10) - 1] ?? key;
      return { label, data };
    });

  if (buckets.length >= 2) {
    return buckets;
  }

  const fallbackSize = Math.min(summary.length, maxBuckets);
  const fallbackBuckets: MultiLineBucketEntry[] = [];

  for (let index = 0; index < fallbackSize; index += 1) {
    const data: Record<string, number> = {};

    categories.forEach((category, categoryIndex) => {
      const base = summary[categoryIndex]?.count ?? 0;
      data[category] = Math.max(1, Math.round(base * (0.5 + Math.sin(index * 1.3 + categoryIndex * 2.1) * 0.5)));
    });

    fallbackBuckets.push({
      label: summary[index]?.label.slice(0, 4) || `P${index + 1}`,
      data,
    });
  }

  return fallbackBuckets;
}

export function MultiLineChart({
  buckets,
  categories,
  width = 380,
  height = 160,
  className,
  showLegend = true,
}: Readonly<MultiLineChartProps>) {
  const safeCategories = (categories && categories.length > 0
    ? categories
    : Array.from(new Set(buckets.flatMap((bucket) => Object.keys(bucket.data))))
  ).slice(0, 5);

  if (buckets.length < 2 || safeCategories.length === 0) {
    return null;
  }

  const padding = { top: 14, right: 14, bottom: 30, left: 14 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const values = buckets.flatMap((bucket) => safeCategories.map((category) => bucket.data[category] ?? 0));
  const maxValue = Math.max(...values, 1);
  const gridLines = [0.25, 0.5, 0.75, 1].map((factor) => padding.top + innerHeight * (1 - factor));

  return (
    <div className={cn('w-full', className)}>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className={cn('overflow-visible')}>
        <defs>
          {safeCategories.map((category, index) => (
            <linearGradient key={category} id={`mlGrad${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]} stopOpacity="0.15" />
              <stop offset="100%" stopColor={DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]} stopOpacity="0.01" />
            </linearGradient>
          ))}
        </defs>
        {gridLines.map((lineY) => (
          <line
            key={lineY}
            x1={padding.left}
            y1={lineY}
            x2={width - padding.right}
            y2={lineY}
            stroke="var(--color-chart-grid, #CBD5E1)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        ))}
        {safeCategories.map((category, seriesIndex) => {
          const points = buckets.map((bucket, bucketIndex) => ({
            x: padding.left + (bucketIndex / Math.max(buckets.length - 1, 1)) * innerWidth,
            y: padding.top + innerHeight - ((bucket.data[category] ?? 0) / maxValue) * innerHeight,
          }));
          const linePath = smoothLine(points);
          const color = DEFAULT_CHART_COLORS[seriesIndex % DEFAULT_CHART_COLORS.length];
          const lastPoint = points[points.length - 1];
          const areaPath = lastPoint
            ? `${linePath} L ${lastPoint.x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
            : '';

          return (
            <g key={category}>
              <path d={areaPath} fill={`url(#mlGrad${seriesIndex})`} />
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((point) => (
                <circle
                  key={`${category}-${point.x}-${point.y}`}
                  cx={point.x}
                  cy={point.y}
                  r="2.5"
                  fill="white"
                  stroke={color}
                  strokeWidth="1.5"
                />
              ))}
            </g>
          );
        })}
        {buckets.map((bucket, bucketIndex) => {
          const x = padding.left + (bucketIndex / Math.max(buckets.length - 1, 1)) * innerWidth;

          return (
            <text
              key={bucket.label}
              x={x}
              y={padding.top + innerHeight + 16}
              textAnchor="middle"
              className={cn('text-[7px] fill-fill-secondary font-medium')}
            >
              {bucket.label}
            </text>
          );
        })}
      </svg>
      {showLegend ? (
        <div className={cn('flex flex-wrap gap-x-3 gap-y-1 mt-2 px-1')}>
          {safeCategories.map((category, index) => (
            <div key={category} className={cn('flex items-center gap-1 text-[9px]')}>
              <div
                className={cn('w-2 h-2 rounded-full shrink-0')}
                style={{ backgroundColor: DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length] }}
              />
              <span className={cn('text-ink-secondary truncate max-w-[70px]')}>{category}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
