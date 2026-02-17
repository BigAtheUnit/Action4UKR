import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Representative {
  id: string;
  name: string;
  email: string;
  constituency: string;
  country_code: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(filePath: string, label: string) {
  const data: Representative[] = JSON.parse(readFileSync(filePath, 'utf-8'));
  let errors = 0;

  console.log(`\nValidating ${label}: ${data.length} entries`);

  // Check required fields
  for (const rep of data) {
    if (!rep.id) {
      console.error(`  Missing id: ${JSON.stringify(rep)}`);
      errors++;
    }
    if (!rep.name || rep.name.trim().length === 0) {
      console.error(`  Missing name: ${rep.id}`);
      errors++;
    }
    if (!rep.email || !emailRegex.test(rep.email)) {
      console.error(`  Invalid email for ${rep.id}: "${rep.email}"`);
      errors++;
    }
    if (!rep.constituency || rep.constituency.trim().length === 0) {
      console.error(`  Missing constituency: ${rep.id} (${rep.name})`);
      errors++;
    }
    if (!rep.country_code) {
      console.error(`  Missing country_code: ${rep.id}`);
      errors++;
    }
  }

  // Check duplicates
  const ids = new Set<string>();
  const emails = new Set<string>();
  for (const rep of data) {
    if (ids.has(rep.id)) {
      console.error(`  Duplicate id: ${rep.id}`);
      errors++;
    }
    ids.add(rep.id);

    if (emails.has(rep.email)) {
      console.error(`  Duplicate email: ${rep.email} (${rep.name})`);
      errors++;
    }
    emails.add(rep.email);
  }

  if (errors === 0) {
    console.log(`  All ${data.length} entries valid`);
  } else {
    console.log(`  ${errors} errors found`);
  }

  return errors;
}

const dataDir = resolve(__dirname, '../public/data');
let totalErrors = 0;

totalErrors += validate(resolve(dataDir, 'uk.json'), 'UK MPs');
totalErrors += validate(resolve(dataDir, 'france.json'), 'French Deputies');
totalErrors += validate(resolve(dataDir, 'eu.json'), 'EU MEPs');

if (totalErrors > 0) {
  console.log(`\nTotal errors: ${totalErrors}`);
  process.exit(1);
} else {
  console.log('\nAll datasets valid!');
}
