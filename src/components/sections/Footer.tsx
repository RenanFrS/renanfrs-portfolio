'use client';

import Image from 'next/image';
import { footerCTA, legal, profile, sections, socials, stacks } from '@/data/dados';
import { TextRoll } from '@/components/ui/TextRoll';
import { LogoLoop } from '../ui/LogoLoop';

const workLinks = sections.filter((s) =>
  ['hero', 'projects', 'offtrack', 'socials'].includes(s.id),
);

export function Footer() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(245,245,244,0.6) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-14 md:px-10">
        {/* Tagline */}
        <div className="text-center">
          <h2
            className="font-display font-black uppercase leading-[0.88] tracking-tighter text-bone"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 8rem)' }}
          >
            {profile.tagline}
            <span className="text-neon">.</span>
          </h2>
        </div>

        {/* Three-column + photo overlapping stacks */}
        <div className="relative mt-10 sm:mt-14 md:mt-16">
          <div className="grid grid-cols-2 items-end gap-8 md:grid-cols-12 md:gap-10">
            {/* Left nav */}
            <nav aria-label="Páginas" className="order-1 self-center md:col-span-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-bone/40">From</span>
              <ul className="mt-3 space-y-1.5 font-display text-lg font-black uppercase tracking-tight text-bone sm:mt-4 sm:space-y-2 sm:text-2xl md:text-3xl">
                {workLinks.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="transition-colors hover:text-neon">
                      <TextRoll>{s.label}</TextRoll>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Center photo — negative margin bleeds into stacks strip */}
            <div className="relative order-3 col-span-2 z-10 md:order-2 md:col-span-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] sm:max-w-sm md:max-w-md -mb-[108px] sm:-mb-[124px]">
                <Image
                  fill
                  src={profile.footer}
                  alt={profile.name}
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 384px, 448px"
                />
              </div>
            </div>

            {/* Right socials */}
            <nav
              aria-label="Redes sociais"
              className="order-2 self-center text-right md:order-3 md:col-span-3"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-bone/40">
                Follow on
              </span>
              <ul className="mt-3 space-y-1.5 font-display text-lg font-black uppercase tracking-tight text-bone sm:mt-4 sm:space-y-2 sm:text-2xl md:text-3xl">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-neon"
                    >
                      <TextRoll>{s.label}</TextRoll>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Stacks strip — sits behind the photo (z-0) */}
          <div className="relative z-0 border-y border-bone/10 bg-ink/90 backdrop-blur-sm">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 py-5 opacity-60 grayscale sm:gap-x-10">
                      <LogoLoop items={stacks} speed={45} />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-bone/10 px-4 py-6 text-[10px] uppercase tracking-[0.3em] text-bone/50 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>

          <a
            href={footerCTA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-neon bg-neon/10 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-neon transition-all hover:bg-neon hover:text-ink"
          >
            <TextRoll>Entre em Contato</TextRoll>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path
                d="M2 8L8 2M8 2H4M8 2V6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-bone">
                  <TextRoll>{l.label}</TextRoll>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
