/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chartUtils.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:03:00 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:03:00 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface ChartDataItem {
  label: string;
  value: number;
  color: string;
}

export interface CountChartDatum {
  label: string;
  count: number;
  color?: string;
}

export const DEFAULT_CHART_COLORS = [
  'var(--color-chart-1, #2563EB)',
  'var(--color-chart-2, #7C3AED)',
  'var(--color-chart-3, #EC4899)',
  'var(--color-chart-4, #F59E0B)',
  'var(--color-chart-5, #10B981)',
  'var(--color-chart-6, #06B6D4)',
  'var(--color-chart-7, #EF4444)',
  'var(--color-chart-8, #6366F1)',
  'var(--color-chart-9, #84CC16)',
  'var(--color-chart-10, #F97316)',
] as const;

interface Point {
  x: number;
  y: number;
}

export function safeDisplayText(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => safeDisplayText(item)).join(', ');
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function smoothLine(points: Point[]): string {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    const point = points[0];
    return `M ${point.x} ${point.y}`;
  }

  const [first] = points;
  let path = `M ${first.x} ${first.y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` Q ${current.x} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`;
  }

  const last = points[points.length - 1];
  path += ` T ${last.x} ${last.y}`;

  return path;
}
