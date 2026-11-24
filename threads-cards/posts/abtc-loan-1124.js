// American Bitcoin（ABTC，Eric Trump 為共同創辦人、Hut 8 持多數）取得 FalconX 1.5 億美元比特幣擔保循環信用額度：年費率 5.95%、到期 2028/11/18、初始擔保率 143%，低於 130% 追繳、低於 105% 可違約處分；抵押 BTC 存 Anchorage；宣布時尚未動用；股價盤中最高 4.38（CoinDesk、Bitcoin Magazine、Investing.com、TFTC）
const card=require('./lib-barcard.js');
POST({
  caption:'川普家族礦企不賣幣，拿比特幣去借錢。',
  theme:'ink',width:1600,height:900,
  title:'川普家族礦企不賣比特幣，改抵押借 1.5 億',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['初始擔保率',143,'143%',false],['追繳線',130,'130%',true],['可處分線',105,'105%',false]],
    range:[0,160],ticks:[0,40,80,120,160],fmt:v=>v+'%',
    stats:[['額度','1.5 億美元','FalconX 借出'],['年費率','5.95%','到期 2028 年'],['借滿要押','約 2.15 億美元','的 BTC，照 143% 計算']],
  }),
});
