'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { instagramFeed, socials } from '@/data/dados';
import { TextRoll } from '@/components/ui/TextRoll';
import { cn } from '@/lib/utils';

export function Socials() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);

  const cards = instagramFeed.slice(0, 6);
  const socialLinks = socials.filter((s) => s.platform !== 'whatsapp');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-socials-title] span > span', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.from('[data-socials-card]', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('[data-socials-foot] > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 55%' },
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="socials"
      className="relative overflow-hidden bg-ink py-20 text-bone sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header data-socials-title className="text-center">
          <h2
            className="font-display font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7.5vw, 6rem)' }}
          >
            <span className="block overflow-hidden">
              <span className="inline-block">Minhas</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block">Postagens</span>
            </span>
          </h2>
        </header>

        <div className="mt-10 flex h-[58vh] min-h-[360px] gap-1.5 sm:mt-14 sm:h-[62vh] sm:min-h-[440px] sm:gap-2 md:mt-20 md:gap-3">
          {cards.map((card, i) => {
            const isActive = active === i;
            return (
              <div
                key={card.id}
                data-socials-card
                role="group"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                aria-label={`Post ${card.caption}`}
                className={cn(
                  'group relative h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-bone/5 ring-1 ring-bone/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.32,0.72,0.28,1)] sm:rounded-3xl',
                  isActive ? 'flex-[5]' : 'flex-[1]',
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  fill
                  src={card.imageUrl}
                  alt={card.caption}
                  className={cn(
                    'object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0.28,1)]',
                    isActive ? 'scale-100' : 'scale-110',
                  )}
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-500',
                    isActive ? 'opacity-100' : 'opacity-60',
                  )}
                />
                <div
                  className={cn(
                    'absolute bottom-4 left-4 right-4 text-left transition-all duration-500 sm:bottom-5 sm:left-5 sm:right-5',
                    isActive
                      ? 'translate-y-0 opacity-100 delay-200'
                      : 'pointer-events-none translate-y-4 opacity-0',
                  )}
                >
                  <h3
                    className="font-display font-black uppercase leading-[0.95] text-bone"
                    style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}
                  >
                    {card.caption}
                  </h3>
                  {card.postUrl ? (
                    <a
                      href={card.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Abrir post ${card.caption} no Instagram`}
                      className="mt-3 inline-block rounded-full border border-bone/50 bg-ink/40 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm transition hover:border-neon hover:text-neon focus:outline-none focus-visible:ring-2 focus-visible:ring-neon sm:text-[10px]"
                    >
                      <TextRoll>Ver mais</TextRoll>
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="mt-3 inline-block rounded-full border border-bone/30 bg-ink/40 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-bone/50 backdrop-blur-sm sm:text-[10px]"
                    >
                      Em breve
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          data-socials-foot
          className="mt-10 flex flex-col items-center gap-4 sm:mt-14 md:mt-16"
        >
          <p className="text-xs text-bone/70 sm:text-sm">
            Me siga nas redes sociais
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] sm:gap-6 sm:text-xs sm:tracking-[0.4em] md:gap-10 md:text-sm">
            {socialLinks.map((s) => (
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
        </div>
      </div>
    </section>
  );
}
