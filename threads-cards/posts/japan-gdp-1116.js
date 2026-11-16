// 日本內閣府 11/16 Q3 GDP 初值（FXStreet、TokenPost）：季增 0%（預估 0.1%）、年率 -0.1%（預估 +0.3%）；Q2 上修至年率 1.4%；美元兌日圓上週收 160.00，9/1 以來最高（fxrecap）；12 月公布修正值
const card=require('./lib-barcard.js');
POST({
  caption:'日本第三季經濟零成長，日圓還卡在 160。',
  theme:'ink',width:1600,height:900,
  title:'日本 GDP 停滯，日圓卡在 160',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Q2（上修）',1.4,'+1.4%',false],['Q3 預估',0.3,'+0.3%',false],['Q3 實際',-0.1,'-0.1%',true]],
    range:[-0.5,1.6],ticks:[-0.5,0,0.5,1,1.5],fmt:v=>v+'%',
    stats:[['季增率','0%','預估 0.1%'],['美元兌日圓','160','上週收盤，9 月以來最高'],['下次修正','12 月','這次是初值']],
  }),
});
