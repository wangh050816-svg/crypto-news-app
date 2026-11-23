// Cardano 基金會約 2,500 萬 ADA 的 2027 活動預算：11/23 鏈上反對約 7.417 億 ADA、贊成約 1.408 億、不信任約 1.310 億；需超過三分之二 DRep 權益同意；12/20 截止；反對方要求證明過去活動成效（CoinDesk、KuCoin、PANews、Crypto Briefing）
const card=require('./lib-barcard.js');
POST({
  caption:'Cardano 社群反對票是贊成的 5 倍。',
  theme:'ink',width:1600,height:900,
  title:'Cardano 基金會要錢辦活動，反對票是贊成 5 倍',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['反對',7.417,'7.42 億',true],['贊成',1.408,'1.41 億',false],['不信任',1.310,'1.31 億',false]],
    range:[0,8],ticks:[0,2,4,6,8],fmt:v=>v+' 億',
    stats:[['申請','約 2,500 萬 ADA','2027 年 12 場研討會'],['過關門檻','三分之二','DRep 權益要同意'],['投票截止','12/20','結果還可能變']],
  }),
});
