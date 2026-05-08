'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/dados';
import CardSwap, { Card } from '@/components/CardSwap';

const projectIcons: ReactNode[] = [
  <svg key="0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="12" height="8" stroke="currentColor" strokeWidth="1.4" rx="1" />
    <line x1="5" y1="13" x2="9" y2="13" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="1" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <ellipse cx="7" cy="3" rx="5" ry="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 3 V11 C 2 12 4.5 13 7 13 C 9.5 13 12 12 12 11 V3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 7 C 2 8 4.5 9 7 9 C 9.5 9 12 8 12 7" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="3" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="7" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    <line x1="3.7" y1="4.2" x2="6.3" y2="9.8" stroke="currentColor" strokeWidth="1.4" />
    <line x1="10.3" y1="4.2" x2="7.7" y2="9.8" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="3" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1 L8 5.5 L12.5 7 L8 8.5 L7 13 L6 8.5 L1.5 7 L6 5.5 Z" fill="currentColor" />
  </svg>,
];

type SwapDims = {
  width: number;
  height: number;
  cardDistance: number;
  verticalDistance: number;
};

const DESKTOP: SwapDims = { width: 460, height: 340, cardDistance: 70, verticalDistance: 75 };
const TABLET: SwapDims = { width: 380, height: 280, cardDistance: 55, verticalDistance: 60 };
const MOBILE: SwapDims = { width: 280, height: 220, cardDistance: 38, verticalDistance: 44 };

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [dims, setDims] = useState<SwapDims>(DESKTOP);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setDims(MOBILE);
      else if (w < 1024) setDims(TABLET);
      else setDims(DESKTOP);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-proj-heading] span > span', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        yPercent: 110,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <header className="md:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.35em] text-bone/40 sm:text-xs sm:tracking-[0.4em]">
            — Projetos Recentes
          </span>
          <h2
            data-proj-heading
            className="mt-3 font-display font-bold leading-[0.9] text-bone sm:mt-4"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)' }}
          >
            <span className="block overflow-hidden"><span className="inline-block">Cada</span></span>
            <span className="block overflow-hidden"><span className="inline-block">deploy</span></span>
            <span className="block overflow-hidden"><span className="inline-block">uma história.</span></span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-bone/60 sm:mt-8 sm:text-base">
            Seleção de meus ultimos projetos pessoais, construido para amigos e para minha vida pessoal, buscando facilitar a vida de dois noivos que trabalham bastante. Meus projetos buscam acima de tudo mostrar a personalidade do cliente, fazer a tecnologia alinhar com o propósito deles. Entregando assim além de tudo uma experiência única para os usuários.  
          </p>
        </header>

        <div className="relative h-[300px] sm:h-[420px] md:col-span-6 md:h-[480px]">
          <CardSwap
            key={`${dims.width}-${dims.height}`}
            width={dims.width}
            height={dims.height}
            cardDistance={dims.cardDistance}
            verticalDistance={dims.verticalDistance}
            delay={3000}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
          >
            {projects.map((p, i) => (
              <Card
                key={p.id}
                className="!border-bone/15 !bg-ink/95 overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-2 border-b border-bone/10 bg-ink px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-bone/70">
                  <span>{p.title}</span>
                </div>

                <div className="relative h-[calc(100%-44px)]">
                  <Image
                    fill
                    src={p.imageUrl}
                    alt={p.title}
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

                  <div className="relative flex h-full flex-col justify-end p-5">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/50">
                      <span>{p.id}</span>
                      <span>{p.year}</span>
                    </div>
                    <p className="mt-3 hidden text-sm leading-relaxed text-bone/85 sm:block">
                      {p.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5 text-[9px] uppercase tracking-[0.25em] text-bone/65">
                      {p.stack.slice(0, 3).map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-bone/20 px-2 py-0.5"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                    {p.link && p.link !== '#' && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-bone/30 bg-bone/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-bone/80 transition-colors hover:border-bone/60 hover:bg-bone/20 hover:text-bone"
                      >
                        Ver Projeto
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
