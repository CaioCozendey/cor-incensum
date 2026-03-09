import { useState } from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';

const PROMESSAS = [
  { num: 1, texto: 'A minha bênção permanecerá sobre as casas em que se achar exposta e venerada a imagem de Meu Sagrado Coração.' },
  { num: 2, texto: 'Eu darei aos devotos de Meu Coração todas as graças necessárias a seu estado.' },
  { num: 3, texto: 'Estabelecerei e conservarei a paz em suas famílias.' },
  { num: 4, texto: 'Eu os consolarei em todas as suas aflições.' },
  { num: 5, texto: 'Serei refúgio seguro na vida e principalmente na hora da morte.' },
  { num: 6, texto: 'Lançarei bênçãos abundantes sobre os seus trabalhos e empreendimentos.' },
  { num: 7, texto: 'Os pecadores encontrarão, em meu Coração, fonte inesgotável de misericórdias.' },
  { num: 8, texto: 'As almas tíbias tornar-se-ão fervorosas pela prática dessa devoção.' },
  { num: 9, texto: 'As almas fervorosas subirão, em pouco tempo, a uma alta perfeição.' },
  { num: 10, texto: 'Darei aos sacerdotes que praticarem especialmente essa devoção o poder de tocar os corações mais endurecidos.' },
  { num: 11, texto: 'As pessoas que propagarem esta devoção terão o seu nome inscrito para sempre no Meu Coração.' },
  { num: 12, texto: 'A graça da perseverança final (Salvação Eterna) e de não morrer em desgraça sera dada a todos aqueles que receberem a Comunhão nos primeiros sextas-feiras do mês durante nove meses consecutivos.' },
];

const PRATICAS = [
  {
    titulo: 'Comunhão dos Primeiros Sextas-Feiras',
    icone: '🕯️',
    descricao: 'Receber a Sagrada Comunhão nas primeiras sextas-feiras de nove meses consecutivos, em reparação pelos pecados cometidos contra o Coração de Jesus. Esta prática está ligada à 12ª promessa — a da graça da perseverança final.',
  },
  {
    titulo: 'Hora Santa',
    icone: '⏳',
    descricao: 'Passar uma hora em adoração diante do Santíssimo Sacramento, das 23:00 - 00:00 as quintas-feiras, em memória da agonia de Jesus no Getsêmani. Jesus pediu esta prática a Santa Margarida Maria Alacoque: "Não podeis vigiar uma hora comigo?"',
  },
  {
    titulo: 'Consagração ao Sagrado Coração',
    icone: '✝️',
    descricao: 'Consagrar a si mesmo, a família e o lar ao Sagrado Coração de Jesus, entronizando uma Imagem do Sagrado Coração de Jesus no ambiente doméstico. O lar consagrado reconhece Jesus como Rei e centro da vida familiar.',
  },
  {
    titulo: 'Reparação e Ato de Desagravo',
    icone: '🙏',
    descricao: 'Oferecer orações, sacrifícios e comunhões em reparação pelas ofensas cometidas contra o Coração de Jesus — especialmente as blasfêmias, as ingratidões e a indiferença dos cristãos.',
  },
  {
    titulo: 'Festa do Sagrado Coração',
    icone: '❤️',
    descricao: 'Celebrar com devoção especial a Solenidade do Sagrado Coração de Jesus, que ocorre na terceira sexta-feira após Pentecostes. É o dia mais importante desta devoção no calendário litúrgico.',
  },
  {
    titulo: 'Oração do Ângelus e do Terço',
    icone: '📿',
    descricao: 'Rezar o Terço e o Ângelus como práticas diárias de união com o Coração de Jesus através de Maria. A devoção mariana e a devoção ao Sagrado Coração são inseparáveis na tradição católica.',
  },
];

interface Secao {
  titulo: string;
  conteudo: string;
}

const SECOES: Secao[] = [
  {
    titulo: 'O que é o Sagrado Coração de Jesus?',
    conteudo: `O Sagrado Coração de Jesus é um dos mais ricos símbolos da fé cristã. Refere-se ao coração físico de Jesus Cristo como símbolo de Seu amor infinito pela humanidade — um amor que foi trespassado pela lança do soldado romano, que bateu por cada um de nós e que continua ardendo em desejo de nos salvar.

Esta devoção não é uma simples piedade sentimental. É uma contemplação profunda do mistério do amor divino encarnado. O coração de Jesus é o coração do Verbo feito carne — e, portanto, é o coração do próprio Deus.

São João Paulo II ensinou que "no Coração de Cristo, o coração humano aprende a conhecer o sentido verdadeiro e único da sua vida e do seu destino". É neste Coração que toda a humanidade encontra seu centro e seu fim.`,
  },
  {
    titulo: 'As Aparições a Santa Margarida Maria Alacoque',
    conteudo: `A devoção ao Sagrado Coração foi especialmente revelada a Santa Margarida Maria Alacoque (1647–1690), religiosa francesa da Visitação em Paray-le-Monial, França. Jesus apareceu a ela entre 1673 e 1675 em uma série de visões profundas.

Na grande aparição de 1675, Jesus lhe mostrou Seu Coração rodeado de chamas, coroado de espinhos e com uma cruz sobre ele, dizendo: "Eis o Coração que tanto amou os homens, que nada poupou, chegando até a Se esgotar e consumir para lhes testemunhar Seu amor. Em troca, da maior parte deles, recebo somente ingratidão."

Jesus pediu então: a festa em Sua honra na sexta-feira após o Corpus Christi, a comunhão reparadora nos primeiros sextas-feiras, e a Hora Santa. O Beato Padre Cláudio de la Colombière, confessor de Santa Margarida, foi instrumento providencial na propagação desta devoção.`,
  },
  {
    titulo: 'A Mensagem Central da Devoção',
    conteudo: `O Sagrado Coração revela três verdades fundamentais:

Primeiro, o amor infinito de Deus por cada ser humano, individualmente. Não é um amor abstrato ou genérico — é pessoal, apaixonado e sacrificial. Jesus nos diz: "Eu vos amei com um amor eterno" (Jr 31,3).

Segundo, a dor deste Coração diante da ingratidão, da indiferença e do pecado. Jesus não nos apresenta este Coração para nos culpar, mas para nos mover à compaixão e à conversão — assim como o filho pródigo, ao recordar o amor do pai, levantou-se e voltou.

Terceiro, o convite à reparação. Somos chamados não apenas a receber o amor, mas a correspondê-lo — amando a Deus de volta, desagravando as ofensas feitas a Ele e levando outros a conhecer este Coração misericordioso.`,
  },
];

function SecaoAccordion({ secao }: { secao: Secao }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gold-500/20 bg-parchment-100 dark:bg-marian-700 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left group">
        <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100
          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
          {secao.titulo}
        </h3>
        <span className="text-gold-500 shrink-0">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-6">
          <div className="border-t border-gold-500/20 pt-4">
            <p className="font-body text-base text-marian-700 dark:text-parchment-300 leading-loose whitespace-pre-line">
              {secao.conteudo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SagradoCoracaoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-crimson opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <img src='/jesus-e-sagrado-coracao.png' alt='Imagem do Sagrado Coração de Jesus' className=''></img>
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-crimson-600 dark:text-crimson-400 mb-3">
            ✦ Devoção Católica ✦
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-4">
            Sagrado Coração de Jesus
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-400 leading-relaxed max-w-xl mx-auto italic">
            "Eis o Coração que tanto amou os homens e que, em troca, recebe da maior parte deles somente ingratidão."
          </p>
          <p className="font-body text-xs text-marian-400 dark:text-parchment-600 mt-2">— Jesus a Santa Margarida Maria Alacoque</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Seções explicativas */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gold-500/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">Conhecer a Devoção</span>
            <span className="h-px flex-1 bg-gold-500/20" />
          </div>
          <div className="space-y-3">
            {SECOES.map((s, i) => <SecaoAccordion key={i} secao={s} />)}
          </div>
        </section>

        {/* As 12 Promessas */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gold-500/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">As 12 Promessas</span>
            <span className="h-px flex-1 bg-gold-500/20" />
          </div>
          <p className="font-body text-sm text-marian-500 dark:text-parchment-500 mb-6 text-center italic">
            Prometidas por Jesus a Santa Margarida Maria Alacoque para todos os que praticarem a devoção ao Seu Sagrado Coração.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROMESSAS.map(p => (
              <div key={p.num}
                className={`relative p-5 rounded-2xl border overflow-hidden
                  ${p.num === 12
                    ? 'border-gold-400/50 bg-gold-50 dark:bg-gold-900/20 col-span-1 sm:col-span-2'
                    : 'border-gold-500/20 bg-parchment-100 dark:bg-marian-700'}`}>
                {p.num === 12 && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-100/40 to-transparent dark:from-gold-900/20 pointer-events-none" />
                )}
                <div className="relative z-10 flex gap-4 items-start">
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-bold
                    ${p.num === 12
                      ? 'bg-gold-500 text-white'
                      : 'bg-crimson-700/10 dark:bg-crimson-900/30 text-crimson-700 dark:text-crimson-400'}`}>
                    {p.num}
                  </span>
                  <p className={`font-body text-sm leading-relaxed
                    ${p.num === 12
                      ? 'text-marian-800 dark:text-parchment-100 font-medium'
                      : 'text-marian-700 dark:text-parchment-300'}`}>
                    {p.texto}
                    {p.num === 12 && (
                      <span className="block mt-1 font-sans text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-500">
                        ✦ A Grande Promessa
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Práticas */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gold-500/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">Como Praticar a Devoção</span>
            <span className="h-px flex-1 bg-gold-500/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATICAS.map((p, i) => (
              <div key={i} className="p-5 rounded-2xl border border-gold-500/20 bg-parchment-100 dark:bg-marian-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{p.icone}</span>
                  <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100">{p.titulo}</h3>
                </div>
                <p className="font-body text-sm text-marian-600 dark:text-parchment-400 leading-relaxed">{p.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Oração de Consagração */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gold-500/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">Oração de Consagração</span>
            <span className="h-px flex-1 bg-gold-500/20" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-crimson-700/20 bg-parchment-100 dark:bg-marian-700">
            <div className="absolute inset-0 bg-gradient-to-b from-crimson-700/5 to-transparent pointer-events-none" />
            <div className="relative z-10 p-6 sm:p-10">
              <div className="text-center mb-6"><span className="text-crimson-400/60 text-xl">✦</span></div>
              <p className="font-body text-base text-marian-800 dark:text-parchment-200 leading-loose text-center whitespace-pre-line">
                {`Eu, N____, dou e consagro ao Sagrado Coração de Nosso Senhor Jesus Cristo a minha pessoa e a minha vida, minhas ações, penas e sofrimentos, para não mais querer servir-me de parte alguma do meu ser senão para O honrar, amar e glorificar.

É esta a minha vontade irrevogável: pertencer-Lhe inteiramente e tudo fazer por seu amor, renunciando de todo o coração a tudo quanto Lhe possa desagradar.

Eu Vos tomo, ó Sagrado Coração, por único objeto do meu amor, protetor da minha vida, segurança da minha salvação, remédio da minha fragilidade e inconstância, reparador de todas as faltas da minha vida e meu asilo seguro na hora da morte.

Sede, ó Coração de bondade, minha justificação diante de Deus Pai, e afastai de mim os raios da sua justa cólera.

Ó Coração de amor, ponho em Vós toda a minha confiança, pois tudo temo da minha malícia e fraqueza, mas tudo espero da Vossa bondade.

Consumí em mim tudo o que Vos possa desagradar ou resistir; que o Vosso puro amor se imprima tão profundamente em meu coração que jamais Vos possa esquecer ou separar-me de Vós.

Suplico-Vos, por Vossa infinita bondade, que o meu nome esteja escrito em Vós, pois quero fazer consistir toda a minha felicidade em viver e morrer como Vossa escrava.`}
              </p>
              <div className="text-center mt-6"><span className="text-crimson-400/60 text-xl">✦</span></div>
            </div>
          </div>
        </section>

        {/* Citação final */}
        <section className="text-center py-8">
          <blockquote className="font-serif text-xl sm:text-2xl text-crimson-800 dark:text-parchment-100 italic leading-relaxed max-w-2xl mx-auto mb-4">
            "Vinde a mim todos vós que estais cansados e sobrecarregados, e Eu vos darei descanso."
          </blockquote>
          <cite className="font-body text-sm text-marian-500 dark:text-parchment-500">— Mateus 11, 28</cite>
        </section>

      </div>
    </div>
  );
}
