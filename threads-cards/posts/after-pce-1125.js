// BEA 11/25：10 月 PCE 物價月增 0.3%、年增 3.8%；核心月增 0.3%、年增 3.3%（前值 3.1%，共識 3.2%）；個人所得 +0.7%、儲蓄率 4.1%；Q3 GDP 第二次估計 4.3%（初值 3.4%，共識約 3.5%）
const card=require('./lib-barcard.js');
POST({
  caption:'核心 PCE 高於預期，GDP 大幅上修。',
  theme:'ink',width:1600,height:900,
  title:'核心 PCE 3.3% 高於預期，GDP 上修到 4.3%',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['9 月核心',3.1,'3.1%',false],['市場預期',3.2,'3.2%',false],['10 月核心',3.3,'3.3%',true]],
    range:[0,4],ticks:[0,1,2,3,4],fmt:v=>v+'%',
    stats:[['整體 PCE 年增','3.8%','符合預期'],['Q3 GDP','4.3%','初值 3.4%'],['下一關','12/9 FOMC','12/4 先看非農']],
  }),
});
