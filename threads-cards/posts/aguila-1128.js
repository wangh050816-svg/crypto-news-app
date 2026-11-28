// AguilaTrades 11/26–27 在 Hyperliquid 以 40 倍開約 2,440 BTC 多單（均價約 61,614、名目約 1.5 億美元）；11/27 美股開盤後停損賣出 1,440 BTC、實現虧損約 177 萬美元，剩約 936 BTC、清算價約 57,364；帳戶約 250 萬美元，歷史累計虧損約 3,192 萬美元（KuCoin、PANews、OKX Orbit、TokenPost）
const card=require('./lib-textcard.js');
POST({
  caption:'40 倍做多，一夜停損 177 萬。',
  theme:'ink',width:1600,height:900,
  title:'巨鯨 40 倍做多比特幣，一夜停損 177 萬美元',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['開倉：約 2,440 顆 BTC',44,false],
    ['40 倍槓桿，名目約 1.5 億美元',32,false],
    ['美股一開盤就觸發停損',44,true],
    ['先砍 1,440 顆，虧 177 萬',44,false],
    ['剩下的清算價約 5.74 萬',32,false],
  ],
  stats:[['開倉均價','約 61,614','Hyperliquid'],['這次停損','-177 萬美元','賣出 1,440 BTC'],['歷史累計','虧約 3,192 萬','帳戶剩約 250 萬']]}),
});
