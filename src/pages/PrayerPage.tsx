import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, ArrowLeft, ZoomIn, ZoomOut, Focus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../types';
import { formatDate } from '../utils/helpers';
import RichText from '../components/ui/RichText';

export default function PrayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const { prayers, isFavorite, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(1); // multiplier
  const [focusMode, setFocusMode] = useState(false);
  const [shared, setShared] = useState(false);

  const prayer = prayers.find(p => p.slug === slug);

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="font-serif text-4xl text-gold-500 mb-4">✦</p>
          <h2 className="font-serif text-2xl text-crimson-800 dark:text-parchment-100 mb-2">Oração não encontrada</h2>
          <Link to="/oracoes" className="font-body text-sm text-crimson-700 dark:text-gold-400 hover:underline">
            ← Voltar às orações
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(prayer.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: prayer.title, text: prayer.subtitle || '', url });
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const textSizeClass = fontSize === 0.8 ? 'text-sm' : fontSize === 1.2 ? 'text-xl' : fontSize === 1.5 ? 'text-2xl' : 'text-base';

  return (
    <div className={`min-h-screen transition-all duration-500 ${focusMode ? 'bg-marian-900' : ''}`}>
      {!focusMode && (
        <div className="relative py-16 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
          <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-50" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              to="/oracoes"
              className="inline-flex items-center gap-1.5 font-body text-sm text-marian-500 dark:text-parchment-500
                hover:text-crimson-600 dark:hover:text-gold-400 transition-colors mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar às orações
            </Link>
            <span className="inline-block px-3 py-1 rounded-full font-sans text-xs tracking-widest
              bg-crimson-700/10 dark:bg-crimson-900/30 text-crimson-700 dark:text-crimson-400 border border-crimson-700/20 mb-4">
              {CATEGORY_LABELS[prayer.category]}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 leading-tight mb-3">
              {prayer.title}
            </h1>
            {prayer.subtitle && (
              <p className="font-body text-lg italic text-gold-600 dark:text-gold-500">{prayer.subtitle}</p>
            )}
            <p className="font-body text-xs text-marian-400 dark:text-parchment-600 mt-3">
              Publicada em {formatDate(prayer.created_at)}
            </p>
          </div>
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-4 sm:px-6 py-12 ${focusMode ? 'max-w-2xl py-20' : ''}`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(prev => Math.max(0.8, prev - 0.2))}
              className="p-2 rounded-lg border border-gold-500/30 text-marian-500 dark:text-parchment-500
                hover:bg-gold-50 dark:hover:bg-marian-600 transition-colors"
              title="Diminuir fonte"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setFontSize(prev => Math.min(1.5, prev + 0.2))}
              className="p-2 rounded-lg border border-gold-500/30 text-marian-500 dark:text-parchment-500
                hover:bg-gold-50 dark:hover:bg-marian-600 transition-colors"
              title="Aumentar fonte"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`p-2 rounded-lg border transition-colors ${focusMode
                ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400'
                : 'border-gold-500/30 text-marian-500 dark:text-parchment-500 hover:bg-gold-50 dark:hover:bg-marian-600'
              }`}
              title="Modo leitura"
            >
              <Focus size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(prayer.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm
                border transition-all duration-200 ${fav
                  ? 'bg-crimson-700 border-crimson-700 text-white'
                  : 'border-crimson-700/30 text-crimson-700 dark:text-crimson-400 hover:bg-crimson-50 dark:hover:bg-crimson-900/20'
                }`}
            >
              <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
              {fav ? 'Favoritada' : 'Favoritar'}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm
                border border-gold-500/40 text-gold-700 dark:text-gold-400
                hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-colors"
            >
              <Share2 size={14} />
              {shared ? 'Copiado!' : 'Partilhar'}
            </button>
          </div>
        </div>

        {/* Prayer text */}
        <article className={`relative rounded-2xl overflow-hidden transition-all duration-500
          ${focusMode
            ? 'bg-marian-800 border border-gold-500/20 shadow-2xl'
            : 'bg-parchment-100 dark:bg-marian-700 border border-gold-500/20 shadow-inner'
          }`}>
          {/* Radial gold glow */}
          <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none" />
          <div className="relative z-10 p-8 sm:p-12">
            {/* Cross decoration */}
            <div className="text-center mb-8">
              <span className="text-gold-500/60 text-2xl">✦</span>
            </div>
            <RichText text={prayer.text} className={textSizeClass} />
            <div className="text-center mt-8">
              <span className="text-gold-500/60 text-2xl">✦</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
