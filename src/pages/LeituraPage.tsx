import { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw, ChevronDown, ChevronUp, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Tipos ──────────────────────────────────────────────────────────────────
interface LeituraRaw {
  titulo: string;
  referencia: string;
  texto: string;
}

interface SalmoRaw {
  referencia: string;
  titulo?: string;
  texto: string;
  refrao?: string; // 👈 ADICIONE ISSO
}

interface LiturgiaAPIResponse {
  liturgia?: string;
  cor?: string;
  dia?: string;
  santos?: string;
  primeiraLeitura?: LeituraRaw;
  segundaLeitura?: LeituraRaw;
  leituras?: LeituraRaw[];
  salmo?: SalmoRaw;
  evangelho?: LeituraRaw;
}

interface LeituraFormatada {
  label: string;
  referencia: string;
  subtitulo: string;
  texto: string;
}

interface LinhasSalmo {
  referencia: string;
  // Cada item é: { tipo: 'refrao-normal' | 'refrao-negrito' | 'estrofe', texto: string }
  linhas: { tipo: 'refrao-normal' | 'refrao-negrito' | 'estrofe'; texto: string }[];
}

function formatarVersiculos(texto: string) {
  return texto.replace(/(\s|^)(\d+)(?=\D)/g, '$1<strong>$2</strong> ');
}

// ── Helpers de data ────────────────────────────────────────────────────────
function addDias(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function formatApiDate(d: Date) {
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

function formatDisplay(d: Date) {
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function isHoje(d: Date): boolean {
  const hoje = new Date();
  return d.toDateString() === hoje.toDateString();
}

// ── Parser de leitura ──────────────────────────────────────────────────────
function parseLeitura(raw: LeituraRaw, label: string): LeituraFormatada {
  return {
    label,
    referencia: raw.referencia || '',
    subtitulo: raw.titulo || '',
    texto: raw.texto || '',
  };
}

// ── Parser do salmo ────────────────────────────────────────────────────────

function parseSalmo(raw: SalmoRaw): LinhasSalmo {
  const linhas: LinhasSalmo['linhas'] = [];

  // 🔥 1 — Se existir refrão vindo da API
  if (raw.refrao) {
    linhas.push({
      tipo: 'refrao-normal',
      texto: raw.refrao.trim(),
    });

    linhas.push({
      tipo: 'refrao-negrito',
      texto: raw.refrao.trim(),
    });
  }

  // 🔥 2 — Quebra as estrofes corretamente
  const estrofes = (raw.texto || '')
    .replace(/\r/g, '')
    .split('\n')
    .map(p => p.replace(/^—\s*/, '').trim())
    .filter(Boolean);

  for (const estrofe of estrofes) {
    linhas.push({
      tipo: 'estrofe',
      texto: estrofe,
    });
  }

  return {
    referencia: raw.referencia || raw.titulo || '',
    linhas,
  };
}

// ── Cor litúrgica ──────────────────────────────────────────────────────────
const COR_MAP: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  verde: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500', label: 'Verde' },
  roxo: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500', label: 'Roxo' },
  vermelho: { bg: 'bg-crimson-50 dark:bg-crimson-900/20', text: 'text-crimson-700 dark:text-crimson-400', dot: 'bg-crimson-600', label: 'Vermelho' },
  branco: { bg: 'bg-parchment-200 dark:bg-marian-600', text: 'text-marian-700 dark:text-parchment-300', dot: 'bg-parchment-400', label: 'Branco' },
  rosa: { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-700 dark:text-pink-400', dot: 'bg-pink-500', label: 'Rosa' },
  dourado: { bg: 'bg-gold-50 dark:bg-gold-900/20', text: 'text-gold-700 dark:text-gold-400', dot: 'bg-gold-500', label: 'Dourado' },
};

// ── Separador ──────────────────────────────────────────────────────────────
function Separador({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <span className="h-px flex-1 bg-gold-500/20" />
      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-gold-500/20" />
    </div>
  );
}

// ── Card de Leitura ────────────────────────────────────────────────────────
function LeituraCard({ leitura, defaultOpen = false }: { leitura: LeituraFormatada; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const isEvangelho = leitura.label.toLowerCase().includes('evangelho');

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all
      ${isEvangelho ? 'border-gold-400/40 shadow-md' : 'border-gold-500/20 hover:border-gold-500/40'}
      bg-parchment-100 dark:bg-marian-700`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-4 p-5 text-left group">
        <div className="flex-1 min-w-0">
          <p className={`font-sans text-xs uppercase tracking-widest mb-0.5
            ${isEvangelho ? 'text-crimson-600 dark:text-crimson-400' : 'text-gold-600 dark:text-gold-500'}`}>
            {leitura.label}
          </p>
          {leitura.referencia && (
            <p className="font-body text-[11px] text-marian-400 dark:text-parchment-600 mb-1">{leitura.referencia}</p>
          )}
          {leitura.subtitulo && (
            <h3 className="font-serif text-base leading-snug text-marian-800 dark:text-parchment-200
              group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
              {leitura.subtitulo}
            </h3>
          )}
        </div>
        <span className="text-gold-500 shrink-0 mt-1">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-6">
          <div className="relative rounded-xl overflow-hidden border border-gold-500/20">
            <div className="absolute inset-0 bg-gradient-to-b from-gold-50/40 to-transparent dark:from-gold-900/10 pointer-events-none" />
            <div className="relative z-10 p-5 sm:p-8">
              <div className="text-center mb-5"><span className="text-gold-400/60 text-lg">✦</span></div>
              {leitura.subtitulo && (
                <p className="font-body text-sm italic text-marian-500 dark:text-parchment-500 mb-5 text-center">
                  {leitura.subtitulo}
                </p>
              )}
              <p className="font-body text-base text-marian-800 dark:text-parchment-200 leading-loose whitespace-pre-line">
                {<div dangerouslySetInnerHTML={{ __html: formatarVersiculos(leitura.texto) }} />}
              </p>
              <p className="font-body text-sm italic text-marian-400 dark:text-parchment-600 mt-5 text-right">
                {isEvangelho ? 'Palavra da Salvação.' : 'Palavra do Senhor.'}
              </p>
              <div className="text-center mt-4"><span className="text-gold-400/60 text-lg">✦</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Card do Salmo ──────────────────────────────────────────────────────────
function SalmoCard({ salmo }: { salmo: LinhasSalmo }) {
  const [open, setOpen] = useState(false);

  // Refrão para mostrar no card fechado
  const refraoNormal = salmo.linhas.find(l => l.tipo === 'refrao-normal');

  return (
    <div className="rounded-2xl border border-gold-500/20 bg-parchment-100 dark:bg-marian-700 hover:border-gold-500/40 overflow-hidden transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-4 p-5 text-left group">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500 mb-0.5">
            Responsório {salmo.referencia}
          </p>
          {refraoNormal && (
            <p className="font-serif text-sm italic text-marian-700 dark:text-parchment-300 leading-snug">
              <span className="font-sans text-[10px] not-italic text-gold-600 dark:text-gold-500 mr-1.5">R.</span>
              {refraoNormal.texto}
            </p>
          )}
        </div>
        <span className="text-gold-500 shrink-0 mt-1">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-6">
          <div className="relative rounded-xl overflow-hidden border border-gold-500/20">
            <div className="absolute inset-0 bg-gradient-to-b from-gold-50/40 to-transparent dark:from-gold-900/10 pointer-events-none" />
            <div className="relative z-10 p-5 sm:p-8">
              <div className="text-center mb-6"><span className="text-gold-400/60 text-lg">✦</span></div>

              {/* Renderiza cada linha na ordem exata que veio da API */}
              <div className="space-y-4">
                {salmo.linhas.map((linha, i) => {
                  if (linha.tipo === 'refrao-normal') {
                    return (
                      <p key={i} className="font-body text-base text-marian-800 dark:text-parchment-200 leading-loose">
                        — {linha.texto}
                      </p>
                    );
                  }
                  if (linha.tipo === 'refrao-negrito') {
                    return (
                      <p key={i} className="font-body text-base font-bold text-marian-800 dark:text-parchment-100 leading-loose">
                        — {linha.texto}
                      </p>
                    );
                  }
                  // estrofe
                  return (
                    <p key={i} className="font-body text-base text-marian-700 dark:text-parchment-300 leading-loose mt-3">
                      — {linha.texto}
                    </p>
                  );
                })}
              </div>

              <div className="text-center mt-6"><span className="text-gold-400/60 text-lg">✦</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Página principal ───────────────────────────────────────────────────────
const HOJE = new Date();
HOJE.setHours(0, 0, 0, 0);

export default function LeituraPage() {
  const [dataAtual, setDataAtual] = useState<Date>(new Date(HOJE));
  const [primeiraLeitura, setPrimeiraLeitura] = useState<LeituraFormatada | null>(null);
  const [segundaLeitura, setSegundaLeitura] = useState<LeituraFormatada | null>(null);
  const [salmo, setSalmo] = useState<LinhasSalmo | null>(null);
  const [evangelho, setEvangelho] = useState<LeituraFormatada | null>(null);
  const [meta, setMeta] = useState<{ liturgia: string; cor: string; santos?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Diferença em dias em relação a hoje
  const diffDias = Math.round((dataAtual.getTime() - HOJE.getTime()) / (1000 * 60 * 60 * 24));
  const podeAnterior = diffDias > -60;
  const podePosterior = diffDias < 60;

  const fetchLiturgia = async (data: Date) => {
    setLoading(true);
    setError('');
    setPrimeiraLeitura(null);
    setSegundaLeitura(null);
    setSalmo(null);
    setEvangelho(null);
    setMeta(null);

    try {
      const res = await fetch(`https://liturgia.up.railway.app/${formatApiDate(data)}`);
      if (!res.ok) throw new Error('API indisponível');
      const json: LiturgiaAPIResponse = await res.json();
      console.log('SALMO DA API:', json.salmo);

      const prim = json.primeiraLeitura ?? json.leituras?.[0];
      setPrimeiraLeitura(prim ? parseLeitura(prim, 'Primeira Leitura') : null);

      const seg = json.segundaLeitura ?? json.leituras?.[1];
      setSegundaLeitura(seg && seg.texto?.trim() ? parseLeitura(seg, 'Segunda Leitura') : null);

      setSalmo(json.salmo ? parseSalmo(json.salmo) : null);
      setEvangelho(json.evangelho ? parseLeitura(json.evangelho, 'Evangelho do Dia') : null);
      setMeta({
        liturgia: json.liturgia || '',
        cor: (json.cor || 'verde').toLowerCase(),
        santos: json.santos,
      });
    } catch {
      setError('Não foi possível carregar as leituras. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => { fetchLiturgia(dataAtual); }, []);

  const irParaDia = (novaData: Date) => {
    setDataAtual(novaData);
    fetchLiturgia(novaData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const corInfo = COR_MAP[meta?.cor || 'verde'] || COR_MAP.verde;
  const eHoje = isHoje(dataAtual);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-400/30 flex items-center justify-center">
              <CalendarDays size={28} className="text-gold-700 dark:text-gold-400" />
            </div>
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Liturgia da Igreja Católica ✦
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-3">
            Leitura do Dia
          </h1>

          {/* Data com navegação */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={() => podeAnterior && irParaDia(addDias(dataAtual, -1))}
              disabled={!podeAnterior}
              className="p-2 rounded-full border border-gold-500/30 text-marian-500 dark:text-parchment-500
                hover:border-gold-500/60 hover:text-crimson-600 dark:hover:text-gold-400
                disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="text-center min-w-0">
              <p className="font-body text-marian-600 dark:text-parchment-400 capitalize text-sm sm:text-base">
                {formatDisplay(dataAtual)}
              </p>
              {!eHoje && (
                <button
                  onClick={() => irParaDia(new Date(HOJE))}
                  className="font-body text-xs text-gold-600 dark:text-gold-500 underline underline-offset-2 mt-1 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
                >
                  Voltar para hoje
                </button>
              )}
              {eHoje && (
                <span className="font-body text-xs text-gold-600 dark:text-gold-500">Hoje</span>
              )}
            </div>

            <button
              onClick={() => podePosterior && irParaDia(addDias(dataAtual, 1))}
              disabled={!podePosterior}
              className="p-2 rounded-full border border-gold-500/30 text-marian-500 dark:text-parchment-500
                hover:border-gold-500/60 hover:text-crimson-600 dark:hover:text-gold-400
                disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Indicador de dias */}
          {!eHoje && (
            <p className="font-body text-xs text-marian-400 dark:text-parchment-600 mt-2">
              {diffDias > 0 ? `${diffDias} dia${diffDias > 1 ? 's' : ''} à frente` : `${Math.abs(diffDias)} dia${Math.abs(diffDias) > 1 ? 's' : ''} atrás`}
              {' · '}limite: 60 dias
            </p>
          )}

          {meta && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {meta.liturgia && (
                <span className="font-body text-xs px-3 py-1 rounded-full bg-parchment-200 dark:bg-marian-600
                  text-marian-600 dark:text-parchment-400 border border-gold-500/20">
                  {meta.liturgia}
                </span>
              )}
              {meta.cor && (
                <span className={`inline-flex items-center gap-1.5 font-body text-xs px-3 py-1 rounded-full
                  border border-transparent ${corInfo.bg} ${corInfo.text}`}>
                  <span className={`w-2 h-2 rounded-full ${corInfo.dot}`} />
                  Cor litúrgica: {corInfo.label}
                </span>
              )}
            </div>
          )}
          {meta?.santos && (
            <p className="mt-3 font-body text-xs italic text-gold-600 dark:text-gold-500">{meta.santos}</p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            <p className="font-body text-sm text-marian-500 dark:text-parchment-500">Carregando leituras...</p>
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-crimson-100 dark:bg-crimson-900/30 flex items-center justify-center">
              <AlertCircle size={26} className="text-crimson-600 dark:text-crimson-400" />
            </div>
            <p className="font-body text-marian-600 dark:text-parchment-400">{error}</p>
            <button onClick={() => fetchLiturgia(dataAtual)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-800
                text-parchment-100 font-body text-sm transition-all">
              <RefreshCw size={15} /> Tentar novamente
            </button>
          </div>
        )}

        {/* Conteúdo */}
        {!loading && !error && (
          <div className="space-y-3">

            {/* 1 — Primeira Leitura */}
            {primeiraLeitura && <LeituraCard leitura={primeiraLeitura} defaultOpen />}

            {/* 2 — Salmo */}
            {salmo && (
              <>
                <Separador label="Salmo Responsorial" />
                <SalmoCard salmo={salmo} />
              </>
            )}

            {/* 3 — Segunda Leitura (só se existir) */}
            {segundaLeitura && (
              <>
                <Separador label="Segunda Leitura" />
                <LeituraCard leitura={segundaLeitura} />
              </>
            )}

            {/* 4 — Evangelho */}
            {evangelho && (
              <>
                <Separador label="✦ Evangelho do Dia ✦" />
                <LeituraCard leitura={evangelho} defaultOpen />
              </>
            )}

            {/* Navegação inferior + rodapé */}
            <div className="pt-8 space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => podeAnterior && irParaDia(addDias(dataAtual, -1))}
                  disabled={!podeAnterior}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-gold-500/30
                    font-body text-sm text-marian-600 dark:text-parchment-400
                    hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={15} /> Dia anterior
                </button>
                {!eHoje && (
                  <button
                    onClick={() => irParaDia(new Date(HOJE))}
                    className="px-5 py-3 rounded-xl bg-gold-500/10 border border-gold-500/40
                      font-body text-sm text-gold-700 dark:text-gold-400
                      hover:bg-gold-500/20 transition-all"
                  >
                    Hoje
                  </button>
                )}
                <button
                  onClick={() => podePosterior && irParaDia(addDias(dataAtual, 1))}
                  disabled={!podePosterior}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-gold-500/30
                    font-body text-sm text-marian-600 dark:text-parchment-400
                    hover:border-gold-500/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Próximo dia <ChevronRight size={15} />
                </button>
              </div>

              <p className="font-body text-xs text-marian-400 dark:text-parchment-600 italic text-center">
                Leituras da Santa Missa conforme o Missal Romano da Igreja Católica
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}