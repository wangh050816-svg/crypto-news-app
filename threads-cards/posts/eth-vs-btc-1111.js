// ETH vs BTC 自 10/29 起的累積漲跌幅（中文、16:9）
// 價格：CoinGecko 每日 00:00 UTC，最後一點為 11/11 抓取時即時價；資料存於 posts/eth-btc-1111.json [日期, ETH%, BTC%]
const d=require('./eth-btc-1111.json');
const n=d.length, lab={};[0,3,6,9,n-1].forEach(i=>lab[i]=d[i][0]);
const i9=d.findIndex(r=>r[0]==='11/09');
POST({
  caption:'這兩天有個變化我覺得值得留意，ETH 開始跌得比 BTC 還兇。',
  theme:'ink',
  width:1600,height:900,
  title:'ETH 開始跌得比 BTC 兇',
  x:{min:0,max:n-1,ticks:Object.keys(lab).map(Number),labels:lab},
  y:{min:-15,max:5,ticks:[-15,-10,-5,0,5],labels:{'-15':'-15%','-10':'-10%','-5':'-5%',0:'0%',5:'+5%'}},
  series:[
    {name:'btc',points:d.map((r,i)=>[i,r[2]]),color:'light',width:3,dashed:true,label:{text:'BTC',at:[n-1.6,-8.2]}},
    {name:'eth',points:d.map((r,i)=>[i,r[1]]),width:5,label:{text:'ETH',at:[n-1.6,-14.2]}},
  ],
  between:['btc','eth'],
  markers:[{x:i9,label:''}],
  notes:[
    {at:[0.4,3.6],lines:['10/29 至今：ETH *'+d[n-1][1].toFixed(1)+'%*','BTC *'+d[n-1][2].toFixed(1)+'%*']},
    {at:[i9+0.15,-1.8],lines:['11/09 起反轉']},
  ],
  footer:['@zqqnc',''],
});
