import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, ChevronDown, CalendarDays, Library } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode, favorites } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bibleDropdown, setBibleDropdown] = useState(false);
  const [mobileBibleOpen, setMobileBibleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBibleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setBibleDropdown(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/biblia' || path === '/leitura-do-dia'
      ? location.pathname.startsWith('/biblia') || location.pathname === '/leitura-do-dia'
      : location.pathname === path;

  const isBibleActive = location.pathname.startsWith('/biblia') || location.pathname === '/leitura-do-dia';

  const regularLinks = [
    { to: '/', label: 'Início' },
    { to: '/oracoes', label: 'Orações' },
    { to: '/novenas', label: 'Novenas' },
    { to: '/rosario', label: '📿 Rosário' },
    { to: '/favoritas', label: 'Favoritas' },
    { to: '/recomendacoes_leitura', label: 'Recomendações de Leitura' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gold-500/20 backdrop-blur-md
      bg-parchment-200/90 dark:bg-marian-700/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 relative">
              <img src="/favicon.svg" alt="Imagem do Sagrado Coração de Jesus" />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold text-crimson-700 dark:text-gold-400 tracking-wide">
                Cor Incensum
              </span>
              <span className="hidden sm:block text-[10px] font-body text-gold-600 dark:text-gold-500/70 tracking-widest uppercase -mt-0.5">
                Coração Inflamado
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {regularLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md font-body text-sm tracking-wide transition-all duration-200 relative
                  ${isActive(link.to)
                    ? 'text-crimson-700 dark:text-gold-400 font-semibold'
                    : 'text-marian-600 dark:text-parchment-300 hover:text-crimson-600 dark:hover:text-gold-400'
                  }`}
              >
                {link.label === 'Favoritas' ? (
                  <span className="flex items-center gap-1">
                    {link.label}
                    {favorites.length > 0 && (
                      <span className="bg-crimson-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </span>
                ) : link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500" />
                )}
              </Link>
            ))}

            {/* Bible dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setBibleDropdown(true)}
              onMouseLeave={() => setBibleDropdown(false)}
            >
              <button
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-md font-body text-sm tracking-wide
                  transition-all duration-200 relative
                  ${isBibleActive
                    ? 'text-crimson-700 dark:text-gold-400 font-semibold'
                    : 'text-marian-600 dark:text-parchment-300 hover:text-crimson-600 dark:hover:text-gold-400'
                  }`}
              >
                <BookOpen size={14} />
                Bíblia
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${bibleDropdown ? 'rotate-180' : ''}`}
                />
                {isBibleActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500" />
                )}
              </button>

              {/* Dropdown panel */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56
                transition-all duration-200 origin-top
                ${bibleDropdown ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {/* Arrow */}
                <div className="w-3 h-3 bg-parchment-100 dark:bg-marian-600 border-l border-t border-gold-500/30
                  rotate-45 mx-auto -mb-1.5 relative z-10" />
                <div className="bg-parchment-100 dark:bg-marian-600 rounded-xl border border-gold-500/30
                  shadow-xl shadow-marian-900/20 overflow-hidden">
                  <Link
                    to="/leitura-do-dia"
                    className={`flex items-start gap-3 px-4 py-3.5 transition-colors group
                      hover:bg-crimson-700/5 dark:hover:bg-crimson-900/20
                      border-b border-gold-500/20
                      ${location.pathname === '/leitura-do-dia' ? 'bg-crimson-700/5 dark:bg-crimson-900/20' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center shrink-0 mt-0.5
                      group-hover:bg-gold-200 dark:group-hover:bg-gold-900/50 transition-colors">
                      <CalendarDays size={16} className="text-gold-700 dark:text-gold-400" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-semibold text-crimson-800 dark:text-parchment-100
                        group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
                        Leitura do Dia
                      </p>
                      <p className="font-body text-xs text-marian-500 dark:text-parchment-500 mt-0.5 leading-snug">
                        Evangelhos e leituras da Santa Missa de hoje
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/biblia"
                    className={`flex items-start gap-3 px-4 py-3.5 transition-colors group
                      hover:bg-crimson-700/5 dark:hover:bg-crimson-900/20
                      ${location.pathname.startsWith('/biblia') ? 'bg-crimson-700/5 dark:bg-crimson-900/20' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-marian-100 dark:bg-marian-500/50 flex items-center justify-center shrink-0 mt-0.5
                      group-hover:bg-marian-200 dark:group-hover:bg-marian-500 transition-colors">
                      <Library size={16} className="text-marian-600 dark:text-parchment-300" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-semibold text-crimson-800 dark:text-parchment-100
                        group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
                        Bíblia Completa
                      </p>
                      <p className="font-body text-xs text-marian-500 dark:text-parchment-500 mt-0.5 leading-snug">
                        Todos os livros, capítulos e versículos
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-marian-600 dark:text-parchment-300
                hover:bg-gold-100 dark:hover:bg-marian-600 transition-colors"
              aria-label="Alternar modo escuro"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full text-marian-600 dark:text-parchment-300
                hover:bg-gold-100 dark:hover:bg-marian-600 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gold-500/20 bg-parchment-100 dark:bg-marian-700 px-4 py-3 space-y-1">
          {regularLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-md font-body text-sm tracking-wide transition-all
                ${location.pathname === link.to
                  ? 'bg-crimson-700/10 text-crimson-700 dark:bg-gold-500/10 dark:text-gold-400'
                  : 'text-marian-600 dark:text-parchment-300 hover:bg-gold-50 dark:hover:bg-marian-600'
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Bible mobile submenu */}
          <div>
            <button
              onClick={() => setMobileBibleOpen(!mobileBibleOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-md font-body text-sm tracking-wide
                text-marian-600 dark:text-parchment-300 hover:bg-gold-50 dark:hover:bg-marian-600 transition-all"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={14} /> Bíblia
              </span>
              <ChevronDown size={14} className={`transition-transform ${mobileBibleOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileBibleOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-gold-500/30 pl-3">
                <Link to="/leitura-do-dia" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md font-body text-sm text-marian-600 dark:text-parchment-300 hover:bg-gold-50 dark:hover:bg-marian-600 transition-all">
                  <CalendarDays size={13} className="text-gold-500" /> Leitura do Dia
                </Link>
                <Link to="/biblia" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md font-body text-sm text-marian-600 dark:text-parchment-300 hover:bg-gold-50 dark:hover:bg-marian-600 transition-all">
                  <Library size={13} className="text-gold-500" /> Bíblia Completa
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
