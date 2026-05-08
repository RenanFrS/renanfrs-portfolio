import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Renan Rocha — Full-stack Developer @ FrS',
  description:
    'Portfólio cinemático de Renan Rocha, full-stack developer focado em produtos digitais com performance, design e propósito.',
  metadataBase: new URL('https://renanrocha.dev'),
  openGraph: {
    title: 'Renan Rocha — Full-stack Developer @ FrS',
    description:
      'Portfólio cinemático de Renan Rocha, full-stack developer focado em produtos digitais com performance, design e propósito.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport: Viewport = {
  themeColor: '#070708',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn(body.variable, display.variable, "font-sans", geist.variable)}>
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  );
}
