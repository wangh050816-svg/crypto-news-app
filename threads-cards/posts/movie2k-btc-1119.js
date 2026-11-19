// 萊比錫地方法院法官提議：Movie2k 被告交出 40,000 BTC 並付 3,800 萬歐元給潛在受害者，可撤銷洗錢與逃稅指控；檢方估他仍持有約 56,000 BTC，可保留約 16,000 BTC（約 9.4 億歐元）；德國 2024 夏天已賣約 50,000 BTC；12/3 下次開庭（CoinDesk、Decrypt、Crypto Briefing、Bitcoin.com、Cryptopolitan）
const card=require('./lib-barcard.js');
POST({
  caption:'交出 4 萬顆 BTC，官司就撤？',
  theme:'ink',width:1600,height:900,
  title:'交出 4 萬顆 BTC 就撤案，還能留 1.6 萬顆',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['檢方估計持有',56000,'約 5.6 萬',false],['要交出',40000,'4 萬',true],['可以留下',16000,'約 1.6 萬',false]],
    range:[0,60000],ticks:[0,20000,40000,60000],fmt:v=>(v/10000)+' 萬顆',
    stats:[['另外要付','3,800 萬歐元','給潛在受害者'],['德國政府','2024 已賣 5 萬顆','同一案扣押的 BTC'],['下次開庭','12/3','雙方還在考慮']],
  }),
});
