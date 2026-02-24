import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PrayerCard from '../components/ui/PrayerCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { PrayerCategory, CATEGORY_LABELS } from '../types';

type SortOption = 'newest' | 'oldest' | 'az' | 'za';

export default function PrayersPage() {
  const { prayers, loading } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PrayerCategory | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const categories: Array<{ value: PrayerCategory | 'all'; label: string }> = [
    { value: 'all', label: 'Todas' },
    ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k as PrayerCategory, label: v })),
  ];

  const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigas' },
    { value: 'az', label: 'A–Z' },
    { value: 'za', label: 'Z–A' },
  ];

  const filtered = useMemo(() => {
    let list = [...prayers];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q));
    }
    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }
    switch (sort) {
      case 'oldest': list.sort((a, b) => a.created_at.localeCompare(b.created_at)); break;
      case 'az': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'za': list.sort((a, b) => b.title.localeCompare(a.title)); break;
      default: list.sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    return list;
  }, [prayers, search, category, sort]);

  const clearFilters = () => { setSearch(''); setCategory('all'); setSort('newest'); };
  const hasFilters = search || category !== 'all' || sort !== 'newest';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-20 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Acervo Espiritual ✦
          </p>
          <h1 className="font-serif text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-4">
            Orações
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-300 text-lg italic">
            Encontre a oração que seu coração necessita
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 p-6 mb-10 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-marian-400 dark:text-parchment-500" />
              <input
                type="text"
                placeholder="Buscar por título ou texto..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold-500/30
                  bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200
                  placeholder-marian-400 dark:placeholder-parchment-500
                  focus:outline-none focus:ring-2 focus:ring-gold-500/40
                  font-body text-sm transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Category */}
              <div className="flex-1 flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-full font-sans text-xs tracking-wide border transition-all
                      ${category === cat.value
                        ? 'bg-crimson-700 border-crimson-700 text-white'
                        : 'border-gold-500/30 text-marian-600 dark:text-parchment-400 hover:border-gold-500 hover:text-crimson-600 dark:hover:text-gold-400'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="px-4 py-2 rounded-xl border border-gold-500/30
                  bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200
                  focus:outline-none focus:ring-2 focus:ring-gold-500/40
                  font-body text-sm cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="self-start inline-flex items-center gap-1.5 font-body text-xs text-marian-500 dark:text-parchment-500
                  hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
              >
                <X size={12} /> Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="font-body text-sm text-marian-500 dark:text-parchment-500 mb-6">
          {filtered.length} {filtered.length === 1 ? 'oração encontrada' : 'orações encontradas'}
        </p>

        {/* Grid */}
        {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-marian-400 dark:text-parchment-500 mb-2">Nenhuma oração encontrada</p>
            <p className="font-body text-sm text-marian-400 dark:text-parchment-600">Tente outros termos ou categorias</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <PrayerCard key={p.id} prayer={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
