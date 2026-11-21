// BTC 11/20 跌破 6 萬美元，多數報導稱 7 月以來首次（Bitcoin Magazine 寫 6 月）；Forbes 引 Coinbase 盤中低點約 57,650；CoinGecko 11/21 08:31 約 58,939（24h -5.0%）、ETH 約 1,621（-7.6%）；IBIT 11/19 流出 5.41 億創紀錄（Forbes、Cryptoticker、Cointribune）
const card=require('./lib-barcard.js');
POST({
  caption:'BTC 跌破 6 萬，7 月以來第一次。',
  theme:'ink',width:1600,height:900,
  title:'比特幣跌破 6 萬，7 月以來第一次',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['BTC 24 小時',-5.0,'-5.0%',false],['ETH 24 小時',-7.6,'-7.6%',true],['Nasdaq 11/20',-5.28,'-5.28%',false]],
    range:[-10,0],ticks:[-10,-8,-6,-4,-2,0],fmt:v=>v+'%',
    stats:[['BTC 現在','約 5.89 萬','11/21 早上'],['盤中最低','約 5.77 萬','Coinbase 報價'],['IBIT 單日','流出 5.41 億','上市以來最多']],
  }),
});
