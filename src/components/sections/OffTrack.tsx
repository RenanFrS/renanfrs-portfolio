'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import {
  offTrackInterests,
  type InterestAlign,
  type InterestSize,
} from '@/data/dados';
import { ParticleField } from '../ui/ParticleField';

const SIZE: Record<InterestSize, string> = {
  sm: 'w-[55vw] min-w-[160px] max-w-[220px] h-[34vh] min-h-[180px] md:w-[18vw] md:max-w-none md:h-[34vh] md:min-h-[220px]',
  md: 'w-[64vw] min-w-[200px] max-w-[280px] h-[40vh] min-h-[220px] md:w-[24vw] md:max-w-none md:h-[44vh] md:min-h-[280px]',
  lg: 'w-[70vw] min-w-[230px] max-w-[340px] h-[44vh] min-h-[250px] md:w-[30vw] md:max-w-none md:h-[52vh] md:min-h-[340px]',
  xl: 'w-[76vw] min-w-[260px] max-w-[420px] h-[50vh] min-h-[280px] md:w-[36vw] md:max-w-none md:h-[62vh] md:min-h-[420px]',
  tall: 'w-[56vw] min-w-[180px] max-w-[260px] h-[52vh] min-h-[280px] md:w-[20vw] md:max-w-none md:h-[58vh] md:min-h-[380px]',
};

const TEXT_WIDTH: Record<InterestSize, string> = {
  sm: 'max-w-[55vw] min-w-[160px] md:max-w-[18vw] md:min-w-[200px]',
  md: 'max-w-[64vw] min-w-[200px] md:max-w-[24vw] md:min-w-[240px]',
  lg: 'max-w-[70vw] min-w-[230px] md:max-w-[28vw] md:min-w-[300px]',
  xl: 'max-w-[76vw] min-w-[260px] md:max-w-[32vw] md:min-w-[360px]',
  tall: 'max-w-[56vw] min-w-[180px] md:max-w-[20vw] md:min-w-[220px]',
};

const ALIGN: Record<InterestAlign, string> = {
  top: 'self-start mt-[26vh] md:mt-[14vh]',
  middle: 'self-center mt-[3vh] md:mt-0',
  bottom: 'self-end mb-[8vh] md:mb-[8vh]',
};

export function OffTrack() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="offtrack"
      className="relative h-screen overflow-hidden"
    >
      <ParticleField density={70} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />

      <div className="relative h-full">
        <header className="pointer-events-none absolute left-4 right-4 top-20 z-20 sm:left-6 sm:right-auto sm:top-28 md:top-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-bone/50 sm:text-xs sm:tracking-[0.4em]">
            — Off Track
          </span>
          <h2
            className="mt-2 font-display font-bold text-bone"
            style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3rem)' }}
          >
            Fora do código.
          </h2>
        </header>

        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-5 pl-[8vw] pr-[12vw] sm:gap-8 sm:pl-[16vw] sm:pr-[16vw] md:gap-12 md:pl-[22vw] md:pr-[22vw]"
        >
          {offTrackInterests.map((it) => {
            const sizeClass = SIZE[it.size];
            const alignClass = ALIGN[it.align];
            const textWidthClass = TEXT_WIDTH[it.size];

            const TextBlock = (
              <div className={textWidthClass}>
                {it.meta && (
                  <span className="block text-[9px] uppercase tracking-[0.35em] text-bone/40 sm:text-[10px] sm:tracking-[0.4em]">
                    {it.meta}
                  </span>
                )}
                <h3 className="mt-1.5 font-display text-lg font-medium text-bone sm:mt-2 sm:text-xl md:text-2xl">
                  {it.label}
                </h3>
                {it.caption && (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-bone/60 sm:text-xs md:text-[13px]">
                    {it.caption}
                  </p>
                )}
              </div>
            );

            return (
              <article
                key={it.id}
                className={`flex shrink-0 flex-col gap-3 sm:gap-4 ${alignClass}`}
              >
                {it.textPosition === 'top' && TextBlock}
                <div
                  className={`group relative overflow-hidden border border-bone/5 ${sizeClass}`}
                >
                  <Image
                    fill
                    src={it.imageUrl}
                    alt={it.label}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 76vw, 36vw"
                  />
                </div>
                {it.textPosition === 'bottom' && TextBlock}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
