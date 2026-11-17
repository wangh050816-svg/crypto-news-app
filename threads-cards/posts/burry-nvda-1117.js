// Benzinga、MLQ、TokenPost 11/16：Burry 質疑 Nvidia 地區營收改制；FY25 Q2（至 2025/7/27）新加坡帳單營收 101.6 億、占 22%；FY26 Q3 起改依客戶總部認列並回溯，新加坡不再單列；Burry 稱移出的 79 億美元是中國總部客戶透過海外實體開票；引用 Culper 估中國占 FY26 運算營收逾 20%；他仍持有 Nvidia 賣權；Nvidia 稱查核未發現轉運
const card=require('./lib-barcard.js');
POST({
  caption:'「大賣空」Burry 盯上 Nvidia 消失的新加坡營收。',
  theme:'ink',width:1600,height:900,
  title:'大賣空 Burry：新加坡營收去哪了？',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['舊算法新加坡占比',22,'22%',true],['改制後',0,'不再單列',false]],
    range:[0,25],ticks:[0,5,10,15,20,25],fmt:v=>v+'%',
    stats:[['Burry 的說法','約 79 億','其實是中國客戶的單'],['他的部位','仍持有賣權','押 Nvidia 跌'],['Nvidia 回應','沒發現轉運','財報台灣週三清晨']],
  }),
});
