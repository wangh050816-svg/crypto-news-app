// BTC 近 120 天日價 vs Strategy 平均持有成本（橫式 16:9）
// 價格：CoinGecko market_chart（每日 00:00 UTC），存於 posts/btc-120d.json，最後一點為 11/11 抓取時的即時價
// Strategy：11/9 SEC 申報（The Block 報導），持有 850,364 BTC，平均成本 75,456 美元（含費用）
// 注意：平均成本是 11/8 當時的數字，過去幾個月的成本線並非固定值，圖上只畫目前這條作參考
const pts=require('./btc-120d.json');
const n=pts.length, last=pts[n-1][1];
const lab={};[0,30,60,90,n-1].forEach(i=>lab[i]=pts[i][0]);
POST({
  caption:'BTC 跌到 7.3 萬附近，Strategy 帳面已經跌破平均成本。',
  theme:'ink',
  width:1600,height:900,
  title:'BTC 價格 vs. Strategy 平均持有成本',
  x:{min:0,max:n-1,ticks:Object.keys(lab).map(Number),labels:lab},
  y:{min:60000,max:90000,ticks:[60000,70000,80000,90000],labels:{60000:'6 萬',70000:'7 萬',80000:'8 萬',90000:'9 萬'}},
  series:[
    {name:'cost',points:[[0,75456],[n-1,75456]],color:'light',width:3,dashed:true,label:{text:'Strategy 平均成本 $75,456',at:[2,76300]}},
    {name:'btc',points:pts.map((p,i)=>[i,p[1]]),width:4,label:{text:'BTC 每日價格',at:[3,87300]}},
  ],
  markers:[{x:n-1,dot:last,label:''}],
  notes:[
    {at:[n-3,70300],anchor:'end',lines:['目前 *$'+last.toLocaleString('en-US')+'*']},
    {at:[3,82800],lines:['Strategy 持有 *850,364* 顆 BTC']},
  ],
  footer:['@zqqnc','資料來源：CoinGecko、Strategy 11/9 SEC 申報'],
});
