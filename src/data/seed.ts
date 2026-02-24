import { Prayer, Novena } from '../types';

export const SEED_PRAYERS: Prayer[] = [
  {
    id: '1',
    title: 'Oração ao Sagrado Coração de Jesus',
    slug: 'oracao-ao-sagrado-coracao-de-jesus',
    subtitle: 'Uma prece de consagração e amor',
    category: 'sacred_heart',
    text: `Ó dulcíssimo Jesus, cujo amor transbordante pelo homem é por tão poucos correspondido, eis que diante do Teu Sagrado Coração, nós nos prostrámos.

Agradecemos-Te por todos os benefícios que de Ti temos recebido; arrependemo-nos profundamente de nossas ingratidões e de todos os nossos pecados.

Firmamos o propósito de nos emendarmos e principalmente de reparar, com uma vida santa, com orações, com sacrifícios e com obras de misericórdia, as ofensas que te foram feitas.

Expía, ó divino Coração, as injúrias que Te são feitas pelos pecadores obstinados.

Reúne, ó Coração de amor, todos os pecadores desgarrados para que, convertendo-se, sejam felizes contigo para sempre.

Amém.`,
    image_url: '',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Oração de Padre Pio pela Paz',
    slug: 'oracao-de-padre-pio-pela-paz',
    subtitle: 'Confiança e serenidade no Senhor',
    category: 'daily',
    text: `Fica comigo, Senhor, pois necessito da Tua presença para não Te esquecer. Sabes quão facilmente Te abandono.

Fica comigo, Senhor, pois sou fraco e preciso da Tua força, para não cair tantas vezes.

Fica comigo, Senhor, pois Tu és minha vida e sem Ti perco o fervor.

Fica comigo, Senhor, pois és minha luz e sem Ti ando nas trevas.

Fica comigo, Senhor, para que me mostres a Tua vontade.

Fica comigo, Senhor, para que eu escute a Tua voz e Te siga.

Fica comigo, Senhor, pois desejo amar-Te e estar sempre em Tua companhia.

Fica comigo, Jesus, pois, por mais pobre que seja a minha alma, quero que seja para Ti um lugar de consolação, um ninho de amor.

Amém.`,
    image_url: '',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Oração de Proteção da Família',
    slug: 'oracao-de-protecao-da-familia',
    subtitle: 'Sob o manto de Nossa Senhora',
    category: 'protection',
    text: `Senhor Jesus Cristo, olhai com misericórdia sobre a nossa família.

Protegei-nos das influências do mal, das tentações do mundo e das fraquezas da nossa carne.

Abençoai cada membro desta família com Vosso amor e paz. Que o Sagrado Coração de Jesus seja o rei e centro do nosso lar.

Nossa Senhora, Mãe Imaculada, cubri-nos com Vosso santo manto. Intercedei por nós junto ao Vosso Filho Divino.

São José, guardião da Sagrada Família, protegei-nos com Vosso cuidado paterno.

Que esta família seja unida no amor de Deus, que juntos sirvamos ao Senhor e que um dia nos reencontremos na glória eterna.

Amém.`,
    image_url: '',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Oração de Agradecimento',
    slug: 'oracao-de-agradecimento',
    subtitle: 'Gratidão pelas bênçãos recebidas',
    category: 'gratitude',
    text: `Senhor meu Deus, de todo o coração Te agradeço por todas as bênçãos que me concedeste.

Agradeço-Te pela vida, pela saúde, pela família e pelos amigos. Agradeço pelas graças que muitas vezes nem percebi, pela Tua proteção nos momentos de perigo, pelo Teu consolo nas horas de tristeza.

Acima de tudo, agradeço pelo dom da fé, pela Eucaristia, pela Tua Palavra que ilumina meu caminho.

Que minha vida seja um contínuo cântico de louvor a Ti. Que em tudo que faço Te glorifique e Te agradeça.

Ensina-me, Senhor, a ver Tua mão em todas as coisas, e a nunca esquecer de dar graças por tudo que sou e que tenho.

Amém.`,
    image_url: '',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Oração de Intercessão pelos Enfermos',
    slug: 'oracao-de-intercessao-pelos-enfermos',
    subtitle: 'Pedindo cura e força para os que sofrem',
    category: 'intercession',
    text: `Senhor Jesus, que percorrestes a Galileia curando todos os enfermos e anunciando a chegada do Reino, olhai hoje para todos os que sofrem em corpo e alma.

Socorrei os enfermos, consolai os que choram, dai esperança aos desesperados. Que Vossa mão curadora esteja sobre cada leito de dor.

Intercedei, ó Sagrado Coração, por aqueles que a ciência não pode mais ajudar. Mostrai a eles que há um médico dos corpos e das almas que nunca abandona.

Nossa Senhora da Saúde, intercedei junto ao Vosso Filho por todos os enfermos. São Padre Pio, que sofrestes com tanta alegria e fé, intercedei por aqueles que hoje carregam sua cruz da doença.

Amém.`,
    image_url: '',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Ato de Contrição',
    slug: 'ato-de-contricao',
    subtitle: 'Arrependimento sincero e pedido de misericórdia',
    category: 'repentance',
    text: `Meu Deus, porque sois infinitamente bom e eu Vos amo sobre todas as coisas, pesa-me de Vos ter ofendido.

Com o firme propósito de me emendar e de nunca mais pecar, prometo evitar as ocasiões próximas de pecado e confessar-me.

Senhor, por Vossa infinita misericórdia e pelos méritos de Jesus Cristo, meu Salvador, misericórdia de mim.

Minha Mãe, Nossa Senhora, intercedei por este pecador arrependido.

Amém.`,
    image_url: '',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Oração à Nossa Senhora',
    slug: 'oracao-a-nossa-senhora',
    subtitle: 'Consagração ao Imaculado Coração de Maria',
    category: 'marian',
    text: `Ó Maria, Mãe de Deus e nossa Mãe, a Vós me consagro totalmente: meu corpo e minha alma, minha vida e minha morte, minha saúde e meu sofrimento.

Colocai-me sob o Vosso manto de proteção. Guarecei-me das tentações do espírito das trevas.

Mãe de misericórdia, apresentai ao Senhor as minhas súplicas. Sois a Advocata dos pecadores; sede minha advogada diante do trono de Deus.

Imaculado Coração de Maria, eu Vos consagro meu coração. Que ele bata sempre unido ao Vosso Coração Imaculado e ao Sagrado Coração de Jesus.

Amém.`,
    image_url: '',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const SEED_NOVENAS: Novena[] = [
  {
    id: '1',
    title: 'Novena ao Sagrado Coração de Jesus',
    slug: 'novena-ao-sagrado-coracao-de-jesus',
    description: 'Uma novena poderosa de consagração e amor ao Coração Divino de Jesus.',
    purpose: 'Consagração, graças especiais e conversão',
    days: Array.from({ length: 9 }, (_, i) => ({
      day: i + 1,
      title: `${i + 1}º Dia — ${['Confiança', 'Amor', 'Reparação', 'Consagração', 'Misericórdia', 'Intercessão', 'Gratidão', 'Paz', 'Perseverança'][i]}`,
      text: `Ó dulcíssimo Coração de Jesus, neste ${i + 1}º dia da novena, prostro-me diante de Ti com humildade e fé.

${[
  'Ensina-me a confiar em Ti em todas as circunstâncias da minha vida. Que minha confiança nunca vacile, mesmo nas horas de prova e tribulação.',
  'Acende em meu coração o fogo do Teu amor divino. Que eu Te ame acima de todas as coisas e que este amor se manifeste em obras de caridade.',
  'Sinto remorso por todas as ofensas que Te causaram meus pecados. Aceita minha reparação sincera e perdoa-me com a infinita misericórdia do Teu Coração.',
  'Consagro-me completamente ao Teu Sagrado Coração. Sê o Rei de minha alma, de minha família e de tudo que sou.',
  'Louvado sejas, ó Coração de Misericórdia! Que Tua compaixão se estenda a todos os pecadores, especialmente aos que mais precisam de Ti.',
  'Intercede, ó Coração de Jesus, por todos os que me pediram orações. Que Teu Coração seja o refúgio de todos os que sofrem.',
  'Obrigado, ó Senhor, por todas as bênçãos recebidas. Que minha gratidão seja eterna como o Teu amor.',
  'Concede-me a paz que o mundo não pode dar. A paz que nasce da conformidade com a Tua vontade divina.',
  'Que nunca me afaste do Teu amor. Dá-me a graça da perseverança final, para que um dia Te veja face a face na eternidade.',
][i]}

Recebe, ó Sagrado Coração, esta oração feita com fé e amor. Que cada dia desta novena me aproxime mais de Ti.

Amém.`,
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Novena a São Padre Pio',
    slug: 'novena-a-sao-padre-pio',
    description: 'Novena em honra ao estigmatizado de Pietrelcina, pedindo sua intercessão poderosa.',
    purpose: 'Cura, conversão e proteção espiritual',
    days: Array.from({ length: 9 }, (_, i) => ({
      day: i + 1,
      title: `${i + 1}º Dia — ${['Fé Inabalável', 'Espírito de Sacrifício', 'Dom da Oração', 'Caridade Heroica', 'Humildade Profunda', 'Cura e Saúde', 'Paz do Coração', 'Perseverança na Fé', 'União com Cristo'][i]}`,
      text: `São Padre Pio de Pietrelcina, servo fiel de Deus, que carregastes os estigmas de Cristo com alegria e fé, ouvi minha súplica neste ${i + 1}º dia da novena.

${[
  'Intercedei por mim para que eu receba a graça de uma fé inabalável. Quando as dúvidas me assaltarem, que eu recorra a vós como a um guia seguro na escuridão.',
  'Ensinai-me a oferecer meus sofrimentos ao Senhor como vós fizestes. Que minha dor se torne oração e meu sacrifício, amor.',
  'Que eu aprenda a orar como vós orastes: com o coração aberto e os olhos fixos em Deus. Ensinai-me a perseverar na oração mesmo quando parece inútil.',
  'Intercedei para que o amor de Deus queime em meu coração e se manifeste no amor ao próximo. Que eu veja Cristo em cada pessoa.',
  'São Padre Pio, que vos humilhastes profundamente diante de Deus e dos homens, obtende-me a graça da humildade verdadeira.',
  'Vós que fostes instrumento de tantas curas, intercedei por todos os enfermos, especialmente pelos que me são queridos. Que a saúde seja restaurada segundo a vontade de Deus.',
  'Rezai, esperai e não vos preocupeis. Estas palavras vossas sejam meu lema. Concedei-me a paz que o mundo não pode dar.',
  'Obtende-me a graça de perseverar na fé até o fim. Que as tribulações não me afastem de Deus, mas me aproximem mais d\'Ele.',
  'Na véspera desta novena, peço-vos que me unas mais intimamente a Cristo Crucificado. Que minha vida seja uma oferta agradável ao Senhor.',
][i]}

São Padre Pio, rezai por nós.

Amém.`,
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Novena a Nossa Senhora',
    slug: 'novena-a-nossa-senhora',
    description: 'Novena de consagração ao Imaculado Coração de Maria, nossa Mãe e Rainha.',
    purpose: 'Proteção, graças e intercessão materna',
    days: Array.from({ length: 9 }, (_, i) => ({
      day: i + 1,
      title: `${i + 1}º Dia — ${['Imaculada Conceição', 'Nossa Senhora das Graças', 'Mãe de Misericórdia', 'Rainha da Paz', 'Nossa Senhora da Saúde', 'Mãe Dolorosa', 'Nossa Senhora do Rosário', 'Assunção', 'Rainha do Céu'][i]}`,
      text: `Ó Maria, nossa Mãe e Rainha, neste ${i + 1}º dia voltamos nosso olhar para vós com fé e confiança filial.

Vós que fostes escolhida antes de todos os séculos para ser Mãe do Salvador, intercedei por nós junto ao vosso Filho Divino.

${[
  'Imaculada Conceição, preservada do pecado original, obtende-nos a graça de manter nossos corações puros e distantes do mal.',
  'Nossa Senhora das Graças, canalizai sobre nós as graças que pedimos com humildade e fé filial.',
  'Mãe de Misericórdia, apresentai ao Senhor nossas necessidades. Vossa intercessão nunca falha.',
  'Rainha da Paz, trazei a paz a nossos corações, famílias e ao mundo inteiro dilacerado por guerras e divisões.',
  'Nossa Senhora da Saúde, curai os enfermos, consolai os que sofrem, dai esperança aos desesperados.',
  'Mãe Dolorosa, que sofrestes junto à Cruz com Vosso Filho, ensinai-nos a carregar nossa cruz com amor.',
  'Rainha do Rosário, ensinai-nos a rezar com o coração. Que o rosário seja nossa arma e nosso tesouro.',
  'Vós que fostes assumida ao céu em corpo e alma, sede nosso penhor de ressurreição e vida eterna.',
  'Rainha do Céu e da Terra, recebei nossa consagração total. Que sejamos sempre vossos filhos e vós nossa Mãe.',
][i]}

Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte.

Amém.`,
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
