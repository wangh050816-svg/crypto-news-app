// Deribit 11/16（Bloomberg、CoinDesk、CryptoBriefing、TokenPost）：6 萬美元賣權未平倉約 9 億美元，超過 10 萬美元買權的 8.67 億，成為最大部位；約比現價 6.5 萬低 8%；Paradigm 稱買權減少主因是多頭平倉；未平倉不代表新資金
// BTC 約 64,333（CoinGecko 11/16 17:45）
const card=require('./lib-barcard.js');
POST({
  caption:'BTC 期權市場最大的賭注，變成跌破 6 萬。',
  theme:'ink',width:1600,height:900,
  title:'BTC 最大賭注：從 10 萬變成跌破 6 萬',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['6 萬賣權',9.0,'約 9 億',true],['10 萬買權',8.67,'8.67 億',false]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+' 億',
    stats:[['BTC 現價','約 6.4 萬','美元'],['6 萬離現價','約 7%','再跌一段就到'],['注意','是累積部位','不代表都是新資金']],
  }),
});
