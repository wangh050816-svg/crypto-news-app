// FinCEN 11/24 揭露資安事件：部分系統遭未授權存取，預防性下線，與 FBI、CISA 合作調查；BSA 電子申報網站仍運作、部分服務可能無法使用並提供申報寬限；同期 CIA 等聯邦單位也傳遭駭（The Hacker News、ABC News、Finextra、Newsweek、Cybernews）
const card=require('./lib-textcard.js');
POST({
  caption:'抓洗錢的單位被駭了。',
  theme:'ink',width:1600,height:900,
  title:'專門抓洗錢的美國財政部單位，自己被駭了',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['FinCEN 部分系統遭入侵',44,true],
    ['可疑交易報告都送到這裡',32,false],
    ['預防性下線部分系統',44,false],
    ['FBI、CISA 一起調查',44,false],
    ['申報網站還能用，部分服務暫停',32,false],
  ],
  stats:[['揭露時間','11/24','美國財政部'],['影響範圍','一部分系統','未授權存取'],['同一時期','CIA 也傳被駭','聯邦機構接連出事']]}),
});
