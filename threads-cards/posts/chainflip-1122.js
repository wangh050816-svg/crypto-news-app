// 幣安駭案相關錢包 11/19–20 兩天搬約 5.94 億美元 ETH，經 THORChain、Chainflip（Chainflip 約 500 萬，SomaXBT）（Cointelegraph、Blockonomi、COINOTAG）；11/21 Chainflip 以太坊金庫被轉走約 486 萬（520.2 ETH、325 萬 USDC、75.8 萬 USDT），簽章有效、疑似金鑰外洩，轉進 Tornado Cash；FLIP 跌約 30–34%；暫停存提與兌換（The Block、CoinDesk、KuCoin）
const card=require('./lib-textcard.js');
POST({
  caption:'北韓駭客借道 Chainflip 洗錢，隔天 Chainflip 自己被偷。',
  theme:'ink',width:1600,height:900,
  title:'駭客借道洗錢的 Chainflip，隔天自己被偷',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['11/19–20',30],['幣安駭客搬走約 5.94 億 ETH',40],['部分經過 Chainflip',36],['',10],['11/21',30],['Chainflip 金庫被轉走 486 萬',48,true]],
    stats:[['被偷的','486 萬美元','ETH、USDC、USDT'],['怎麼被偷','簽章是有效的','疑似金鑰外洩'],['FLIP','跌約 30%','存提和兌換全暫停']]}),
});
