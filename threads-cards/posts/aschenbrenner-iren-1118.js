// Situational Awareness（Leopold Aschenbrenner）Q3 13F：IREN 947 萬股→52.8 萬股（-94%），價值 4.33 億→2,160 萬；CleanSpark -75%、Bitdeer -44%，Core Scientific、Riot、Hive 出清；7 月被迫把多數持股賣給 Citadel；13F 組合 202.4 億→15.8 億，不含私人持股（如 Anthropic）（Cointelegraph、KuCoin、PANews、Cryptonews）
const card=require('./lib-barcard.js');
POST({
  caption:'前 OpenAI 研究員的基金，把礦股幾乎賣光。',
  theme:'ink',width:1600,height:900,
  title:'前 OpenAI 研究員的基金，IREN 砍掉 94%',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['6 月底',4.33,'4.33 億',false],['9 月底',0.216,'0.22 億',true]],
    range:[0,5],ticks:[0,1,2,3,4,5],fmt:v=>v+' 億',
    stats:[['IREN 持股','947 萬→53 萬股','少了 94%'],['其他礦股','3 檔出清','Core Scientific、Riot、Hive'],['7 月','被迫賣給 Citadel','13F 看不出哪些是被迫賣']],
  }),
});
