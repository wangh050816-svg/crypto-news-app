// 11/23：IBIT 收 34.62 美元、漲 4.85%，同日美國現貨比特幣 ETF 淨流出 5.697 億美元、連 5 日流出；5 日共流出 23.7 億、IBIT 佔 19.5 億；11 月累計流出 47.1 億美元，超過 6 月 45.1 億紀錄（Cointelegraph、GNcrypto、CryptoTicker）
const card=require('./lib-barcard.js');
POST({
  caption:'股價漲、錢在跑。',
  theme:'ink',width:1600,height:900,
  title:'IBIT 漲快 5%，錢卻還在往外跑',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11 月流出（億美元）',47.1,'47.1 億',true],['6 月流出（舊紀錄）',45.1,'45.1 億',false]],
    range:[0,50],ticks:[0,10,20,30,40,50],fmt:v=>v,
    stats:[['IBIT 11/23','+4.85%','收 34.62 美元'],['同一天 ETF','流出 5.7 億','連續 5 天流出'],['近 5 天','流出 23.7 億','IBIT 就佔 19.5 億']],
  }),
});
