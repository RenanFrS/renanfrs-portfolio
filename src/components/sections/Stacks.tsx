'use client';

import { stacks } from '@/data/dados';
import { LogoLoop } from '../ui/LogoLoop';

export function Stacks() {
  return (
    <section id="stacks" className="relative py-20 sm:py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-10 text-center sm:mb-14 md:mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-bone/40 sm:text-xs sm:tracking-[0.4em]">
            — Minhas Stacks
          </span>
        </header>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-20 md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-20 md:w-32" />
        <LogoLoop items={stacks} speed={45} />
      </div>
    </section>
  );
}
