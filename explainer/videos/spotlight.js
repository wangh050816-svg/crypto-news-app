// 聚光燈效應（Gilovich, Medvec & Savitsky, 2000）：以為 46% 的人會注意到，實際約 23%
const CX=960,FLOOR=640;
const CROWD=[{y:420,s:.8,xs:[340,520,700,1220,1400,1580]},{y:560,s:.95,xs:[220,420,1500,1700]},{y:740,s:1.1,xs:[330,560,1360,1590]}]
  .flatMap(r=>r.xs.map(x=>({x,y:r.y,s:r.s})));
const lookAt=(p,tx,ty)=>[clamp((tx-p.x)/380,-1,1),clamp((ty-(p.y-74*p.s))/260,-1,1)];
function dust(seed,x,rx,lt,op){const R=rand(seed);let s='';
  for(let i=0;i<26;i++){const u=R(),yy=(R()*FLOOR+lt*(8+R()*14))%FLOOR,w=(yy+40)/(FLOOR+40)*rx;
    s+=`<circle cx="${x+(u-.5)*2*w*.9}" cy="${yy}" r="${1+R()*1.6}" fill="#fff" opacity="${(.15+R()*.35)*op}"/>`}
  return s}
function crowd(lt,o={}){return CROWD.map((p,i)=>pawn(p.x,p.y,p.s,{op:o.op??1,lit:o.lit?.(i)??0,look:o.look?o.look(p,i):[0,0]})).join('')}

VIDEO({title:'聚光燈效應',music:{style:'beat',chords:['Am','F','C','G'],bpm:100},scenes:[

// 1. 一束光打在小幣身上
{dur:4,capAt:1.2,caps:[{zh:'你是不是覺得，{y:大家都在看你}？',en:'Ever feel like everyone is watching you?'}],
 sfx(){return[[.25,'thud',.8]]},
 draw(lt){
  const on=lt<.25?0:.7+.3*prog(lt,.25,.6)*(1-.15*Math.sin(lt*30)*prog(lt,.25,.5)*(1-prog(lt,.5,.7)));
  return svg(spot('a',CX,FLOOR,230,on)+dust(1,CX,230,lt,on)+coin(CX,FLOOR-66,1.15,'sad',{blink:Math.abs(lt-2.4)<.08}));
}},

// 2. 想像中，全場都轉頭看你
{dur:5,caps:[
  {zh:'穿錯衣服、說錯一句話、出了一點糗',en:'A wrong outfit. A wrong word. A small slip.'},
  {zh:'你以為，{r:全場都注意到了}',en:'You think the whole room noticed.'}],
 sfx(cue){return CROWD.map((_,i)=>[cue(1)+.1+i*.06,'tick',.5])},
 draw(lt,d,cue){
  const R=rand(4),away=CROWD.map(()=>[(R()-.5)*1.6,(R()-.5)*.6]);
  let s=spot('b',CX,FLOOR,230,1)+dust(2,CX,230,lt,1);
  CROWD.forEach((p,i)=>{const pr=ease.out(prog(lt,cue(1)+.1+i*.06,cue(1)+.5+i*.06));
    if(pr>0){const hx=p.x,hy=p.y-74*p.s,tx=lerp(hx,CX,pr),ty=lerp(hy,FLOOR-70,pr);
      s+=`<line x1="${hx}" y1="${hy}" x2="${tx}" y2="${ty}" stroke="${C.r}" stroke-width="2" stroke-dasharray="4 8" opacity=".55"/>`}});
  s+=crowd(lt,{op:prog(lt,0,.8),look:(p,i)=>{const pr=ease.inOut(prog(lt,cue(1)+i*.06,cue(1)+.4+i*.06)),[ax,ay]=away[i],[bx,by]=lookAt(p,CX,FLOOR-70);return[lerp(ax,bx,pr),lerp(ay,by,pr)]}});
  return svg(s+coin(CX,FLOOR-66,1.15,lt>cue(1)+.6?'wow':'sad'));
}},

// 3. 康乃爾大學的 T 恤實驗
{dur:5,caps:[
  {zh:'康乃爾大學做過一個實驗',en:'Cornell psychologists put this to the test.'},
  {zh:'讓學生穿著一件{y:尷尬的 T 恤}走進教室',en:'A student walks into a room in an embarrassing T-shirt.'}],
 sfx(cue){return[[cue(0)+.6,'pop']]},
 draw(lt,d,cue){
  const b=ease.back(prog(lt,cue(0)+.6,cue(0)+1.2)),L=C.line;
  let s=`<g transform="translate(${CX},420) scale(${b})">
    <path d="M-70,-150 Q0,-118 70,-150 L190,-96 L150,-10 L104,-34 L104,170 L-104,170 L-104,-34 L-150,-10 L-190,-96Z" fill="${C.bg}" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-70,-150 Q0,-104 70,-150" fill="none" stroke="${L}" stroke-width="3"/>
    <circle cx="0" cy="40" r="62" fill="none" stroke="${C.y}" stroke-width="4"/>
    <ellipse cx="-22" cy="26" rx="7" ry="11" fill="${C.y}"/><ellipse cx="22" cy="26" rx="7" ry="11" fill="${C.y}"/>
    <path d="M-30,62 Q0,90 30,62" fill="none" stroke="${C.y}" stroke-width="4" stroke-linecap="round"/></g>`;
  const pr=ease.out(prog(lt,cue(0),cue(0)+.8));
  s+=`<line x1="${CX-260*pr}" y1="150" x2="${CX+260*pr}" y2="150" stroke="${C.faint}" stroke-width="2"/>`;
  return svg(s)+txt(CX,110,'CORNELL · 2000',26,{c:C.dim,w:600,ls:8,f:'"Noto Sans"',op:pr})
    +txt(CX,1040,'Gilovich, Medvec & Savitsky (2000)',20,{c:C.dim,w:400,f:'"Noto Sans"',op:prog(lt,cue(1),cue(1)+.5)});
}},

// 4. 以為 46%，實際 23%
{dur:6,caps:[
  {zh:'穿的人以為，{r:46%} 的人會注意到',en:'The wearer guessed 46% of people would notice.'},
  {zh:'實際上，只有 {y:23%}',en:'In reality: only 23%.'}],
 sfx(cue){return[[cue(0)+.2,'rise',.7],[cue(1)+.2,'rise',.5],[cue(1)+1,'ding',.8]]},
 draw(lt,d,cue){
  let s='',t='';
  [[46,440,C.r,cue(0),'以為會注意到'],[23,1210,C.y,cue(1),'實際注意到']].forEach(([v,gx,col,st,label])=>{
    const p=ease.inOut(prog(lt,st+.2,st+1.6)),lit=Math.round(v*p),on=prog(lt,0,.5);
    for(let i=0;i<100;i++){const x=gx+(i%10)*30,y=230+Math.floor(i/10)*30,l=i<lit;
      s+=`<circle cx="${x}" cy="${y}" r="${l?8:4}" fill="${l?col:C.faint}" opacity="${on}"/>`}
    t+=txt(gx+135,170,label,36,{c:col,w:700,op:on});
    t+=txt(gx+135,640,`${lit}%`,96,{c:p>0?col:C.faint,f:'"Noto Sans"',op:on,sc:1+.12*prog(lt,st+1.6,st+1.8)*(1-prog(lt,st+1.8,st+2.1))});
  });
  t+=txt(CX,430,'vs',34,{c:C.dim,w:600,f:'"Noto Sans"',op:prog(lt,0,.5)});
  return svg(s)+t;
}},

// 5. 每個人都在自己的聚光燈下
{dur:6,caps:[
  {zh:'因為每個人，都站在{y:自己的聚光燈}下',en:'Because everyone stands in their own spotlight.'},
  {zh:'忙著在意自己，沒空盯著你',en:'Too busy with themselves to keep watching you.'}],
 sfx(cue){return CROWD.map((_,i)=>[cue(0)+.3+i*.12,'pop',.25])},
 draw(lt,d,cue){
  let s='';const sOn=i=>prog(lt,cue(0)+.3+i*.12,cue(0)+.6+i*.12);
  CROWD.forEach((p,i)=>{if(sOn(i)>0)s+=spot('c'+i,p.x,p.y+4,62*p.s,sOn(i)*.55,-40,8)});
  s+=spot('m',CX,FLOOR,230,lerp(1,.45,prog(lt,cue(0),cue(0)+2)));
  s+=crowd(lt,{lit:sOn,look:(p,i)=>{const k=sOn(i);const[bx,by]=lookAt(p,CX,FLOOR-70);return[lerp(bx,0,k),lerp(by,.7,k)]}});
  return svg(s+coin(CX,FLOOR-66,1.15,lt>cue(1)?'smile':'wow',{blink:Math.abs(lt-cue(1)-.6)<.08}));
}},

// 6. 片尾
{dur:5.5,capY:720,capAt:1.4,caps:[{zh:'沒那麼多人在看你，{y:放心去做吧}',en:'Fewer eyes are on you than you think. Go for it.'}],
 sfx(){return[[.6,'ding',.6]]},
 draw(lt){
  const u=ease.out(prog(lt,.7,1.5));
  let s=spot('e',CX,640,520,.55*prog(lt,0,1),-40,60)+dust(9,CX,520,lt,.6*prog(lt,0,1));
  s+=`<line x1="${CX-380*u}" y1="500" x2="${CX+380*u}" y2="500" stroke="${C.y}" stroke-width="3"/>`;
  return svg(s)+txt(CX,400,'聚光燈效應',150,{ls:16,op:prog(lt,.1,.7),sc:lerp(1.08,1,ease.out(prog(lt,.1,1)))})
    +txt(CX,550,'THE SPOTLIGHT EFFECT',30,{c:C.dim,w:600,ls:14,f:'"Noto Sans"',op:prog(lt,.9,1.5)});
}},
]});
