'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/dados';

const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power4.out' } });

      tl.from('[data-hero-portrait]', { opacity: 0, scale: 1.04, duration: 1.5 })
        .fromTo(
          '[data-hero-fluid]',
          { opacity: 0 },
          { opacity: 1, duration: 1.6 },
          '-=0.9',
        )
        .from(
          '[data-hero-name-line]',
          { clipPath: 'inset(0 0 100% 0)', duration: 0.95, stagger: 0.16, ease: 'power3.out' },
          '-=1.2',
        )
        .from(
          '[data-hero-meta] > *',
          { opacity: 0, y: 12, duration: 0.55, stagger: 0.1 },
          '-=0.5',
        )
        .from('[data-hero-scroll]', { opacity: 0, y: 8, duration: 0.5 }, '-=0.2');
    }, ref);

    return () => ctx.revert();
  }, []);

  const nameParts = profile.name.split(' ');

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* ── Portrait ── */}
      <div
        data-hero-portrait
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center top-[12vh] sm:top-[8vh] md:top-[6vh]"
      >
        <div className="relative h-full w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px]">
          <Image
            src={profile.hero}
            alt={profile.name}
            fill
            priority
            className="object-cover object-top select-none"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 480px, 560px"
          />
          {/* gradient fades to blend into dark bg */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-ink to-transparent sm:h-[36%]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[16%] bg-gradient-to-r from-ink to-transparent sm:w-[22%] md:w-[28%]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[16%] bg-gradient-to-l from-ink to-transparent sm:w-[22%] md:w-[28%]" />
        </div>
      </div>

      {/* ── LiquidEther fluid overlay ──
        Cobre a section inteira. mix-blend-mode: screen mantém o portrait
        visível por baixo enquanto o fluido cria o efeito iridescente.
      */}
      <div
        data-hero-fluid
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          mixBlendMode: 'screen',
          opacity: 0,
        }}
      >
        <LiquidEther
          colors={['#00ff88', '#00d4ff', '#a855f7', '#ff8a00', '#ff44cc', '#00ff88']}
          mouseForce={22}
          cursorSize={130}
          autoDemo={true}
          autoSpeed={0.38}
          autoIntensity={2.4}
          autoResumeDelay={2500}
          autoRampDuration={0.9}
          resolution={0.5}
          iterationsPoisson={32}
          BFECC={true}
        />
      </div>

      {/* ── Identity block — top left (clears TopNav logo) ── */}
      <div className="pointer-events-none absolute left-4 right-4 top-20 z-20 sm:left-6 sm:right-auto sm:top-28 md:left-10 md:top-32">
        <div>
          {nameParts.map((part, i) => (
            <div
              key={i}
              data-hero-name-line
              className="overflow-hidden"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            >
              <span
                className="block font-display font-black uppercase text-bone leading-[0.82] tracking-tighter"
                style={{ fontSize: 'clamp(2.75rem, 12vw, 6.5rem)' }}
              >
                {part}
              </span>
            </div>
          ))}
        </div>

        <div data-hero-meta className="mt-3 flex flex-col gap-1 md:mt-5">
          <span className="text-[9px] uppercase tracking-[0.4em] text-bone/45 md:text-[10px] md:tracking-[0.45em]">
            {profile.role}
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-neon/75 md:text-[10px] md:tracking-[0.35em]">
            @ {profile.company}
          </span>
        </div>
      </div>

      {/* ── Location — bottom left ── */}
      <div
        data-hero-meta
        className="absolute bottom-16 left-4 z-20 sm:bottom-12 sm:left-6 md:bottom-16 md:left-10"
      >
        <span className="block text-[9px] uppercase tracking-[0.4em] text-bone/30 md:text-[10px] md:tracking-[0.45em]">
          {profile.location}
        </span>
      </div>

      {/* ── Scroll cue — bottom center ── */}
      <div
        data-hero-scroll
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span className="block h-6 w-px bg-gradient-to-b from-bone/30 to-transparent" />
      </div>
    </section>
  );
}
