// 化名交易者 @3i 自稱：7/27 BitGo 在公開 BitGoJS 程式庫提交把 Cash Cat 加入 Robinhood Chain 代幣清單的程式碼，7/28 合併；Robinhood 8/6 才上架；團隊先買後賣，Cash Cat 賺逾 400 萬、PONS 約 200 萬，合計逾 600 萬美元；The Block 證實程式碼紀錄與錢包活動，獲利金額未證實（The Block、Crypto Briefing、動區）
const card=require('./lib-textcard.js');
POST({
  caption:'上架前 9 天，程式碼就寫好了。',
  theme:'ink',width:1600,height:900,
  title:'盯著公開程式碼，比 Robinhood 早 9 天上車',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['7/27：BitGo 公開提交程式碼',44,false],
    ['把 Cash Cat 加進代幣清單',32,false],
    ['交易者看到就先買',44,true],
    ['8/6：Robinhood 才上架',44,false],
    ['程式碼和錢包紀錄對得上',32,false],
  ],
  stats:[['自稱獲利','600 萬美元','還沒被證實'],['提前多久','約 9 天','7/28 合併'],['第二檔','PONS','自稱賺 200 萬']]}),
});
