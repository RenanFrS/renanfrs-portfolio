'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/dados';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.overflow = '';
          setDone(true);
          onComplete?.();
        },
      });

      tl.from('[data-pre-letter]', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power4.out',
      })
        .from(
          '[data-pre-meta]',
          { opacity: 0, y: 16, duration: 0.6 },
          '-=0.4',
        )
        .to(
          '[data-pre-progress]',
          { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
          '-=0.2',
        )
        .to(
          '[data-pre-letter]',
          {
            yPercent: -110,
            duration: 0.7,
            stagger: 0.03,
            ease: 'power4.in',
          },
          '+=0.1',
        )
        .to(
          containerRef.current,
          { yPercent: -100, duration: 1, ease: 'expo.inOut' },
          '-=0.3',
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (done) return null;

  const letters = profile.name.toUpperCase().split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div className="overflow-hidden">
        <h1 className="flex font-display text-6xl font-black tracking-tight md:text-8xl">
          {letters.map((char, i) => (
            <span
              key={`${char}-${i}`}
              data-pre-letter
              className="inline-block"
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h1>
      </div>
      <p
        data-pre-meta
        className="mt-4 text-xs uppercase tracking-[0.4em] text-bone/60"
      >
        {profile.role} @ {profile.company}
      </p>
      <div className="mt-12 h-px w-48 origin-left scale-x-0 bg-bone/40" data-pre-progress />
    </div>
  );
}
