// Yahoo/Coinspeaker/holder.io：GTA 6 遊戲內虛構幣 DacityCoin，同代號 DCTY 的 Solana 迷因幣上市當天市值約 1,800 萬、24 小時漲 150 倍以上；crypto.news/KuCoin：有人 307 美元變 202,278；TheStreet：約 66,000%；Blockaid：GTA 主題 Solana 代幣逾 2 萬個、8,800 多個被標惡意或垃圾；Rockstar 無官方幣
const card=require('./lib-barcard.js');
POST({
  caption:'GTA 6 裡的假幣，在現實被炒到 1,800 萬。',
  theme:'ink',width:1600,height:900,
  title:'GTA 6 遊戲裡的假幣，現實中被炒到 1,800 萬美元',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['買進',307,'307 美元',false],['賣出',202278,'20.2 萬美元',true]],
    range:[0,230000],ticks:[0,100000,200000],fmt:v=>(v/10000)+' 萬',
    stats:[['報酬','約 660 倍','約 66,000%'],['同名代幣市值','約 1,800 萬','上市當天、漲 150 倍'],['GTA 主題假幣','2 萬多個','8,800 多個被標惡意']],
  }),
});
