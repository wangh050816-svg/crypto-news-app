// 11/20 收盤：S&P 500 6,910.39（-3.7%，進入修正，週跌 8.6%，2025/4 以來最差一週）、道瓊 48,147.33（-949.73，-1.93%）、Nasdaq 22,617.73（-5.28%，今年轉為 -2.7%）；Nvidia -14%、半導體領跌（UPI、CNN、CNBC、FinChannel）
const card=require('./lib-barcard.js');
POST({
  caption:'Nasdaq 一天跌 5.3%，今年漲幅全吐光。',
  theme:'ink',width:1600,height:900,
  title:'Nasdaq 一天跌 5.3%，今年漲幅全吐光',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Nasdaq',-5.28,'-5.28%',true],['S&P 500',-3.7,'-3.7%',false],['道瓊',-1.93,'-1.93%',false]],
    range:[-6,0],ticks:[-6,-4,-2,0],fmt:v=>v+'%',
    stats:[['Nvidia','-14%','半導體領跌'],['S&P 500 這週','-8.6%','2025 年 4 月以來最差'],['Nasdaq 今年','-2.7%','漲幅全部吐回去']],
  }),
});
