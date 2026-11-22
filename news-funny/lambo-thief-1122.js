// CBC、Yahoo/Men's Journal、Cybernews：加拿大人 Johnston（20 歲）假冒客服偷走加州受害者約 185 BTC（約 1,300 萬美元），買藍寶堅尼、BMW、珠寶；Signal 訊息炫耀「還沒完」；認罪洗錢，交出約 380 萬；判 25 個月，檢方求 51～63 個月
const card=require('./lib-barcard.js');
POST({
  caption:'偷 1,300 萬買藍寶堅尼，還在 Signal 炫耀。',
  theme:'ink',width:1600,height:900,
  title:'假客服偷 185 顆 BTC 買藍寶堅尼，只判 25 個月',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['檢方求刑上限',63,'63 個月',false],['檢方求刑下限',51,'51 個月',false],['實際判決',25,'25 個月',true]],
    range:[0,75],ticks:[0,20,40,60],fmt:v=>v+' 月',
    stats:[['偷走','185 顆 BTC','約 1,300 萬美元'],['手法','假冒客服','打電話騙受害者'],['花在','藍寶堅尼','BMW、珠寶']],
  }),
});
