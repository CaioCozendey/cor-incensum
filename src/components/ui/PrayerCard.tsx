import { Link } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { Prayer, CATEGORY_LABELS } from '../../types';
import { useApp } from '../../context/AppContext';

interface PrayerCardProps {
  prayer: Prayer;
}

const CATEGORY_COLORS: Record<string, string> = {
  intercession: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  protection: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  gratitude: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  repentance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  daily: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  marian: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  sacred_heart: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export default function PrayerCard({ prayer }: PrayerCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(prayer.id);

  const snippet = prayer.text
    .replace(/\{(title|large|small|center)\}/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\^\^([^^]+)\^\^/g, '$1')
    .replace(/^---$/gm, '')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 120) + '…';

  return (
    <article className="group relative bg-parchment-100 dark:bg-marian-700 rounded-xl border border-gold-500/20
      hover:border-gold-500/50 shadow-sm hover:shadow-md hover:shadow-gold-500/10
      transition-all duration-300 overflow-hidden">
      
      {/* Gold top accent */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold-500 to-crimson-600 transition-all duration-500" />

      {/* Featured star */}
      {prayer.featured && (
        <div className="absolute top-3 right-3">
          <span className="text-gold-500 text-xs">✦</span>
        </div>
      )}

      <div className="p-6">
        {/* Category badge */}
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-sans tracking-wide mb-3 ${CATEGORY_COLORS[prayer.category] || ''}`}>
          {CATEGORY_LABELS[prayer.category]}
        </span>

        <h3 className="font-serif text-lg font-semibold text-crimson-800 dark:text-parchment-100 mb-1 leading-snug
          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
          {prayer.title}
        </h3>

        {prayer.subtitle && (
          <p className="font-body text-xs italic text-gold-600 dark:text-gold-500 mb-3">{prayer.subtitle}</p>
        )}

        <p className="font-body text-sm text-marian-600 dark:text-parchment-400 leading-relaxed mb-5 line-clamp-3">
          {snippet}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to={`/oracao/${prayer.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
              bg-crimson-700 hover:bg-crimson-800 text-parchment-100 dark:text-parchment-200
              font-body text-sm transition-all duration-200 hover:shadow-md hover:shadow-crimson-900/20"
          >
            <BookOpen size={14} />
            Ler oração
          </Link>

          <button
            onClick={() => toggleFavorite(prayer.id)}
            className={`p-2 rounded-full transition-all duration-200
              ${fav
                ? 'text-crimson-600 dark:text-crimson-400 bg-crimson-100 dark:bg-crimson-900/30'
                : 'text-marian-400 dark:text-parchment-500 hover:text-crimson-500 hover:bg-crimson-50 dark:hover:bg-crimson-900/20'
              }`}
            aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  );
}
