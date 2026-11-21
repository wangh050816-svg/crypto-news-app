// Trump Media 9/30 持有約 15,649 BTC（PANews 引 CoinDesk、Coinpaper）；按 CoinGecko 11/21 16:37 約 57,331 美元計約 8.97 億；待還比特幣擔保可轉債約 8.835 億，11/30 持有人可要求現金贖回；9/30 現金與短期投資約 3.934 億；公司稱盡量不賣 BTC，融資不足仍可能賣
const card=require('./lib-barcard.js');
POST({
  caption:'川普媒體的比特幣，剩下剛好夠還債。',
  theme:'ink',width:1600,height:900,
  title:'BTC 跌到 5.7 萬，川普媒體的幣剛好只夠還債',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['手上 BTC 市值',8.97,'約 8.97 億',true],['要還的債',8.835,'約 8.84 億',false],['手上現金',3.934,'約 3.93 億',false]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+' 億',
    stats:[['持有 BTC','約 1.56 萬顆','9/30 數字'],['期限','11/30','持有人可要求現金贖回'],['差距','只剩約 1,400 萬','BTC 再跌 1.5% 就不夠']],
  }),
});
