import { readFileSync } from 'node:fs';
import { loadSearchEngine, searchIndex } from '../src/lib/search-query.ts';

const TEST_QUERIES = [
  'sigma',
  'summation',
  'ksp',
  'solubility product',
  'electrolysis',
  'oxidation reduction',
  'law of sines',
  'derivitive',
  'free response',
  'frq 3',
  'theorem',
  'quadratic',
];

const payload = JSON.parse(readFileSync('dist/search-index.json', 'utf8'));
const engine = loadSearchEngine(payload);

console.log(`Search diagnostics — ${payload.documentCount} docs, index v${payload.version}\n`);

for (const query of TEST_QUERIES) {
  const header = searchIndex(engine, query, 5, 'header');
  const landing = searchIndex(engine, query, 5, 'landing');

  console.log(`# ${query}`);
  console.log('  header:');
  for (const hit of header) {
    console.log(`    ${hit.score.toFixed(2)}  ${hit.title}`);
    console.log(`           ${hit.excerpt.slice(0, 100)}`);
  }
  console.log('  landing:');
  for (const hit of landing) {
    console.log(`    ${hit.score.toFixed(2)}  ${hit.title}`);
    console.log(`           ${hit.excerpt.slice(0, 100)}`);
  }
  console.log('');
}
