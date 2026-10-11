// 交易紀律：虧損的不對稱 → 1% 規則 → 停損
const loss=[10,20,30,50,70,90].map(l=>({l,r:100/(100-l)*100-100}));
// 停損場景的價格路徑（固定種子，每次產生都一樣）
const PATH=(()=>{const R=rand(11),v=[100];for(let i=1;i<80;i++)v.push(v[i-1]+(i<20?.25:-.62)+(R()-.5)*2.4);return v})();
const ENTRY=10,STOP=PATH[ENTRY]*.95,HIT=PATH.findIndex((v,i)=>i>ENTRY&&v<STOP);

VIDEO({title:'交易紀律',music:{chords:['Am','F','C','G'],bpm:72},scenes:[

// 1. 鉤子：虧 50% 要賺 100% 才回本
{dur:6,caps:[
  {zh:'虧損 {r:50%}，要賺多少才能回本？',en:'Lose 50%. How much do you need to get back?',say:'虧損百分之五十，要賺多少才能回本？'},
  {zh:'答案是 {y:100%}',en:'The answer: 100%.',say:'答案是，百分之一百。'}],
 sfx(cue){return[[cue(0)+1,'down'],[cue(0)+1.5,'thud',.7],[cue(1)+.2,'rise'],[cue(1)+.75,'ding']]},
 draw(lt,d,cue){
  const x0=460,w=1000,y=400,h=90,brk=prog(lt,cue(0)+1,cue(0)+2),grow=ease.out(prog(lt,cue(1)+.2,cue(1)+.9));let s='';
  s+=`<rect x="${x0}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${C.faint}" stroke-width="3" rx="6"/>`;
  s+=`<rect x="${x0}" y="${y}" width="${w/2}" height="${h}" fill="${C.line}" rx="6" opacity="${prog(lt,0,.4)}"/>`;
  const fy=ease.inOut(brk)*220,rot=brk*14;
  s+=`<g transform="translate(${x0+w/2},${y+fy}) rotate(${rot})" opacity="${1-brk}"><rect width="${w/2}" height="${h}" fill="${C.r}" rx="6"/></g>`;
  if(lt<cue(0)+1) s+=`<rect x="${x0+w/2}" y="${y}" width="${w/2}" height="${h}" fill="${C.line}" rx="6" opacity="${prog(lt,0,.4)}"/>`;
  if(grow>0) s+=`<rect x="${x0+w/2}" y="${y}" width="${w/2*grow}" height="${h}" fill="${C.y}" rx="6"/>`;
  const val=lt<cue(0)+1?100:grow>0?50+50*grow:lerp(100,50,ease.out(brk));
  const tag=grow>0?txt(x0+w*.75,y-70,'+100%',72,{c:C.y,f:'"Noto Sans"',sc:ease.back(prog(lt,cue(1)+.4,cue(1)+.9))}):'';
  const lossTag=brk>0&&grow===0?txt(x0+w*.75,y-70,'−50%',72,{c:C.r,f:'"Noto Sans"',op:prog(lt,cue(0)+1.2,cue(0)+1.6)}):'';
  return svg(s)+txt(x0,y-40,'本金',32,{c:C.dim,w:700,op:prog(lt,0,.4)}).replace('translate(-50%','translate(0%')
    +txt(x0+w/4,y-110,Math.round(val),120,{c:grow>0?C.y:brk>0?C.r:C.line,f:'"Noto Sans"'})+tag+lossTag;
}},

// 2. 虧損 vs 回本需要
{dur:6,caps:[
  {zh:'虧得越深，回本的路就越陡',en:'The deeper the loss, the steeper the climb back.'},
  {zh:'虧 {r:90%}，要賺 {y:900%} 才回得來',en:'Lose 90%, and you need +900% to recover.',say:'虧百分之九十，要賺百分之九百，才回得來。'}],
 sfx(cue){return loss.map((_,i)=>[cue(0)+.2+i*.35,'tick',.8]).concat([[cue(1)+.2,'pop']])},
 draw(lt,d,cue){
  const ax=900;let s='',t='';
  t+=txt(ax-200,120,'虧損',34,{c:C.r,w:700,op:prog(lt,0,.4)})+txt(ax+240,120,'回本需要',34,{c:C.y,w:700,op:prog(lt,0,.4)});
  s+=`<line x1="${ax}" y1="160" x2="${ax}" y2="${170+loss.length*95}" stroke="${C.faint}" stroke-width="2"/>`;
  loss.forEach(({l,r},i)=>{
    const y=200+i*95,p=ease.out(prog(lt,cue(0)+.2+i*.35,cue(0)+.8+i*.35)),last=i===loss.length-1,hl=last?prog(lt,cue(1),cue(1)+.4):0;
    const lw=l*4*p,rw=Math.sqrt(r/900)*680*p;
    s+=`<rect x="${ax-20-lw}" y="${y-22}" width="${lw}" height="44" rx="4" fill="${C.r}" opacity="${.55+.45*hl}"/>`;
    s+=`<rect x="${ax+20}" y="${y-22}" width="${rw}" height="44" rx="4" fill="${C.y}" opacity="${.55+.45*hl}"/>`;
    t+=txt(ax-40-lw-70,y,`−${l}%`,34,{c:C.r,f:'"Noto Sans"',op:p});
    t+=txt(ax+40+rw+80,y,`+${r<100?r.toFixed(1):Math.round(r)}%`,last?40+12*hl:34,{c:C.y,f:'"Noto Sans"',op:p});
  });
  return svg(s)+t;
}},

// 3. 小幣的規矩
{dur:5,caps:[
  {zh:'所以小幣給自己定了一條規矩',en:'So Coin set itself one rule.'},
  {zh:'每一筆交易，最多只賠 {y:1%}',en:'Never risk more than 1% on a single trade.',say:'每一筆交易，最多只賠百分之一。'}],
 sfx(cue){return[[cue(0)+.1,'pop'],[cue(1)+.1,'whoosh',.5],[cue(1)+.4,'ding']]},
 draw(lt,d,cue){
  const b=ease.back(prog(lt,cue(0),cue(0)+.6)),cp=ease.back(prog(lt,cue(1),cue(1)+.6));
  let s=coin(960,330,1.6*b,lt>cue(1)+.5?'happy':'smile',{blink:Math.abs(lt-cue(0)-1.3)<.08});
  s+=`<g transform="translate(960,600) scale(${cp})"><rect x="-380" y="-80" width="760" height="160" rx="24" fill="none" stroke="${C.y}" stroke-width="4"/></g>`;
  return svg(s)+txt(960,600,'單筆風險 ≤ 1%',72,{c:C.line,sc:cp});
}},

// 4. 連虧 10 次：1% vs 10%
{dur:7,caps:[
  {zh:'就算連續虧損 10 次',en:'Even after 10 losses in a row…',say:'就算連續虧損十次，'},
  {zh:'每次賠 {y:1%}，還剩 {y:90.4%}',en:'Risk 1% each time: 90.4% left.',say:'每次只賠百分之一，還剩百分之九十點四。'},
  {zh:'每次賠 {r:10%}，只剩 {r:34.9%}',en:'Risk 10% each time: only 34.9% left.',say:'每次賠百分之十，只剩百分之三十四點九。'}],
 sfx(cue){const T=this.caps[0].vdur+.4;return[...Array(10)].map((_,i)=>[cue(0)+(i+1)*T/10,'tick',.9]).concat([[cue(1)+.1,'ding',.7],[cue(2)+.1,'down',.8]])},
 draw(lt,d,cue){
  const T=this.caps[0].vdur+.4,k=clamp(Math.floor(prog(lt,cue(0),cue(0)+T)*10+1e-9),0,10);let s='',t='';
  [[1,440,C.y,cue(1)],[10,1210,C.r,cue(2)]].forEach(([risk,gx,col,hlT])=>{
    const v=100*Math.pow(1-risk/100,k),lit=Math.round(v),hl=prog(lt,hlT,hlT+.4);
    for(let i=0;i<100;i++){const x=gx+(i%10)*30,y=230+Math.floor(i/10)*30,on=i<lit;
      s+=`<circle cx="${x}" cy="${y}" r="${on?8:4}" fill="${on?col:C.faint}" opacity="${prog(lt,i/100*.5,i/100*.5+.15)}"/>`}
    t+=txt(gx+135,170,`每次賠 ${risk}%`,36,{c:col,w:700,op:prog(lt,.2,.6)});
    t+=txt(gx+135,640,`${v.toFixed(1)}%`,80+30*hl,{c:col,f:'"Noto Sans"',op:prog(lt,.2,.6)});
  });
  t+=txt(960,330,'連虧',30,{c:C.dim,w:700})+txt(960,400,k,96,{f:'"Noto Sans"'})+txt(960,470,'次',30,{c:C.dim,w:700});
  return svg(s)+t;
}},

// 5. 停損：跌破就出場
{dur:7,caps:[
  {zh:'價格跌破停損點，就出場',en:'Price breaks the stop. You exit.',say:'價格跌破停損點，就出場。'},
  {zh:'停損不是認輸，是{y:留在場上的門票}',en:'A stop-loss isn\'t giving up. It\'s your ticket to stay in the game.'}],
 sfx(cue){const T=Math.min(this.caps[0].vdur,2.6);return[[cue(0)+.3+T,'error'],[cue(1)+.2,'down',.6]]},
 draw(lt,d,cue){
  const x0=300,x1=1620,top=140,bot=700,lo=Math.min(...PATH)-4,hi=Math.max(...PATH)+4;
  const X=i=>x0+i/(PATH.length-1)*(x1-x0),Y=v=>bot-(v-lo)/(hi-lo)*(bot-top);
  const T=Math.min(this.caps[0].vdur,2.6),p1=prog(lt,cue(0)+.3,cue(0)+.3+T),n1=Math.round(p1*HIT),p2=ease.inOut(prog(lt,cue(1)+.1,cue(1)+1.8));
  let s=`<line x1="${x0}" y1="${Y(STOP)}" x2="${x1}" y2="${Y(STOP)}" stroke="${C.r}" stroke-width="3" stroke-dasharray="10 10" opacity="${prog(lt,0,.5)}"/>`;
  let d1=`M${X(0)},${Y(PATH[0])}`;for(let i=1;i<=n1;i++)d1+=` L${X(i)},${Y(PATH[i])}`;
  s+=`<path d="${d1}" fill="none" stroke="${C.line}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(n1>=ENTRY) s+=`<circle cx="${X(ENTRY)}" cy="${Y(PATH[ENTRY])}" r="10" fill="${C.y}"/>`;
  if(p2>0){const n2=HIT+Math.round(p2*(PATH.length-1-HIT));let d2=`M${X(HIT)},${Y(PATH[HIT])}`;for(let i=HIT+1;i<=n2;i++)d2+=` L${X(i)},${Y(PATH[i])}`;
    s+=`<path d="${d2}" fill="none" stroke="${C.dim}" stroke-width="4" stroke-dasharray="12 10" stroke-linecap="round"/>`}
  const hit=n1>=HIT,hp=ease.back(prog(lt,cue(0)+.3+T,cue(0)+.8+T));
  if(hit) s+=`<circle cx="${X(HIT)}" cy="${Y(PATH[HIT])}" r="${16*hp}" fill="none" stroke="${C.r}" stroke-width="4"/>`;
  if(hit) s+=coin(X(HIT)+10,Y(PATH[HIT])-130,.7*hp,'smile',{shadow:0});
  const endV=PATH.at(-1)/PATH[ENTRY]*100-100,stopV=PATH[HIT]/PATH[ENTRY]*100-100;
  let t=txt(x0+110,Y(STOP)+34,'停損線',28,{c:C.r,w:700,op:prog(lt,0,.5)})
    +(n1>=ENTRY?txt(X(ENTRY),Y(PATH[ENTRY])-44,'進場',28,{c:C.y,w:700}):'')
    +(hit?txt(X(HIT)+150,Y(PATH[HIT])+20,`出場 ${stopV.toFixed(0)}%`,34,{c:C.r,f:'"Noto Sans TC"',sc:hp}):'')
    +(p2>.95?txt(X(PATH.length-1)-30,Y(PATH.at(-1))+50,`沒停損 ${endV.toFixed(0)}%`,30,{c:C.dim,w:700,op:prog(lt,cue(1)+1.8,cue(1)+2.2)}):'');
  return svg(s)+t;
}},

// 6. 片尾
{dur:5.5,capY:720,caps:[{zh:'先活下來，{y:才有下一次}',en:'Survive first. Then there\'s a next time.'}],capAt:1.4,
 sfx(cue){return[[.6,'ding',.6]]},
 draw(lt){
  const R=rand(5);let s='';
  for(let i=0;i<90;i++){const x=R()*W,y0=R()*H,sp=10+R()*30,r=1+R()*2.5,y=(y0-lt*sp+H)%H;
    s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${R()<.3?C.y:C.line}" opacity="${(.15+R()*.4)*prog(lt,0,1)}"/>`}
  const u=ease.out(prog(lt,.7,1.5));
  s+=`<line x1="${960-380*u}" y1="500" x2="${960+380*u}" y2="500" stroke="${C.y}" stroke-width="3"/>`;
  return svg(s)+txt(960,400,'交易紀律',150,{ls:16,op:prog(lt,.1,.7),sc:lerp(1.08,1,ease.out(prog(lt,.1,1)))})
    +txt(960,550,'TRADING DISCIPLINE',30,{c:C.dim,w:600,ls:14,f:'"Noto Sans"',op:prog(lt,.9,1.5)})
    +txt(960,1030,'僅供教育分享，不構成投資建議',22,{c:C.dim,w:500,op:prog(lt,1,1.6)});
}},
]});
