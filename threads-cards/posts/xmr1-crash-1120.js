// Wagyu 在 Hyperliquid 的包裝門羅幣 XMR1 11/20 崩跌逾 99%：由發行者地址撥款的錢包收到 520 萬顆並賣出約 1,350 萬美元（CoinDesk、PANews、TokenPost）；TokenPost：35 分鐘內從約 494 跌到約 1 美元；Scam Sniffer 稱疑似盜竊；原生 XMR 與 XMR 永續合約約 482 未受影響；授權或被盜仍未確認
const card=require('./lib-barcard.js');
POST({
  caption:'包裝門羅幣 35 分鐘歸零。',
  theme:'ink',width:1600,height:900,
  title:'包裝門羅幣 XMR1，35 分鐘跌掉 99%',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['崩跌前',494,'約 494',false],['35 分鐘後',1,'約 1',true],['原生 XMR',482,'約 482',false]],
    range:[0,600],ticks:[0,200,400,600],fmt:v=>v+' 美元',
    stats:[['被賣掉','520 萬顆','約 1,350 萬美元'],['錢包來源','發行者地址','撥款給賣出的錢包'],['是不是被盜','還沒確認','Scam Sniffer 疑似盜竊']],
  }),
});
