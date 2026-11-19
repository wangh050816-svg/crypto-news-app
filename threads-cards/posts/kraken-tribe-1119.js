// Payward（Kraken 母公司）同意收購 Tribe Capital Management，Tribe 由 Kraken 共同執行長 Arjun Sethi 共同創辦、他兼任 Tribe 董事長；金額未公布；管理資產約 27 億美元（Payward 公告，其他媒體 26 億）；預計 2027 Q1 完成；Tribe 2021 年 5 月前已投資 Kraken 1.2 億美元（The Defiant、PANews、CoinDesk、動區）
const card=require('./lib-textcard.js');
POST({
  caption:'Kraken 要買自己執行長的創投。',
  theme:'ink',width:1600,height:900,
  title:'Kraken 母公司，要買下自家執行長的創投',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['買方',30],['Kraken 母公司 Payward',40],['',6],['賣方',30],['Tribe Capital',40],['老闆是 Kraken 共同執行長',40,true]],
    stats:[['收購金額','沒公布','預計 2027 年第一季完成'],['Tribe 管理資產','約 27 億美元','Payward 公告數字'],['更早之前','Tribe 投過 Kraken','2021 年前投了 1.2 億']]}),
});
