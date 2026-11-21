// BTC 11/20 跌破 6 萬後續跌，11/21（六）盤中低點各家 55,127–55,830（Cointelegraph/KuCoin 跌破 5.5 萬、Cryptorank 55.5K「2024/9 以來首次」、COINOTAG 兩年低點）；CoinGecko 小時資料低點約 55,711（11/21 14:00 台灣）；11/21 16:37 約 57,331（24h -7.5%）、ETH 約 1,617（-7.8%）；恐懼貪婪指數 12（COINOTAG、CryptoPotato 極度恐懼）
const card=require('./lib-barcard.js');
POST({
  caption:'BTC 跌到 5.5 萬附近，2024 年 9 月以來最低。',
  theme:'ink',width:1600,height:900,
  title:'比特幣跌到 5.5 萬，2024 年 9 月以來最低',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/20 跌破',6.0,'6 萬',false],['11/21 低點',5.55,'約 5.5 萬',true],['現在',5.73,'約 5.73 萬',false]],
    range:[0,7],ticks:[0,2,4,6],fmt:v=>v+' 萬',
    stats:[['BTC 24 小時','-7.5%','11/21 傍晚'],['ETH 24 小時','-7.8%','約 1,617 美元'],['市場情緒','極度恐懼','恐懼貪婪指數約 12']],
  }),
});
