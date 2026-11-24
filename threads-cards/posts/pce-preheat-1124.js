// BEA：10 月 PCE 與 Q3 GDP 第二次估計 11/25 08:30 ET（台灣 11/25 週三 21:30）；預估：整體 PCE 年增約 3.8%（前值 3.6%，Cleveland Fed nowcast 3.81%），月增約 0.3%；核心 PCE 年增約 3.2–3.3%（前值 3.1%）；Q3 GDP 初值 3.4%，預估 3.4–3.7%；12/9 FOMC 前最後一份主要通膨數據（Admiral Markets、RBC、Investing.com、StockTitan、Cleveland Fed）
const card=require('./lib-barcard.js');
POST({
  caption:'週三 PCE，Fed 開會前最後一份通膨數據。',
  theme:'ink',width:1600,height:900,
  title:'週三晚上 PCE，Fed 開會前最後一份通膨數據',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['9 月 PCE',3.6,'3.6%',false],['10 月預估',3.8,'約 3.8%',true],['9 月核心',3.1,'3.1%',false],['10 月核心預估',3.25,'約 3.2–3.3%',true]],
    range:[0,4.5],ticks:[0,1,2,3,4],fmt:v=>v+'%',
    stats:[['公布時間','11/25 21:30','週三，台灣時間'],['同時公布','Q3 GDP 修正','初值 3.4%'],['下一步','12/9 Fed 開會','升 1 碼還是 2 碼']],
  }),
});
