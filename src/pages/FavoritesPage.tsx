import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PrayerCard from '../components/ui/PrayerCard';

export default function FavoritesPage() {
  const { prayers, favorites } = useApp();
  const favPrayers = prayers.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen">
      <div className="relative py-20 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Suas Favoritas ✦
          </p>
          <h1 className="font-serif text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-4">
            Orações Favoritas
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-300 text-lg italic">
            As orações que toca mais de perto o seu coração
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favPrayers.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={48} className="mx-auto text-parchment-400 dark:text-marian-500 mb-6" />
            <p className="font-serif text-2xl text-marian-400 dark:text-parchment-500 mb-2">
              Nenhuma oração favorita ainda
            </p>
            <p className="font-body text-sm text-marian-400 dark:text-parchment-600 mb-8">
              Explore as orações e adicione as que toca seu coração
            </p>
            <Link
              to="/oracoes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body text-sm tracking-wide
                shadow-lg shadow-crimson-900/20 transition-all hover:-translate-y-0.5"
            >
              📿 Explorar Orações
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favPrayers.map(p => <PrayerCard key={p.id} prayer={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
