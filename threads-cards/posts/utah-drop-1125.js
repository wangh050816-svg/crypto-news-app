// 11/24 猶他撤回對 Kalshi 與兩名共同創辦人的刑事告訴（13 項重罪＋1 項輕罪，10 月底提起），前一天 Kalshi 暫停猶他營運；AG Derek Brown：Kalshi 回來，告訴就回來；民事訴訟仍在；雙方無和解（CNN、UPI、The Hill）
const card=require('./lib-textcard.js');
POST({
  caption:'你走，我就撤告。',
  theme:'ink',width:1600,height:900,
  title:'Kalshi 一離開猶他，刑事告訴就撤了',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['10 月底：猶他對 Kalshi 提告',44,false],
    ['兩名共同創辦人 13 項重罪',32,false],
    ['11/23：Kalshi 暫停猶他營運',44,false],
    ['11/24：猶他撤回刑事告訴',44,true],
    ['檢察長：「它回來，告訴就回來」',36,false],
  ],
  stats:[['刑事告訴','撤回','11/24 宣布'],['民事訴訟','還在打','可能罰錢'],['雙方','沒有和解','消息人士說']]}),
});
