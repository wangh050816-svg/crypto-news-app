// AVAX 近 30 天每日價格（CoinGecko，每日 00:00 UTC，最後一點為 11/11 即時價）；NYSE 11/9 宣布以 Avalanche 技術作為代幣化股票平台的清算結算帳本（CoinDesk 11/9）
const pts=require('./avax-30d.json');
const n=pts.length,last=pts[n-1][1],lab={};[0,10,20,n-1].forEach(i=>lab[i]=pts[i][0]);
const i9=pts.findIndex(p=>p[0]==='11/09');
POST({
  caption:'紐約證交所要用區塊鏈來結算股票了。',
  theme:'ink',width:1600,height:900,
  title:'NYSE 選了 Avalanche，AVAX 隔天跳漲',
  x:{min:0,max:n-1,ticks:Object.keys(lab).map(Number),labels:lab},
  y:{min:6,max:12,ticks:[6,8,10,12],labels:{6:'$6',8:'$8',10:'$10',12:'$12'}},
  series:[{name:'avax',points:pts.map((p,i)=>[i,p[1]]),width:5,area:true,label:{text:'AVAX 每日價格',at:[1,11.4]}}],
  markers:[{x:i9,label:''}],
  notes:[
    {at:[i9-0.3,11.2],anchor:'end',lines:['11/09 NYSE 宣布']},
    {at:[i9-0.3,7.2],anchor:'end',lines:['目前 *$'+last.toFixed(2)+'*']},
  ],
  footer:['@zqqnc',''],
});
