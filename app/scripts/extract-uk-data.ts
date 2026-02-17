import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface RawMP {
  name: string;
  constituency: string;
  email: string;
}

interface Representative {
  id: string;
  name: string;
  email: string;
  constituency: string;
  country_code: 'UK';
  chamber: string;
}

const scriptsPath = resolve(__dirname, '../../scripts.js');
const outputPath = resolve(__dirname, '../public/data/uk.json');

const content = readFileSync(scriptsPath, 'utf-8');

const ukStart = content.indexOf('UK: [');
if (ukStart === -1) {
  console.error('Could not find UK data in scripts.js');
  process.exit(1);
}

let depth = 0;
let arrayStart = -1;
let arrayEnd = -1;

for (let i = ukStart; i < content.length; i++) {
  if (content[i] === '[') {
    if (depth === 0) arrayStart = i;
    depth++;
  } else if (content[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
}

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not parse UK array bounds');
  process.exit(1);
}

const arrayStr = content.slice(arrayStart, arrayEnd);
const rawMPs: RawMP[] = new Function(`return ${arrayStr}`)();

const representatives: Representative[] = rawMPs.map((mp, i) => ({
  id: `uk-${i + 1}`,
  name: mp.name,
  email: mp.email.replace(/\s+/g, ''),
  constituency: mp.constituency,
  country_code: 'UK' as const,
  chamber: 'House of Commons',
}));

writeFileSync(outputPath, JSON.stringify(representatives, null, 2));
console.log(`Extracted ${representatives.length} UK MPs to ${outputPath}`);
