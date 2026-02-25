// scripts/dividir-biblia.js
// Rode UMA VEZ com: node scripts/dividir-biblia.js
//
// Pré-requisito: ter o arquivo src/data/biblia.json (bibliaAveMariaRAW.json renomeado)
// Resultado: cria 73 arquivos em src/data/livros/{slug}.json

const fs = require('fs');
const path = require('path');

// Mapeamento: nome exato no JSON → slug do arquivo
// Deve bater com o campo "nomeJson" do bible.ts
const SLUGS = {
  // Antigo Testamento
  'Gênesis': 'genesis',
  'Êxodo': 'exodo',
  'Levítico': 'levitico',
  'Números': 'numeros',
  'Deuteronômio': 'deuteronomio',
  'Josué': 'josue',
  'Juízes': 'juizes',
  'Rute': 'rute',
  'I Samuel': '1samuel',
  'II Samuel': '2samuel',
  'I Reis': '1reis',
  'II Reis': '2reis',
  'I Crônicas': '1cronicas',
  'II Crônicas': '2cronicas',
  'Esdras': 'esdras',
  'Neemias': 'neemias',
  'Tobias': 'tobias',
  'Judite': 'judite',
  'Ester': 'ester',
  'I Macabeus': '1macabeus',
  'II Macabeus': '2macabeus',
  'Jó': 'jo',
  'Salmos': 'salmos',
  'Provérbios': 'proverbios',
  'Eclesiastes': 'eclesiastes',
  'Cântico dos Cânticos': 'cantico',
  'Sabedoria': 'sabedoria',
  'Eclesiástico': 'eclesiastico',
  'Isaías': 'isaias',
  'Jeremias': 'jeremias',
  'Lamentações': 'lamentacoes',
  'Baruc': 'baruc',
  'Ezequiel': 'ezequiel',
  'Daniel': 'daniel',
  'Oséias': 'oseias',
  'Joel': 'joel',
  'Amós': 'amos',
  'Abdias': 'abdias',
  'Jonas': 'jonas',
  'Miquéias': 'miqueias',
  'Naum': 'naum',
  'Habacuc': 'habacuc',
  'Sofonias': 'sofonias',
  'Ageu': 'ageu',
  'Zacarias': 'zacarias',
  'Malaquias': 'malaquias',
  // Novo Testamento
  'São Mateus': 'mateus',
  'São Marcos': 'marcos',
  'São Lucas': 'lucas',
  'São João': 'joao',
  'Atos dos Apóstolos': 'atos',
  'Romanos': 'romanos',
  'I Coríntios': '1corintios',
  'II Coríntios': '2corintios',
  'Gálatas': 'galatas',
  'Efésios': 'efesios',
  'Filipenses': 'filipenses',
  'Colossenses': 'colossenses',
  'I Tessalonicenses': '1tessalonicenses',
  'II Tessalonicenses': '2tessalonicenses',
  'I Timóteo': '1timoteo',
  'II Timóteo': '2timoteo',
  'Tito': 'tito',
  'Filêmon': 'filemon',
  'Hebreus': 'hebreus',
  'São Tiago': 'tiago',
  'I São Pedro': '1pedro',
  'II São Pedro': '2pedro',
  'I São João': '1joao',
  'II São João': '2joao',
  'III São João': '3joao',
  'São Judas': 'judas',
  'Apocalipse': 'apocalipse',
};

// ── Main ──────────────────────────────────────────────────────────────────
const inputPath = path.join(__dirname, '../src/data/bibliaRaw.json');
const outputDir = path.join(__dirname, '../src/data/livros');

if (!fs.existsSync(inputPath)) {
  console.error('❌ Arquivo src/data/biblia.json não encontrado.');
  console.error('   Baixe o bibliaAveMariaRAW.json do GitHub e renomeie para biblia.json');
  process.exit(1);
}

// Cria a pasta de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('📁 Pasta src/data/livros/ criada');
}

console.log('📖 Lendo biblia.json...');
const raw = fs.readFileSync(inputPath, 'utf-8');
const biblia = JSON.parse(raw);

const todos = [
  ...biblia.antigoTestamento,
  ...biblia.novoTestamento,
];

let criados = 0;
let erros = 0;

for (const livro of todos) {
  const slug = SLUGS[livro.nome];
  if (!slug) {
    console.warn(`⚠️  Nome não mapeado: "${livro.nome}" — pulando`);
    erros++;
    continue;
  }

  const outputPath = path.join(outputDir, `${slug}.json`);
  // Salva só os capítulos do livro (estrutura simples)
  fs.writeFileSync(outputPath, JSON.stringify(livro.capitulos, null, 0), 'utf-8');
  console.log(`✅ ${livro.nome} → livros/${slug}.json (${livro.capitulos.length} caps)`);
  criados++;
}

console.log('');
console.log(`🎉 Concluído: ${criados} livros criados, ${erros} erros`);
console.log('   Você pode apagar src/data/biblia.json agora se quiser economizar espaço.');
