// SpaceX、Tesla 季報：9 月底分別持有 18,712 與 11,509 BTC，合計 30,221（CoinDesk、Crypto Times、DigitalToday）
// Bloomberg（CoinDesk 引述）：雙方已進入條款談判，最快 12 月宣布、也可能延到 2027 年初；需 Tesla 股東同意；馬斯克 10 月已證實洽談
// 以 BTC 約 69,000 美元計，合計約 21 億美元
const card=require('./lib-barcard.js');
POST({
  caption:'SpaceX 跟 Tesla 如果合併，3 萬顆比特幣會放在同一張資產負債表上。',
  theme:'ink',width:1600,height:900,
  title:'SpaceX＋Tesla：合計 30,221 顆 BTC',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['SpaceX',18712,'18,712',false],['Tesla',11509,'11,509',false],['合併後',30221,'30,221',true]],
    range:[0,35000],ticks:[0,10000,20000,30000],fmt:v=>(v/10000)+' 萬',
    stats:[['以現價計算','約 21 億美元','BTC 約 6.9 萬'],['最快宣布','12 月','Bloomberg，也可能延到明年初'],['還需要','Tesla 股東同意','合併本身不必買賣 BTC']],
  }),
});
