// Farside：IBIT 11/19 流出約 5.41 億美元，上市以來單日最大；當天 12 檔現貨 BTC ETF 合計約 5.82 億、連 3 天流出；IBIT 11 月流出約 29.4 億、占全部約 34.7 億的 85%；累計淨流入仍約 633.7 億（TFTC、Bloomingbit、BeInCrypto、KuCoin）；BTC 11/20 17:45 約 61,621（CoinGecko）
const card=require('./lib-barcard.js');
POST({
  caption:'IBIT 單日流出 5.41 億，史上最大。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 上市那天，IBIT 流出史上最多',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['IBIT',5.41,'5.41 億',true],['其他 11 檔',0.41,'約 0.41 億',false]],
    range:[0,6],ticks:[0,2,4,6],fmt:v=>v+' 億',
    stats:[['IBIT 單日','5.41 億美元','上市以來最大'],['11 月 IBIT','流出約 29 億','占全部 ETF 的 85%'],['BTC','約 6.16 萬','11/20 傍晚']],
  }),
});
