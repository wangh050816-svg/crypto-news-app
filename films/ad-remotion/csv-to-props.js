// CSV → 每一列一個 props 檔（ad-creative-video skill 的做法：欄位缺漏、顏色錯誤就直接失敗，不產出壞掉的廣告）
// 用法：node csv-to-props.js variants.csv ./props 9x16
const fs = require("fs"), path = require("path");
const [, , csvPath, outDir, aspect = "9x16"] = process.argv;
const REQUIRED = ["id", "hook", "hookSub", "hero", "cta", "accent", "bg"], HEROES = ["pack", "coins", "gold"];
const isHex = (s) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
const [head, ...lines] = fs.readFileSync(csvPath, "utf8").trim().split(/\r?\n/);
const cols = head.split(",").map((c) => c.trim());
fs.mkdirSync(outDir, {recursive: true});
let errors = 0; const seen = new Set();
lines.filter(Boolean).forEach((line, n) => {
  const cells = line.split(","); const row = {}; cols.forEach((c, i) => (row[c] = (cells[i] ?? "").trim()));
  const where = `row ${n + 2} (${row.id || "no-id"})`;
  REQUIRED.forEach((k) => { if (!row[k]) { console.error(`✗ ${where}: missing "${k}"`); errors++; } });
  if (seen.has(row.id)) { console.error(`✗ ${where}: duplicate id`); errors++; } seen.add(row.id);
  if (!HEROES.includes(row.hero)) { console.error(`✗ ${where}: hero must be ${HEROES.join("/")}`); errors++; }
  ["accent", "bg"].forEach((k) => { if (row[k] && !isHex(row[k])) { console.error(`✗ ${where}: "${k}" not hex`); errors++; } });
  if ([...row.hook].length > 13) console.warn(`⚠ ${where}: hook 超過 13 字，9:16 可能會太擠`);
  if (!errors) fs.writeFileSync(path.join(outDir, `${row.id}.json`), JSON.stringify({v: row, aspect}, null, 2));
});
if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
console.log(`✓ ${lines.length} 支變體 → ${outDir}`);
