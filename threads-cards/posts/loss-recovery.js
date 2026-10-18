// 回本需要的漲幅：虧損 L 之後，要漲 1/(1-L)-1 才能回到原點（純數學，不需外部資料）
const need=l=>(1/(1-l/100)-1)*100;
const curve=[];for(let l=0;l<=90;l+=1) curve.push([l,need(l)]);

POST({
  caption:`跌 50%，要漲 100% 才回本；
跌 90%，要漲 900% 才回本。`,
  theme:'navy',
  title:'Loss vs. gain needed to break even',
  x:{min:0,max:90,ticks:[0,10,20,30,40,50,60,70,80,90],labels:{0:'0%',50:'-50%',90:'-90%'},title:'portfolio drawdown'},
  y:{min:0,max:1000,ticks:[0,250,500,750,1000],labels:{0:'0%',500:'+500%',1000:'+1000%'},title:'gain\nneeded'},
  series:[
    {name:'feel',points:[[0,0],[90,90]],color:'light',width:3,dashed:true,label:{text:'What it feels like (same %)',at:[54,12,-3.3]}},
    {name:'math',points:curve,label:{text:'What the math says',at:[60,330,-58]}},
  ],
  between:['math','feel'],
  markers:[{x:50,dot:100},{x:90,dot:900}],
  notes:[
    {at:[8,780],lines:['Down *50%*? You need *+100%*.']},
    {at:[8,700],lines:['Down *90%*? You need *+900%*.']},
  ],
  footer:['@zqqnc','Math: gain = 1 / (1 − loss) − 1'],
});
