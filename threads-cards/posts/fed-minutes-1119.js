// 10 月 FOMC 紀要（11/18 公布）：幾乎所有官員認為進一步升息可能適當；10 月 10:2 按兵不動，Hammack 與 Cook 投反對、要升 1 碼；有人提 12 月升超過 1 碼（CNBC、FXStreet、Blockchain.News）
const card=require('./lib-textcard.js');
POST({
  caption:'Fed 紀要：幾乎所有人都覺得還要升。',
  theme:'ink',width:1600,height:900,
  title:'Fed 紀要：幾乎所有官員都說還要升息',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['10 月按兵不動',30],['10 票對 2 票',44],['反對的 2 票都要升息',52,true],['',10],['Hammack、Cook',40],['都主張直接升 1 碼',36]],
    stats:[['紀要重點','幾乎全體','認為還要再升'],['10 月投票','10：2','反對票都要升 1 碼'],['12 月','有人想升更多','不只 1 碼']]}),
});
