// 有毒關係類寫實風景場景（共用 scenes/photo.js 的 ph* 工具）
const txBranch=(seed,x,y,len,ang,depth,c,w)=>{if(depth===0||len<8)return '';const r=phRand(seed),a=ang*Math.PI/180,x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;
  return `<path d="M${x.toFixed(1)},${y.toFixed(1)} Q${((x+x2)/2+(r()-.5)*len*.2).toFixed(1)},${((y+y2)/2+(r()-.5)*len*.2).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" stroke="${c}" stroke-width="${w.toFixed(1)}" stroke-linecap="round" fill="none"/>`+
  txBranch(seed*7+1,x2,y2,len*.72,ang-22-r()*12,depth-1,c,w*.68)+txBranch(seed*13+5,x2,y2,len*.66,ang+18+r()*14,depth-1,c,w*.68)};
const txTips=(seed,x,y,len,ang,depth)=>{const out=[];const go=(sd,x,y,len,ang,d)=>{const r=phRand(sd),a=ang*Math.PI/180,x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;if(d===1||len<8){out.push([x2,y2]);return}go(sd*7+1,x2,y2,len*.72,ang-22-r()*12,d-1);go(sd*13+5,x2,y2,len*.66,ang+18+r()*14,d-1)};go(seed,x,y,len,ang,depth);return out};
const txTracks=(hy,rail,tie)=>`${[...Array(18)].map((_,i)=>{const t=Math.pow(i/17,2.2),y=hy+t*(470-hy),hw=10+t*300;return `<rect x="${480-hw}" y="${y}" width="${hw*2}" height="${1+t*9}" fill="${tie}"/>`}).join('')}<path d="M260,470 L474,${hy} M700,470 L486,${hy}" stroke="${rail}" stroke-width="4"/>`;
const txVase=(x,y,c)=>`<path d="M${x-22},${y} Q${x-34},${y+50} ${x-18},${y+80} H${x+18} Q${x+34},${y+50} ${x+22},${y} Z" fill="${c}"/>`;

// 1 你太敏感：混濁沼澤 → 清澈倒映的湖
S.txSenseTop=()=>clip('tx1',`
${phSky('tx1s',[[0,'#2a3028'],[1,'#3e463a']])}
${phTree(501,140,300,.9,'#1e231c')}${phTree(502,820,290,1,'#1e231c')}
<path d="M420,300 L428,180 M428,220 l-30,-30 M426,250 l26,-24" stroke="#1e231c" stroke-width="7" stroke-linecap="round"/>
<rect y="290" width="960" height="180" fill="#2f3528"/>
${phClouds('tx1w',[.22,.26,.18],.9,'0.01 0.08',51,290,180)}
${phClouds('tx1f',[.45,.5,.42],.6,'0.003 0.015',52,140,220)}
${phGrain('tx1n')}
`);
S.txSenseBot=()=>clip('tx2',`
${phSky('tx2s',[[0,'#7fb6e6'],[.6,'#d6ebf6'],[1,'#f3efe0']])}
${phClouds('tx2c',[1,1,1],.6,'0.004 0.015',53,0,160)}
<path d="${phRidge(511,170,130)}" fill="#8aa0b4"/>
<path d="${phRidge(512,230,70,.5)}" fill="#6f9468"/>
<rect y="260" width="960" height="210" fill="#a9cde6"/>
<g transform="translate(0,520) scale(1,-1)" opacity=".55"><rect width="960" height="260" fill="url(#tx2s)"/><path d="${phRidge(511,170,130)}" fill="#8aa0b4"/><path d="${phRidge(512,230,70,.5)}" fill="#6f9468"/></g>
<rect y="260" width="960" height="210" fill="#bfe0f2" opacity=".25"/>
${[...Array(14)].map((_,i)=>`<path d="M${(i*137)%900+20},${290+i*12} h${40+(i*29)%60}" stroke="#fff" stroke-width="1.5" opacity=".45"/>`).join('')}
<path d="M0,470 L0,430 Q200,410 380,440 L420,470 Z" fill="#5f7a4e"/>
${phGrain('tx2n')}
`);

// 2 等他改變：深夜空月台 → 清晨陽光照向遠方的鐵軌
S.txWaitTop=()=>clip('tx3',`
${phSky('tx3s',[[0,'#080b14'],[1,'#1a1f2e']])}
${phClouds('tx3c',[.16,.18,.24],.6,'0.004 0.015',54,0,220)}
${txTracks(250,'#5a6070','#2a2a30')}
<path d="M0,470 L0,250 L330,250 L130,470 Z" fill="#262a36"/><path d="M330,250 L130,470" stroke="#c9a23a" stroke-width="5" stroke-dasharray="20 14" opacity=".6"/>
<rect x="96" y="120" width="8" height="200" fill="#14161e"/><path d="M80,120 h40 l-6,14 h-28 Z" fill="#14161e"/>${phGlow('tx3l',100,138,110,'#ffe6a8',.35)}<circle cx="100" cy="138" r="5" fill="#fff1c8"/>
<path d="M150,300 h110 M150,310 h110 M160,310 v30 M250,310 v30 M150,290 h110" stroke="#0e1018" stroke-width="6"/>
<path d="M0,250 L960,250" stroke="#2a2f3e" stroke-width="2"/>
${phGrain('tx3n')}
`);
S.txWaitBot=()=>clip('tx4',`
${phSky('tx4s',[[0,'#8db8e2'],[.5,'#ffd8a8'],[.53,'#ffe8c0'],[1,'#d8c8a8']])}
${phGlow('tx4g',480,250,360,'#fff3c8',.95)}<path d="M450,250 a30,30 0 0 1 60,0 Z" fill="#fffbe8"/>
${phClouds('tx4c',[1,.9,.8],.5,'0.003 0.03',55,40,170)}
<path d="M0,470 L0,250 L960,250 L960,470 Z" fill="#a9b88a"/>
<path d="M150,470 L470,250 L490,250 L810,470 Z" fill="#b8a88a"/>
${txTracks(250,'#e8d8b8','#7a6448')}
${phGlow('tx4h',480,260,400,'#ffe6b0',.3)}
${phGrain('tx4n')}
`);

// 3 總是先道歉：雨夜窗邊的枯花 → 陽光窗台上的新鮮花束
S.txSorryTop=()=>clip('tx5',`
${phSky('tx5s',[[0,'#1a2030'],[1,'#252c3c']])}
<rect x="220" y="30" width="520" height="340" fill="#2a3a52"/>
${phClouds('tx5c',[.3,.35,.45],.7,'0.006 0.02',56,30,340)}
<g clip-path="url(#tx5w)"><clipPath id="tx5w"><rect x="220" y="30" width="520" height="340"/></clipPath>${phRain(57,180,'#c0d0e8',.35)}</g>
<path d="M480,30 V370 M220,200 H740" stroke="#141822" stroke-width="12"/><rect x="220" y="30" width="520" height="340" fill="none" stroke="#141822" stroke-width="16"/>
<rect y="370" width="960" height="100" fill="#14161e"/><rect x="190" y="362" width="580" height="16" fill="#20242e"/>
${txVase(480,282,'#3a4050')}
<path d="M470,284 Q450,220 400,236 M484,284 Q500,210 540,250 M478,284 Q480,220 460,200" stroke="#4a4436" stroke-width="3" fill="none"/>
<circle cx="400" cy="240" r="9" fill="#5a4a3e"/><circle cx="540" cy="254" r="8" fill="#5a4a3e"/><circle cx="458" cy="204" r="7" fill="#5a4a3e"/>
<path d="M420,360 l8,-4 l4,6 Z M540,362 l10,-2 l-2,6 Z" fill="#5a4a3e"/>
${phGrain('tx5n')}
`);
S.txSorryBot=()=>clip('tx6',`
${phSky('tx6s',[[0,'#f6e6cc'],[1,'#e8d2b0']])}
<rect x="220" y="30" width="520" height="340" fill="#a8d4f2"/>
<rect x="220" y="230" width="520" height="140" fill="#9cc884"/>${phClouds('tx6c',[1,1,1],.7,'0.006 0.02',58,30,180)}
<path d="M480,30 V370 M220,200 H740" stroke="#f4ead8" stroke-width="12"/><rect x="220" y="30" width="520" height="340" fill="none" stroke="#f4ead8" stroke-width="16"/>
<path d="M220,30 L740,30 L940,470 L60,470 Z" fill="#fff6d8" opacity=".25"/>
<rect y="370" width="960" height="100" fill="#d8b890"/><rect x="190" y="362" width="580" height="16" fill="#efe2cc"/>
${txVase(480,282,'#7fb3d8')}
<path d="M470,284 Q450,220 410,200 M484,284 Q500,210 548,206 M478,284 Q480,200 476,170 M474,284 Q430,240 400,250 M486,284 Q520,240 556,252" stroke="#5f8a46" stroke-width="3" fill="none"/>
${[[410,200,'#ff8fa8'],[548,206,'#ffd25a'],[476,170,'#ff8fa8'],[400,250,'#fff'],[556,252,'#ffb37a']].map(([x,y,c])=>[0,72,144,216,288].map(a=>`<ellipse cx="${x}" cy="${y-9}" rx="7" ry="11" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`).join('')+`<circle cx="${x}" cy="${y}" r="5" fill="#ffcf3d"/>`).join('')}
${phGrain('tx6n')}
`);

// 4 用愛改變他：浪拍礁石 → 河水繞過石頭往前流
S.txRockTop=()=>clip('tx7',`
${phSky('tx7s',[[0,'#0a0e18'],[1,'#1e2636']])}
${phClouds('tx7c',[.2,.23,.3],.8,'0.004 0.012',59,0,240)}
${loWaves(601,250,9,'#18202e','#121824')}
<path d="M560,470 L600,320 L650,280 L720,270 L790,300 L840,360 L880,470 Z" fill="#232836"/>
<path d="M650,280 L700,300 L720,270 M600,320 L660,340 L700,300" stroke="#343a4a" stroke-width="3" fill="none"/>
${phBlur('tx7b',6)}<g filter="url(#tx7b)" opacity=".45"><ellipse cx="590" cy="330" rx="50" ry="26" fill="#cfd8e6"/><ellipse cx="610" cy="290" rx="26" ry="34" fill="#cfd8e6"/></g>
${(()=>{const r=phRand(77);let o='';for(let i=0;i<90;i++){const a=-Math.PI*(.2+r()*.75),d=20+r()*90;o+=`<circle cx="${(605+Math.cos(a)*d).toFixed(0)}" cy="${(320+Math.sin(a)*d).toFixed(0)}" r="${(.8+r()*2).toFixed(1)}" fill="#e6eef8" opacity="${(.4+r()*.5).toFixed(2)}"/>`}return o})()}
<path d="M540,340 Q580,320 610,330 Q560,350 540,340 Z" fill="#e6eef8" opacity=".5"/>
${phGrain('tx7n')}
`);
S.txRockBot=()=>clip('tx8',`
${phSky('tx8s',[[0,'#9ccbea'],[1,'#e6f2f6']])}
${phClouds('tx8c',[1,1,1],.6,'0.004 0.015',60,0,150)}
<path d="${phRidge(611,160,60,.5)}" fill="#7ea474"/>
<path d="M0,470 L0,200 L960,200 L960,470 Z" fill="#7fae64"/>
<path d="M300,200 L380,200 Q520,300 720,470 L80,470 Q260,320 300,200 Z" fill="#7cc0dc"/>
<path d="M330,220 Q300,320 220,420 M360,230 Q420,330 560,440 M340,260 Q380,330 400,420" stroke="#e8f6fc" stroke-width="2" fill="none" opacity=".7"/>
<ellipse cx="380" cy="350" rx="70" ry="36" fill="#7a7a72"/><ellipse cx="370" cy="338" rx="58" ry="24" fill="#9a9a90"/>
<path d="M300,360 Q380,300 460,360" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
${[...Array(30)].map((_,i)=>`<circle cx="${180+((i*61)%380)}" cy="${240+((i*43)%220)}" r="${1+i%2}" fill="#fff" opacity=".8"/>`).join('')}
${phGrain('tx8n')}
`);

// 5 和朋友疏遠：黑海孤島 → 夕陽下連回小鎮的橋
const txIsland=(c,tree)=>`<path d="M380,300 Q480,250 580,300 Z" fill="${c}"/><path d="M478,290 v-50" stroke="${tree}" stroke-width="5"/><circle cx="478" cy="236" r="22" fill="${tree}"/>`;
S.txIsleTop=()=>clip('tx9',`
${phSky('tx9s',[[0,'#05070e'],[.64,'#121828'],[1,'#080a12']])}
${(()=>{const r=phRand(81);let o='';for(let i=0;i<50;i++)o+=`<circle cx="${(r()*960).toFixed(0)}" cy="${(r()*260).toFixed(0)}" r="${(.6+r()*1.4).toFixed(1)}" fill="#fff" opacity="${(.3+r()*.6).toFixed(2)}"/>`;return o})()}
<rect y="300" width="960" height="170" fill="#0a0e18"/>
${txIsland('#05070c','#05070c')}
${[...Array(16)].map((_,i)=>`<path d="M${(i*131)%900},${320+i*9} h${30+(i*17)%50}" stroke="#3a4660" stroke-width="1.5" opacity=".5"/>`).join('')}
${phGrain('tx9n')}
`);
S.txIsleBot=()=>clip('tx10',`
${phSky('tx10s',[[0,'#6a7ab8'],[.4,'#f0a08a'],[.64,'#ffd29a'],[.65,'#e89a7a'],[1,'#4a4a6a']])}
${phClouds('tx10c',[1,.75,.65],.5,'0.003 0.03',61,30,180)}
${phGlow('tx10g',300,300,260,'#ffe0a0',.8)}<path d="M270,300 a30,30 0 0 1 60,0 Z" fill="#fff4d0"/>
<rect y="300" width="960" height="170" fill="#7a6a88" opacity=".6"/>
${txIsland('#3a2e3a','#3a2e3a')}
<path d="M690,300 L960,280 L960,300 Z" fill="#3a2e3a"/>
<clipPath id="tx10k"><rect width="960" height="296"/></clipPath><g clip-path="url(#tx10k)">${phCity(62,290,10,40,'#3a2e3a','#ffd98a','#4a3a4a',.5).replace(/x="(-?[\d.]+)"/g,(m,x)=>`x="${(700+(+x)*.27).toFixed(1)}"`).replace(/width="([\d.]+)"/g,(m,w)=>`width="${(w*.27).toFixed(1)}"`)}</g>
<path d="M560,292 Q630,262 700,290" stroke="#2a2230" stroke-width="5" fill="none"/>${[575,600,625,650,675].map(x=>`<path d="M${x},${292-Math.sin((x-560)/140*Math.PI)*26} V${296}" stroke="#2a2230" stroke-width="2"/>`).join('')}
${[...Array(8)].map((_,i)=>phGlow('tx10b'+i,580+i*16,286-Math.sin(i/7*Math.PI)*22,8,'#ffd98a',.9)).join('')}
${[...Array(30)].map((_,i)=>`<rect x="${300-20+((i*37)%40)}" y="${304+i*5}" width="${30-i*.6}" height="2" fill="#ffe0a0" opacity=".6"/>`).join('')}
${phGrain('tx10n')}
`);

// 6 捨不得回憶：寒夜枯枝最後幾片葉 → 春天陽光下的新芽
S.txLetTop=()=>clip('tx11',`
${phSky('tx11s',[[0,'#0c1220'],[1,'#26304a']])}
${phGlow('tx11g',760,110,140,'#cfe0ff',.35)}<circle cx="760" cy="110" r="30" fill="#e6eefc"/>
${phClouds('tx11c',[.25,.3,.4],.6,'0.003 0.02',63,40,200)}
${txBranch(71,-20,120,200,10,6,'#0a0d16',16)}
${txTips(71,-20,120,200,10,6).filter((_,i)=>i%9===0).map(([x,y],i)=>`<path d="M${x.toFixed(0)},${y.toFixed(0)} q8,10 2,22 q-12,-6 -2,-22 Z" fill="#6a4a2e" transform="rotate(${i*40} ${x.toFixed(0)} ${y.toFixed(0)})"/>`).join('')}
<path d="M300,330 q12,8 8,20 q-14,-2 -8,-20 Z M520,400 q12,4 10,16 q-14,0 -10,-16 Z" fill="#4a3a2a"/>
${[...Array(10)].map((_,i)=>`<path d="M${(i*97)%960},${100+i*34} q40,-6 90,0" stroke="#8a9ab8" stroke-width="1.5" fill="none" opacity=".35"/>`).join('')}
${phGrain('tx11n')}
`);
S.txLetBot=()=>clip('tx12',`
${phSky('tx12s',[[0,'#8cc4ec'],[1,'#e6f4f8']])}
${phGlow('tx12g',780,90,260,'#fff8d8',.9)}<circle cx="780" cy="90" r="34" fill="#fffbe8"/>
${phClouds('tx12c',[1,1,1],.6,'0.004 0.015',64,100,200)}
${phBlur('tx12b',6)}<g filter="url(#tx12b)"><path d="M0,470 L0,380 Q480,350 960,380 L960,470 Z" fill="#a9d68f"/></g>
${txBranch(71,-20,120,200,10,6,'#5a4030',16)}
${txTips(71,-20,120,200,10,6).map(([x,y],i)=>i%3===0?[0,72,144,216,288].map(a=>`<ellipse cx="${x.toFixed(0)}" cy="${(y-6).toFixed(0)}" rx="5" ry="8" fill="#ffd6e2" transform="rotate(${a} ${x.toFixed(0)} ${y.toFixed(0)})"/>`).join('')+`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="3" fill="#ffcf5c"/>`:`<path d="M${x.toFixed(0)},${y.toFixed(0)} q10,-4 14,-14 q-12,0 -14,14 Z" fill="#8cd06a"/>`).join('')}
${phGrain('tx12n')}
`);
