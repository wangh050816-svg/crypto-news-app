// BTC 11/15 低點：CoinGecko 約 62,081、Coinbase 61,946；四個月低點（Cointelegraph、DigitalToday、Stablecoin Insider）；Anchorage Digital 的 David Lawant：賣壓主要來自美國，Coinbase 主動賣單明顯多於海外；恐懼貪婪指數 10；Coinglass 爆倉約 20 億美元
// 11/13 68,988（CoinGecko 日線）；11/16 08:31 約 64,948（CoinGecko）
const card=require('./lib-barcard.js');
POST({
  caption:'這波 BTC 賣壓，主要是美國人在賣。',
  theme:'ink',width:1600,height:900,
  title:'這波 BTC 賣壓，主要來自美國',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/13',6.90,'6.90 萬',false],['11/15 低點',6.21,'6.21 萬',true],['現在',6.49,'6.49 萬',false]],
    range:[5.5,7.5],ticks:[5.5,6,6.5,7,7.5],fmt:v=>v+' 萬',
    stats:[['恐懼貪婪指數','10','極度恐懼'],['賣壓來源','美國','Coinbase 主動賣單較多'],['24 小時爆倉','約 20 億','美元（Coinglass）']],
  }),
});
