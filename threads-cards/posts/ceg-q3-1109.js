// Constellation Energy 第三季：調整後 EPS 5.06 美元 vs 預期 3.9 美元，營收 95.5 億美元，11/9 盤中漲幅 4%～5.6%（各家報導；Zacks 稱 +10.5% 未獲第二來源證實，不採用）；預期 3.89（Fiscal AI）
const card=require('./lib-barcard.js');
POST({
  caption:'AI 熱潮裡，有一個族群的財報最近很亮眼，就是賣電的公司。',
  theme:'ink',width:1600,height:900,
  title:'AI 要電，核電股財報先交卷',
  footer:['@zqqnc',''],
  draw:card({
    bars:[['市場預期',3.9,'$3.90',false],['實際',5.06,'$5.06',true]],
    range:[0,6],ticks:[0,2,4,6],fmt:v=>'$'+v,
    stats:[['全年財測','第二次上調','2026 年調整後 EPS'],['調整後每股盈餘','$5.06','預期 $3.90'],['第三季營收','95.5 億美元','Constellation Energy']],
  }),
});
