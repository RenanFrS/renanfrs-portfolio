'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { instagramFeed, sections, socials } from '@/data/dados';
import { TextRoll } from './TextRoll';

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const mosaic = [
  { className: 'left-[6%] top-[4%] w-[44%] aspect-[3/4]' },
  { className: 'right-[4%] top-[14%] w-[40%] aspect-[3/4]' },
  { className: 'left-[2%] bottom-[6%] w-[40%] aspect-[3/4]' },
  { className: 'right-[6%] bottom-[8%] w-[48%] aspect-[16/10]' },
];

function Seal() {
  return (
    <img
      src="/images/logo/logo.svg"
      alt=""
      className="h-16 w-auto opacity-80"
      aria-hidden="true"
    />
  );
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { threshold: [0.35] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(ref.current, { display: 'flex', autoAlpha: 0 });
        gsap.to(ref.current, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
        gsap.fromTo(
          '[data-menu-link]',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.07,
            delay: 0.15,
            ease: 'power3.out',
          },
        );
        gsap.fromTo(
          '[data-menu-img]',
          { autoAlpha: 0, scale: 0.92 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.1,
            ease: 'power3.out',
          },
        );
        gsap.fromTo(
          '[data-menu-meta]',
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.5,
            ease: 'power3.out',
          },
        );
      } else {
        gsap.to(ref.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (ref.current) gsap.set(ref.current, { display: 'none' });
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [open]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();
    window.setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const mosaicSources = [
    instagramFeed[0],
    instagramFeed[2],
    instagramFeed[3],
    instagramFeed[5],
  ].filter(Boolean);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      className="fixed inset-0 z-40 flex-col bg-[#0f110a]"
      style={{ display: 'none' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(rgba(245,245,244,0.5) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative flex h-full w-full flex-col px-6 pb-10 pt-24 md:px-12 md:pt-28">
        <div className="flex flex-1 flex-col gap-10 md:grid md:grid-cols-12 md:gap-12">
          <div className="relative hidden md:col-span-5 md:block">
            {mosaicSources.map((p, i) => (
              <div
                key={p.id}
                data-menu-img
                className={`absolute overflow-hidden rounded-md bg-bone/5 ring-1 ring-bone/10 ${mosaic[i]?.className ?? ''}`}
              >
                <Image
                  fill
                  src={p.imageUrl}
                  alt=""
                  className="object-cover object-center"
                  sizes="40vw"
                />
              </div>
            ))}
          </div>

          <nav
            aria-label="Navegação principal"
            className="flex flex-1 flex-col items-center justify-center text-center md:col-span-7 md:items-end md:text-right"
          >
            <ul className="space-y-1 md:space-y-2">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} className="overflow-hidden">
                    <a
                      data-menu-link
                      href={`#${s.id}`}
                      onClick={(e) => handleNavClick(e, s.id)}
                      className={`block font-display text-5xl font-black uppercase leading-[0.95] tracking-tight transition-colors md:text-7xl lg:text-8xl ${
                        isActive
                          ? 'text-bone/45 line-through decoration-neon decoration-[3px]'
                          : 'text-bone hover:text-neon'
                      }`}
                    >
                      <TextRoll>{s.label}</TextRoll>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div
              data-menu-meta
              className="mt-12 flex flex-col items-center md:items-end"
            >
              <Seal />
              <span className="mt-3 text-[10px] uppercase tracking-[0.4em] text-bone/50">
                Building since 2015
              </span>
            </div>
          </nav>
        </div>

        <div
          data-menu-meta
          className="mt-8 flex flex-col items-center gap-4 pt-6 text-[10px] uppercase tracking-[0.3em] text-bone/70 md:flex-row md:items-end md:justify-end md:gap-8"
        >
          <span className="font-bold tracking-[0.4em] text-bone">
            Entre em contato
          </span>
          <ul className="flex gap-4 md:gap-6">
            {socials.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  <TextRoll>{s.label}</TextRoll>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
