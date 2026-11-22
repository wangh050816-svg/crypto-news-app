// Solana Compass、Yahoo/CoinGape、Bankless：Anthropic 上市日 Backpack、Ondo、xStocks、Securitize 四家推出代幣，16:57–17:21 UTC 24 分鐘內全上線；都不是 Anthropic 發行或背書；約 90 分鐘 Solana 成交約 2,900 萬美元；Anthropic 稱未經授權的股份轉讓無效
const card=require('./lib-textcard.js');
POST({
  caption:'Anthropic 還在敲鐘，幣圈已經發了 4 種代幣。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 上市當天，24 分鐘冒出 4 種代幣',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({lines:[['Backpack',54,false],['Ondo',54,false],['xStocks',54,false],['Securitize',54,false],['Anthropic：一個都沒背書',36,true]],y0:180,gap:36,
    stats:[['4 家全上線','24 分鐘內','上市當天'],['90 分鐘成交','約 2,900 萬美元','Solana 上'],['持有代幣','不是登記股東','權利要看各家條款']]}),
});
