// Coinkite 11/23 公布 Coldcard 18 頁事後報告：2021/3/29 韌體起硬體亂數設定為 0，種子改用可預測的產生器；2026/7/29–30 起被盜；Galaxy Research 估 1,778.84 BTC、逾 8,600 個地址；Coinkite 稱約 236–242 名客戶；7/31 已出修正韌體，但舊種子要換（KuCoin、Crypto Briefing、ETHNews、TFTC、SpendNode）
const card=require('./lib-textcard.js');
POST({
  caption:'冷錢包的漏洞藏了五年。',
  theme:'ink',width:1600,height:900,
  title:'冷錢包漏洞藏了 5 年，被偷 1,778 顆 BTC',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['2021/3：有問題的韌體上線',44,false],
    ['亂數沒用硬體，私鑰變得能被算出來',32,false],
    ['2026/7 底：開始被盜',44,false],
    ['11/23：Coinkite 公布 18 頁報告',44,true],
    ['修正韌體救不了舊種子，要換新的',32,false],
  ],
  stats:[['被偷','1,778 BTC','Galaxy Research 估算'],['地址','8,600 個以上','一人可能有很多地址'],['受害客戶','約 240 名','Coinkite 統計']]}),
});
