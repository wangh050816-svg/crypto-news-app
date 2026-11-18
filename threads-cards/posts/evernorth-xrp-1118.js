// Evernorth 10-Q（9/30）：累計減損 5.05 億，3.46 億顆 XRP 帳面 3.42 億，較原始入帳低近 60%；未賣出任何 XRP；與 Ripple 的會計關係不能用新加密會計準則，漲回也不迴轉；9/30 XRP 約 1.50 美元，市值約 5.16 億（CoinDesk、crypto.news、KuCoin、SEC 10-Q）
const card=require('./lib-barcard.js');
POST({
  caption:'Evernorth 把 XRP 帳面價值砍了近 6 成。',
  theme:'ink',width:1600,height:900,
  title:'Ripple 撐腰的 Evernorth，XRP 帳面砍 6 成',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['原始入帳',8.47,'8.47 億',false],['9/30 市值',5.16,'約 5.16 億',false],['帳上只記',3.42,'3.42 億',true]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+' 億',
    stats:[['持有','3.46 億顆 XRP','一顆都沒賣'],['累計減損','5.05 億美元','近 6 成'],['XRP 漲回去','帳面也不調回','會計規則限制']],
  }),
});
