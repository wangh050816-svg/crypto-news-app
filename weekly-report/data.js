// 纏道漫長｜每週交易觀察 — 資料檔
// 只填真實紀錄。沒有的欄位留 null，卡片會顯示「—」，不會自動補數字。
module.exports = {
  period: null,          // 例如 '2026.11.07 — 11.13'；null 顯示「待確認」
  issue: null,           // 期數，例如 'No.46'

  // 正式報單：每筆給已實現 R 值（以該筆止損距離為 1R）
  // 例：{ pair: 'BTCUSDT', side: '空', r: 1.8 }
  trades: [],

  // 社群已提供規劃、但未正式報單的分析機會（不納入績效）
  // result: null = 後續走勢待確認；或填 'TP1' / 'TP2' / 'TP3' / 'SL' / '未觸發'
  ideas: [
    { pair: 'ZECUSDT',  side: '空', lev: 10, entry: [1205, 1215],   tp: [1160, 1140, 1118],       sl: 1247,  result: 'TP3' },
    { pair: 'GRASSUSDT', side: '多', lev: 20, entry: [0.487, 0.49], tp: [0.4989, 0.5035, 0.5152], sl: 0.48,  result: 'TP3' },
    { pair: 'BTCUSDT',  side: '空', lev: 15, entry: [73200, 73500], tp: [71500, 70500, 69200],    sl: 74900, result: 'TP3' },
    { pair: 'XAUUSDT',  side: '空', lev: 20, entry: [3980, 3990],   tp: [3915, 3880],             sl: 4045,  result: 'TP2' },
  ],
};
