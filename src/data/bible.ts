export interface BibleBook {
  id: string;        // slug para API abibliadigital
  nome: string;
  abrev: string;
  capitulos: number;
  testamento: 'AT' | 'NT';
  grupo: string;
}

// 73 livros canônicos católicos
export const LIVROS: BibleBook[] = [
  // ── Antigo Testamento ─────────────────────────────────────
  // Pentateuco
  { id: 'gn', nome: 'Gênesis',          abrev: 'Gn',  capitulos: 50, testamento: 'AT', grupo: 'Pentateuco' },
  { id: 'ex', nome: 'Êxodo',            abrev: 'Ex',  capitulos: 40, testamento: 'AT', grupo: 'Pentateuco' },
  { id: 'lv', nome: 'Levítico',         abrev: 'Lv',  capitulos: 27, testamento: 'AT', grupo: 'Pentateuco' },
  { id: 'nm', nome: 'Números',          abrev: 'Nm',  capitulos: 36, testamento: 'AT', grupo: 'Pentateuco' },
  { id: 'dt', nome: 'Deuteronômio',     abrev: 'Dt',  capitulos: 34, testamento: 'AT', grupo: 'Pentateuco' },
  // Históricos
  { id: 'js', nome: 'Josué',            abrev: 'Js',  capitulos: 24, testamento: 'AT', grupo: 'Históricos' },
  { id: 'jz', nome: 'Juízes',           abrev: 'Jz',  capitulos: 21, testamento: 'AT', grupo: 'Históricos' },
  { id: 'rt', nome: 'Rute',             abrev: 'Rt',  capitulos: 4,  testamento: 'AT', grupo: 'Históricos' },
  { id: '1sm', nome: '1 Samuel',        abrev: '1Sm', capitulos: 31, testamento: 'AT', grupo: 'Históricos' },
  { id: '2sm', nome: '2 Samuel',        abrev: '2Sm', capitulos: 24, testamento: 'AT', grupo: 'Históricos' },
  { id: '1rs', nome: '1 Reis',          abrev: '1Rs', capitulos: 22, testamento: 'AT', grupo: 'Históricos' },
  { id: '2rs', nome: '2 Reis',          abrev: '2Rs', capitulos: 25, testamento: 'AT', grupo: 'Históricos' },
  { id: '1cr', nome: '1 Crônicas',      abrev: '1Cr', capitulos: 29, testamento: 'AT', grupo: 'Históricos' },
  { id: '2cr', nome: '2 Crônicas',      abrev: '2Cr', capitulos: 36, testamento: 'AT', grupo: 'Históricos' },
  { id: 'ed', nome: 'Esdras',           abrev: 'Ed',  capitulos: 10, testamento: 'AT', grupo: 'Históricos' },
  { id: 'ne', nome: 'Neemias',          abrev: 'Ne',  capitulos: 13, testamento: 'AT', grupo: 'Históricos' },
  { id: 'tb', nome: 'Tobias',           abrev: 'Tb',  capitulos: 14, testamento: 'AT', grupo: 'Históricos' },
  { id: 'jt', nome: 'Judite',           abrev: 'Jt',  capitulos: 16, testamento: 'AT', grupo: 'Históricos' },
  { id: 'et', nome: 'Ester',            abrev: 'Et',  capitulos: 10, testamento: 'AT', grupo: 'Históricos' },
  { id: '1mc', nome: '1 Macabeus',      abrev: '1Mc', capitulos: 16, testamento: 'AT', grupo: 'Históricos' },
  { id: '2mc', nome: '2 Macabeus',      abrev: '2Mc', capitulos: 15, testamento: 'AT', grupo: 'Históricos' },
  // Poéticos e Sapienciais
  { id: 'jó', nome: 'Jó',              abrev: 'Jó',  capitulos: 42, testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'sl', nome: 'Salmos',           abrev: 'Sl',  capitulos: 150,testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'pv', nome: 'Provérbios',       abrev: 'Pv',  capitulos: 31, testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'ec', nome: 'Eclesiastes',      abrev: 'Ec',  capitulos: 12, testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'ct', nome: 'Cântico dos Cânticos', abrev: 'Ct', capitulos: 8, testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'sb', nome: 'Sabedoria',        abrev: 'Sb',  capitulos: 19, testamento: 'AT', grupo: 'Sapienciais' },
  { id: 'eclo', nome: 'Eclesiástico',   abrev: 'Eclo',capitulos: 51, testamento: 'AT', grupo: 'Sapienciais' },
  // Proféticos maiores
  { id: 'is', nome: 'Isaías',           abrev: 'Is',  capitulos: 66, testamento: 'AT', grupo: 'Proféticos' },
  { id: 'jr', nome: 'Jeremias',         abrev: 'Jr',  capitulos: 52, testamento: 'AT', grupo: 'Proféticos' },
  { id: 'lm', nome: 'Lamentações',      abrev: 'Lm',  capitulos: 5,  testamento: 'AT', grupo: 'Proféticos' },
  { id: 'br', nome: 'Baruc',            abrev: 'Br',  capitulos: 6,  testamento: 'AT', grupo: 'Proféticos' },
  { id: 'ez', nome: 'Ezequiel',         abrev: 'Ez',  capitulos: 48, testamento: 'AT', grupo: 'Proféticos' },
  { id: 'dn', nome: 'Daniel',           abrev: 'Dn',  capitulos: 14, testamento: 'AT', grupo: 'Proféticos' },
  // Proféticos menores
  { id: 'os', nome: 'Oséias',           abrev: 'Os',  capitulos: 14, testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'jl', nome: 'Joel',             abrev: 'Jl',  capitulos: 3,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'am', nome: 'Amós',             abrev: 'Am',  capitulos: 9,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'ab', nome: 'Abdias',           abrev: 'Ab',  capitulos: 1,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'jn', nome: 'Jonas',            abrev: 'Jn',  capitulos: 4,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'mq', nome: 'Miquéias',         abrev: 'Mq',  capitulos: 7,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'na', nome: 'Naum',             abrev: 'Na',  capitulos: 3,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'hab', nome: 'Habacuc',         abrev: 'Hab', capitulos: 3,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'sf', nome: 'Sofonias',         abrev: 'Sf',  capitulos: 3,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'ag', nome: 'Ageu',             abrev: 'Ag',  capitulos: 2,  testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'zc', nome: 'Zacarias',         abrev: 'Zc',  capitulos: 14, testamento: 'AT', grupo: 'Proféticos Menores' },
  { id: 'ml', nome: 'Malaquias',        abrev: 'Ml',  capitulos: 4,  testamento: 'AT', grupo: 'Proféticos Menores' },
  // ── Novo Testamento ───────────────────────────────────────
  // Evangelhos
  { id: 'mt', nome: 'Mateus',           abrev: 'Mt',  capitulos: 28, testamento: 'NT', grupo: 'Evangelhos' },
  { id: 'mc', nome: 'Marcos',           abrev: 'Mc',  capitulos: 16, testamento: 'NT', grupo: 'Evangelhos' },
  { id: 'lc', nome: 'Lucas',            abrev: 'Lc',  capitulos: 24, testamento: 'NT', grupo: 'Evangelhos' },
  { id: 'jo', nome: 'João',             abrev: 'Jo',  capitulos: 21, testamento: 'NT', grupo: 'Evangelhos' },
  // Atos
  { id: 'at', nome: 'Atos dos Apóstolos', abrev: 'At', capitulos: 28, testamento: 'NT', grupo: 'Atos' },
  // Cartas de Paulo
  { id: 'rm', nome: 'Romanos',          abrev: 'Rm',  capitulos: 16, testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '1co', nome: '1 Coríntios',     abrev: '1Co', capitulos: 16, testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '2co', nome: '2 Coríntios',     abrev: '2Co', capitulos: 13, testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'gl', nome: 'Gálatas',          abrev: 'Gl',  capitulos: 6,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'ef', nome: 'Efésios',          abrev: 'Ef',  capitulos: 6,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'fp', nome: 'Filipenses',       abrev: 'Fp',  capitulos: 4,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'cl', nome: 'Colossenses',      abrev: 'Cl',  capitulos: 4,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '1ts', nome: '1 Tessalonicenses', abrev: '1Ts', capitulos: 5, testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '2ts', nome: '2 Tessalonicenses', abrev: '2Ts', capitulos: 3, testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '1tm', nome: '1 Timóteo',       abrev: '1Tm', capitulos: 6,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: '2tm', nome: '2 Timóteo',       abrev: '2Tm', capitulos: 4,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'tt', nome: 'Tito',             abrev: 'Tt',  capitulos: 3,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'fm', nome: 'Filêmon',          abrev: 'Fm',  capitulos: 1,  testamento: 'NT', grupo: 'Cartas de Paulo' },
  { id: 'hb', nome: 'Hebreus',          abrev: 'Hb',  capitulos: 13, testamento: 'NT', grupo: 'Cartas de Paulo' },
  // Cartas Católicas
  { id: 'tg', nome: 'Tiago',            abrev: 'Tg',  capitulos: 5,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: '1pe', nome: '1 Pedro',         abrev: '1Pe', capitulos: 5,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: '2pe', nome: '2 Pedro',         abrev: '2Pe', capitulos: 3,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: '1jo', nome: '1 João',          abrev: '1Jo', capitulos: 5,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: '2jo', nome: '2 João',          abrev: '2Jo', capitulos: 1,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: '3jo', nome: '3 João',          abrev: '3Jo', capitulos: 1,  testamento: 'NT', grupo: 'Cartas Católicas' },
  { id: 'jd', nome: 'Judas',            abrev: 'Jd',  capitulos: 1,  testamento: 'NT', grupo: 'Cartas Católicas' },
  // Apocalipse
  { id: 'ap', nome: 'Apocalipse',       abrev: 'Ap',  capitulos: 22, testamento: 'NT', grupo: 'Apocalipse' },
];

export const GRUPOS_AT = [...new Set(LIVROS.filter(l => l.testamento === 'AT').map(l => l.grupo))];
export const GRUPOS_NT = [...new Set(LIVROS.filter(l => l.testamento === 'NT').map(l => l.grupo))];
