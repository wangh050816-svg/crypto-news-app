// Cardano 國庫提案（CoinDesk、CryptoBriefing、Crypto Economy、Bitcoin Foundation 11/16）：Toto Finance 申請 2,200 萬 ADA（約 500 萬美元）買實體銅，約三分之二存放紐奧良附近、符合 COMEX 標準後代幣化；11/15 投票結束，反對對贊成超過 140 比 1；另 1.31 億 ADA 投不信任；國庫提領需 67% 有效投票權同意；憲法委員會 3 反對、4 棄權；Cardano 基金會 10 月即反對
const card=require('./lib-barcard.js');
POST({
  caption:'有人竟然想拿 Cardano 的國庫錢去買銅？',
  theme:'ink',width:1600,height:900,
  title:'拿國庫買銅？Cardano 投票 140 比 1 否決',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['反對',140,'140',true],['贊成',1,'1',false]],
    range:[0,160],ticks:[0,40,80,120,160],fmt:v=>v+'',
    stats:[['提案金額','約 500 萬美元','2,200 萬 ADA'],['要買的是','實體銅','放倉庫再代幣化'],['通過門檻','67%','有效投票權']],
  }),
});
