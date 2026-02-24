import { useState } from 'react';

const MISTERIOS = [
  {
    tipo: 'Gozosos',
    dia: 'Segunda e Sábado',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-gold-400',
    lista: [
      { numero: 1, nome: 'A Anunciação do Anjo a Virgem Maria', meditacao: 'O Anjo Gabriel anuncia a Maria que ela será a Mãe do Salvador. Maria, cheia de graça, responde com total entrega: "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra."' },
      { numero: 2, nome: 'A Visitação de Maria a Isabel', meditacao: 'Maria vai apressadamente visitar sua prima Isabel. Ao ouvir a saudação de Maria, João Batista exulta no seio de sua mãe. Isabel, cheia do Espírito Santo, exclama: "Bendita és tu entre as mulheres!"' },
      { numero: 3, nome: 'O Nascimento de Jesus em Belém', meditacao: 'Jesus nasce em uma manjedoura, envolvido em faixas. Os anjos anunciam a boa-nova aos pastores: "Hoje vos nasceu o Salvador, que é Cristo Senhor, na cidade de Davi."' },
      { numero: 4, nome: 'A Apresentação de Jesus no Templo', meditacao: 'Maria e José apresentam o Menino Jesus no templo de Jerusalém. O ancião Simeão, tomando Jesus nos braços, profetiza: "Uma espada traspassará a tua própria alma."' },
      { numero: 5, nome: 'A Perda e o Encontro de Jesus no Templo', meditacao: 'Aos doze anos, Jesus fica em Jerusalém enquanto Maria e José retornam. Após três dias de angustiosa busca, encontram-no no Templo, ensinando os doutores da Lei.' },
    ],
  },
  {
    tipo: 'Luminosos',
    dia: 'Quinta-feira',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-sky-400',
    lista: [
      { numero: 1, nome: 'O Batismo de Jesus no Rio Jordão', meditacao: 'João batiza Jesus no Jordão. O céu se abre, o Espírito Santo desce como pomba, e a voz do Pai proclama: "Este é o meu Filho amado, em quem me comprazo."' },
      { numero: 2, nome: 'As Bodas de Caná', meditacao: 'A pedido de Maria, Jesus realiza seu primeiro milagre: transforma água em vinho. Maria intercede com confiança e diz aos serventes: "Fazei tudo o que Ele vos disser."' },
      { numero: 3, nome: 'O Anúncio do Reino de Deus', meditacao: 'Jesus proclama: "Convertei-vos, porque o Reino dos Céus está próximo." Convida todos à conversão, ao perdão e ao amor fraterno, curando enfermos e anunciando a boa-nova.' },
      { numero: 4, nome: 'A Transfiguração de Jesus', meditacao: 'No monte Tabor, Jesus se transfigura diante de Pedro, Tiago e João. Seu rosto brilha como o sol e suas vestes tornam-se brancas como a neve. A voz do Pai reafirma: "Este é o meu Filho amado."' },
      { numero: 5, nome: 'A Instituição da Eucaristia', meditacao: 'Na Última Ceia, Jesus toma o pão e o vinho e diz: "Isto é o meu corpo... Este é o cálice do meu sangue." Institui o sacramento da Eucaristia e o sacerdócio ministerial.' },
    ],
  },
  {
    tipo: 'Dolorosos',
    dia: 'Terça e Sexta-feira',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-crimson-600',
    lista: [
      { numero: 1, nome: 'A Agonia de Jesus no Horto', meditacao: 'No Jardim do Getsêmani, Jesus ora ao Pai com agonia: "Pai, se possível, afasta de mim este cálice; contudo, não seja feita a minha vontade, mas a tua." Sua angústia é tão intensa que sua suor se torna gotas de sangue.' },
      { numero: 2, nome: 'A Flagelação de Jesus', meditacao: 'Jesus é entregue aos soldados romanos, que o açoitam cruelmente. Cada golpe é uma reparação pelos pecados da humanidade. Jesus suporta tudo por amor a nós.' },
      { numero: 3, nome: 'A Coroação de Espinhos', meditacao: 'Os soldados trançam uma coroa de espinhos e a impõem sobre a cabeça de Jesus. Cobrem-no com manto de púrpura e zombam: "Salve, rei dos judeus!" Jesus aceita tudo em silêncio.' },
      { numero: 4, nome: 'Jesus Carrega a Cruz', meditacao: 'Condenado por Pilatos, Jesus carrega a pesada cruz em direção ao Calvário. Caindo por três vezes, levanta-se sempre por amor a nós. Simão de Cirene é forçado a ajudá-lo.' },
      { numero: 5, nome: 'A Crucificação e Morte de Jesus', meditacao: 'No Calvário, Jesus é crucificado entre dois ladrões. Da cruz, perdoa os seus algozes e entrega sua mãe ao discípulo amado. Às três horas da tarde, inclina a cabeça e expira: "Está consumado!"' },
    ],
  },
  {
    tipo: 'Gloriosos',
    dia: 'Quarta e Domingo',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-gold-500',
    lista: [
      { numero: 1, nome: 'A Ressurreição de Jesus', meditacao: 'No terceiro dia, Jesus ressuscita glorioso dos mortos. O sepulcro está vazio. Aparece a Maria Madalena, aos discípulos de Emaús e aos Apóstolos reunidos. A morte foi vencida!' },
      { numero: 2, nome: 'A Ascensão de Jesus ao Céu', meditacao: 'Quarenta dias após a Ressurreição, Jesus sobe ao céu na presença dos apóstolos. Os anjos anunciam: "Este Jesus que foi arrebatado de vós para o céu virá do mesmo modo que o vistes partir."' },
      { numero: 3, nome: 'A Vinda do Espírito Santo', meditacao: 'No dia de Pentecostes, o Espírito Santo desce sobre Maria e os Apóstolos em forma de línguas de fogo. Cheios do Espírito, saem a proclamar corajosamente a Boa-Nova de Jesus ressuscitado.' },
      { numero: 4, nome: 'A Assunção de Maria ao Céu', meditacao: 'Ao fim de sua vida terrena, Maria é assumida ao céu em corpo e alma. Ela que acolheu o Filho de Deus em seu seio, é agora recebida na glória celeste junto ao Filho ressuscitado.' },
      { numero: 5, nome: 'A Coroação de Maria Rainha', meditacao: 'Maria é coroada Rainha do Céu e da Terra, dos Anjos e dos Santos. Intercede continuamente por seus filhos, sendo o grande sinal de esperança e consolo até que venha o dia do Senhor.' },
    ],
  },
];

const MISTERIOS_SAO_LUIS = [
  {
    tipo: 'Gozosos',
    dia: 'Segunda e Sábado',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-gold-400',
    lista: [
      { numero: 1, nome: 'A Anunciação do Anjo a Virgem Maria', meditacao: 'O Anjo Gabriel anuncia a Maria que ela será a Mãe do Salvador. Maria, cheia de graça, responde com total entrega: "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra."', intencao: "Nós Vos oferecemos, Senhor Jesus, esta primeira dezena, para honrar a vossa Encarnação no seio da Virgem Maria; e Vos pedimos, que por este mistério e por intercessão dela, uma profunda humildade.", gracas: "Graças do mistério da Encarnação, descei às nossas almas. Assim seja." },
      { numero: 2, nome: 'A Visitação da Virgem Maria a sua prima Santa Isabel', meditacao: 'Maria vai apressadamente visitar sua prima Isabel. Ao ouvir a saudação de Maria, João Batista exulta no seio de sua mãe. Isabel, cheia do Espírito Santo, exclama: "Bendita és tu entre as mulheres!"', intencao: "Nós Vos oferecemos, Senhor Jesus, esta segunda dezena, para honrar a Visitação de Vossa Santíssima Mãe à sua prima Santa Isabel e a santificação de São João Batista; e Vos pedimos, por este mistério e por intercessão de Vossa Mãe Santíssima, a caridade perfeita para com o próximo.", gracas: "Graças do mistério da visitação, descei às nossas almas. Assim seja." },
      { numero: 3, nome: 'O Nascimento de nosso Senhor Jesus em Belém', meditacao: 'Jesus nasce em uma manjedoura, envolvido em faixas. Os anjos anunciam a boa-nova aos pastores: "Hoje vos nasceu o Salvador, que é Cristo Senhor, na cidade de Davi."', intencao: "Nós Vos oferecemos, Senhor Jesus, esta terceira dezena, para honrar o vosso Nascimento no estábulo de Belém; evos pedimos, por este mistério e por intercessão de Vossa Mãe Santíssima, o desapego dos bens terrenos e das riquezas e o amor à santa pobreza.", gracas: "Graças do mistério do nascimento de Jesus, descei às nossas almas. Assim seja." },
      { numero: 4, nome: 'A Apresentação de Nosso Senhor Jesus Cristo no Templo e a purificação da Virgem Maria', meditacao: 'Maria e José apresentam o Menino Jesus no templo de Jerusalém. O ancião Simeão, tomando Jesus nos braços, profetiza: "Uma espada traspassará a tua própria alma."', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quarta dezena, para honrar a vossa apresentação no Templo, e a purificação de Maria; e Vos pedimos por este mistério e por intercessão dela, uma grande pureza de corpo e alma.", gracas: "Graças do mistério da Purificação, descei às nossas almas. Assim seja." },
      { numero: 5, nome: 'A Perda e o Encontro do menino Jesus no Templo', meditacao: 'Aos doze anos, Jesus fica em Jerusalém enquanto Maria e José retornam. Após três dias de angustiosa busca, encontram-no no Templo, ensinando os doutores da Lei.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quinta dezena, para honrar vosso reencontro por Maria, e Vos pedimos por este mistério e por intercessão dela a verdadeira sabedoria.", gracas: "Graças do mistério do reencontro de Jesus, descei às nossas almas. Assim Seja." },
    ],

  },
  {
    tipo: 'Dolorosos',
    dia: 'Terça e Sexta-feira',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-crimson-600',
    lista: [
      { numero: 1, nome: 'A Agonia de nosso Senhor Jesus Cristo no Horto', meditacao: 'No Jardim do Getsêmani, Jesus ora ao Pai com agonia: "Pai, se possível, afasta de mim este cálice; contudo, não seja feita a minha vontade, mas a tua." Sua angústia é tão intensa que sua suor se torna gotas de sangue.', intencao: "Nós Vos oferecemos, Senhor Jesus essa primeira (6ª) dezena para honrar a vossa agonia mortal no Jardim das Oliveiras; e Vos pedimos, por este mistério e por intercessão de Vossa Mãe Santíssima, a contrição dos nossos pecados.", gracas: "Graças do mistério da agonia de Jesus, descei às nossas almas. Assim seja." },
      { numero: 2, nome: 'A Flagelação de nosso Senhor Jesus Cristo', meditacao: 'Jesus é entregue aos soldados romanos, que o açoitam cruelmente. Cada golpe é uma reparação pelos pecados da humanidade. Jesus suporta tudo por amor a nós.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta segunda (ou 7ª) dezena para honrar a vossa sangrenta flagelação; e Vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a perfeita mortificação do sentidos.", gracas: "Graças do mistério da flageção de Jesus, descei à minha alma e faze-a verdadeiramente mortificada. Assim seja." },
      { numero: 3, nome: 'A Coroação de Espinhos de nosso Senhor Jesus Cristo', meditacao: 'Os soldados trançam uma coroa de espinhos e a impõem sobre a cabeça de Jesus. Cobrem-no com manto de púrpura e zombam: "Salve, rei dos judeus!" Jesus aceita tudo em silêncio.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta terceira (ou 8ª) dezena para honrar a vossa coroação de espinhos; e Vos pedimos por este mistério e por intercessão de Vossa Mãe Santíssima, o desprendimento do mundo.", gracas: "Graças do misterio da coroação de espinhos, descei às nossas almas. Assim seja." },
      { numero: 4, nome: 'Nosso Senhor Jesus Cristo Carregando a Cruz', meditacao: 'Condenado por Pilatos, Jesus carrega a pesada cruz em direção ao Calvário. Caindo por três vezes, levanta-se sempre por amor a nós. Simão de Cirene é forçado a ajudá-lo.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quarta (ou 9ª) dezena pra honrar o carregamento da cruz, e Vos pedimos, por este mistério e por intercessão de Vossa Mãe Santíssima, a paciência em todas as nossas cruzes.", gracas: "Graças do mistério do carregamento da cruz, descei às nossas almas. Assim seja." },
      { numero: 5, nome: 'A Crucificação e Morte de nosso Senhor Jesus Cristo', meditacao: 'No Calvário, Jesus é crucificado entre dois ladrões. Da cruz, perdoa os seus algozes e entrega sua mãe ao discípulo amado. Às três horas da tarde, inclina a cabeça e expira: "Está consumado!"', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quinta (ou 10ª) dezena para honrar a vossa crucifixão e morte ignominiosa sobre o Calvário; e Vos pedimos, por este mistério e pela intercessão de vossa Mãe, a conversão dos pecadores, a perseverança dos justos e o alivio das almas do Purgatório.", gracas: "Graças do misterio da crucifixão de Jesus, descei às nossas almas. Assim seja." },
    ],
  },
  {
    tipo: 'Gloriosos',
    dia: 'Quarta e Domingo',
    cor: 'bg-white dark:bg-marian-700',
    acento: 'border-gold-500',
    lista: [
      { numero: 1, nome: 'A Ressurreição de nosso Senhor Jesus Cristo', meditacao: 'No terceiro dia, Jesus ressuscita glorioso dos mortos. O sepulcro está vazio. Aparece a Maria Madalena, aos discípulos de Emaús e aos Apóstolos reunidos. A morte foi vencida!', intencao: "Nós Vos oferecemos, Senhor Jesus, esta primeira (ou 11ª) dezena para honrar a vossa ressureição gloriosa; e Vos pedimos, por este mistério e pela intercessão de Vossa Mãe Santíssima, o amor de Deus e o fervor do vosso serviço.", gracas: "Graças do mistério da Ressureição, descei às nossas almas. Assim seja." },
      { numero: 2, nome: 'A Ascensão de nosso Senhor Jesus Cristo ao Céu', meditacao: 'Quarenta dias após a Ressurreição, Jesus sobe ao céu na presença dos apóstolos. Os anjos anunciam: "Este Jesus que foi arrebatado de vós para o céu virá do mesmo modo que o vistes partir."', intencao: "Nós Vo oferecemos, Senhor Jesus, esta segunda (ou 12°) dezena para honrar a vossa triunfante ascensão ao céu; e vos pedimos, por este mistério e pela intercessão da Vossa Mãe Santíssima, uma firme esperança e ardente desejo do céu.", gracas: "Graças do mistério da ascensão, descei às nossas almas. Assim seja." },
      { numero: 3, nome: 'A Vinda do Espírito Santo sobre Nossa Senhora e os apostolos', meditacao: 'No dia de Pentecostes, o Espírito Santo desce sobre Maria e os Apóstolos em forma de línguas de fogo. Cheios do Espírito, saem a proclamar corajosamente a Boa-Nova de Jesus ressuscitado.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta terceira (ou 13ª) dezena para honrar o mistério de Pentecostes; e Vo pedimos por este mistério e pela intercessão de vossa Mãe Santíssima, a descida do Espírito Santo às nossas almas.", gracas: "Graças do mistério de Pentecostes, descei às nossas almas. Assim seja." },
      { numero: 4, nome: 'A Assunção de Maria ao Céu', meditacao: 'Ao fim de sua vida terrena, Maria é assumida ao céu em corpo e alma. Ela que acolheu o Filho de Deus em seu seio, é agora recebida na glória celeste junto ao Filho ressuscitado.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quarta (ou 14ª) dezena para honrar a Imaculada Conceição e a Assunção de Vossa Mãe Santíssima, em corpo e alma, ao céu; e Vos pedimos, por estes dois mistérios e pela intercessão de vossa Mãe Santíssima, o dom da verdadeira devoção a ela.", gracas: "Graças do mistério da Imaculada Conceição e da Assunção de maria, descei às nossas almas. Assim Seja." },
      { numero: 5, nome: 'A Coroação de Maria como Rainha do céu e da Terra', meditacao: 'Maria é coroada Rainha do Céu e da Terra, dos Anjos e dos Santos. Intercede continuamente por seus filhos, sendo o grande sinal de esperança e consolo até que venha o dia do Senhor.', intencao: "Nós Vos oferecemos, Senhor Jesus, esta quinta (ou 15ª) dezena para honrar a coroação gloriosa de Vossa Mãe Santíssima no céu; e Vos pedimos, por este mistério e por intercessão dela a perseverança na graça o aumento das virtudes até o momento da morte e depois disto a coroa da glória que nos está preparada. Pedimos a mesma graça por todos os justos e por todos nossos benfeitos... Assim seja.", gracas: "Nos vos rogamos, amável Senhor JESUS, pelos quinze mistérios de Vossa vida, morte e paixão, por Vossa Glória e pelos méritos de Vossa Santíssima Mãe, convertei os pecadores e ajudai os que estão morrendo, livrais as santas almas do Purgatório e dai a nós todos a Vossa graça, para que vivamos bem e morramos bem e por caridade, dai-nos a Luz de Vossa glória para que possamos ver Vossa face e Vos amar por toda a eternidade. Amém. Assim seja." },
    ],
  },
];

const ORACOES = {
  credoApostolico: `Creio em Deus Pai Todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, Nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai Todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna.

Amém.`,

  paiNosso: `Pai Nosso, que estais no céu, santificado seja o vosso Nome. Venha a nós o vosso Reino. Seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação. Mas livrai-nos do mal.

Amém.`,

  aveMaria: `Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte.

Amém.`,

  gloriaAoPai: `Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre.

Amém.`,

  oFatima: `Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu, especialmente as que mais precisarem da Vossa misericórdia.`,

  salveRainha: `Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, o bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria.

Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo.

Amém.`,
};

type Tab = 'oração' | 'mistérios' | 'como-rezar' | "como-rezar-sao-luiz-maria";

export default function RosarioPage() {
  const [tab, setTab] = useState<Tab>('oração');
  const [misterioAberto, setMisterioAberto] = useState<number | null>(null);
  const [misterioSelecionado, setMisterioSelecionado] = useState(0);
  const [oracaoExpandida, setOracaoExpandida] = useState<string | null>(null);

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'como-rezar', label: '📖 Como Rezar' },
    { id: 'oração', label: '🙏 A Oração' },
    { id: 'mistérios', label: '✦ Os Mistérios' },
    { id: 'como-rezar-sao-luiz-maria', label: '📖 Rosário com São Luis Maria Grignion de Montfort' },
  ];

  const oracoesLista = [
    { id: 'credoApostolico', titulo: 'Credo Apostólico', subtitulo: 'Profissão de fé — início do Rosário' },
    { id: 'paiNosso', titulo: 'Pai Nosso', subtitulo: 'A oração ensinada por Jesus' },
    { id: 'aveMaria', titulo: 'Ave Maria', subtitulo: 'Rezada 10 vezes em cada mistério' },
    { id: 'gloriaAoPai', titulo: 'Glória ao Pai', subtitulo: 'Após as 10 Ave-Marias' },
    { id: 'oFatima', titulo: 'Oração de Fátima', subtitulo: 'Pedido das aparições de 1917' },
    { id: 'salveRainha', titulo: 'Salve Rainha', subtitulo: 'Encerramento do Rosário' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden bg-parchment-300/40 dark:bg-marian-700/30">
        <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-40" />

        {/* Decorative rosary beads */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 right-12 flex gap-2 opacity-20 dark:opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`rounded-full bg-gold-600 dark:bg-gold-400 ${i === 0 ? 'w-4 h-4' : 'w-2.5 h-2.5 mt-0.5'}`} />
            ))}
          </div>
          <div className="absolute bottom-8 left-12 flex gap-2 opacity-20 dark:opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`rounded-full bg-gold-600 dark:bg-gold-400 ${i === 5 ? 'w-4 h-4' : 'w-2.5 h-2.5 mt-0.5'}`} />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            {/* Rosary icon SVG */}
            <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg">
              <defs>
                <radialGradient id="beadGrad" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#f4efe6" />
                  <stop offset="100%" stopColor="#c9a227" />
                </radialGradient>
                <radialGradient id="crossGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#7a1c1c" />
                </radialGradient>
              </defs>
              {/* Circle of beads */}
              {Array.from({ length: 18 }).map((_, i) => {
                const angle = (i * 360) / 18;
                const rad = (angle * Math.PI) / 180;
                const r = 42;
                const cx = 60 + r * Math.sin(rad);
                const cy = 52 - r * Math.cos(rad);
                return <circle key={i} cx={cx} cy={cy} r={i % 5 === 0 ? 5 : 3.5} fill="url(#beadGrad)" opacity={0.9} />;
              })}
              {/* Cross */}
              <rect x="56" y="94" width="8" height="22" rx="2" fill="url(#crossGrad)" />
              <rect x="49" y="100" width="22" height="8" rx="2" fill="url(#crossGrad)" />
              {/* Center */}
              <circle cx="60" cy="52" r="8" fill="url(#crossGrad)" opacity="0.6" />
            </svg>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-3">
            ✦ Devoção Mariana ✦
          </p>
          <h1 className="font-serif text-5xl font-semibold text-crimson-800 dark:text-parchment-100 mb-4">
            Santo Rosário
          </h1>
          <p className="font-body text-marian-600 dark:text-parchment-300 text-lg italic max-w-xl mx-auto">
            "O Rosário é a arma mais poderosa para combater os males do mundo."
          </p>
          <p className="font-sans text-xs text-gold-600 dark:text-gold-500 mt-2 tracking-widest uppercase">
            — São Padre Pio de Pietrelcina
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gold-500/20 bg-parchment-100/80 dark:bg-marian-700/50 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-4 font-body text-sm tracking-wide whitespace-nowrap border-b-2 transition-all duration-200
                ${tab === t.id
                  ? 'border-crimson-700 dark:border-gold-400 text-crimson-700 dark:text-gold-400 font-semibold'
                  : 'border-transparent text-marian-500 dark:text-parchment-500 hover:text-crimson-600 dark:hover:text-gold-400'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* === TAB: ORAÇÃO === */}
        {tab === 'oração' && (
          <div className="space-y-4">
            <div className="text-center mb-10">
              <p className="font-body text-marian-600 dark:text-parchment-400 italic">
                Todas as orações que compõem o Santo Rosário
              </p>
            </div>

            {oracoesLista.map((item, idx) => {
              const texto = ORACOES[item.id as keyof typeof ORACOES];
              const aberto = oracaoExpandida === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20
                    hover:border-gold-500/40 shadow-sm transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setOracaoExpandida(aberto ? null : item.id)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400
                        font-serif text-sm flex items-center justify-center shrink-0 border border-gold-400/30">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg text-crimson-800 dark:text-parchment-100
                          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
                          {item.titulo}
                        </h3>
                        <p className="font-body text-xs italic text-gold-600 dark:text-gold-500 mt-0.5">
                          {item.subtitulo}
                        </p>
                      </div>
                    </div>
                    <span className={`text-gold-500 dark:text-gold-400 transition-transform duration-300 ${aberto ? 'rotate-45' : ''}`}>
                      ✦
                    </span>
                  </button>

                  {aberto && (
                    <div className="px-6 pb-8">
                      <div className="relative rounded-xl overflow-hidden border border-gold-500/20">
                        <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none" />
                        <div className="relative z-10 p-6 sm:p-8">
                          <div className="text-center mb-6">
                            <span className="text-gold-500/60 text-xl">✦</span>
                          </div>
                          <p className="font-body text-base text-marian-800 dark:text-parchment-200
                            leading-loose whitespace-pre-line text-center">
                            {texto}
                          </p>
                          <div className="text-center mt-6">
                            <span className="text-gold-500/60 text-xl">✦</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* === TAB: MISTÉRIOS === */}
        {tab === 'mistérios' && (
          <div>
            <div className="text-center mb-10">
              <p className="font-body text-marian-600 dark:text-parchment-400 italic">
                Os quatro conjuntos de mistérios meditados durante o Rosário
              </p>
            </div>

            {/* Seletor de mistério */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {MISTERIOS.map((m, i) => (
                <button
                  key={m.tipo}
                  onClick={() => { setMisterioSelecionado(i); setMisterioAberto(null); }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${misterioSelecionado === i
                      ? 'border-crimson-700 dark:border-gold-400 bg-crimson-700/5 dark:bg-gold-500/10'
                      : 'border-gold-500/20 hover:border-gold-500/50 bg-parchment-100 dark:bg-marian-700'
                    }`}
                >
                  <p className={`font-serif text-base font-semibold mb-1 ${misterioSelecionado === i ? 'text-crimson-700 dark:text-gold-400' : 'text-crimson-800 dark:text-parchment-100'}`}>
                    {m.tipo}
                  </p>
                  <p className="font-body text-[11px] text-marian-500 dark:text-parchment-500">{m.dia}</p>
                </button>
              ))}
            </div>

            {/* Lista de mistérios */}
            <div className="space-y-3">
              {MISTERIOS[misterioSelecionado].lista.map((mist, idx) => {
                const aberto = misterioAberto === idx;
                return (
                  <div
                    key={idx}
                    className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20
                      hover:border-gold-500/40 shadow-sm transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setMisterioAberto(aberto ? null : idx)}
                      className="w-full flex items-center gap-4 p-5 text-left group"
                    >
                      <div className="w-10 h-10 rounded-full bg-crimson-700/10 dark:bg-crimson-900/30
                        border border-crimson-700/20 flex items-center justify-center shrink-0">
                        <span className="font-serif text-base font-bold text-crimson-700 dark:text-crimson-400">
                          {mist.numero}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-gold-600 dark:text-gold-500 mb-0.5">
                          {mist.numero}º Mistério {MISTERIOS[misterioSelecionado].tipo.slice(0, -1)}o
                        </p>
                        <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100
                          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
                          {mist.nome}
                        </h3>
                      </div>
                      <span className={`text-gold-500 text-sm transition-transform duration-300 shrink-0 ${aberto ? 'rotate-45' : ''}`}>
                        ✦
                      </span>
                    </button>

                    {aberto && (
                      <div className="px-5 pb-6">
                        <div className="border-l-2 border-gold-400/50 pl-5 ml-14">
                          <p className="font-body text-sm text-marian-700 dark:text-parchment-300 leading-relaxed italic">
                            {mist.meditacao}
                          </p>
                          <div className="mt-4 pt-4 border-t border-gold-500/20">
                            <p className="font-sans text-xs text-gold-600 dark:text-gold-500 uppercase tracking-widest mb-2">
                              Neste mistério reza-se:
                            </p>
                            <p className="font-body text-xs text-marian-500 dark:text-parchment-500">
                              1× Pai Nosso · 10× Ave Maria · 1× Glória ao Pai · Oração de Fátima
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === TAB: MISTÉRIOS COM SÃO LUIS MARIA=== */}
        {tab === 'como-rezar-sao-luiz-maria' && (
          <div>
            <div className="text-center mb-10 space-y-2">
              <p className="font-body text-marian-600 dark:text-parchment-400 italic">
                Os três conjuntos de mistérios meditados durante o Rosário
              </p>
              <p className='font-body text-sm text-marian-300 w-[60%] mx-auto dark:text-parchment-400 italic'>
                Na época de São Luis, os Mistérios Luminosos ainda não tinham sido Instituidos. Tal fato ocorreu em 16 de outubro de 2002 por meio da Carta Apostólica <a href='https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html' target='_blank' className='text-marian-500 underline'>Rosarium Virginis Mariae</a> (O Rosário da Virgem Maria) do Papa São João Paulo II , que incluiu cinco novos mistérios focados na vida pública de Jesus, do Batismo à Instituição da Eucaristia.
              </p>
            </div>

            {/* Seletor de mistério */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {MISTERIOS_SAO_LUIS.map((m, i) => (
                <button
                  key={m.tipo}
                  onClick={() => { setMisterioSelecionado(i); setMisterioAberto(null); }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${misterioSelecionado === i
                      ? 'border-crimson-700 dark:border-gold-400 bg-crimson-700/5 dark:bg-gold-500/10'
                      : 'border-gold-500/20 hover:border-gold-500/50 bg-parchment-100 dark:bg-marian-700'
                    }`}
                >
                  <p className={`font-serif text-base font-semibold mb-1 ${misterioSelecionado === i ? 'text-crimson-700 dark:text-gold-400' : 'text-crimson-800 dark:text-parchment-100'}`}>
                    {m.tipo}
                  </p>
                  <p className="font-body text-[11px] text-marian-500 dark:text-parchment-500">{m.dia}</p>
                </button>
              ))}
            </div>

            {/* Lista de mistérios */}
            <div className="space-y-3">
              {MISTERIOS_SAO_LUIS[misterioSelecionado].lista.map((mist, idx) => {
                const aberto = misterioAberto === idx;
                return (
                  <div
                    key={idx}
                    className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20
                      hover:border-gold-500/40 shadow-sm transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setMisterioAberto(aberto ? null : idx)}
                      className="w-full flex items-center gap-4 p-5 text-left group"
                    >
                      <div className="w-10 h-10 rounded-full bg-crimson-700/10 dark:bg-crimson-900/30
                        border border-crimson-700/20 flex items-center justify-center shrink-0">
                        <span className="font-serif text-base font-bold text-crimson-700 dark:text-crimson-400">
                          {mist.numero}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-gold-600 dark:text-gold-500 mb-0.5">
                          {mist.numero}º Mistério {MISTERIOS_SAO_LUIS[misterioSelecionado].tipo.slice(0, -1)}o
                        </p>
                        <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100
                          group-hover:text-crimson-700 dark:group-hover:text-gold-400 transition-colors">
                          {mist.nome}
                        </h3>
                      </div>
                      <span className={`text-gold-500 text-sm transition-transform duration-300 shrink-0 ${aberto ? 'rotate-45' : ''}`}>
                        ✦
                      </span>
                    </button>

                    {aberto && (
                      <div className="px-5 pb-6">
                        <div className="border-l-2 border-gold-400/50 pl-5 ml-14">
                          <p className="font-body text-sm text-marian-700 dark:text-parchment-300 leading-relaxed italic">
                            {mist.meditacao}
                          </p>
                          <div className="mt-4 pt-4 border-t border-gold-500/20">
                            <p className="font-sans text-xs text-gold-600 dark:text-gold-500 uppercase tracking-widest mb-2">
                              Neste mistério reza-se:
                            </p>
                            <div className='space-y-4'>
                              <p className="font-body text-xs text-marian-500 dark:text-parchment-500">
                                "{mist.intencao}"
                              </p>
                              <p className="font-body text-xs text-marian-500 dark:text-parchment-500">
                                1× Pai Nosso · 10× Ave Maria · 1× Glória ao Pai · Oração de Fátima
                              </p>
                              <p className="font-body text-xs text-marian-500 dark:text-parchment-500">
                                "{mist.gracas}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="text-center mb-10 pt-12">
                <p className="font-body text-marian-600 dark:text-parchment-400 italic">
                  As orações dos mistérios foram retiradas do Livro <a
                    href='https://amzn.to/4aPZ4rt'
                    target='_blank'
                    className='underline text-gold-600 hover:text-gold-300 dark:text-gold-600 dark:hover:text-gold-300'>
                    'O Segredo Admirável do Santíssimo Rosário'
                  </a> de São Luis Maria Grignio de Montfort.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* === TAB: COMO REZAR === */}
        {tab === 'como-rezar' && (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <p className="font-body text-marian-600 dark:text-parchment-400 italic">
                Guia passo a passo para rezar o Santo Rosário
              </p>
            </div>

            {[
              {
                passo: 1,
                titulo: 'Preparação e intenção',
                descricao: 'Faça o sinal da cruz e ofereça o Rosário a Nossa Senhora com uma intenção especial (pela família, pela paz, por um enfermo...). Tome o rosário nas mãos e comece pelo crucifixo.',
                icone: '✝️',
              },
              {
                passo: 2,
                titulo: 'No crucifixo — Credo Apostólico',
                descricao: 'Segurando o crucifixo, recite o Credo Apostólico como profissão de fé. Esta oração resume toda a crença Católica.',
                icone: '📜',
              },
              {
                passo: 3,
                titulo: 'Primeira conta grande — Pai Nosso',
                descricao: 'Na primeira conta grande após o crucifixo, reze o Pai Nosso.',
                icone: '🙏',
              },
              {
                passo: 4,
                titulo: 'Três contas pequenas — Ave Marias',
                descricao: 'Nas três contas pequenas seguintes, reze uma Ave Maria em cada uma, em honra a Santíssima Trindade.',
                icone: '📿',
              },
              {
                passo: 5,
                titulo: 'Glória ao Pai e Oração de Fátima',
                descricao: 'Reze o Glória ao Pai e, em seguida, a Oração de Fátima: "Ó meu Jesus, perdoai-nos..."',
                icone: '✨',
              },
              {
                passo: 6,
                titulo: 'Anuncia o 1º Mistério e reza Pai Nosso',
                descricao: 'Anuncie o Primeiro Mistério (de acordo com o dia da semana). Em seguida, reze o Pai Nosso na conta grande.',
                icone: '📖',
              },
              {
                passo: 7,
                titulo: 'Dez Ave Marias — a dezena',
                descricao: 'Nas dez contas pequenas, reze uma Ave Maria em cada uma, meditando no mistério anunciado.',
                icone: '🔟',
              },
              {
                passo: 8,
                titulo: 'Repita para os 5 mistérios',
                descricao: 'Repita os passos 6 e 7 para cada um dos cinco mistérios, sempre anunciando antes e meditando durante as Ave Marias.',
                icone: '🔄',
              },
              {
                passo: 9,
                titulo: 'Encerramento — Salve Rainha',
                descricao: 'Ao concluir os cinco mistérios, reze a Salve Rainha.',
                icone: '👑',
              },
              {
                passo: 10,
                titulo: 'Sinal da Cruz e agradecimento',
                descricao: 'Encerre com o Sinal da Cruz e um breve agradecimento a Nossa Senhora por sua intercessão.',
                icone: '🙌',
              },
            ].map(step => (
              <div key={step.passo} className="flex gap-4 bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 p-5 shadow-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-crimson-700/10 dark:bg-crimson-900/30
                    border border-crimson-700/20 flex items-center justify-center shrink-0">
                    <span className="font-serif text-sm font-bold text-crimson-700 dark:text-crimson-400">{step.passo}</span>
                  </div>
                  {step.passo < 10 && <div className="w-px flex-1 bg-gold-400/20" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{step.icone}</span>
                    <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100">{step.titulo}</h3>
                  </div>
                  <p className="font-body text-sm text-marian-600 dark:text-parchment-400 leading-relaxed">
                    {step.descricao}
                  </p>
                </div>
              </div>
            ))}

            {/* Mistérios por dia */}
            <div className="mt-8 bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 p-6">
              <h3 className="font-serif text-xl text-crimson-800 dark:text-parchment-100 mb-4">
                Mistérios por Dia da Semana
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MISTERIOS.map(m => (
                  <div key={m.tipo} className="text-center p-3 rounded-xl border border-gold-500/20 bg-parchment-50 dark:bg-marian-600">
                    <p className="font-serif text-base text-crimson-700 dark:text-gold-400 font-semibold mb-1">{m.tipo}</p>
                    <p className="font-body text-xs text-marian-500 dark:text-parchment-500">{m.dia}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 p-8 text-center">
              <div className="absolute inset-0 bg-radial-gold dark:bg-radial-crimson opacity-30" />
              <div className="relative z-10">
                <p className="font-serif text-2xl italic text-crimson-800 dark:text-parchment-100 mb-3">
                  "Nunca me deites o Rosário de lado.<br />É a tua arma."
                </p>
                <p className="font-sans text-xs text-gold-600 dark:text-gold-500 uppercase tracking-widest">
                  — São Padre Pio de Pietrelcina
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
