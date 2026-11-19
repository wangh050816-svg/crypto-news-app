// Hyperscale Data（GPUS）11/6 賣掉最後約 211.6 BTC、約 1,600 萬美元；7 月底起共賣約 1,113 BTC、約 7,400 萬；9 月底現金 1,700 萬、流動負債 2.31 億；11 月到 3 月完成密西根 AI 機房需約 7,480 萬；「重大疑慮」能否繼續經營；12 億美元是潛在營收機會（KuCoin、CryptoPotato、Blockchain Reporter、cryptonews.net）
const card=require('./lib-barcard.js');
POST({
  caption:'賣光比特幣轉做 AI，結果錢不夠。',
  theme:'ink',width:1600,height:900,
  title:'礦商賣光比特幣轉做 AI，現在錢不夠了',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['手上現金',0.17,'0.17 億',true],['完工還要',0.748,'0.75 億',false],['流動負債',2.31,'2.31 億',false]],
    range:[0,2.5],ticks:[0,0.5,1,1.5,2,2.5],fmt:v=>v+' 億',
    stats:[['最後一批 BTC','211 顆','11/6 賣掉，約 1,600 萬美元'],['公司自己說','重大疑慮','能不能繼續經營'],['12 億美元','潛在營收','這個 AI 案子的規模']],
  }),
});
