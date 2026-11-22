// Decrypt 11/21、PC Gamer、KuCoin：Cyberleek 釋出 209 GB Xbox 版本，扣住主程式；CYBERLEEK 市值到 1,500 萬美元就提早放，否則 11/23 放；10 月目標 3,000 萬；週末市值約 110～130 萬
const card=require('./lib-barcard.js');
POST({
  caption:'GTA 6 洩漏者：幣漲到 1,500 萬美元就放 PC 版。',
  theme:'ink',width:1600,height:900,
  title:'GTA 6 洩漏者：代幣衝到 1,500 萬就提早放檔案',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['10 月開價',3000,'3,000 萬',false],['現在開價',1500,'1,500 萬',false],['實際市值',130,'約 130 萬',true]],
    range:[0,3500],ticks:[0,1000,2000,3000],fmt:v=>v+' 萬',
    stats:[['已經放出','209 GB','Xbox 版遊戲檔'],['扣住不放','主程式','改成 PC 版的關鍵'],['最後期限','11/23','不管有沒有漲都放']],
  }),
});
