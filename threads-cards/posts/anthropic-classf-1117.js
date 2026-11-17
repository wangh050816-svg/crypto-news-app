// Anthropic SEC 文件（DRS/A、S-1/A；Inc.、Motley Fool、TokenPost）：上市後發行 1 股 Class F 給 Founder LLC（7 位共同創辦人），擁有 50.1% 總表決權（一般股東事項、非 Class T 董事選舉）；無經濟權益；長期利益信託選任多數董事；創辦人意見不一時按 A 股投票比例投；Inc. 稱有 1 位共同創辦人不在內
const card=require('./lib-barcard.js');
POST({
  caption:'Anthropic 上市前，用 1 股鎖住過半投票權。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic：1 股握有 50.1% 投票權',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['7 位創辦人的 1 股',50.1,'50.1%',true],['其他所有股東',49.9,'49.9%',false]],
    range:[0,60],ticks:[0,20,40,60],fmt:v=>v+'%',
    stats:[['這 1 股','沒有分紅權','只有投票權'],['但董事會多數','信託來選','長期利益信託'],['創辦人吵架時','跟著 A 股投','按 A 股投票比例分配']],
  }),
});
