// 10 月油價每天都在 100 美元以上，10/30 創 4 年高點 114（CNN 經 RTÉ）；11/18 WTI 收 83.26（-3.2%）、Brent 91.95（-1.28%），美國原油與燃料庫存增加；兩者 11 月有望各跌約 20%，中東出口增加、運費下滑（Nation Thailand/Reuters、Qatar Tribune）
const card=require('./lib-barcard.js');
POST({
  caption:'油價一個月從 114 跌到 83。',
  theme:'ink',width:1600,height:900,
  title:'油價一個月從 114 跌到 83 美元',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['10/30 高點',114,'114',false],['11/18 Brent',91.95,'91.95',false],['11/18 WTI',83.26,'83.26',true]],
    range:[0,120],ticks:[0,40,80,120],fmt:v=>v+' 美元',
    stats:[['10 月','每天都破 100','10/30 創 4 年新高'],['11 月','有望跌約 20%','中東出口增加'],['11/18','美國庫存增加','WTI 單日 -3.2%']],
  }),
});
