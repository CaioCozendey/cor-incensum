import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RichText from '../components/ui/RichText';

export default function NovenaPage() {
  const { slug } = useParams<{ slug: string }>();
  const { novenas, getNovenaProgress, markDayComplete, resetNovenaProgress } = useApp();
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<ReturnType<typeof getNovenaProgress>>(null);
  const [justMarked, setJustMarked] = useState(false);

  const novena = novenas.find(n => n.slug === slug);

  useEffect(() => {
    if (novena) {
      const p = getNovenaProgress(novena.id);
      setProgress(p);
      if (p && p.completed_days.length > 0) {
        const nextDay = Math.min(9, Math.max(...p.completed_days) + 1);
        setCurrentDay(nextDay);
      }
    }
  }, [novena?.id]);

  if (!novena) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="font-serif text-4xl text-gold-500 mb-4">✦</p>
          <h2 className="font-serif text-2xl text-crimson-800 dark:text-parchment-100 mb-2">Novena não encontrada</h2>
          <Link to="/novenas" className="font-body text-sm text-crimson-700 dark:text-gold-400 hover:underline">
            ← Voltar às novenas
          </Link>
        </div>
      </div>
    );
  }

  const completedDays = progress?.completed_days || [];
  const isComplete = completedDays.length >= 9;
  const isDayComplete = completedDays.includes(currentDay);
  const pct = Math.round((completedDays.length / 9) * 100);
  const day = novena.days[currentDay - 1];

  const handleMarkComplete = () => {
    markDayComplete(novena.id, currentDay);
    const updated = getNovenaProgress(novena.id);
    setProgress(updated);
    setJustMarked(true);
    setTimeout(() => {
      setJustMarked(false);
      if (currentDay < 9) setCurrentDay(currentDay + 1);
    }, 1200);
  };

  const handleReset = () => {
    if (confirm('Deseja reiniciar o progresso desta novena?')) {
      resetNovenaProgress(novena.id);
      setProgress(null);
      setCurrentDay(1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/novenas"
            className="inline-flex items-center gap-1.5 font-body text-sm text-marian-500 dark:text-parchment-500
              hover:text-crimson-600 dark:hover:text-gold-400 transition-colors mb-6 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Voltar às novenas
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 leading-tight mb-2">
            {novena.title}
          </h1>
          <p className="font-body italic text-gold-600 dark:text-gold-500 mb-1">Para: {novena.purpose}</p>
          <p className="font-body text-sm text-marian-600 dark:text-parchment-400">{novena.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Section */}
        <div className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500 mb-1">Progresso</p>
              <p className="font-serif text-2xl text-crimson-800 dark:text-parchment-100">
                {completedDays.length} de 9 dias
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-4xl font-semibold text-gold-600 dark:text-gold-400">{pct}%</p>
              {completedDays.length > 0 && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 font-body text-xs text-marian-400 dark:text-parchment-600
                    hover:text-crimson-600 dark:hover:text-gold-400 transition-colors mt-1"
                >
                  <RotateCcw size={10} /> Reiniciar
                </button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-parchment-300 dark:bg-marian-600 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-crimson-600 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Day dots */}
          <div className="flex gap-2 justify-center">
            {Array.from({ length: 9 }, (_, i) => i + 1).map(d => (
              <button
                key={d}
                onClick={() => setCurrentDay(d)}
                className={`relative flex flex-col items-center gap-1 group`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border-2
                  ${completedDays.includes(d)
                    ? 'bg-gold-500 border-gold-500 text-white shadow-md shadow-gold-500/30'
                    : d === currentDay
                    ? 'border-crimson-700 dark:border-crimson-500 bg-crimson-50 dark:bg-crimson-900/20 text-crimson-700 dark:text-crimson-400'
                    : 'border-parchment-400 dark:border-marian-500 text-marian-400 dark:text-parchment-600 hover:border-gold-500/50'
                  }`}
                >
                  {completedDays.includes(d) ? <CheckCircle size={16} /> : (
                    <span className="font-sans text-xs font-bold">{d}</span>
                  )}
                </div>
                <span className="font-sans text-[9px] uppercase tracking-wide text-marian-400 dark:text-parchment-600">
                  {d}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Day content */}
        {isComplete ? (
          <div className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/30 p-12 text-center shadow-inner">
            <div className="text-6xl mb-6">🙏</div>
            <h2 className="font-serif text-3xl text-crimson-800 dark:text-parchment-100 mb-3">
              Novena Concluída!
            </h2>
            <p className="font-body italic text-gold-600 dark:text-gold-500 text-lg mb-6">
              "Pedis e recebereis, para que a vossa alegria seja completa." — João 16:24
            </p>
            <p className="font-body text-marian-600 dark:text-parchment-400">
              Parabéns por perseverar durante os 9 dias. Que Deus atenda às suas intenções!
            </p>
          </div>
        ) : day && (
          <div className="relative bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none" />
            <div className="relative z-10 p-8 sm:p-12">
              {/* Day indicator */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                  disabled={currentDay === 1}
                  className="p-2 rounded-lg border border-gold-500/30 text-marian-500 dark:text-parchment-500
                    hover:bg-gold-50 dark:hover:bg-marian-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="text-center">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-1">
                    {isDayComplete ? '✓ Rezado' : 'Dia atual'}
                  </p>
                  <h2 className="font-serif text-xl text-crimson-800 dark:text-parchment-100">
                    {day.title}
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentDay(prev => Math.min(9, prev + 1))}
                  disabled={currentDay === 9}
                  className="p-2 rounded-lg border border-gold-500/30 text-marian-500 dark:text-parchment-500
                    hover:bg-gold-50 dark:hover:bg-marian-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="text-center mb-8">
                <span className="text-gold-500/60">✦</span>
              </div>

              <RichText text={day.text} className="mb-8" />

              <div className="text-center mb-8">
                <span className="text-gold-500/60">✦</span>
              </div>

              {/* Mark complete button */}
              {!isDayComplete && (
                <div className="flex justify-center">
                  <button
                    onClick={handleMarkComplete}
                    disabled={justMarked}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body tracking-wide
                      shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed
                      ${justMarked
                        ? 'bg-green-600 text-white shadow-green-800/30'
                        : 'bg-crimson-700 hover:bg-crimson-800 text-parchment-100 shadow-crimson-900/30 hover:shadow-xl'
                      }`}
                  >
                    {justMarked ? (
                      <><CheckCircle size={18} /> Dia rezado! 🙏</>
                    ) : (
                      <><Circle size={18} /> Marcar como rezado</>
                    )}
                  </button>
                </div>
              )}

              {isDayComplete && (
                <div className="flex flex-col items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                    bg-gold-100 dark:bg-gold-900/20 border border-gold-500/40
                    font-body text-gold-700 dark:text-gold-400">
                    <CheckCircle size={16} /> Dia rezado com fé ✓
                  </span>
                  {currentDay < 9 && (
                    <button
                      onClick={() => setCurrentDay(currentDay + 1)}
                      className="font-body text-sm text-crimson-700 dark:text-gold-400 hover:underline"
                    >
                      Ir ao dia {currentDay + 1} →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
