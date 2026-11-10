// 美國 10 月 CPI（2026/11/10 21:30 台北公布）預熱圖：核心月增 0.2% 與 0.3% 連續 12 個月的累積差距
// 算法：累積漲幅 = (1+m)^k − 1，k=0..12；0.2%→2.43%，0.3%→3.66%
// 共識：核心月增約 0.22%（Bloomberg 調查），9 月核心 0.3%；Fed 通膨目標 2%（以 PCE 計，這裡只當參考線）
const cum=m=>Array.from({length:13},(_,k)=>[k,(Math.pow(1+m,k)-1)*100]);
POST({
  caption:`核心 CPI 月增只差 0.1，連續一年就差 1.2 個百分點；
今晚這一格小數點，決定 12 月升息的說法站不站得住。`,
  theme:'navy',
  title:'Core CPI: 0.2% vs. 0.3% a month',
  x:{min:0,max:12,ticks:[0,3,6,9,12],labels:{0:'0',3:'3',6:'6',9:'9',12:'12'},title:'months'},
  y:{min:0,max:4,ticks:[0,1,2,3,4],labels:{0:'0%',1:'1%',2:'2%',3:'3%',4:'4%'}},
  series:[
    {name:'target',points:[[0,2],[12,2]],color:'light',width:2,dashed:true,label:{text:'Fed target 2%',at:[0.3,2.12]}},
    {name:'low',points:cum(0.002),color:'light',width:3,dashed:true,label:{text:'0.2% a month → 2.4%',at:[7.2,1.15]}},
    {name:'high',points:cum(0.003),label:{text:'0.3% a month → 3.7%',at:[6.6,3.55]}},
  ],
  between:['high','low'],
  notes:[
    {at:[0.4,3.7],lines:['A *0.1* pt gap each month...','...becomes *1.2* pts in a year']},
  ],
  footer:['','Data: BLS; consensus via Bloomberg survey; (1+m)^12−1'],
});
