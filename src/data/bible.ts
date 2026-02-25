export interface BibleBook {
  nomeJson: string;  // nome exato no JSON bibliaAveMariaRAW.json
  slug: string;      // nome do arquivo em src/data/livros/{slug}.json
  nome: string;      // nome para exibição na UI
  abrev: string;
  capitulos: number;
  testamento: 'AT' | 'NT';
  grupo: string;
}

export const LIVROS: BibleBook[] = [
  // ── Antigo Testamento ──────────────────────────────────────────────────
  // Pentateuco
  { nomeJson: 'Gênesis',              slug: 'genesis',           nome: 'Gênesis',              abrev: 'Gn',   capitulos: 50,  testamento: 'AT', grupo: 'Pentateuco' },
  { nomeJson: 'Êxodo',                slug: 'exodo',             nome: 'Êxodo',                abrev: 'Ex',   capitulos: 40,  testamento: 'AT', grupo: 'Pentateuco' },
  { nomeJson: 'Levítico',             slug: 'levitico',          nome: 'Levítico',             abrev: 'Lv',   capitulos: 27,  testamento: 'AT', grupo: 'Pentateuco' },
  { nomeJson: 'Números',              slug: 'numeros',           nome: 'Números',              abrev: 'Nm',   capitulos: 36,  testamento: 'AT', grupo: 'Pentateuco' },
  { nomeJson: 'Deuteronômio',         slug: 'deuteronomio',      nome: 'Deuteronômio',         abrev: 'Dt',   capitulos: 34,  testamento: 'AT', grupo: 'Pentateuco' },
  // Históricos
  { nomeJson: 'Josué',                slug: 'josue',             nome: 'Josué',                abrev: 'Js',   capitulos: 24,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Juízes',               slug: 'juizes',            nome: 'Juízes',               abrev: 'Jz',   capitulos: 21,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Rute',                 slug: 'rute',              nome: 'Rute',                 abrev: 'Rt',   capitulos: 4,   testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'I Samuel',             slug: '1samuel',           nome: '1 Samuel',             abrev: '1Sm',  capitulos: 31,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'II Samuel',             slug: '2samuel',           nome: '2 Samuel',             abrev: '2Sm',  capitulos: 24,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'I Reis',               slug: '1reis',             nome: '1 Reis',               abrev: '1Rs',  capitulos: 22,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'II Reis',               slug: '2reis',             nome: '2 Reis',               abrev: '2Rs',  capitulos: 25,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'I Crônicas',           slug: '1cronicas',         nome: '1 Crônicas',           abrev: '1Cr',  capitulos: 29,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'II Crônicas',           slug: '2cronicas',         nome: '2 Crônicas',           abrev: '2Cr',  capitulos: 36,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Esdras',               slug: 'esdras',            nome: 'Esdras',               abrev: 'Ed',   capitulos: 10,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Neemias',              slug: 'neemias',           nome: 'Neemias',              abrev: 'Ne',   capitulos: 13,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Tobias',               slug: 'tobias',            nome: 'Tobias',               abrev: 'Tb',   capitulos: 14,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Judite',               slug: 'judite',            nome: 'Judite',               abrev: 'Jt',   capitulos: 16,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'Ester',                slug: 'ester',             nome: 'Ester',                abrev: 'Et',   capitulos: 10,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'I Macabeus',           slug: '1macabeus',         nome: '1 Macabeus',           abrev: '1Mc',  capitulos: 16,  testamento: 'AT', grupo: 'Históricos' },
  { nomeJson: 'II Macabeus',           slug: '2macabeus',         nome: '2 Macabeus',           abrev: '2Mc',  capitulos: 15,  testamento: 'AT', grupo: 'Históricos' },
  // Sapienciais
  { nomeJson: 'Jó',                   slug: 'jo',                nome: 'Jó',                   abrev: 'Jó',   capitulos: 42,  testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Salmos',               slug: 'salmos',            nome: 'Salmos',               abrev: 'Sl',   capitulos: 150, testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Provérbios',           slug: 'proverbios',        nome: 'Provérbios',           abrev: 'Pv',   capitulos: 31,  testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Eclesiastes',          slug: 'eclesiastes',       nome: 'Eclesiastes',          abrev: 'Ec',   capitulos: 12,  testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Cântico dos Cânticos', slug: 'cantico',           nome: 'Cântico dos Cânticos', abrev: 'Ct',   capitulos: 8,   testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Sabedoria',            slug: 'sabedoria',         nome: 'Sabedoria',            abrev: 'Sb',   capitulos: 19,  testamento: 'AT', grupo: 'Sapienciais' },
  { nomeJson: 'Eclesiástico',         slug: 'eclesiastico',      nome: 'Eclesiástico',         abrev: 'Eclo', capitulos: 51,  testamento: 'AT', grupo: 'Sapienciais' },
  // Proféticos
  { nomeJson: 'Isaías',               slug: 'isaias',            nome: 'Isaías',               abrev: 'Is',   capitulos: 66,  testamento: 'AT', grupo: 'Proféticos' },
  { nomeJson: 'Jeremias',             slug: 'jeremias',          nome: 'Jeremias',             abrev: 'Jr',   capitulos: 52,  testamento: 'AT', grupo: 'Proféticos' },
  { nomeJson: 'Lamentações',          slug: 'lamentacoes',       nome: 'Lamentações',          abrev: 'Lm',   capitulos: 5,   testamento: 'AT', grupo: 'Proféticos' },
  { nomeJson: 'Baruc',                slug: 'baruc',             nome: 'Baruc',                abrev: 'Br',   capitulos: 6,   testamento: 'AT', grupo: 'Proféticos' },
  { nomeJson: 'Ezequiel',             slug: 'ezequiel',          nome: 'Ezequiel',             abrev: 'Ez',   capitulos: 48,  testamento: 'AT', grupo: 'Proféticos' },
  { nomeJson: 'Daniel',               slug: 'daniel',            nome: 'Daniel',               abrev: 'Dn',   capitulos: 14,  testamento: 'AT', grupo: 'Proféticos' },
  // Proféticos Menores
  { nomeJson: 'Oséias',               slug: 'oseias',            nome: 'Oséias',               abrev: 'Os',   capitulos: 14,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Joel',                 slug: 'joel',              nome: 'Joel',                 abrev: 'Jl',   capitulos: 3,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Amós',                 slug: 'amos',              nome: 'Amós',                 abrev: 'Am',   capitulos: 9,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Abdias',               slug: 'abdias',            nome: 'Abdias',               abrev: 'Ab',   capitulos: 1,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Jonas',                slug: 'jonas',             nome: 'Jonas',                abrev: 'Jn',   capitulos: 4,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Miquéias',             slug: 'miqueias',          nome: 'Miquéias',             abrev: 'Mq',   capitulos: 7,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Naum',                 slug: 'naum',              nome: 'Naum',                 abrev: 'Na',   capitulos: 3,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Habacuc',              slug: 'habacuc',           nome: 'Habacuc',              abrev: 'Hab',  capitulos: 3,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Sofonias',             slug: 'sofonias',          nome: 'Sofonias',             abrev: 'Sf',   capitulos: 3,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Ageu',                 slug: 'ageu',              nome: 'Ageu',                 abrev: 'Ag',   capitulos: 2,   testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Zacarias',             slug: 'zacarias',          nome: 'Zacarias',             abrev: 'Zc',   capitulos: 14,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { nomeJson: 'Malaquias',            slug: 'malaquias',         nome: 'Malaquias',            abrev: 'Ml',   capitulos: 4,   testamento: 'AT', grupo: 'Proféticos Menores' },

  // ── Novo Testamento ────────────────────────────────────────────────────
  // Evangelhos
  { nomeJson: 'São Mateus',           slug: 'mateus',            nome: 'Mateus',               abrev: 'Mt',   capitulos: 28,  testamento: 'NT', grupo: 'Evangelhos' },
  { nomeJson: 'São Marcos',           slug: 'marcos',            nome: 'Marcos',               abrev: 'Mc',   capitulos: 16,  testamento: 'NT', grupo: 'Evangelhos' },
  { nomeJson: 'São Lucas',            slug: 'lucas',             nome: 'Lucas',                abrev: 'Lc',   capitulos: 24,  testamento: 'NT', grupo: 'Evangelhos' },
  { nomeJson: 'São João',             slug: 'joao',              nome: 'João',                 abrev: 'Jo',   capitulos: 21,  testamento: 'NT', grupo: 'Evangelhos' },
  // Atos
  { nomeJson: 'Atos dos Apóstolos',   slug: 'atos',              nome: 'Atos dos Apóstolos',   abrev: 'At',   capitulos: 28,  testamento: 'NT', grupo: 'Atos' },
  // Cartas de Paulo
  { nomeJson: 'Romanos',              slug: 'romanos',           nome: 'Romanos',              abrev: 'Rm',   capitulos: 16,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'I Coríntios',          slug: '1corintios',        nome: '1 Coríntios',          abrev: '1Co',  capitulos: 16,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'II Coríntios',          slug: '2corintios',        nome: '2 Coríntios',          abrev: '2Co',  capitulos: 13,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Gálatas',              slug: 'galatas',           nome: 'Gálatas',              abrev: 'Gl',   capitulos: 6,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Efésios',              slug: 'efesios',           nome: 'Efésios',              abrev: 'Ef',   capitulos: 6,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Filipenses',           slug: 'filipenses',        nome: 'Filipenses',           abrev: 'Fp',   capitulos: 4,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Colossenses',          slug: 'colossenses',       nome: 'Colossenses',          abrev: 'Cl',   capitulos: 4,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'I Tessalonicenses',    slug: '1tessalonicenses',  nome: '1 Tessalonicenses',    abrev: '1Ts',  capitulos: 5,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'II Tessalonicenses',    slug: '2tessalonicenses',  nome: '2 Tessalonicenses',    abrev: '2Ts',  capitulos: 3,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'I Timóteo',            slug: '1timoteo',          nome: '1 Timóteo',            abrev: '1Tm',  capitulos: 6,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'II Timóteo',            slug: '2timoteo',          nome: '2 Timóteo',            abrev: '2Tm',  capitulos: 4,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Tito',                 slug: 'tito',              nome: 'Tito',                 abrev: 'Tt',   capitulos: 3,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Filêmon',              slug: 'filemon',           nome: 'Filêmon',              abrev: 'Fm',   capitulos: 1,   testamento: 'NT', grupo: 'Cartas de Paulo' },
  { nomeJson: 'Hebreus',              slug: 'hebreus',           nome: 'Hebreus',              abrev: 'Hb',   capitulos: 13,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  // Cartas Católicas
  { nomeJson: 'São Tiago',                slug: 'tiago',             nome: 'Tiago',                abrev: 'Tg',   capitulos: 5,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'I São Pedro',              slug: '1pedro',            nome: '1 Pedro',              abrev: '1Pe',  capitulos: 5,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'II São Pedro',              slug: '2pedro',            nome: '2 Pedro',              abrev: '2Pe',  capitulos: 3,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'I São João',               slug: '1joao',             nome: '1 João',               abrev: '1Jo',  capitulos: 5,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'II São João',               slug: '2joao',             nome: '2 João',               abrev: '2Jo',  capitulos: 1,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'III São João',               slug: '3joao',             nome: '3 João',               abrev: '3Jo',  capitulos: 1,   testamento: 'NT', grupo: 'Cartas Católicas' },
  { nomeJson: 'São Judas',                slug: 'judas',             nome: 'Judas',                abrev: 'Jd',   capitulos: 1,   testamento: 'NT', grupo: 'Cartas Católicas' },
  // Apocalipse
  { nomeJson: 'Apocalipse',           slug: 'apocalipse',        nome: 'Apocalipse',           abrev: 'Ap',   capitulos: 22,  testamento: 'NT', grupo: 'Apocalipse' },
];

export const GRUPOS_AT = [...new Set(LIVROS.filter(l => l.testamento === 'AT').map(l => l.grupo))];
export const GRUPOS_NT = [...new Set(LIVROS.filter(l => l.testamento === 'NT').map(l => l.grupo))];
