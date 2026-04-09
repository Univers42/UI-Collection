/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RelationRollupCharts.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:27:30 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:27:30 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { cn } from '../../../../icons/react/cn.js';
import { DEFAULT_CHART_COLORS } from '../../charts/chartUtils.js';
import { ProgressRing } from '../../charts/SVGCharts.js';

export interface RelationTargetSummary {
  id: string;
  name: string;
  targetName?: string;
  targetIcon?: React.ReactNode;
  isTwoWay?: boolean;
  totalLinks: number;
  pagesWithLinks: number;
  targetRecordCount?: number;
  color?: string;
}

export interface RollupDistributionItem {
  id?: string;
  label: string;
  value: number;
  color?: string;
}

export interface CompletionRingItem {
  id: string;
  label: string;
  pct: number;
  icon?: React.ReactNode;
}

export interface DataFlowNode {
  id: string;
  name: string;
  icon?: React.ReactNode;
  recordCount?: number;
}

export interface DataFlowConnection {
  id: string;
  label: string;
  totalLinks: number;
  isTwoWay?: boolean;
  target: DataFlowNode;
  color?: string;
}

function getCompletionStroke(percent: number): string {
  if (percent >= 80) {
    return 'var(--color-progress-high, #10B981)';
  }

  if (percent >= 50) {
    return 'var(--color-chart-1, #2563EB)';
  }

  if (percent >= 25) {
    return 'var(--color-chart-4, #F59E0B)';
  }

  return 'var(--color-chart-7, #EF4444)';
}

function renderIcon(icon: React.ReactNode, fallback: string) {
  return <>{icon ?? fallback}</>;
}

export function RelationMapSection({
  relationTargets,
  totalSourceRecords,
  title = 'Cross-Database Relations',
}: Readonly<{
  relationTargets: RelationTargetSummary[];
  totalSourceRecords: number;
  title?: string;
}>) {
  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5 shadow-sm')}>
      <h3 className={cn('text-sm font-semibold text-ink-body mb-4')}>{title}</h3>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3')}>
        {relationTargets.map((target, index) => (
          <div key={target.id} className={cn('flex items-center gap-3 p-3 rounded-lg bg-surface-secondary border border-line-light')}>
            <div
              className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-ink-inverse font-bold text-sm')}
              style={{ background: target.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length] }}
            >
              {target.name.charAt(0)}
            </div>
            <div className={cn('flex-1 min-w-0')}>
              <div className={cn('text-sm font-medium text-ink-strong truncate')}>{target.name}</div>
              <div className={cn('text-xs text-ink-secondary truncate')}>
                → {renderIcon(target.targetIcon, '📂')} {target.targetName ?? 'Unknown'}
                {target.isTwoWay ? <span className={cn('ml-1 text-accent-text-soft')}>⇄</span> : null}
              </div>
            </div>
            <div className={cn('text-right shrink-0')}>
              <div className={cn('text-lg font-bold text-ink-strong tabular-nums')}>{target.totalLinks}</div>
              <div className={cn('text-[10px] text-ink-muted')}>{target.pagesWithLinks}/{totalSourceRecords} linked</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FunctionDistSection({
  items,
  title = 'Rollup Functions Used',
}: Readonly<{
  items: RollupDistributionItem[];
  title?: string;
}>) {
  const total = Math.max(items.reduce((sum, item) => sum + item.value, 0), 1);

  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5 shadow-sm')}>
      <h3 className={cn('text-sm font-semibold text-ink-body mb-3')}>{title}</h3>
      <div className={cn('space-y-2')}>
        {[...items].sort((left, right) => right.value - left.value).map((item, index) => {
          const percent = (item.value / total) * 100;

          return (
            <div key={item.id ?? item.label} className={cn('flex items-center gap-2')}>
              <span className={cn('text-xs text-ink-secondary w-28 truncate font-mono')}>{item.label}</span>
              <div className={cn('flex-1 h-3 bg-surface-tertiary rounded-full overflow-hidden')}>
                <div
                  className={cn('h-full rounded-full transition-all')}
                  style={{ width: `${percent}%`, background: item.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length] }}
                />
              </div>
              <span className={cn('text-xs text-ink-body-light tabular-nums w-6 text-right')}>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DisplayFormatSection({
  items,
  title = 'Display Formats',
}: Readonly<{
  items: RollupDistributionItem[];
  title?: string;
}>) {
  const total = Math.max(items.reduce((sum, item) => sum + item.value, 0), 1);

  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5 shadow-sm')}>
      <h3 className={cn('text-sm font-semibold text-ink-body mb-3')}>{title}</h3>
      <div className={cn('flex items-center justify-center gap-6 py-4 flex-wrap')}>
        {items.map((item, index) => {
          const percent = Math.round((item.value / total) * 100);
          const radius = 40;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (percent / 100) * circumference;

          return (
            <div key={item.id ?? item.label} className={cn('flex flex-col items-center gap-2')}>
              <svg width="90" height="90" className={cn('-rotate-90')}>
                <circle cx="45" cy="45" r={radius} fill="none" stroke="var(--color-chart-fill, #E2E8F0)" strokeWidth="8" />
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  fill="none"
                  stroke={item.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className={cn('text-center -mt-1')}>
                <div className={cn('text-lg font-bold text-ink-strong')}>{item.value}</div>
                <div className={cn('text-[10px] text-ink-muted uppercase font-medium')}>{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CompletionRingsSection({
  items,
  title = 'Completion Rates',
}: Readonly<{
  items: CompletionRingItem[];
  title?: string;
}>) {
  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5 shadow-sm')}>
      <h3 className={cn('text-sm font-semibold text-ink-body mb-4')}>{title}</h3>
      <div className={cn('flex flex-wrap gap-5')}>
        {items.map((item) => (
          <div key={item.id} className={cn('flex flex-col items-center gap-1 w-20')}>
            <ProgressRing pct={item.pct} color={getCompletionStroke(item.pct)} size={52} />
            <span className={cn('text-xs font-bold text-ink-body')}>{item.pct}%</span>
            <span className={cn('text-[10px] text-ink-secondary truncate w-full text-center')} title={item.label}>
              {renderIcon(item.icon, '')} {item.label.length > 10 ? `${item.label.slice(0, 10)}…` : item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataFlowSection({
  source,
  connections,
  title = 'Data Flow',
}: Readonly<{
  source: DataFlowNode;
  connections: DataFlowConnection[];
  title?: string;
}>) {
  return (
    <div className={cn('bg-surface-primary rounded-xl border border-line p-5 shadow-sm')}>
      <h3 className={cn('text-sm font-semibold text-ink-body mb-4')}>{title}</h3>
      <div className={cn('flex flex-wrap gap-4 items-start')}>
        <div className={cn('flex flex-col items-center gap-3 min-w-[140px]')}>
          <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-brand-from to-gradient-brand-to flex items-center justify-center text-2xl shadow-lg')}>
            {renderIcon(source.icon, '🗂️')}
          </div>
          <div className={cn('text-sm font-semibold text-ink-strong text-center')}>{source.name}</div>
          <div className={cn('text-[10px] text-ink-muted')}>{source.recordCount ?? 0} records</div>
        </div>
        <div className={cn('flex-1 flex flex-wrap gap-3 ml-4')}>
          {connections.map((connection, index) => (
            <div key={connection.id} className={cn('flex items-center gap-2')}>
              <div className={cn('flex flex-col items-center')}>
                <div className={cn('text-[10px] text-ink-muted mb-1 whitespace-nowrap')}>{connection.label}</div>
                <div className={cn('w-12 h-px bg-surface-strong relative')}>
                  <div className={cn('absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-gray-400 border-y-[3px] border-y-transparent')} />
                  {connection.isTwoWay ? (
                    <div className={cn('absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[6px] border-r-gray-400 border-y-[3px] border-y-transparent')} />
                  ) : null}
                </div>
                <div className={cn('text-[10px] text-ink-muted mt-0.5')}>{connection.totalLinks} links</div>
              </div>
              <div className={cn('flex flex-col items-center gap-1')}>
                <div
                  className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-lg shadow-sm border border-line')}
                  style={{ background: `${connection.color ?? DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length]}15` }}
                >
                  {renderIcon(connection.target.icon, '📂')}
                </div>
                <div className={cn('text-xs text-ink-body-light text-center max-w-[80px] truncate')}>{connection.target.name}</div>
                <div className={cn('text-[10px] text-ink-muted')}>{connection.target.recordCount ?? 0} records</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
