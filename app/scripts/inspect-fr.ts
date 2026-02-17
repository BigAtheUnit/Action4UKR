import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));

function inspectHeaders(filePath: string) {
    const buf = readFileSync(filePath);
    const workbook = XLSX.read(buf, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

    if (rows.length > 0) {
        console.log('Headers:', Object.keys(rows[0]));
        console.log('First Row:', rows[0]);
    } else {
        console.log('No rows found');
    }
}

inspectHeaders(resolve(__dirname, '../../french_assemblee_nationale_deputies.xlsx'));
