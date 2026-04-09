/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SVGCharts.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:03:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:03:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../icons/react/cn.js';
import { DEFAULT_CHART_COLORS, smoothLine, type CountChartDatum } from './chartUtils.js';

export interface DonutChartProps {
  data: CountChartDatum[];
  size?: number;
}

export interface AreaChartProps {
  data: CountChartDatum[];
}

export interface ProgressRingProps {
  pct: number;
  color: string;
  size?: number;
}

export function DonutChart({ data, size = 120 }: Readonly<DonutChartProps>) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return null;
  }

  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, index) => {
        const percent = item.count / total;
        const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
        const rotation = cumulativePercent * 360 - 90;
        cumulativePercent += percent;

        return (
          <circle
            key={item.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={item.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]}
            strokeWidth={16}
            strokeDasharray={strokeDasharray}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            className={cn('transition-all duration-500')}
          />
        );
      })}
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className={cn('text-lg font-bold fill-fill-primary')}
      >
        {total}
      </text>
    </svg>
  );
}

export function AreaChartSVG({ data }: Readonly<AreaChartProps>) {
  if (data.length === 0) {
    return null;
  }

  const maxCount = Math.max(...data.map((item) => item.count), 1);
  const width = 300;
  const height = 140;
  const padding = { top: 12, right: 12, bottom: 28, left: 12 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const points = data.map((item, index) => ({
    x: padding.left + (index / Math.max(data.length - 1, 1)) * innerWidth,
    y: padding.top + innerHeight - (item.count / maxCount) * innerHeight,
    label: item.label,
    count: item.count,
  }));

  const linePath = smoothLine(points);
  const lastPoint = points[points.length - 1];
  const areaPath = lastPoint
    ? `${linePath} L ${lastPoint.x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
    : '';
  const gridLines = [0.25, 0.5, 0.75, 1].map((factor) => padding.top + innerHeight * (1 - factor));

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className={cn('overflow-visible')}>
      <defs>
        <linearGradient id="areaGradSmooth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-chart-1, #2563EB)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-chart-1, #2563EB)" stopOpacity="0.02" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {gridLines.map((y) => (
        <line
          key={y}
          x1={padding.left}
          y1={y}
          x2={width - padding.right}
          y2={y}
          stroke="var(--color-chart-grid, #CBD5E1)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
        />
      ))}
      <path d={areaPath} fill="url(#areaGradSmooth)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-chart-1, #2563EB)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-chart-1, #2563EB)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((point) => (
        <g key={point.label}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill="white"
            stroke="var(--color-chart-1, #2563EB)"
            strokeWidth="2"
          />
          <text
            x={point.x}
            y={padding.top + innerHeight + 16}
            textAnchor="middle"
            className={cn('text-[7px] fill-fill-secondary font-medium')}
          >
            {point.label.slice(0, 7)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProgressRing({ pct, color, size = 48 }: Readonly<ProgressRingProps>) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePct = Math.max(0, Math.min(100, pct));
  const dasharray = `${(safePct / 100) * circumference} ${circumference}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-chart-fill, #E2E8F0)"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={dasharray}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={cn('transition-all duration-500')}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className={cn('text-[9px] font-bold fill-fill-body')}
      >
        {Math.round(safePct)}%
      </text>
    </svg>
  );
}
