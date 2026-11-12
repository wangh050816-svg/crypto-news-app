// 美國 10 月 PPI 11/13（五）8:30 ET＝台灣 21:30（BLS 行事曆）；預估月增 0.4%、年增 6.6%、核心月增 0.3%（Continuum Economics、Stocktitan 引述 Dow Jones、FXEmpire）；9 月月增 1.3%、年增 6.3%
const card=require('./lib-barcard.js');
POST({
  caption:'CPI 之後，明晚換 PPI。',
  theme:'ink',width:1600,height:900,
  title:'明晚 PPI：上個月月增 1.3%',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['9 月實際',1.3,'+1.3%',true],['10 月預估',0.4,'+0.4%',false]],
    range:[0,1.6],ticks:[0,0.4,0.8,1.2,1.6],fmt:v=>v+'%',
    stats:[['公布時間','11/13 21:30','台灣時間（週五）'],['年增預估','6.6%','9 月為 6.3%'],['核心 PPI 預估','月增 0.3%','扣除食品與能源']],
  }),
});
