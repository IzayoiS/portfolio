import { createReader } from '@keystatic/core/reader';
import type { ImageMetadata } from 'astro';
import keystaticConfig from '../../keystatic.config';

export type Lang = 'en' | 'id';
export const LANGS: readonly Lang[] = ['en', 'id'];

const reader = createReader(process.cwd(), keystaticConfig);

async function must<T>(p: Promise<T | null>, name: string): Promise<T> {
  const v = await p;
  if (!v) throw new Error(`Missing content: ${name}`);
  return v;
}

export async function loadContent() {
  const [profile, hero, services, process_, about, contact, projects] = await Promise.all([
    must(reader.singletons.profile.read(), 'profile'),
    must(reader.singletons.hero.read(), 'hero'),
    must(reader.singletons.services.read(), 'services'),
    must(reader.singletons.process.read(), 'process'),
    must(reader.singletons.about.read(), 'about'),
    must(reader.singletons.contact.read(), 'contact'),
    reader.collections.projects.all(),
  ]);
  projects.sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  return { profile, hero, services, process: process_, about, contact, projects };
}

// Keystatic stores images as "/src/assets/images/<file>"; map them to optimizable Astro assets.
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*', { eager: true });
export function asset(path: string | null): ImageMetadata | undefined {
  return path ? images[path]?.default : undefined;
}

// Headline uses *word* for the highlighted part.
export function emphasize(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export const ui = {
  en: {
    skip: 'Skip to content',
    nav: { work: 'Work', services: 'Services', process: 'Process', about: 'About', contact: 'Contact' },
    themeToggle: 'Toggle dark mode',
    language: 'Language',
    ctaStart: 'Start a project',
    ctaWork: 'See my work',
    highlights: 'Highlights',
    workLabel: 'Selected work',
    workIntro:
      'Every project lists the problem, what I built, and the result — so you can judge the fit before we talk.',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    technologies: 'Technologies',
    live: 'Live site',
    soon: 'Links coming soon',
    nextTitle: 'Your project here?',
    nextText: 'I take one or two projects at a time so each gets full attention.',
    nextCta: 'Tell me about it',
    servicesLabel: 'What I do',
    processLabel: 'How we work',
    aboutLabel: 'Who you work with',
    contactLabel: 'Say hello',
    mailSubject: 'Project inquiry',
    sectionIndex: 'Section index',
    backTop: 'Back to top',
    notFound: 'Page not found',
    notFoundText: "This page doesn't exist.",
    home: 'Back home',
  },
  id: {
    skip: 'Lewati ke konten',
    nav: { work: 'Karya', services: 'Layanan', process: 'Proses', about: 'Tentang', contact: 'Kontak' },
    themeToggle: 'Ganti mode gelap',
    language: 'Bahasa',
    ctaStart: 'Mulai proyek',
    ctaWork: 'Lihat karya',
    highlights: 'Sorotan',
    workLabel: 'Karya pilihan',
    workIntro:
      'Setiap proyek mencantumkan masalah, yang saya bangun, dan hasilnya — supaya Anda bisa menilai kecocokan sebelum kita ngobrol.',
    problem: 'Masalah',
    built: 'Dibangun',
    result: 'Hasil',
    technologies: 'Teknologi',
    live: 'Lihat live',
    soon: 'Link segera tersedia',
    nextTitle: 'Proyek Anda berikutnya?',
    nextText: 'Saya mengambil satu atau dua proyek sekaligus supaya tiap proyek dapat perhatian penuh.',
    nextCta: 'Ceritakan ke saya',
    servicesLabel: 'Yang saya kerjakan',
    processLabel: 'Cara kerja',
    aboutLabel: 'Siapa yang Anda ajak kerja',
    contactLabel: 'Hubungi saya',
    mailSubject: 'Pertanyaan proyek',
    sectionIndex: 'Indeks bagian',
    backTop: 'Kembali ke atas',
    notFound: 'Halaman tidak ditemukan',
    notFoundText: 'Halaman ini tidak ada.',
    home: 'Kembali ke beranda',
  },
} as const satisfies Record<Lang, unknown>;

export const homePath = (lang: Lang) => (lang === 'en' ? '/' : '/id/');
