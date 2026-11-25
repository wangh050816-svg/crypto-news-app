// 複利效應：每天 1% 的差距，一年後變成 37.8 vs 0.03
VIDEO({title:'複利效應',scenes:[

// 1. 刻度環：1% 只佔一小格
{dur:4.2,draw(lt){
  const cx=960,cy=420,R=230,n=100,lit=Math.round(ease.out(prog(lt,.6,1.6))*1);let s='';
  for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2-Math.PI/2,on=i<lit,len=i%10===0?26:16,show=prog(lt,i/n*.5,i/n*.5+.2);
    s+=`<line x1="${cx+Math.cos(a)*R}" y1="${cy+Math.sin(a)*R}" x2="${cx+Math.cos(a)*(R-len)}" y2="${cy+Math.sin(a)*(R-len)}" stroke="${on?C.y:C.dim}" stroke-width="${on?6:3}" stroke-linecap="round" opacity="${show}"/>`}
  const pulse=1+.25*Math.sin(lt*6)*prog(lt,1.4,1.8);
  s+=`<circle cx="${cx}" cy="${cy-R-24}" r="${7*pulse}" fill="${C.y}" opacity="${prog(lt,1.2,1.5)}"/>`;
  const sc=ease.back(prog(lt,.8,1.4));
  return svg(s)+txt(cx,cy-70,'每天進步',32,{c:C.dim,w:700,op:prog(lt,.6,1)})+txt(cx,cy+20,'1%',170,{c:C.y,sc,f:'"Noto Sans"'})
    +cap(lt,'每天進步 {y:1%}，看起來微不足道','1% better a day. Looks like nothing.',1.6);
}},

// 2. 小幣上樓梯，每一階 +1%
{dur:5.4,draw(lt){
  let s='';const steps=7,sx=470,sy=700,stw=150,sth=56;
  let d=`M${sx-120},${sy}`;for(let i=0;i<steps;i++) d+=` L${sx+i*stw},${sy-i*sth} L${sx+(i+1)*stw},${sy-i*sth}`;
  s+=`<path d="${d}" fill="none" stroke="${C.line}" stroke-width="4" stroke-linejoin="round" stroke-dasharray="2400" stroke-dashoffset="${2400*(1-ease.out(prog(lt,0,1.2)))}"/>`;
  const hopT=lt-1.5,k=clamp(Math.floor(hopT/.45),0,steps-1),hp=hopT<0?0:clamp((hopT-k*.45)/.45);
  const fx=sx+k*stw+75,fy=sy-k*sth-62,nx=sx+(k+1)*stw+75,ny=sy-(k+1)*sth-62;
  const done=hopT>=(steps-1)*.45,p=done?0:ease.inOut(hp);
  const x=k>=steps-1?fx:lerp(fx,nx,p),y=(k>=steps-1?fy:lerp(fy,ny,p))-Math.sin(p*Math.PI)*60;
  for(let i=1;i<=Math.min(k+(hp>.5?1:0),steps-1);i++){const tt=hopT-(i-.5)*.45;
    s+=`<text x="${sx+i*stw+75}" y="${sy-i*sth-150-tt*30}" fill="${C.y}" font-size="34" font-weight="700" text-anchor="middle" font-family="Noto Sans" opacity="${clamp(1-tt/1.2)}">+1%</text>`}
  s+=coin(lt<1.5?sx-40:x,lt<1.5?sy-62:y,.9,done?'happy':'smile',{blink:Math.abs(lt-1.1)<.08});
  return svg(s)+cap(lt,'這是小幣，它決定{y:每天多做一點點}','Meet Coin. It decided to do a little more each day.',.4);
}},

// 3. 365 個點，一天亮一顆：1.01^n
{dur:6.4,draw(lt){return grid(lt,true)}},

// 4. 反過來：0.99^n
{dur:6.4,draw(lt){return grid(lt,false)}},

// 5. 兩條曲線拉開
{dur:6.6,draw(lt){
  const ox=360,oy=720,gw=1080,gh=520,p=ease.inOut(prog(lt,.6,4.2)),N=Math.round(365*p);let s='';
  s+=`<path d="M${ox},${oy-gh-20} L${ox},${oy} L${ox+gw+30},${oy}" fill="none" stroke="${C.dim}" stroke-width="3" opacity="${prog(lt,0,.5)}"/>`;
  const Y=v=>oy-v/38*gh,X=d=>ox+d/365*gw;
  let up=`M${X(0)},${Y(1)}`,dn=up;for(let d=1;d<=N;d++){up+=` L${X(d)},${Y(Math.pow(1.01,d))}`;dn+=` L${X(d)},${Y(Math.pow(.99,d))}`}
  s+=`<path d="${up}" fill="none" stroke="${C.y}" stroke-width="6" stroke-linecap="round"/><path d="${dn}" fill="none" stroke="${C.r}" stroke-width="6" stroke-linecap="round"/>`;
  s+=`<line x1="${X(0)}" y1="${Y(1)}" x2="${X(365)}" y2="${Y(1)}" stroke="${C.faint}" stroke-width="2" stroke-dasharray="6 8"/>`;
  s+=`<text x="${ox-20}" y="${Y(1)+8}" fill="${C.dim}" font-size="24" text-anchor="end" font-family="Noto Sans">1</text>`;
  const ex=X(N),uy=Y(Math.pow(1.01,N)),dy=Y(Math.pow(.99,N));
  s+=coin(ex,uy-60,.6,N>300?'happy':'smile',{shadow:0});
  const lo=prog(lt,4.2,4.7);
  s+=`<text x="${X(365)+30}" y="${Y(37.8)+14}" fill="${C.y}" font-size="48" font-weight="900" font-family="Noto Sans" opacity="${lo}">37.8</text>`;
  s+=`<text x="${X(365)+30}" y="${dy+14}" fill="${C.r}" font-size="48" font-weight="900" font-family="Noto Sans" opacity="${lo}">0.03</text>`;
  s+=`<text x="${X(365)}" y="${oy+44}" fill="${C.dim}" font-size="24" text-anchor="middle" font-family="Noto Sans" opacity="${prog(lt,0,.5)}">365 天</text>`;
  return svg(s)+cap(lt,'差距不是某一天拉開的，{y:而是每一天}','The gap isn\'t made in one day. It\'s made every day.',2.2);
}},

// 6. 片尾標題
{dur:5.2,draw(lt){
  const R=rand(7);let s='';
  for(let i=0;i<90;i++){const x=R()*W,y0=R()*H,sp=10+R()*30,r=1+R()*2.5,y=(y0-lt*sp+H)%H;
    s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${R()<.3?C.y:C.line}" opacity="${(.15+R()*.4)*prog(lt,0,1)}"/>`}
  const u=ease.out(prog(lt,.7,1.5));
  s+=`<line x1="${960-380*u}" y1="500" x2="${960+380*u}" y2="500" stroke="${C.y}" stroke-width="3"/>`;
  return svg(s)+txt(960,400,'複利效應',150,{ls:16,op:prog(lt,.1,.7),sc:lerp(1.08,1,ease.out(prog(lt,.1,1)))})
    +txt(960,550,'THE COMPOUND EFFECT',30,{c:C.dim,w:600,ls:14,f:'"Noto Sans"',op:prog(lt,.9,1.5)})
    +cap(lt,'同一件小事，重複做 {y:365} 次','The same small thing, done 365 times.',1.6,14,720);
}},
]});

// 365 點陣（場景 3、4 共用）
function grid(lt,good){
  const cols=25,gap=27,gx=330,gy=200,col=good?C.y:C.r,p=ease.inOut(prog(lt,.5,3.8)),N=Math.round(365*p);let s='';
  for(let i=0;i<365;i++){const x=gx+(i%cols)*gap,y=gy+Math.floor(i/cols)*gap,on=i<N,show=prog(lt,i/365*.4,i/365*.4+.1);
    if(on&&!good) s+=`<path d="M${x-6},${y-6} L${x+6},${y+6} M${x+6},${y-6} L${x-6},${y+6}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
    else s+=`<circle cx="${x}" cy="${y}" r="${on?6:4}" fill="${on?col:C.dim}" opacity="${on?1:show*.6}"/>`}
  const v=Math.pow(good?1.01:.99,N);
  if(N>0&&N<365){const i=N-1;s+=`<circle cx="${gx+(i%cols)*gap}" cy="${gy+Math.floor(i/cols)*gap}" r="13" fill="none" stroke="${C.line}" stroke-width="3"/>`}
  const rx=1370,fin=prog(lt,3.8,4.2);
  s+=coin(rx+170,640,.7,good?(N>200?'happy':'smile'):(N>150?'sad':'smile'),{shadow:.8});
  return svg(s)+txt(rx,250,`第 ${Math.max(N,1)} 天`,34,{c:C.dim,w:700,op:prog(lt,.3,.6)})
    +txt(rx,340,`${good?'1.01':'0.99'}<sup style="font-size:.45em">${Math.max(N,1)}</sup>`,64,{w:600,f:'"Noto Sans"',op:prog(lt,.3,.6)})
    +txt(rx,470,v.toFixed(2),good?(140+fin*20):(140+fin*20),{c:col,f:'"Noto Sans"'})
    +(good?cap(lt,'每天進步 1%，一年後是 {y:37.8} 倍','1% better every day → 37.8× in a year.',3.9)
          :cap(lt,'每天退步 1%，一年後只剩 {r:0.03}','1% worse every day → 0.03 left.',3.9));
}
