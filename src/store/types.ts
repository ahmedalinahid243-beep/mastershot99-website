// These types mirror the planned Supabase tables so the frontend, admin UI,
// and future database schema all speak the same shape.

export interface SiteSettings {
  brandName: string;
  tagline: string;
  taglineBn: string;
  logoUrl: string;
  whatsapp: string;
}

export interface HeroContent {
  heading: string;
  subheadingBn: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

export interface TraderProfile {
  name: string;
  experienceYears: number;
  market: string;
  bio: string;
  photoUrl: string | null;
}

export interface TelegramSettings {
  url: string;
  memberCount: string;
  signalTime: string;
}

export interface SocialLinks {
  facebook: string;
  tiktok: string;
  whatsapp: string;
  telegram: string;
}

export interface QuotexSettings {
  referralUrl: string;
  heading: string;
  description: string;
  buttonLabel: string;
  disclosure: string;
}

export interface TutorialVideo {
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  published: boolean;
}

export interface ResultItem {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  category: string;
  published: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  date: string;
  time: string;
  buttonText: string;
  buttonUrl: string;
  published: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  url: string | null;
  startDate: string | null;
  endDate: string | null;
  enabled: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SeoSettings {
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
}

export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
  rtl: boolean;
  enabled: boolean;
}

export interface SiteContent {
  settings: SiteSettings;
  hero: HeroContent;
  trader: TraderProfile;
  telegram: TelegramSettings;
  social: SocialLinks;
  quotex: QuotexSettings;
  video: TutorialVideo;
  results: ResultItem[];
  events: EventItem[];
  announcements: Announcement[];
  faq: FaqItem[];
  seo: SeoSettings;
  languages: Language[];
}
