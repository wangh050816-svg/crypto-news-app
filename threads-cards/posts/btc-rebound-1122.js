// CoinDesk：BTC 11/21 早盤低點約 55,130（2024/9 以來最低）後反彈逾 9%，重回 6 萬，美東午後約 60,300；爆倉約 18 億美元（CoinDesk，其他來源 10.8–24 億）；現貨 BTC ETF 一週淨流出約 11 億；恐懼貪婪 12（CoinDesk、KuCoin、Coinpaper、CryptoTimes）；CoinGecko 11/22 08:31 約 60,210
const card=require('./lib-barcard.js');
POST({
  caption:'BTC 從 5.5 萬彈回 6 萬。',
  theme:'ink',width:1600,height:900,
  title:'比特幣一天內從 5.5 萬彈回 6 萬',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/21 低點',5.513,'約 5.51 萬',false],['現在',6.021,'約 6.02 萬',true]],
    range:[0,7],ticks:[0,2,4,6],fmt:v=>v+' 萬',
    stats:[['反彈幅度','超過 9%','從兩年低點'],['爆倉','約 18 億美元','大多是做多的'],['恐懼貪婪','12','還在極度恐懼']],
  }),
});
