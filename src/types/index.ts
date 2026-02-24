export interface Prayer {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: PrayerCategory;
  text: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type PrayerCategory = 
  | 'intercession' 
  | 'protection' 
  | 'gratitude' 
  | 'repentance' 
  | 'daily' 
  | 'marian'
  | 'sacred_heart'
  | 'ladainha'
  | 'study';

export const CATEGORY_LABELS: Record<PrayerCategory, string> = {
  intercession: 'Intercessão',
  protection: 'Proteção',
  gratitude: 'Agradecimento',
  repentance: 'Arrependimento',
  daily: 'Diária',
  marian: 'Mariana',
  sacred_heart: 'Sagrado Coração',
  ladainha: 'Ladainha',
  study: "Estudo"
};

export interface NovenaDay {
  day: number;
  title: string;
  text: string;
}

export interface Novena {
  id: string;
  title: string;
  slug: string;
  description: string;
  purpose: string;
  days: NovenaDay[];
  created_at: string;
  updated_at: string;
}

export interface NovenaProgress {
  novena_id: string;
  completed_days: number[];
  started_at: string;
}
