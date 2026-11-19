// CoinGecko 11/19：PI 約 0.0569 美元，歷史高點 2.99（2025/2/26），歷史低點 0.0555（2026/11/18），距高點 -98.1%；11/17 Pi 生態系大會開幕當天首次跌破 0.06（BitcoinWorld、Coinpedia、Bitbase）
const card=require('./lib-barcard.js');
POST({
  caption:'Pi 幣剩高點的 2%。',
  theme:'ink',width:1600,height:900,
  title:'Pi 幣自己開大會，幣價卻創新低',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['2025 年高點',2.99,'2.99',false],['現在',0.0569,'約 0.057',true]],
    range:[0,3.5],ticks:[0,1,2,3],fmt:v=>v+' 美元',
    stats:[['距離高點','跌了 98%','只剩約 2%'],['歷史新低','約 0.0555','11/18 寫下'],['同一週','開生態系大會','11/17 開幕當天跌破 0.06']],
  }),
});
