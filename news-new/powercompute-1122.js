// CoinDesk 11/20、TokenPost、PANews：PowerCompute 9/24 由 Arch Lending 賣 267 BTC 還約 2,200 萬本金，擔保債務 2,370 萬降到 125 萬；9 月底現金約 65 萬；持續經營疑慮未解除；10 月底持 66 BTC；股價約 0.4 美元、市值約 100 萬
const card=require('./lib-barcard.js');
POST({
  caption:'礦商賣 267 顆比特幣還完債，公司只剩 100 萬市值。',
  theme:'ink',width:1600,height:900,
  title:'礦商賣 267 顆 BTC 還債，公司市值只剩 100 萬',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['賣幣前債務',2370,'2,370 萬',false],['賣幣後債務',125,'125 萬',false],['公司市值',100,'約 100 萬',true]],
    range:[0,2800],ticks:[0,1000,2000],fmt:v=>v+' 萬',
    stats:[['賣掉','267 顆 BTC','9/24 由貸方賣出'],['帳上現金','約 65 萬美元','9 月底'],['財報警告','持續經營疑慮','還沒解除']],
  }),
});
