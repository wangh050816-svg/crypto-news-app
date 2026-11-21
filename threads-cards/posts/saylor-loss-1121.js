// Strategy 11/9 SEC 申報：持有 850,364 BTC，總成本 641.6 億美元，均價 75,456（KuCoin、CryptoTimes、Bloomingbit、CCN）；按 CoinGecko 11/21 16:37 約 57,331 計市值約 487.5 億、帳面虧損約 154 億（推算）；Saylor 稱下跌是資金轉向 AI，並暗示會繼續買（Bloomingbit、cryptocoinshow）
const card=require('./lib-barcard.js');
POST({
  caption:'Saylor 帳上虧 150 億，還說要繼續買。',
  theme:'ink',width:1600,height:900,
  title:'Saylor 的比特幣帳上虧 150 億，還說要再買',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['買進成本',641.6,'641.6 億',false],['現在市值',487.5,'約 487.5 億',true]],
    range:[0,700],ticks:[0,200,400,600],fmt:v=>v+' 億',
    stats:[['持有 BTC','85 萬顆','11/9 申報'],['平均成本','7.55 萬美元','現價約 5.73 萬'],['帳面虧損','約 154 億美元','照現價推算']],
  }),
});
