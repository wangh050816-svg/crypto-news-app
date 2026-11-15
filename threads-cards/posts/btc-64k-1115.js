// BTC 每週價格（CoinGecko 日線）：10/24 81,102、10/31 77,275、11/7 75,775、11/13 68,988；11/15 08:30 約 63,823
// 11/14 盤中低點約 63,403，8 月以來最低（Investing.com、Archyde）；24 小時爆倉約 19.3 億美元、多單約 18 億（TokenPost、CryptoBriefing「逾 19 億」）
// Glassnode 分析師 James Check：歷史高點以來第 4 次投降潮，不保證立刻見底（CoinDesk 標題、Archyde）
const card=require('./lib-barcard.js');
POST({
  caption:'BTC 跌破 6.4 萬，8 月以來最低。',
  theme:'ink',width:1600,height:900,
  title:'BTC 跌破 6.4 萬，8 月以來最低',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['10/24',8.11,'8.11 萬',false],['10/31',7.73,'7.73 萬',false],['11/7',7.58,'7.58 萬',false],['11/13',6.90,'6.90 萬',false],['11/15',6.38,'6.38 萬',true]],
    range:[5.5,8.5],ticks:[5.5,6,6.5,7,7.5,8,8.5],fmt:v=>v+' 萬',
    stats:[['24 小時爆倉','約 19 億美元','九成以上是多單'],['盤中低點','約 63,400','8 月以來最低'],['分析師說法','第 4 次投降潮','但不保證馬上見底']],
  }),
});
