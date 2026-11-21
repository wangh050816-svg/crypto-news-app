// 摩根大通 Panigirtzoglou 團隊（11/18 報告）：比特幣生產成本估約 86,000 美元；報告時 BTC 約 65,000；高成本礦商可能賣幣換現金或轉 AI；礦商關機、算力下降、難度調整後缺口可能縮小（The Block、Crypto Briefing、BeInCrypto）；CoinGecko 11/21 17:45 約 57,904
const card=require('./lib-barcard.js');
POST({
  caption:'挖一顆 BTC 要 8.6 萬，市價只剩 5.8 萬。',
  theme:'ink',width:1600,height:900,
  title:'挖一顆比特幣要 8.6 萬，市價只剩 5.8 萬',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['摩根大通估的成本',8.6,'約 8.6 萬',false],['報告發出時',6.5,'約 6.5 萬',false],['現在',5.79,'約 5.79 萬',true]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+' 萬',
    stats:[['每挖一顆','虧約 2.8 萬美元','照估計成本推算'],['礦商可能','賣幣換現金','或乾脆轉做 AI'],['缺口怎麼縮','礦商關機','算力下降、難度調整']],
  }),
});
