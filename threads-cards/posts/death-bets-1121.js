// 參議院以口頭表決通過 S.4035《DEATH BETS Act》，禁止預測市場推出主要取決於死亡、戰爭、恐攻、暗殺的合約，含美軍行動；Schiff、Curtis 提案；起因報導稱 6 名 Polymarket 交易者押美國空襲伊朗時間賺約 100 萬美元；送眾議院，尚未排表決（CoinDesk、The Block、Decrypt、Fortune）
const card=require('./lib-textcard.js');
POST({
  caption:'美國參議院通過《死亡賭注法》。',
  theme:'ink',width:1600,height:900,
  title:'押戰爭和死亡？美國參院要禁了',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['參議院通過',30],['《死亡賭注法》',60,true],['',10],['禁止押注',30],['戰爭、恐攻、暗殺、死亡',40],['連美軍行動也不能押',36]],
    stats:[['表決','零反對','口頭表決通過'],['起因','押空襲時間','6 人賺約 100 萬美元'],['下一步','眾議院','還沒排表決']]}),
});
