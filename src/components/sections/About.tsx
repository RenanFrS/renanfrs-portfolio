'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/dados';

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-about-photo]', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from('[data-about-line]', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative px-4 py-20 sm:px-6 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div
            data-about-photo
            className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-md bg-bone/5 ring-1 ring-bone/10 sm:max-w-md md:max-w-none"
          >
            <Image
              fill
              src={profile.avatar}
              alt={profile.name}
              className="object-cover object-center"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.35em] text-bone/70 sm:bottom-4 sm:left-4 sm:text-xs sm:tracking-[0.4em]">
              {profile.location}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-bone/40 sm:text-xs sm:tracking-[0.4em]">
            — Quem Sou
          </span>
          <h2 className="mt-3 font-display font-bold leading-[1.05] text-bone sm:mt-4 sm:leading-tight"
              style={{ fontSize: 'clamp(2rem, 5.4vw, 3.75rem)' }}>
            <span className="block overflow-hidden">
              <span data-about-line className="block">Código com peso,</span>
            </span>
            <span className="block overflow-hidden">
              <span data-about-line className="block">design com propósito.</span>
            </span>
          </h2>

          <div className="mt-6 space-y-5 text-bone/70 sm:mt-10 sm:space-y-6 md:max-w-xl">
            <p className="overflow-hidden text-sm leading-relaxed text-pretty sm:text-base">
              <span data-about-line className="block">{profile.shortBio}</span>
            </p>
            <p className="overflow-hidden text-[13px] leading-relaxed text-pretty sm:text-sm">
              <span data-about-line className="block">{profile.longBio}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
