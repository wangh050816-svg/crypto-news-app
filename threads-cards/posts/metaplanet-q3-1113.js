// Metaplanet 2026 前三季（Cointelegraph、TokenPost、KuCoin、The Block）：淨虧損 271.57 億日圓（約 1.7 億美元），主要來自 BTC 出售與評價損失；Q3 賣出 1 萬顆、買回 1.1 萬顆；9/30 持有 44,000 顆；全年營收預測由 160 億日圓下修至 65 億（約 -59%）
const card=require('./lib-barcard.js');
POST({
  caption:'Metaplanet 前三季虧了約 1.7 億美元。',
  theme:'ink',width:1600,height:900,
  title:'Metaplanet 前三季虧損約 1.7 億美元',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['原本營收預測',160,'160 億日圓',false],['下修後',65,'65 億日圓',true]],
    range:[0,180],ticks:[0,50,100,150],fmt:v=>v+' 億',
    stats:[['前三季淨虧損','約 1.7 億美元','271.57 億日圓'],['Q3 操作','賣 1 萬買回 1.1 萬','證明資產能變現'],['持有 BTC','44,000 顆','截至 9/30']],
  }),
});
