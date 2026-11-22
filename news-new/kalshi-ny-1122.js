// The Block 11/21、CoinDesk 11/20、Crypto Briefing、Yahoo：紐約州法官 Melissa Crane 11/23 11:30 ET（台灣 11/24 00:30）審紐約檢察長 James 的暫時禁制令；Kalshi 總部在紐約，稱會全國關站並平倉；檢察長稱不是要關掉所有用戶；聯邦法官 11/20 駁回 CFTC 第二次緊急阻擋；Kalshi 估值約 220 億
const card=require('./lib-textcard.js');
POST({
  caption:'一場州法院聽證，可能讓 220 億的預測市場全國關站。',
  theme:'ink',width:1600,height:900,
  title:'Kalshi 週一聽證：紐約一張禁令，可能全國關站',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({lines:[['紐約檢察長：',44,false],['無照經營賭博，要禁',56,false],['Kalshi：',44,false],['總部在紐約，等於全國關站',56,true],['聯邦法官已駁回 CFTC 兩次緊急阻擋',32,false]],y0:200,gap:34,
    stats:[['聽證時間','11/24 00:30','台灣時間'],['Kalshi 估值','約 220 億美元','媒體報導'],['最壞情況','全國平倉','Kalshi 自己的說法']]}),
});
