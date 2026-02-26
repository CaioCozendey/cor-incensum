import { useEffect, useState } from 'react';
import { BookMarked, ExternalLink, Search, X } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  descricao: string;
  categoria: string;
  link_compra: string;
  capa_url: string;
  created_at: string;
}

const CATEGORIAS = ['Todas', 'Espiritualidade', 'Mariologia', 'Doutrina', 'Teologia', 'Autobiografia', 'Cristologia', 'Outro'];

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  useEffect(() => {
    supabase
      .from('livros')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setLivros(data);
        setLoading(false);
      });
  }, []);

  const filtrados = livros.filter(l => {
    const buscaOk = busca === '' ||
      l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      l.autor.toLowerCase().includes(busca.toLowerCase());
    const catOk = categoria === 'Todas' || l.categoria === categoria;
    return buscaOk && catOk;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-400/30 flex items-center justify-center">
              <BookMarked size={28} className="text-gold-700 dark:text-gold-400" />
            </div>
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Leituras Recomendadas ✦
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-3">
            Livros Católicos
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-400 max-w-xl mx-auto">
            Uma seleção de obras para aprofundar a fé, a oração e o conhecimento da tradição católica.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Busca */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marian-400 dark:text-parchment-500" />
            <input
              type="text" value={busca} onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por título ou autor..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gold-500/30 bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200 placeholder-marian-400 dark:placeholder-parchment-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 font-body text-sm"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-marian-400 hover:text-marian-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map(cat => (
              <button key={cat} onClick={() => setCategoria(cat)}
                className={`px-3 py-1.5 rounded-lg font-body text-xs tracking-wide transition-all
                  ${categoria === cat
                    ? 'bg-crimson-700 text-white shadow-sm'
                    : 'bg-parchment-100 dark:bg-marian-700 border border-gold-500/20 text-marian-600 dark:text-parchment-400 hover:border-gold-500/40'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            <p className="font-body text-sm text-marian-500 dark:text-parchment-500">Carregando livros...</p>
          </div>
        )}

        {/* Vazio */}
        {!loading && filtrados.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-marian-400 dark:text-parchment-600 mb-2">Nenhum livro encontrado</p>
            <p className="font-body text-sm text-marian-400 dark:text-parchment-600">Tente outro filtro ou aguarde novas adições.</p>
          </div>
        )}

        {/* Grid de livros */}
        {!loading && filtrados.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map(livro => (
              <LivroCard key={livro.id} livro={livro} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LivroCard({ livro }: { livro: Livro }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Capa */}
      <div className="relative h-56 bg-parchment-300 dark:bg-marian-600 overflow-hidden">
        {!imgError && livro.capa_url ? (
          <img
            src={livro.capa_url}
            alt={livro.titulo}
            onError={() => setImgError(true)}
            className="w-auto h-full object-cover group-hover:scale-105 transition-transform duration-300 mx-auto"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <BookMarked size={40} className="text-gold-400/50" />
            <p className="font-body text-xs text-marian-400 dark:text-parchment-600">Sem capa</p>
          </div>
        )}
        {/* Categoria badge */}
        {livro.categoria && (
          <span className="absolute top-3 left-3 font-sans text-[10px] uppercase tracking-wider px-2 py-1 rounded-lg
            bg-parchment-100/90 dark:bg-marian-700/90 text-gold-700 dark:text-gold-400 border border-gold-500/20 backdrop-blur-sm">
            {livro.categoria}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg text-crimson-800 dark:text-parchment-100 leading-snug mb-1">
          {livro.titulo}
        </h3>
        {livro.autor && (
          <p className="font-body text-xs text-gold-600 dark:text-gold-500 mb-3">{livro.autor}</p>
        )}
        <p className="font-body text-sm text-marian-600 dark:text-parchment-400 leading-relaxed flex-1 line-clamp-4">
          {livro.descricao}
        </p>

        {/* Botão comprar */}
        {livro.link_compra && (
          <a
            href={livro.link_compra}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
              bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body text-sm
              shadow-sm transition-all duration-150"
          >
            <ExternalLink size={14} /> Onde comprar
          </a>
        )}
      </div>
    </div>
  );
}
