// 美債 11/12（CNBC：10 年期升逾 13 bp 至 5.125%、2 年期升逾 15 bp 至 4.879%；Babypips 約 5.12%）；11/11 退伍軍人節債市休市，前一交易日 11/10 為 4.992%（已查證）
// CME FedWatch：12 月升息機率 100%（CNBC 引述）
const card=require('./lib-barcard.js');
POST({
  caption:'美國 10 年期公債殖利率又回到 5% 以上。',
  theme:'ink',width:1600,height:900,
  title:'美債 10 年期殖利率，重回 5% 以上',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/10 收盤',4.992,'4.99%',false],['11/12 收盤',5.125,'5.125%',true]],
    range:[4.7,5.2],ticks:[4.7,4.8,4.9,5.0,5.1,5.2],fmt:v=>v.toFixed(1)+'%',
    line:{v:5.0,text:'5% 關卡'},
    stats:[['10 年期單日','+13 bp','CPI 後第一個交易日'],['2 年期','4.879%','單日升逾 15 bp'],['12 月升息機率','100%','CME FedWatch']],
  }),
});
