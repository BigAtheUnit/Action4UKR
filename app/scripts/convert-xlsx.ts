import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Representative {
  id: string;
  name: string;
  email: string;
  constituency: string;
  country_code: 'FR' | 'EU';
  party?: string;
  chamber: string;
  department?: string;
  member_state?: string;
  political_group?: string;
}

function convertFrance(filePath: string, outputPath: string) {
  const buf = readFileSync(filePath);
  const workbook = XLSX.read(buf, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  console.log(`FR columns:`, Object.keys(rows[0]));
  console.log(`FR total rows: ${rows.length}`);

  // Deduplicate by email
  const seen = new Set<string>();
  const representatives: Representative[] = [];

  for (const row of rows) {
    const email = String(row['Email'] || '').trim();
    if (!email || !email.includes('@') || seen.has(email)) continue;
    seen.add(email);

    const name = String(row['Full Name'] || `${row['First Name'] || ''} ${row['Last Name'] || ''}`.trim());

    representatives.push({
      id: `fr-${representatives.length + 1}`,
      name,
      email,
      constituency: 'Assembl\u00e9e nationale',
      country_code: 'FR',
      chamber: 'Assembl\u00e9e nationale',
    });
  }

  writeFileSync(outputPath, JSON.stringify(representatives, null, 2));
  console.log(`Converted ${representatives.length} FR representatives to ${outputPath}`);
}

function convertEU(filePath: string, outputPath: string) {
  const buf = readFileSync(filePath);
  const workbook = XLSX.read(buf, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  console.log(`EU columns:`, Object.keys(rows[0]));
  console.log(`EU total rows: ${rows.length}`);

  // Deduplicate by email
  const seen = new Set<string>();
  const representatives: Representative[] = [];

  for (const row of rows) {
    const email = String(row['Email'] || '').trim();
    if (!email || !email.includes('@') || seen.has(email)) continue;
    seen.add(email);

    const firstName = String(row['First Name'] || '').trim();
    const lastName = String(row['Last Name'] || '').trim();
    const name = `${firstName} ${lastName}`.trim();
    const memberState = String(row['Country'] || '').trim();
    const politicalGroup = String(row['EP Group'] || '').trim();
    const party = String(row['National Party'] || '').trim();

    representatives.push({
      id: `eu-${representatives.length + 1}`,
      name,
      email,
      constituency: memberState,
      country_code: 'EU',
      chamber: 'European Parliament',
      member_state: memberState || undefined,
      political_group: politicalGroup || undefined,
      party: party || undefined,
    });
  }

  writeFileSync(outputPath, JSON.stringify(representatives, null, 2));
  console.log(`Converted ${representatives.length} EU representatives to ${outputPath}`);
}

convertFrance(
  resolve(__dirname, '../../french_assemblee_nationale_deputies.xlsx'),
  resolve(__dirname, '../public/data/france.json')
);

convertEU(
  resolve(__dirname, '../../european_parliament_meps_contact_database.xlsx'),
  resolve(__dirname, '../public/data/eu.json')
);
