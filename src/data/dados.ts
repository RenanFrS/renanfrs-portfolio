export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'whatsapp';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  handle: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  url?: string;
  link?: string;
  imageUrl: string;
  year: string;
}

export interface Stack {
  name: string;
  iconUrl: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export type InterestSize = 'sm' | 'md' | 'lg' | 'xl' | 'tall';
export type InterestAlign = 'top' | 'middle' | 'bottom';
export type InterestTextPosition = 'top' | 'bottom';

export interface Interest {
  id: string;
  label: string;
  caption: string;
  imageUrl: string;
  size: InterestSize;
  align: InterestAlign;
  textPosition: InterestTextPosition;
  meta?: string;
}

export interface IGCard {
  id: string;
  size: 'sm' | 'md' | 'lg';
  caption: string;
  imageUrl: string;
  postUrl: string;
}

export const profile = {
  name: 'Renan Rocha',
  role: 'Full-stack Developer',
  company: 'FrS',
  tagline: 'ALWAYS BUILDING THE FUTURE',
  shortBio:
    'Sou desenvolvedor Full-stack, especializado em transformar problemas complexos em soluções digitais fluidas. Minha atuação foca no ecossistema TypeScript e JavaScript, onde construo interfaces resilientes que respeitam a jornada de quem as utiliza.',
  longBio:
    'Acredito que o desenvolvimento vai além da escrita do código... trata-se de arquitetura, automação e propósito. Trabalho com ferramentas como n8n para garantir que cada entrega seja escalável e eficiente, sempre com o olhar atento ao design e à experiência final do usuário.',
  location: 'Brasil',
  avatar: '/avatar.png',
  hero: '/hero.png',
  footer: '/footer.png',
};

export const socials: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/RenanFrS',
    handle: '@RenanFrS',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/renan-frs-rocha/',
    handle: 'in/renan-frs-rocha',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/renanrocha.01',
    handle: '@renanrocha.01',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/5511953911553',
    handle: '+55 11 95391-1553',
  },
];

export const stacks: Stack[] = [
  { name: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/f5f5f4' },
  { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/f5f5f4' },
  { name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/f5f5f4' },
  {name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/f5f5f4'},
  { name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/f5f5f4' },
  { name: 'PHP', iconUrl: 'https://cdn.simpleicons.org/php/f5f5f4' },
  { name: 'MySQL', iconUrl: 'https://cdn.simpleicons.org/mysql/f5f5f4' },
  { name: 'PayloadCMS', iconUrl: 'https://cdn.simpleicons.org/payloadcms/f5f5f4' },
  { name: 'Docker', iconUrl: 'https://cdn.simpleicons.org/docker/f5f5f4' },
  { name: 'n8n', iconUrl: 'https://cdn.simpleicons.org/n8n/f5f5f4' },
  {name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/f5f5f4'},
  {name: 'Three.js', iconUrl: 'https://cdn.simpleicons.org/three.js/f5f5f4'},
];

export const projects: Project[] = [
  {
    id: '01',
    title: 'Meu site de casamento',
    description:
      'Site de casamento com Next.JS, TypeScript e PayloadCMS, apresentando detalhes do evento, galeria,RSVP integrado e Lista de presentes personalizada.',
    stack: ['Next.js', 'TypeScript', 'PayloadCMS', 'PostgreSQL'],
    year: '2025',
    imageUrl: '/images/projects/project-01.png',
    link: '#',
  },
  {
    id: '02',
    title: 'Landing-Page CaluDJ',
    description:
      'Landing-page para a DJ do meu casamento, construída com Next.JS e PayloadCMS para fácil gestão de conteúdo e performance otimizada.',
    stack: ['PayloadCMS', 'Next.js', 'MongoDB'],
    year: '2026',
    imageUrl: '/images/projects/project-02.png',
    link: 'https://calu-dj-vintage.vercel.app/',
  },
  {
    id: '03',
    title: 'Landing-Page Giutelier',
    description:
      'Landing-page para a minha amiga Giulia, que é estilista italiana, construida para alcançar mais clientes e mostrar o portfólio dela, feita com Next.JS, TypeScript, React e Lenis para uma experiência interativa e visualmente atraente.',
    stack: ['Next.js', 'TypeScript', 'Lenis', 'React'],
    year: '2026',
    imageUrl: '/images/projects/project-03.png',
    link: 'https://giutelier.vercel.app/',
  },
  {
    id: '04',
    title: 'Landing-Page Passer Per La Mer',
    description:
      'Landing-page para meu amigo Kalew, Psicanalista, montada para ser minimalista, SEO bem estruturado, para que se torne referencia na área e alcance mais clientes.',
    stack: ['Next.js', 'Lenis', 'TypeScript'],
    year: '2026',
    imageUrl: '/images/projects/project-04.png',
    link: 'https://passerperlamer.vercel.app/',
  },
];

export const sections: NavSection[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Quem Sou' },
  { id: 'projects', label: 'Projetos' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'offtrack', label: 'Off Track' },
  { id: 'socials', label: 'Socials' },
  { id: 'contact', label: 'Contacto' },
];

export const offTrackInterests: Interest[] = [
  {
    id: 'gaming',
    size: 'sm',
    align: 'top',
    textPosition: 'top',
    meta: 'GAMING / 2015',
    label: 'Gaming',
    caption: 'Para relaxar costumo jogar alguns jogos bem tranquilos e nada competitivos: CS, Overwatch, Valorant, LoL, FIFA... pouco competitivo graças a Deus',
    imageUrl: '/images/interests/gaming.jpeg',
  },
  {
    id: 'masterchef',
    size: 'xl',
    align: 'middle',
    textPosition: 'top',
    meta: 'MASTERCHEF / 2013',
    label: 'Masterchef',
    caption: 'Sempre gostei de comer bem, cozinhar virou hobby, vendia brigadeiro para comprar meu primeiro PC. Hoje, arrisco algumas receitas, acho que me dou bem rsrs.',
    imageUrl: '/images/interests/cozinha.jpeg',
  },
  {
    id: 'football',
    size: 'md',
    align: 'bottom',
    textPosition: 'bottom',
    meta: 'FUTEBOL / 2024',
    label: 'Futebol',
    caption: 'Semanalmente praticando o maior vicio, desde pequeno apaixonado por futebol. Pena que o joelho não permitiu seguir carreira profissional...',
    imageUrl: '/images/interests/futebol.jpeg',
  },
  {
    id: 'banda',
    size: 'lg',
    align: 'top',
    textPosition: 'bottom',
    meta: 'BANDA / 2025',
    label: 'Meraki',
    caption: 'Fundada em 2024, 4 amigos se juntam para tocar no casamento de um dos membros. coragem né? sou o guitarrista!',
    imageUrl: '/images/interests/guitarra.jpg',
  },
  {
    id: 'academia',
    size: 'tall',
    align: 'bottom',
    textPosition: 'top',
    meta: 'ACADEMIA / 2026',
    label: 'Academia',
    caption: '-30kg em 2020, transformando a academia em rotina, buscando manter o corpo e mente fortes.',
    imageUrl: '/images/interests/academia.jpeg',
  },
];

export const instagramFeed: IGCard[] = [
  { id: 'ig-1', size: 'lg', caption: 'Pre Wedding', imageUrl: '/images/socials/ig-01.jpg', postUrl: 'https://www.instagram.com/p/DWuIfExCfpD/?img_index=1' },
  { id: 'ig-2', size: 'sm', caption: 'Pedido', imageUrl: '/images/socials/ig-02.jpg', postUrl: 'https://www.instagram.com/p/DPJ0csCETm4OtnjMpGOi5Ah_aFZcPPaV6zVVT00/?img_index=1' },
  { id: 'ig-3', size: 'md', caption: 'Casamento', imageUrl: '/images/socials/ig-03.jpg', postUrl: 'https://www.instagram.com/p/DLNWIqVOdLu/?img_index=1' },
  { id: 'ig-4', size: 'sm', caption: 'Passeio', imageUrl: '/images/socials/ig-04.jpg', postUrl: 'https://www.instagram.com/p/DBe00Y3Sxut/?img_index=1' },
  { id: 'ig-5', size: 'md', caption: 'Viagem', imageUrl: '/images/socials/ig-05.jpg', postUrl: 'https://www.instagram.com/p/C1VQvkQvi_s/?img_index=1' },
  { id: 'ig-6', size: 'lg', caption: 'Show', imageUrl: '/images/socials/ig-06.jpg', postUrl: 'https://www.instagram.com/p/CytOFNLORmD/?img_index=1' },
];

export const outro = {
  greeting: 'Obrigado por chegares até aqui.',
  message:
    'Construir software é um exercício colectivo. Cada projecto que assino é fruto de horas de discussão, de literatura técnica devorada e — sobretudo — de equipas dispostas a discordar bem. Se algum dia cruzares estes pixels num servidor de produção, lembra-te: existe alguém deste lado a torcer pelo teu deploy.',
  signoff: 'Renan Rocha — Full-stack Developer @ FrS',
};

export const footerCTA = {
  label: 'Contacto via WhatsApp',
  url: 'https://wa.me/551195391553?text=Olá%20Renan!',
};

export const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Termos', href: '/terms' },
];
