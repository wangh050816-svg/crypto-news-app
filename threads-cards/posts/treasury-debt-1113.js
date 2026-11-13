// Nakamoto（crypto.news、CryptoBriefing、The Defiant 11/13）：欠 Kraken 1.65 億美元 USDT 借款，公司市值約 1.04 億；原本 12/4 到期的 6,000 萬延到 2027/12/4，其餘 1.05 億 2027/6/30 到期
// BTCS 季報（CoinDesk、Phemex 11/13）：11/9 Aave 借款約 6,410 萬美元，抵押 46,676 ETH，健康係數約 1.24；為維持健康係數曾低於成本賣 ETH；清算線估約 1,717 美元（CoinDesk 估算）
const card=require('./lib-barcard.js');
POST({
  caption:'幣價一跌，囤幣公司的債務問題開始浮上來。',
  theme:'ink',width:1600,height:900,
  title:'囤幣公司開始被債務追著跑',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Nakamoto 欠 Kraken',1.65,'1.65 億',true],['Nakamoto 市值',1.04,'約 1.04 億',false]],
    range:[0,2],ticks:[0,0.5,1,1.5,2],fmt:v=>v+' 億',
    stats:[['Nakamoto','欠債大於市值','6,000 萬到期日延後一年'],['BTCS Aave 借款','6,410 萬','抵押 46,676 顆 ETH'],['BTCS 清算線','估約 1,717','ETH 現價約 1,938']],
  }),
});
