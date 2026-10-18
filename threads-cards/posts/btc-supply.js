// 比特幣供給曲線：每 210,000 個區塊（約 4 年）減半，同一時期內獎勵固定，所以每段是直線
// 減半日期：2012-11、2016-07、2020-05、2024-04，之後每 4 年估一次；最後一顆約在 2140 年
const starts=[2009.0,2012.9,2016.5,2020.35,2024.3];
for(let i=5;i<33;i++) starts.push(2024.3+4*(i-4));
const pct=v=>v/21*100;
const pts=[[2009,0]];let s=0,r=50;
for(let i=1;i<starts.length;i++){s+=210000*r/1e6;r/=2;pts.push([starts[i],pct(s)])}
pts.push([2140,100]);
const now=2026.8, nowPct=pct(19.6875+(now-2024.3)/4*0.65625); // 約 95.6%

POST({
  caption:`比特幣有 95% 已經被挖出來了；
但時間才走了 14%，剩下不到 5% 要挖到 2140 年。`,
  theme:'wine',
  title:'Bitcoin supply vs. time',
  x:{min:2009,max:2140,ticks:[2009,2030,2050,2070,2090,2110,2140],labels:{2009:'2009',2070:'2070',2140:'2140'},title:'year'},
  y:{min:0,max:100,ticks:[0,25,50,75,100],labels:{0:'0%',50:'50%',100:'100%'},title:'BTC\nmined'},
  series:[
    {name:'even',points:[[2009,0],[2140,100]],color:'light',width:3,dashed:true,label:{text:'If mined evenly over time',at:[2088,55,-32.8]}},
    {name:'actual',points:pts,label:{text:'Actual supply (halvings)',at:[2032,89]}},
  ],
  between:['actual','even'],
  markers:[{x:now,dot:nowPct,label:'Today'}],
  notes:[
    {at:[2032,76],lines:['*95%* of all BTC is mined...']},
    {at:[2032,68],lines:['...in the first *14%* of its time']},
  ],
  footer:['@zqqnc','Data: Bitcoin protocol issuance schedule'],
});
