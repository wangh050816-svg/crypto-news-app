// Trump Media：約 8.835 億美元比特幣擔保可轉債，本週以折價買回 1 億；持有人 11/30 可要求按面額現金贖回；計畫用現金與信用額度還、盡量不賣 BTC，但若融資不足仍可能賣；9/30 持有約 15,649 BTC、現金與短期投資約 3.934 億（CoinDesk 經 PANews、KuCoin、Coinpaper、Phemex）
const card=require('./lib-barcard.js');
POST({
  caption:'川普媒體要還 8.8 億，說不賣比特幣。',
  theme:'ink',width:1600,height:900,
  title:'川普媒體要還 8.8 億美元債，說不賣比特幣',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['要還的債',8.835,'約 8.8 億',true],['手上現金',3.934,'約 3.9 億',false]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+' 億',
    stats:[['持有 BTC','約 1.56 萬顆','9/30 數字'],['期限','11/30','持有人可要求現金贖回'],['錢不夠的話','可能還是要賣','先用現金和信用額度']],
  }),
});
