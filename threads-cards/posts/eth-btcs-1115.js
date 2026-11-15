// ETH 現價約 1,754 美元（CoinGecko 11/15 08:30，24h -9.2%）；11/14 跌破 1,800、7 月以來最低（CryptoTicker、The Coin Republic）
// BTCS 季報（CoinDesk、Phemex 11/13）：11/9 Aave 借款約 6,410 萬美元，抵押 46,676 ETH，健康係數約 1.24；清算線估約 1,717（CoinDesk 依 11/9 部位估算）；曾低於成本賣 ETH
const card=require('./lib-barcard.js');
POST({
  caption:'ETH 跌到 1,750，離 BTCS 的估算清算線只剩 2%。',
  theme:'ink',width:1600,height:900,
  title:'ETH 跌到 1,750，離清算線只剩 2%',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/9 時 ETH',2127,'2,127',false],['現在 ETH',1754,'約 1,754',true],['BTCS 估算清算線',1717,'約 1,717',false]],
    range:[1500,2200],ticks:[1500,1700,1900,2100],fmt:v=>v+'',
    stats:[['BTCS Aave 借款','6,410 萬','美元，11/9 數字'],['抵押品','46,676 顆 ETH','健康係數約 1.24'],['距離清算線','約 2%','依 11/9 部位估算']],
  }),
});
