// Anthropic（ANT）IPO 價 83 美元，11/19 開盤 111.50；11/24 收 81.91、跌 6.5%，首度收在 IPO 價下，連 3 個交易日下跌（Axios、CNBC）；Canaccord 首評買進、目標價 135（CNBC）
const card=require('./lib-barcard.js');
POST({
  caption:'從 111.5 跌到破發。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 上市才 4 天，就跌破承銷價',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/19 開盤',111.5,'111.50',false],['承銷價',83,'83.00',false],['11/24 收盤',81.91,'81.91',true]],
    range:[0,120],ticks:[0,30,60,90,120],fmt:v=>v,
    stats:[['11/24 收盤','81.91 美元','單日跌 6.5%'],['離開盤價','跌約 27%','111.50 → 81.91'],['分析師','目標價 135','Canaccord 首評買進']],
  }),
});
