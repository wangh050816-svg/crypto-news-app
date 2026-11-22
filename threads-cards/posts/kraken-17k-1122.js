// Kraken BTC/CAD 11/21 08:00 UTC 起 15 分鐘區間跌到 24,250 加幣（約 16,900 美元），同時段 BTC/USD 約 57,650，低約 71%；Kraken 稱系統正常、無遭駭，成交全部有效；加幣交易對自 20:00 UTC 起賣壓沉重；約 10:00 UTC 才回到正常；Adam Back 猜測做市商資金耗盡，Kraken 未證實（Cointelegraph、CryptoPotato、TheStreet、The Coin Republic）
const card=require('./lib-barcard.js');
POST({
  caption:'Kraken 上有人用 1.7 萬美元買到比特幣。',
  theme:'ink',width:1600,height:900,
  title:'Kraken 上比特幣一度只要 1.7 萬，成交還算數',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['同時段美元報價',5.765,'約 5.77 萬',false],['加幣交易對最低',1.69,'約 1.69 萬',true]],
    range:[0,7],ticks:[0,2,4,6],fmt:v=>v+' 萬',
    stats:[['便宜多少','約 71%','比同時段美元報價'],['Kraken 說','成交全部有效','系統正常、沒被駭'],['持續多久','好幾個小時','才回到正常價格']],
  }),
});
