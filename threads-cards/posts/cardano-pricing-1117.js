// Cardano 基金會 11/16 提案向社群金庫申請近 2,500 萬 ADA，辦 2027 年 12 場研討會，預算約 500 萬美元，以 ADA 0.20 美元計（高市價約 33%）；市價約 0.15 美元時只值約 380 萬（CoinDesk、KuCoin、Phemex、Cryptowisser）
// 今年 Cardano Summit 2026 預算案未達三分之二門檻被否決
const card=require('./lib-barcard.js');
POST({
  caption:'Cardano 基金會用高於市價 33% 的幣價申請預算。',
  theme:'ink',width:1600,height:900,
  title:'Cardano 基金會申請預算，幣價多算 33%',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['提案用的幣價',0.20,'0.20 美元',true],['現在市價',0.15,'約 0.15 美元',false]],
    range:[0,0.25],ticks:[0,0.05,0.10,0.15,0.20,0.25],fmt:v=>v.toFixed(2),
    stats:[['申請數量','近 2,500 萬 ADA','辦 2027 年 12 場研討會'],['帳面預算','500 萬美元','照 0.20 美元計算'],['照市價只值','約 380 萬美元','差了約 120 萬']],
  }),
});
