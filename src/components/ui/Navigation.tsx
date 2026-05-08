'use client';

import { sections, socials } from '@/data/dados';
import { HoverLink } from './HoverLink';

export function Navigation() {
  return (
    <>
      <nav
        aria-label="Secções"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-bone/70">
          {sections.map((s, i) => (
            <li key={s.id}>
              <HoverLink
                href={`#${s.id}`}
                className="text-bone/70 transition-colors hover:text-bone"
              >
                <span className="mr-2 text-bone/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </HoverLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="Redes sociais"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 text-right lg:block"
      >
        <ul className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-bone/70">
          {socials.map((s) => (
            <li key={s.platform}>
              <HoverLink
                href={s.url}
                external
                className="text-bone/70 transition-colors hover:text-bone"
              >
                {s.label}
              </HoverLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
