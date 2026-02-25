import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Library, AlertCircle, RefreshCw, Search, X } from 'lucide-react';
import { LIVROS, GRUPOS_AT, GRUPOS_NT, BibleBook } from '../data/bible';

// ── Tipos ──────────────────────────────────────────────────────────────────
interface AveVersiculo {
  versiculo: number;
  texto: string;
}
interface AveCapitulo {
  capitulo: number;
  versiculos: AveVersiculo[];
}

// Cache por livro: slug → capítulos já baixados
// Cada livro é baixado UMA vez e fica na memória da sessão
const livroCache: Record<string, AveCapitulo[]> = {};

async function getLivro(slug: string): Promise<AveCapitulo[]> {
  if (livroCache[slug]) return livroCache[slug];

  // Carrega apenas o JSON do livro pedido (~10–80KB por livro)
  // O Vite resolve o import dinâmico para src/data/livros/{slug}.json
  const mod = await import(`../data/livros/${slug}.json`);
  const capitulos: AveCapitulo[] = mod.default;
  livroCache[slug] = capitulos;
  return capitulos;
}

type View = 'livros' | 'capitulos' | 'versiculos';

export default function BibliePage() {
  const [view, setView] = useState<View>('livros');
  const [testamento, setTestamento] = useState<'AT' | 'NT'>('NT');
  const [livro, setLivro] = useState<BibleBook | null>(null);
  const [capitulo, setCapitulo] = useState(1);
  const [versiculos, setVersiculos] = useState<AveVersiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busca, setBusca] = useState('');
  const topo = useRef<HTMLDivElement>(null);

  const livrosFiltrados = LIVROS.filter(l =>
    l.testamento === testamento &&
    (busca === '' ||
      l.nome.toLowerCase().includes(busca.toLowerCase()) ||
      l.abrev.toLowerCase().includes(busca.toLowerCase()))
  );
  const gruposVisiveis = testamento === 'AT' ? GRUPOS_AT : GRUPOS_NT;

  const scrollTopo = () => topo.current?.scrollIntoView({ behavior: 'smooth' });

  const fetchCapitulo = async (livroAtual: BibleBook, cap: number) => {
    setLoading(true);
    setError('');
    setVersiculos([]);
    try {
      // Baixa (ou usa cache) apenas o JSON deste livro
      const capitulos = await getLivro(livroAtual.slug);

      // Capítulo pelo número (base-1 no JSON)
      const capData = capitulos.find(c => c.capitulo === cap);
      if (!capData) throw new Error(`Capítulo ${cap} não encontrado.`);

      setVersiculos(capData.versiculos);
    } catch (e: any) {
      setError(e.message || 'Não foi possível carregar os versículos.');
    } finally {
      setLoading(false);
    }
  };

  const abrirLivro = (l: BibleBook) => {
    setLivro(l);
    setCapitulo(1);
    setView('capitulos');
    scrollTopo();
  };

  const abrirCapitulo = (cap: number) => {
    setCapitulo(cap);
    setView('versiculos');
    if (livro) fetchCapitulo(livro, cap);
    scrollTopo();
  };

  const navCapitulo = (dir: 'prev' | 'next') => {
    if (!livro) return;
    const novo = dir === 'prev' ? capitulo - 1 : capitulo + 1;
    if (novo < 1 || novo > livro.capitulos) return;
    abrirCapitulo(novo);
  };

  return (
    <div className="min-h-screen" ref={topo}>
      {/* Hero */}
      <div className="relative py-14 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-marian-100 dark:bg-marian-500/40 border border-marian-300/50 dark:border-marian-400/30 flex items-center justify-center">
              <Library size={28} className="text-marian-600 dark:text-parchment-300" />
            </div>
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">✦ Sagrada Escritura ✦</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-3">
            Bíblia Sagrada
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-400 text-sm">
            Cânon católico · 73 livros · Versão Ave Maria em português
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gold-500/20 bg-parchment-100/80 dark:bg-marian-700/50 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm font-body overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => { setView('livros'); setLivro(null); setBusca(''); }}
            className={`transition-colors ${view === 'livros'
              ? 'text-crimson-700 dark:text-gold-400 font-semibold'
              : 'text-marian-500 dark:text-parchment-500 hover:text-crimson-600 dark:hover:text-gold-400'}`}>
            Livros
          </button>
          {livro && (
            <>
              <ChevronRight size={14} className="text-gold-500 shrink-0" />
              <button
                onClick={() => setView('capitulos')}
                className={`transition-colors ${view === 'capitulos'
                  ? 'text-crimson-700 dark:text-gold-400 font-semibold'
                  : 'text-marian-500 dark:text-parchment-500 hover:text-crimson-600 dark:hover:text-gold-400'}`}>
                {livro.nome}
              </button>
            </>
          )}
          {view === 'versiculos' && (
            <>
              <ChevronRight size={14} className="text-gold-500 shrink-0" />
              <span className="text-crimson-700 dark:text-gold-400 font-semibold">Capítulo {capitulo}</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── LIVROS ── */}
        {view === 'livros' && (
          <div>
            <div className="flex gap-2 mb-6">
              {(['NT', 'AT'] as const).map(t => (
                <button key={t} onClick={() => { setTestamento(t); setBusca(''); }}
                  className={`px-6 py-2.5 rounded-xl font-body text-sm tracking-wide transition-all
                    ${testamento === t
                      ? 'bg-crimson-700 text-white shadow-md'
                      : 'bg-parchment-100 dark:bg-marian-700 border border-gold-500/20 text-marian-600 dark:text-parchment-400 hover:border-gold-500/50'}`}>
                  {t === 'NT' ? '✝ Novo Testamento' : '📜 Antigo Testamento'}
                </button>
              ))}
            </div>

            <div className="relative mb-8 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marian-400 dark:text-parchment-500" />
              <input
                type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar livro..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gold-500/30 bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200 placeholder-marian-400 dark:placeholder-parchment-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 font-body text-sm"
              />
              {busca && (
                <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-marian-400 hover:text-marian-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {busca ? (
              <div>
                <p className="font-body text-xs text-marian-500 dark:text-parchment-500 mb-3">{livrosFiltrados.length} resultado(s)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {livrosFiltrados.map(l => <LivroCard key={l.slug} livro={l} onClick={() => abrirLivro(l)} />)}
                </div>
              </div>
            ) : (
              gruposVisiveis.map(grupo => {
                const lista = livrosFiltrados.filter(l => l.grupo === grupo);
                if (!lista.length) return null;
                return (
                  <div key={grupo} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">{grupo}</span>
                      <span className="flex-1 h-px bg-gold-500/20" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {lista.map(l => <LivroCard key={l.slug} livro={l} onClick={() => abrirLivro(l)} />)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── CAPÍTULOS ── */}
        {view === 'capitulos' && livro && (
          <div>
            <button
              onClick={() => { setView('livros'); setLivro(null); }}
              className="inline-flex items-center gap-1.5 text-sm font-body text-marian-500 dark:text-parchment-500 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors mb-6">
              <ChevronLeft size={16} /> Todos os livros
            </button>
            <h2 className="font-serif text-3xl text-crimson-800 dark:text-parchment-100 mb-1">{livro.nome}</h2>
            <p className="font-body text-sm text-marian-500 dark:text-parchment-500 mb-8">
              {livro.capitulos} capítulos · {livro.grupo}
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map(cap => (
                <button key={cap} onClick={() => abrirCapitulo(cap)}
                  className="aspect-square rounded-xl border-2 border-gold-500/20 font-sans text-sm font-bold
                    text-marian-600 dark:text-parchment-400
                    hover:border-crimson-700 hover:bg-crimson-700/5 hover:text-crimson-700
                    dark:hover:border-gold-400 dark:hover:bg-gold-500/10 dark:hover:text-gold-400
                    transition-all bg-parchment-100 dark:bg-marian-700">
                  {cap}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── VERSÍCULOS ── */}
        {view === 'versiculos' && livro && (
          <div>
            <button
              onClick={() => setView('capitulos')}
              className="inline-flex items-center gap-1.5 text-sm font-body text-marian-500 dark:text-parchment-500 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors mb-6">
              <ChevronLeft size={16} /> {livro.nome} — capítulos
            </button>

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-3xl text-crimson-800 dark:text-parchment-100 mb-1">
                  {livro.nome} {capitulo}
                </h2>
                <p className="font-body text-sm text-marian-500 dark:text-parchment-500">
                  {livro.abrev} {capitulo} · Bíblia Ave Maria
                </p>
              </div>
              <div className="shrink-0">
                <select
                  value={capitulo}
                  onChange={e => abrirCapitulo(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl border border-gold-500/30 bg-parchment-50 dark:bg-marian-600
                    text-marian-800 dark:text-parchment-200 font-body text-sm
                    focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer"
                  style={{ backgroundImage: 'none', appearance: 'none' }}
                >
                  {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Cap. {n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button onClick={() => navCapitulo('prev')} disabled={capitulo <= 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gold-500/30
                  font-body text-sm text-marian-600 dark:text-parchment-400
                  hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft size={15} /> Cap. anterior
              </button>
              <button onClick={() => navCapitulo('next')} disabled={capitulo >= livro.capitulos}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gold-500/30
                  font-body text-sm text-marian-600 dark:text-parchment-400
                  hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Próx. cap. <ChevronRight size={15} />
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center py-16 gap-4">
                <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <p className="font-body text-sm text-marian-500 dark:text-parchment-500">Carregando versículos...</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-crimson-100 dark:bg-crimson-900/30 flex items-center justify-center">
                  <AlertCircle size={26} className="text-crimson-600 dark:text-crimson-400" />
                </div>
                <p className="font-body text-sm text-marian-600 dark:text-parchment-400 max-w-sm">{error}</p>
                <button onClick={() => fetchCapitulo(livro, capitulo)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body text-sm transition-all">
                  <RefreshCw size={15} /> Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && versiculos.length > 0 && (
              <>
                <div className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 shadow-inner overflow-hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-radial-gold opacity-10 pointer-events-none" />
                    <div className="relative z-10 p-6 sm:p-10">
                      <div className="text-center mb-6"><span className="text-gold-400/60 text-xl">✦</span></div>
                      <div className="space-y-4">
                        {versiculos.map(v => (
                          <p key={v.versiculo} className="font-body text-base text-marian-800 dark:text-parchment-200 leading-loose">
                            <sup className="font-sans text-[11px] text-gold-600 dark:text-gold-500 font-bold mr-1.5 select-none">
                              {v.versiculo}
                            </sup>
                            {v.texto}
                          </p>
                        ))}
                      </div>
                      <div className="text-center mt-6"><span className="text-gold-400/60 text-xl">✦</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => navCapitulo('prev')} disabled={capitulo <= 1}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl border border-gold-500/30
                      font-body text-sm text-marian-600 dark:text-parchment-400
                      hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft size={15} /> Capítulo anterior
                  </button>
                  <button onClick={() => navCapitulo('next')} disabled={capitulo >= livro.capitulos}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl border border-gold-500/30
                      font-body text-sm text-marian-600 dark:text-parchment-400
                      hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    Próximo capítulo <ChevronRight size={15} />
                  </button>
                </div>

                <p className="text-center font-body text-xs text-marian-400 dark:text-parchment-600 italic mt-4">
                  Bíblia Ave Maria · Edição oficial da CNBB para o Brasil
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Card do livro ──────────────────────────────────────────────────────────
function LivroCard({ livro, onClick }: { livro: BibleBook; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="group p-3 rounded-xl border-2 border-gold-500/20 bg-parchment-100 dark:bg-marian-700
        hover:border-crimson-700/50 dark:hover:border-gold-400/60
        hover:bg-crimson-700/5 dark:hover:bg-gold-500/10
        text-left transition-all duration-150">
      <p className="font-sans text-[10px] uppercase tracking-wider text-gold-600 dark:text-gold-500 mb-0.5">{livro.abrev}</p>
      <p className="font-serif text-sm text-crimson-800 dark:text-parchment-100
        group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors leading-snug">
        {livro.nome}
      </p>
      <p className="font-body text-[10px] text-marian-400 dark:text-parchment-600 mt-1">{livro.capitulos} cap.</p>
    </button>
  );
}
