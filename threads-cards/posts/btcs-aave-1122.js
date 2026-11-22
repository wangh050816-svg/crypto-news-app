// BTCS 11/19 向 SEC 申報：Aave 借款約 5,400 萬美元，可能被清算，無法保證不被清算；抵押 46,676 ETH，ETH 1,775 時加密資產約 1.11 億；兩週前借款約 6,400 萬；CoinDesk 估清算價約 1,446；健康因子各家約 1.20–1.23；另有約 1,800 萬優先擔保可轉債；11/13 曾低於成本賣 ETH 保貸款（CoinDesk、The Defiant、FinanceFeeds、KuCoin）；CoinGecko 11/22 08:31 ETH 約 1,682
const card=require('./lib-barcard.js');
POST({
  caption:'上市公司在 DeFi 借錢，可能被清算。',
  theme:'ink',width:1600,height:900,
  title:'上市公司在 Aave 借 5,400 萬，可能被清算',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['ETH 現在',1682,'約 1,682',false],['估計清算價',1446,'約 1,446',true]],
    range:[0,2000],ticks:[0,500,1000,1500,2000],fmt:v=>v,
    stats:[['公司','BTCS','Nasdaq 上市的 ETH 財庫'],['Aave 借款','約 5,400 萬美元','抵押 4.67 萬顆 ETH'],['距離清算','ETH 再跌約 14%','依 CoinDesk 估的清算價']],
  }),
});
