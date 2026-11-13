// Nvidia 11/12 宣布黃仁勳辭去執行長並退出董事會（CNBC、TechCrunch、CNN）；財務長 Colette Kress 任臨時執行長並續兼財務長；Harvey Jones 為首任董事長
// 股價：盤中一度跌逾 13%（Yahoo、動區；Fool 稱最多約 14%），收盤 166.19 美元、跌 4.34%（Motley Fool、CNBC「跌逾 4%」）
const card=require('./lib-barcard.js');
POST({
  caption:'黃仁勳正式辭去 Nvidia 執行長。',
  theme:'ink',width:1600,height:900,
  title:'黃仁勳辭職，Nvidia 盤中跌逾 13%',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['盤中最低',-13,'逾 -13%',false],['收盤',-4.34,'-4.34%',true]],
    range:[-15,0],ticks:[-15,-10,-5,0],fmt:v=>v+'%',
    stats:[['收盤價','166.19 美元','11/12'],['臨時執行長','Colette Kress','原財務長，繼續兼任'],['公司首位董事長','Harvey Jones','董事會同時宣布']],
  }),
});
