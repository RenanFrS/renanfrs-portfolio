'use client';

import { useState } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { DarkVeil } from '@/components/ui/DarkVeil';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { TopNav } from '@/components/ui/TopNav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Stacks } from '@/components/sections/Stacks';
import { OffTrack } from '@/components/sections/OffTrack';
import { Socials } from '@/components/sections/Socials';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [, setReady] = useState(false);

  return (
    <>
      <SmoothScroll />
      <Preloader onComplete={() => setReady(true)} />
      <DarkVeil />
      <TopNav />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Stacks />
        <OffTrack />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
