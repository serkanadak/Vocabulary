#!/usr/bin/env node
/**
 * Veri havuzu üretici (build pipeline).
 *
 * data-source/ klasöründeki tüm .csv ve .json kaynaklarını okur, şemaya
 * dönüştürür, doğrular, curated kayıtlarla çakışanları eler ve sonucu
 * src/data/generated.js içine GÖMÜLÜ (embedded) bir ES modülü olarak yazar.
 *
 * Böylece havuz çalışma zamanında ağ gerektirmeden 10.000+ kelimeye ölçeklenir.
 *
 * Kullanım:
 *   npm run build:data
 *
 * CSV kolonları (başlık satırı zorunlu):
 *   headword,pos,level,domains,type,root,pronunciation,tr,en,exampleEn,exampleTr,synonyms,antonyms,collocations,related
 *   - domains/synonyms/antonyms/collocations/related: "|" ile ayrılmış çoklu değer
 *   - Aynı headword birden çok satırda olursa anlamlar (meanings) birleştirilir.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'data-source');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'generated.js');

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Tırnaklı alanları destekleyen basit CSV ayrıştırıcı.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((x) => x.trim() !== '')) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    if (row.some((x) => x.trim() !== '')) rows.push(row);
  }
  return rows;
}

function splitList(s) {
  if (!s) return [];
  return s
    .split('|')
    .map((x) => x.trim())
    .filter(Boolean);
}

function rowsToEntries(rows) {
  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.indexOf(name);
  const byHeadword = new Map();

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const get = (name) => {
      const i = idx(name);
      return i >= 0 ? (row[i] || '').trim() : '';
    };
    const headword = get('headword');
    if (!headword) continue;
    const level = get('level');
    if (!LEVELS.includes(level)) {
      console.warn(`  ! atlandı (geçersiz level "${level}"): ${headword}`);
      continue;
    }

    const meaning = {
      tr: get('tr'),
      en: get('en'),
      exampleEn: get('exampleEn'),
      exampleTr: get('exampleTr'),
    };
    if (!meaning.tr || !meaning.exampleEn) {
      console.warn(`  ! atlandı (tr/exampleEn eksik): ${headword}`);
      continue;
    }

    const id = 'w_' + slugify(headword);
    if (byHeadword.has(id)) {
      byHeadword.get(id).meanings.push(meaning);
    } else {
      byHeadword.set(id, {
        id,
        headword,
        pos: get('pos') || 'word',
        level,
        domains: splitList(get('domains')).length ? splitList(get('domains')) : ['general'],
        type: get('type') || 'word',
        root: get('root') || undefined,
        pronunciation: get('pronunciation') || undefined,
        meanings: [meaning],
        synonyms: splitList(get('synonyms')),
        antonyms: splitList(get('antonyms')),
        collocations: splitList(get('collocations')),
        related: splitList(get('related')),
      });
    }
  }
  return Array.from(byHeadword.values());
}

function loadCuratedIds() {
  // generated dışındaki kaynak dosyalardaki id'leri toplayıp çakışmayı önler.
  const ids = new Set();
  const files = ['words.business.js', 'words.economics.js', 'words.communication.js', 'words.general.js', 'idioms.js'];
  for (const f of files) {
    const p = path.join(ROOT, 'src', 'data', f);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    const matches = content.matchAll(/id:\s*'([^']+)'/g);
    for (const m of matches) ids.add(m[1]);
  }
  return ids;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Kaynak klasörü yok: ${SRC_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(SRC_DIR).filter((f) => /\.(csv|json)$/i.test(f));
  if (!files.length) {
    console.log('data-source/ içinde .csv veya .json bulunamadı. Çıkılıyor.');
    return;
  }

  const curatedIds = loadCuratedIds();
  let all = [];
  for (const f of files) {
    const full = path.join(SRC_DIR, f);
    const text = fs.readFileSync(full, 'utf8');
    let entries = [];
    if (/\.csv$/i.test(f)) entries = rowsToEntries(parseCsv(text));
    else entries = JSON.parse(text);
    console.log(`+ ${f}: ${entries.length} kayıt`);
    all = all.concat(entries);
  }

  // Curated ile çakışan ve kendi içinde tekrar eden id'leri ele.
  const seen = new Set();
  const result = [];
  let skipped = 0;
  for (const e of all) {
    if (curatedIds.has(e.id) || seen.has(e.id)) {
      skipped++;
      continue;
    }
    seen.add(e.id);
    result.push(e);
  }

  const banner =
    '// OTOMATİK ÜRETİLDİ — elle düzenlemeyin. Kaynak: data-source/, üretim: npm run build:data\n';
  const body = `export default ${JSON.stringify(result, null, 2)};\n`;
  fs.writeFileSync(OUT_FILE, banner + body, 'utf8');

  console.log(
    `\nTamam: ${result.length} kayıt yazıldı → src/data/generated.js (çakışma/atlama: ${skipped}).`
  );
}

main();
