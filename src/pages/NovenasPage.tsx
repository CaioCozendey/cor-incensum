import { useApp } from '../context/AppContext';
import NovenaCard from '../components/ui/NovenaCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function NovenasPage() {
  const { novenas, loading } = useApp();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-20 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Devoção de 9 Dias ✦
          </p>
          <h1 className="font-serif text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-4">
            Novenas
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-300 text-lg italic">
            Persevere na oração por nove dias e experimente a graça de Deus
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? <LoadingSpinner /> : novenas.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-marian-400 dark:text-parchment-500 mb-2">Nenhuma novena disponível</p>
            <p className="font-body text-sm text-marian-400 dark:text-parchment-600">Em breve novas novenas serão publicadas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {novenas.map(n => <NovenaCard key={n.id} novena={n} />)}
          </div>
        )}
      </div>
    </div>
  );
}
