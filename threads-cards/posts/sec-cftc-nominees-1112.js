// 川普 11/12 提名 4 人（Bloomberg、CoinDesk、白宮網站）：SEC Steven Levine（共和黨）、Kristin Johnson（民主黨，前 CFTC 委員）；CFTC Nathan Anonick（共和黨）、Matthew Rowland（民主黨）
// 現況：SEC 只有主席 Atkins 與 Uyeda 2 人；CFTC 只有主席 Selig 1 人；全數通過後 SEC 4 人、CFTC 3 人；需參議院同意；一年來首次提名
const card=require('./lib-barcard.js');
POST({
  caption:'美國兩大金融監管機關，終於要補人了。',
  theme:'ink',width:1600,height:900,
  title:'SEC、CFTC 一年來首度提名新委員',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['SEC 現在',2,'2 人',false],['SEC 補人後',4,'4 人',true],['CFTC 現在',1,'1 人',false],['CFTC 補人後',3,'3 人',true]],
    range:[0,5],ticks:[0,1,2,3,4,5],fmt:v=>v+' 人',
    stats:[['這次提名','4 人','兩黨各 2 人'],['CFTC 目前','只剩主席','Selig 1 人'],['下一步','參議院同意','通過才能上任']],
  }),
});
