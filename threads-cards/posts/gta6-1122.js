// Rockstar：GTA VI 首日零售銷售約 37.9 億美元（公司估計，至上市當天結束），前作 GTA V 3 天破 10 億；預購 3,250 萬套；Sensor Tower 估首日約 23.6 億、約 2,460 萬套（Yahoo、GMA、HuffPost、TBS News）
const card=require('./lib-barcard.js');
POST({
  caption:'GTA 6 一天賣 37.9 億美元。',
  theme:'ink',width:1600,height:900,
  title:'GTA 6 一天賣 37.9 億美元，改寫紀錄',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Rockstar 自己說',37.9,'37.9 億',true],['Sensor Tower 估',23.6,'23.6 億',false],['GTA 5（3 天）',10,'10 億',false]],
    range:[0,40],ticks:[0,10,20,30,40],fmt:v=>v+' 億',
    stats:[['預購','3,250 萬套','上市前就賣出'],['數字來源','公司自己估','第三方估比較低'],['上一代','GTA 5','3 天才賣到 10 億']],
  }),
});
