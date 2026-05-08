'use client';

import { cn } from '@/lib/utils';
import type { Stack } from '@/data/dados';

interface LogoLoopProps {
  items: Stack[];
  speed?: number;
  className?: string;
}

export function LogoLoop({ items, speed = 40, className }: LogoLoopProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex w-max gap-8 sm:gap-12 md:gap-16"
        style={{
          animation: `logoloop ${speed}s linear infinite`,
        }}
      >
        {doubled.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="flex h-16 shrink-0 items-center gap-3 px-2 text-bone/70 transition-colors hover:text-bone sm:h-20 sm:gap-4 sm:px-4"
          >
            <img
              src={s.iconUrl}
              alt={s.name}
              className="h-6 w-6 object-contain opacity-80 sm:h-8 sm:w-8"
            />
            <span className="font-display text-lg uppercase tracking-tight sm:text-xl md:text-2xl">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
