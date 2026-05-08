'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/dados';
import { MenuOverlay } from './MenuOverlay';
import { TextRoll } from './TextRoll';

function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
      <path d="M0 1 H18" stroke="currentColor" strokeWidth="2" />
      <path d="M0 7 H18" stroke="currentColor" strokeWidth="2" />
      <path d="M0 13 H18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 2 L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 2 L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Monogram() {
  return (
    <img
      src="/images/logo/logo.svg"
      alt="FRS"
      className="h-16 w-auto"
      aria-hidden="true"
    />
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: [0, 0.3, 0.6] },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const [first, ...rest] = profile.name.split(' ');
  const last = rest.join(' ');

  const monogramVisible = onHero && !open;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto relative mx-auto flex max-w-[1400px] items-start justify-between p-6 md:p-8">
          <a
            href="#hero"
            className="flex flex-col font-display text-xl font-black uppercase leading-[0.85] tracking-tight text-bone transition-colors hover:text-neon md:text-2xl"
          >
            <TextRoll>{first}</TextRoll>
            {last ? <TextRoll>{last}</TextRoll> : null}
          </a>

          <a
            href="#hero"
            aria-label="Inicio"
            className={`pointer-events-auto absolute left-1/2 top-6 hidden -translate-x-1/2 items-center justify-center transition-opacity duration-500 md:top-8 md:flex ${
              monogramVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Monogram />
          </a>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-md bg-bone text-ink transition hover:scale-[1.03]"
            >
              {open ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
