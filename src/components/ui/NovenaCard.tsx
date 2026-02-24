import { Link } from 'react-router-dom';
import { CalendarDays, Play } from 'lucide-react';
import { Novena } from '../../types';
import { useApp } from '../../context/AppContext';

interface NovenaCardProps {
  novena: Novena;
}

export default function NovenaCard({ novena }: NovenaCardProps) {
  const { getNovenaProgress } = useApp();
  const progress = getNovenaProgress(novena.id);
  const completedCount = progress?.completed_days.length || 0;
  const hasStarted = completedCount > 0;
  const pct = Math.round((completedCount / 9) * 100);

  return (
    <article className="group bg-parchment-100 dark:bg-marian-700 rounded-xl border border-gold-500/20
      hover:border-gold-500/50 shadow-sm hover:shadow-md hover:shadow-gold-500/10
      transition-all duration-300 overflow-hidden">
      
      <div className="p-6">
        {/* Days badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-sans
            bg-marian-100 text-marian-700 dark:bg-marian-600 dark:text-parchment-300">
            <CalendarDays size={11} />
            9 dias
          </span>
          {hasStarted && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-sans
              bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300">
              Dia {completedCount}/9
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg font-semibold text-crimson-800 dark:text-parchment-100 mb-2 leading-snug
          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
          {novena.title}
        </h3>

        <p className="font-body text-xs italic text-gold-600 dark:text-gold-500 mb-2">
          Para: {novena.purpose}
        </p>

        <p className="font-body text-sm text-marian-600 dark:text-parchment-400 leading-relaxed mb-5 line-clamp-2">
          {novena.description}
        </p>

        {/* Progress bar */}
        {hasStarted && (
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1">
              <span className="font-body text-xs text-marian-500 dark:text-parchment-500">Progresso</span>
              <span className="font-body text-xs text-gold-600 dark:text-gold-500">{pct}%</span>
            </div>
            <div className="h-1.5 bg-parchment-300 dark:bg-marian-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-crimson-600 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        <Link
          to={`/novena/${novena.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
            bg-marian-600 hover:bg-marian-700 dark:bg-marian-500 dark:hover:bg-marian-600
            text-parchment-100 font-body text-sm transition-all duration-200 hover:shadow-md"
        >
          <Play size={14} />
          {hasStarted ? 'Continuar novena' : 'Iniciar novena'}
        </Link>
      </div>
    </article>
  );
}
