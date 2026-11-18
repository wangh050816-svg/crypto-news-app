// Druckenmiller 11/17 TomorrowX（Austin）：放空銅、股票中性；理由 Fed 不再降息、商品走弱、信用利差擴大；警告 2027 下半年可能令人失望（CoinDesk、Bloomberg、TokenPost、MLQ）
const card=require('./lib-textcard.js');
POST({
  caption:'Druckenmiller 說他在放空銅。',
  theme:'ink',width:1600,height:900,
  title:'傳奇操盤手 Druckenmiller：我在放空銅',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['年初還做多',44,false],['現在翻空',64,true],['',10],['他給的理由',30],['Fed 不再降息',40],['商品轉弱',40],['信用利差擴大',40]],
    stats:[['銅','放空','11/17 公開說'],['股票','中性','多空都只放一點'],['他擔心','2027 下半年','經濟可能令人失望']]}),
});
