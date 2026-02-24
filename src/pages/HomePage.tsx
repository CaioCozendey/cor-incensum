import { Link } from 'react-router-dom';
import { Heart, BookOpen, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PrayerCard from '../components/ui/PrayerCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import RichText from '../components/ui/RichText';

export default function HomePage() {
  const { prayers, loading } = useApp();
  const featured = prayers.filter(p => p.featured).slice(0, 3);
  const latest = prayers.slice(0, 4);
  const prayerOfDay = prayers[new Date().getDate() % Math.max(prayers.length, 1)];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-parchment-200 via-parchment-100 to-parchment-300
          dark:from-marian-900 dark:via-marian-800 dark:to-marian-700" />
        
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[800px] h-[800px] rounded-full
            bg-radial-gold dark:bg-radial-crimson opacity-60" />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full
            border border-gold-400/20 dark:border-gold-500/10" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full
            border border-gold-400/10 dark:border-gold-500/5" />
          {/* Cross decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 dark:opacity-10">
            <svg viewBox="0 0 200 200" className="w-[400px] h-[400px] text-crimson-700 fill-current">
              <rect x="85" y="10" width="30" height="180" rx="4" />
              <rect x="10" y="60" width="180" height="30" rx="4" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Sacred Heart icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 shadow-md">
              <img src="/favicon.svg" alt="Imagem do Sagrado Coração de Jesus" />
            </div>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-4 animate-fade-in">
            ✦ Cor Incensum ✦
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold
            text-crimson-800 dark:text-parchment-100 mb-6 leading-tight
            [animation-delay:200ms] animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Coração<br />
            <span className="text-gold-600 dark:text-gold-400 italic">Inflamado</span>
          </h1>

          {/* Quote */}
          <blockquote className="max-w-2xl mx-auto mb-10 [animation-delay:400ms] animate-slide-up opacity-0"
            style={{ animationFillMode: 'forwards' }}>
            <p className="font-body text-xl sm:text-2xl italic text-marian-700 dark:text-parchment-200 leading-relaxed">
              "Rezai, esperai e não vos preocupeis."
            </p>
            <footer className="mt-3 font-sans text-sm text-gold-600 dark:text-gold-500 tracking-widest uppercase">
              — São Padre Pio de Pietrelcina
            </footer>
          </blockquote>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center [animation-delay:600ms] animate-slide-up opacity-0"
            style={{ animationFillMode: 'forwards' }}>
            <Link
              to="/oracoes"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                bg-crimson-700 hover:bg-crimson-800 text-parchment-100
                font-body text-base tracking-wide shadow-lg shadow-crimson-900/30
                hover:shadow-xl hover:shadow-crimson-900/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              📿 Ver Orações
            </Link>
            <Link
              to="/novenas"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                bg-marian-700 hover:bg-marian-800 dark:bg-marian-600 dark:hover:bg-marian-500
                text-parchment-100 font-body text-base tracking-wide
                shadow-lg shadow-marian-900/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              📖 Ver Novenas
            </Link>
            <Link
              to="/favoritas"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                border-2 border-gold-500 text-gold-700 dark:text-gold-400
                hover:bg-gold-500/10 font-body text-base tracking-wide
                transition-all duration-300 hover:-translate-y-0.5"
            >
              ❤️ Favoritas
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gold-500/40 flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-gold-500/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Prayer of the Day */}
      {prayerOfDay && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-crimson-700/5 dark:bg-marian-700/30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-12 bg-gold-500" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500">
                Oração do Dia
              </span>
              <span className="h-px w-12 bg-gold-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-crimson-800 dark:text-parchment-100 mb-3">
              {prayerOfDay.title}
            </h2>
            {prayerOfDay.subtitle && (
              <p className="font-body italic text-gold-600 dark:text-gold-500 mb-6">{prayerOfDay.subtitle}</p>
            )}
            <div className="bg-parchment-100 dark:bg-marian-700/60 rounded-2xl p-8 shadow-inner border border-gold-500/20 text-left">
              <div className="font-body text-marian-700 dark:text-parchment-200 leading-loose line-clamp-6 overflow-hidden">
                <RichText text={prayerOfDay.text} />
              </div>
            </div>
            <Link
              to={`/oracao/${prayerOfDay.slug}`}
              className="inline-flex items-center gap-2 mt-6 font-body text-crimson-700 dark:text-gold-400
                hover:text-crimson-600 dark:hover:text-gold-300 transition-colors group"
            >
              Ler a oração completa
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      {/* Featured Prayers */}
      {featured.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <Star size={14} className="text-gold-500" />
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500">
                    Em Destaque
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-crimson-800 dark:text-parchment-100">
                  Orações em Destaque
                </h2>
              </div>
              <Link
                to="/oracoes"
                className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-crimson-700 dark:text-gold-400
                  hover:text-crimson-600 dark:hover:text-gold-300 transition-colors group"
              >
                Ver todas
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {loading ? <LoadingSpinner /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map(p => <PrayerCard key={p.id} prayer={p} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Published */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-300/30 dark:bg-marian-700/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <BookOpen size={14} className="text-gold-500" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500">
                  Recentes
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-crimson-800 dark:text-parchment-100">
                Últimas Publicadas
              </h2>
            </div>
            <Link
              to="/oracoes"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-crimson-700 dark:text-gold-400
                hover:text-crimson-600 dark:hover:text-gold-300 transition-colors group"
            >
              Ver todas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latest.map(p => <PrayerCard key={p.id} prayer={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="font-serif text-3xl sm:text-4xl italic text-crimson-800 dark:text-parchment-100 mb-4">
            "No princípio era o Verbo, <br />e o Verbo estava junto a Deus, <br />e o Verbo era Deus."
          </p>
          <p className="font-sans text-sm text-gold-600 dark:text-gold-500 uppercase tracking-widest">
            — João 1,1
          </p>
        </div>
      </section>
    </div>
  );
}
