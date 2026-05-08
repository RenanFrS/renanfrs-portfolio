'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { outro } from '@/data/dados';

export function StarWarsOutro() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, {
        rotationX: 55,
        transformOrigin: '50% 100%',
        xPercent: -50,
      });

      gsap.fromTo(
        textRef.current,
        { y: '60vh' },
        {
          y: '-260vh',
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=280%',
            scrub: 1,
            pin: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-ink"
      style={{ perspective: '500px', perspectiveOrigin: '50% 50%' }}
      aria-label="Mensagem final"
    >
      <div
        ref={textRef}
        className="absolute bottom-0 left-1/2 w-[82vw] max-w-4xl text-center text-papaya"
        style={{ willChange: 'transform' }}
      >
        <p className="font-display text-3xl font-black italic uppercase leading-[0.95] sm:text-5xl md:text-7xl">
          {outro.greeting}
        </p>
        <p className="mt-6 font-display text-lg font-bold italic leading-snug text-pretty sm:mt-10 sm:text-2xl md:text-4xl">
          {outro.message}
        </p>
        <p className="mt-6 font-display text-xs font-bold italic uppercase tracking-[0.25em] sm:mt-10 sm:text-base md:text-xl">
          {outro.signoff}
        </p>
      </div>

      {/* Vanishing fade at the top — vanishing point */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3/5 bg-gradient-to-b from-ink via-ink/85 to-transparent" />
    </section>
  );
}
