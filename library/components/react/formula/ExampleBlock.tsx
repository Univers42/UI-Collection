/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ExampleBlock.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 12:25:25 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 12:25:25 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import { cn } from '../../../icons/react/cn.js';

export interface ExampleBlockProps {
  code: string;
  onInsert?: (text: string) => void;
  onCopy?: (text: string) => void;
  className?: string;
}

function InsertIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M5 11L11 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3.5 8.5l2.5 2.5 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExampleBlock({ code, onInsert, onCopy, className }: Readonly<ExampleBlockProps>) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(code);
      onCopy?.(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn('flex items-start gap-1 group', className)}>
      <div className={cn('flex-1 p-1.5 rounded bg-surface-primary border border-line font-mono text-[11px] text-ink-body break-all leading-snug')}>
        {code}
      </div>
      <div className={cn('flex flex-col gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity')}>
        {onInsert ? (
          <button
            type="button"
            onClick={() => onInsert(code)}
            className={cn('p-1 rounded hover:bg-hover-accent-soft text-ink-muted hover:text-hover-accent-text transition-colors')}
            title="Insert into formula"
          >
            <InsertIcon className={cn('w-3 h-3')} />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            void handleCopy();
          }}
          className={cn('p-1 rounded hover:bg-hover-surface2 text-ink-muted hover:text-hover-text transition-colors')}
          title="Copy"
        >
          {copied ? <CheckIcon className={cn('w-3 h-3 text-success-text')} /> : <CopyIcon className={cn('w-3 h-3')} />}
        </button>
      </div>
    </div>
  );
}
