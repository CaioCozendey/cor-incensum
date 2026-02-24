import { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

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

interface SalmoFormatado {
  referencia: string;
  refrao: string;      // a linha em negrito/repetida = a resposta do povo
  estrofes: string[];  // cada grupo de linhas entre refrões
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
// Estrutura real da API liturgia.up.railway.app:
//   "- O Senhor liberta os justos de todas as angústias.\n\n
//    - **O Senhor liberta os justos de todas as angústias.**\n\n
//    - Comigo engrandeci ao Senhor Deus...\n\n
//    - Contemplai a sua face..."
//
// Regras:
//  • Cada bloco separado por linha em branco é uma unidade
//  • A linha com ** ** é o REFRÃO (resposta do povo)
//  • As demais linhas (que começam com "-") são as estrofes, cada uma separada
function parseSalmo(raw: SalmoRaw): SalmoFormatado {
  const texto = raw.texto || '';

  // Divide por linha em branco → cada bloco é uma linha/estrofe
  const blocos = texto
    .split(/\n{2,}/)
    .map(b => b.trim())
    .filter(Boolean);

  let refrao = '';
  const estrofes: string[] = [];

  for (const bloco of blocos) {
    // Detecta refrão: contém marcação **negrito**
    if (/\*\*/.test(bloco)) {
      if (!refrao) {
        // Extrai o texto limpo: remove "- ", "**", espaços
        refrao = bloco
          .replace(/^[-–]\s*/, '')
          .replace(/\*\*/g, '')
          .trim();
      }
      // Pula todas as ocorrências do refrão (não adiciona como estrofe)
      continue;
    }

    // Linha normal de estrofe: remove o "- " do início
    const linhaLimpa = bloco.replace(/^[-–]\s*/, '').trim();
    if (linhaLimpa) estrofes.push(linhaLimpa);
  }

  // Fallback: se não encontrou negrito, usa a segunda linha como refrão
  // (padrão de alguns dias onde a API não usa **)
  if (!refrao && blocos.length >= 2) {
    // Procura linha que se repete (normalizada)
    const norm = (s: string) => s.replace(/^[-–*\s]+/, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const vistos: Record<string, number> = {};
    for (const b of blocos) { const n = norm(b); vistos[n] = (vistos[n] || 0) + 1; }
    for (const b of blocos) {
      if (vistos[norm(b)] >= 2) {
        refrao = b.replace(/^[-–]\s*/, '').replace(/\*\*/g, '').trim();
        break;
      }
    }
    // Reconstrói estrofes excluindo o refrão repetido
    if (refrao) {
      const refraoNorm = refrao.toLowerCase().trim();
      estrofes.length = 0;
      for (const b of blocos) {
        const linhaLimpa = b.replace(/^[-–]\s*/, '').replace(/\*\*/g, '').trim();
        if (linhaLimpa.toLowerCase() !== refraoNorm) estrofes.push(linhaLimpa);
      }
    }
  }

  return {
    referencia: raw.referencia || raw.titulo || '',
    refrao,
    estrofes,
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
      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-gold-500/20" />
    </div>
  );
}

function formatarVersiculos(texto: string) {
  return texto.replace(/(\s|^)(\d+)(?=\D)/g, '$1<strong>$2</strong> ');
}

// ── Card de Leitura ────────────────────────────────────────────────────────
function LeituraCard({ leitura, defaultOpen = false }: { leitura: LeituraFormatada; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const isEvangelho = leitura.label.toLowerCase().includes('evangelho');

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all
      ${isEvangelho ? 'border-gold-400/40 shadow-md' : 'border-gold-500/20 hover:border-gold-500/40'}
      bg-parchment-100 dark:bg-marian-700`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <p className={`font-sans text-xs uppercase tracking-widest mb-0.5
            ${isEvangelho ? 'text-crimson-600 dark:text-crimson-400' : 'text-gold-600 dark:text-gold-500'}`}>
            {leitura.label}
          </p>
          {leitura.referencia && (
            <p className="font-body text-[11px] text-marian-400 dark:text-parchment-600 mb-1">
              {leitura.referencia}
            </p>
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
                <div dangerouslySetInnerHTML={{ __html: formatarVersiculos(leitura.texto) }} />
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
function SalmoCard({ salmo }: { salmo: SalmoFormatado }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gold-500/20 bg-parchment-100 dark:bg-marian-700 hover:border-gold-500/40 overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500 mb-0.5">
            Salmo Responsorial
          </p>
          {salmo.referencia && (
            <p className="font-body text-[11px] text-marian-400 dark:text-parchment-600 mb-1.5">
              {salmo.referencia}
            </p>
          )}
          {/* Refrão sempre visível no card fechado */}
          {salmo.refrao && (
            <p className="font-serif text-sm italic text-marian-700 dark:text-parchment-300 leading-snug">
              <span className="font-sans text-[10px] not-italic text-gold-600 dark:text-gold-500 mr-1.5">R.</span>
              {salmo.refrao}
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

              {/* Refrão em destaque no topo */}
              {salmo.refrao && (
                <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-400/30 rounded-xl px-5 py-4 mb-6 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500 mb-1">Resposta</p>
                  <p className="font-body text-base font-semibold text-marian-800 dark:text-parchment-100 italic leading-relaxed">
                    {salmo.refrao}
                  </p>
                </div>
              )}

              {/* Cada estrofe separada com R. após */}
              {salmo.estrofes.map((estrofe, i) => (
                <div key={i} className="mb-2">
                  <p className="font-body text-base text-marian-800 dark:text-parchment-200 leading-loose py-2 border-b border-gold-500/10">
                    {estrofe}
                  </p>
                  {salmo.refrao && (
                    <p className="font-body text-sm italic font-semibold text-marian-700 dark:text-parchment-200 leading-relaxed py-2.5">
                      <span className="font-sans text-[10px] not-italic text-gold-600 dark:text-gold-500 mr-2 uppercase tracking-widest">R.</span>
                      {salmo.refrao}
                    </p>
                  )}
                </div>
              ))}

              <div className="text-center mt-4"><span className="text-gold-400/60 text-lg">✦</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Página principal ───────────────────────────────────────────────────────
export default function LeituraPage() {
  const [primeiraLeitura, setPrimeiraLeitura] = useState<LeituraFormatada | null>(null);
  const [segundaLeitura, setSegundaLeitura] = useState<LeituraFormatada | null>(null);
  const [salmo, setSalmo] = useState<SalmoFormatado | null>(null);
  const [evangelho, setEvangelho] = useState<LeituraFormatada | null>(null);
  const [meta, setMeta] = useState<{ liturgia: string; cor: string; santos?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();

  const fetchLiturgia = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://liturgia.up.railway.app/${dia}-${mes}-${ano}`);
      if (!res.ok) throw new Error('API indisponível');
      const json: LiturgiaAPIResponse = await res.json();

      // 1ª Leitura
      const prim = json.primeiraLeitura ?? json.leituras?.[0];
      setPrimeiraLeitura(prim ? parseLeitura(prim, 'Primeira Leitura') : null);

      // 2ª Leitura — só exibe se existir E tiver texto
      const seg = json.segundaLeitura ?? json.leituras?.[1];
      setSegundaLeitura(seg && seg.texto?.trim() ? parseLeitura(seg, 'Segunda Leitura') : null);

      // Salmo
      setSalmo(json.salmo ? parseSalmo(json.salmo) : null);

      // Evangelho
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

  useEffect(() => { fetchLiturgia(); }, []);

  const corInfo = COR_MAP[meta?.cor || 'verde'] || COR_MAP.verde;

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
            ✦ Igreja Católica Apostólica Romana 🇻🇦✦
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-3">
            Leitura do Dia
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-400 capitalize">{dataFormatada}</p>

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
            <p className="font-body text-sm text-marian-500 dark:text-parchment-500">
              Carregando leituras do dia...
            </p>
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-crimson-100 dark:bg-crimson-900/30 flex items-center justify-center">
              <AlertCircle size={26} className="text-crimson-600 dark:text-crimson-400" />
            </div>
            <p className="font-body text-marian-600 dark:text-parchment-400">{error}</p>
            <button onClick={fetchLiturgia}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-800
                text-parchment-100 font-body text-sm transition-all">
              <RefreshCw size={15} /> Tentar novamente
            </button>
          </div>
        )}

        {/* Conteúdo — ordem litúrgica correta */}
        {!loading && !error && (
          <div className="space-y-3">

            {/* 1 — Primeira Leitura */}
            {primeiraLeitura && (
              <LeituraCard leitura={primeiraLeitura} defaultOpen />
            )}

            {/* 2 — Salmo Responsorial */}
            {salmo && (
              <>
                <Separador label="Salmo Responsorial" />
                <SalmoCard salmo={salmo} />
              </>
            )}

            {/* 3 — Segunda Leitura (só aparece se existir) */}
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
                <LeituraCard
                  leitura={evangelho}
                  defaultOpen />
              </>
            )}

            {/* Rodapé */}
            <div className="text-center pt-6 space-y-3">
              <button onClick={fetchLiturgia}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gold-500/30
                  font-body text-sm text-marian-500 dark:text-parchment-500 hover:border-gold-500/60 transition-colors">
                <RefreshCw size={13} /> Atualizar leituras
              </button>
              <p className="font-body text-xs text-marian-400 dark:text-parchment-600 italic">
                Leituras da Santa Missa conforme o Missal Romano da Igreja Católica
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
