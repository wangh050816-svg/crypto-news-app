// 幣安 63 億美元駭案錢包 11/17 沉寂兩週後移動約 34,279 ETH 至 3 個新地址，CoinDesk 估約 6,300 萬美元（CoinDesk；The Defiant/TokenPost 另報同日移動約 74,880 ETH，數字未統一，圖只用 CoinDesk 口徑）
// 司法部上週宣布扣押逾 12 億美元；FBI 歸因北韓 TraderTraitor；剩餘多為 BTC/ETH 無法由發行商凍結
const card=require('./lib-barcard.js');
POST({
  caption:'幣安駭案的錢包，又開始搬 ETH 了。',
  theme:'ink',width:1600,height:900,
  title:'幣安駭客沉寂兩週，又搬了 3.4 萬顆 ETH',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['被盜總額',63,'63 億',false],['司法部扣押',12,'逾 12 億',false],['這次搬走',0.63,'0.63 億',true]],
    range:[0,70],ticks:[0,10,20,30,40,50,60,70],fmt:v=>v+' 億',
    stats:[['這次移動','約 3.4 萬顆 ETH','轉進 3 個新地址'],['FBI 認定','北韓駭客','TraderTraitor 組織'],['麻煩在哪','BTC、ETH','沒有發行商能凍結']],
  }),
});
