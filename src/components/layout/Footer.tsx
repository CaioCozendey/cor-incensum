import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold-500/20 bg-parchment-200/50 dark:bg-marian-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/favicon.svg" alt="Imagem do Sagrado Coração de Jesus" className='w-8 h-8' />
              <span className="font-serif text-lg font-semibold text-crimson-700 dark:text-gold-400">Cor Incensum</span>
            </div>
            <p className="font-body text-sm text-marian-500 dark:text-parchment-400 leading-relaxed">
              Um espaço de oração e devoção, inspirado no Sagrado Coração de Jesus e na espiritualidade de São Padre Pio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-crimson-700 dark:text-gold-400 uppercase tracking-widest mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Início' },
                { to: '/oracoes', label: 'Orações' },
                { to: '/novenas', label: 'Novenas' },
                { to: '/favoritas', label: 'Favoritas' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-marian-500 dark:text-parchment-400 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-crimson-700 dark:text-gold-400 uppercase tracking-widest mb-4">
              Palavra Sagrada
            </h3>
            <blockquote className="font-body text-sm italic text-marian-600 dark:text-parchment-300 leading-relaxed border-l-2 border-gold-500 pl-4">
              “Eis o Coração que tanto amou os homens, que nada poupou até se esgotar e consumir para lhes testemunhar o seu amor.”
              <footer className="mt-2 font-sans text-xs text-gold-600 dark:text-gold-500 not-italic tracking-wide">
                Santa Margarida Maria Alacoque
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold-500/20 text-center">
          <p className="font-body text-xs text-marian-400 dark:text-parchment-500">
            † Cor Incensum — Coração Inflamado em Cristo
          </p>
        </div>
      </div>
    </footer>
  );
}
