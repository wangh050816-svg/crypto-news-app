// 交易路上的體悟：寫實風景場景（共用 scenes/photo.js 的 ph* 工具）
const tpFurrows=(hy,c,n=16)=>[...Array(n)].map((_,i)=>{const x=-200+i*(1360/(n-1));return `<path d="M480,${hy} L${x.toFixed(0)},470" stroke="${c}" stroke-width="${2+i%2}" opacity=".7"/>`}).join('');
const tpSprouts=(seed,hy,n)=>{const r=phRand(seed);let s='';for(let i=0;i<n;i++){const row=Math.floor(r()*15),t=Math.pow(r(),.6),y=hy+t*(470-hy),x=480+(-680+row*(1360/14)-0)*t*1+(r()-.5)*6*t,k=.4+t*1.6;s+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(-6*k).toFixed(1)},${(-6*k).toFixed(1)} ${(-10*k).toFixed(1)},${(-4*k).toFixed(1)} q${(6*k).toFixed(1)},${(-4*k).toFixed(1)} ${(10*k).toFixed(1)},${(4*k).toFixed(1)} M${x.toFixed(0)},${y.toFixed(0)} q${(6*k).toFixed(1)},${(-8*k).toFixed(1)} ${(11*k).toFixed(1)},${(-6*k).toFixed(1)} q${(-5*k).toFixed(1)},${(-5*k).toFixed(1)} ${(-11*k).toFixed(1)},${(6*k).toFixed(1)}" fill="#7cc65a"/>`}return s};

// 1 想每筆都賺：寒冬荒田 → 冬後冒芽的田
S.tpSeasonTop=()=>clip('tp1',`
${phSky('tp1s',[[0,'#1a2234'],[1,'#4a5670']])}
${phClouds('tp1c',[.4,.45,.55],.6,'0.004 0.015',71,0,200)}
<path d="${phRidge(711,250,40,.5)}" fill="#2a3244"/>
<rect y="262" width="960" height="210" fill="#5a5048"/>
${tpFurrows(262,'#3a342e')}
${phClouds('tp1f',[.85,.88,.95],.35,'0.02 0.06',72,262,210)}
${phTree(713,140,262,.5,'#1a1e28').replace(/<circle[^>]*>/g,'')}${txBranch(714,140,200,40,-80,5,'#1a1e28',5)}${txBranch(715,820,215,34,-95,5,'#1a1e28',4)}
${phRain(716,120,'#e6eef8',.45).replace(/l-[\d.]+,([\d.]+)/g,(m,l)=>`l-1,${(l*.15).toFixed(1)}`)}
${phGrain('tp1n')}
`);
S.tpSeasonBot=()=>clip('tp2',`
${phSky('tp2s',[[0,'#8cc4ea'],[.7,'#f2ead2'],[1,'#f6e6c4']])}
${phGlow('tp2g',700,170,320,'#fff4d0',.8)}
${phClouds('tp2c',[1,1,1],.55,'0.004 0.015',73,0,180)}
<path d="${phRidge(711,250,40,.5)}" fill="#8fb27a"/>
<rect y="262" width="960" height="210" fill="#8a6a48"/>
${tpFurrows(262,'#6a4e34')}
${tpSprouts(717,262,420)}
${phGrain('tp2n')}
`);

// 2 手很癢：風浪大的夜湖 → 清晨平靜湖邊的釣竿
S.tpWaitTop=()=>clip('tp3',`
${phSky('tp3s',[[0,'#0c1220'],[1,'#222c40']])}
${phClouds('tp3c',[.25,.3,.38],.75,'0.005 0.015',74,0,230)}
<path d="${phRidge(721,240,50,.5)}" fill="#141a26"/>
${loWaves(722,250,10,'#1c2638','#141c2c')}
${(()=>{const r=phRand(723);let s='';for(let i=0;i<60;i++){const y=262+Math.pow(r(),.8)*200,x=r()*960,w=6+(y-250)/8;s+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(w/2).toFixed(0)},-4 ${w.toFixed(0)},0" stroke="#c8d4e6" stroke-width="1.6" fill="none" opacity=".5"/>`}return s})()}
${[...Array(8)].map((_,i)=>`<path d="M${(i*137)%900},${60+i*22} q60,-8 130,0" stroke="#8a9ab8" stroke-width="1.5" fill="none" opacity=".35"/>`).join('')}
${phGrain('tp3n')}
`);
S.tpWaitBot=()=>clip('tp4',`
${phSky('tp4s',[[0,'#b8d4ec'],[.55,'#f6dcc0'],[1,'#e8d8cc']])}
${phGlow('tp4g',640,230,300,'#fff2d0',.9)}<circle cx="640" cy="236" r="26" fill="#fff8e6"/>
<path d="${phRidge(731,235,50,.5)}" fill="#a8b4c4"/>
<rect y="250" width="960" height="220" fill="#d8dcde"/>
<g transform="translate(0,500) scale(1,-1)" opacity=".5"><rect y="0" width="960" height="250" fill="url(#tp4s)"/><path d="${phRidge(731,235,50,.5)}" fill="#a8b4c4"/></g>
${phClouds('tp4m',[1,1,1],.5,'0.002 0.04',75,220,80)}
<path d="M120,470 L330,300 L400,300 L330,470 Z" fill="#8a6a4a"/>
${[...Array(9)].map((_,i)=>{const t=i/8,y=300+t*170,x1=330-t*210,x2=400-t*70;return `<path d="M${x1.toFixed(0)},${y.toFixed(0)} L${x2.toFixed(0)},${y.toFixed(0)}" stroke="#6a4e34" stroke-width="${1+t*3}"/>`}).join('')}
<path d="M300,420 L520,190" stroke="#3a2e24" stroke-width="4" stroke-linecap="round"/><path d="M520,190 Q560,230 580,330" stroke="#3a2e24" stroke-width="1" fill="none" opacity=".7"/>
<circle cx="580" cy="330" r="4" fill="#ff6b5b"/><ellipse cx="580" cy="334" rx="16" ry="3" fill="none" stroke="#fff" stroke-width="1.2" opacity=".7"/>
${phGrain('tp4n')}
`);

// 3 別人賺更多：深夜高速公路車燈 → 晨光登山步道的路標
S.tpPlanTop=()=>clip('tp5',`
${phSky('tp5s',[[0,'#080a14'],[1,'#1a1e2e']])}
${phCity(741,260,30,130,'#121626','#ffd98a','#181c2c',.04)}
<path d="M0,470 L0,300 L960,250 L960,470 Z" fill="#14161e"/>
${phBlur('tp5b',2)}
<g filter="url(#tp5b)">${[...Array(14)].map((_,i)=>{const y0=330+i*9,c=i<7?'#ff4a4a':'#fff1d6';return `<path d="M-20,${y0+40} L980,${y0-30-i*2}" stroke="${c}" stroke-width="${1.5+(i%3)}" opacity="${.5+(i%4)*.12}"/>`}).join('')}</g>
${[...Array(14)].map((_,i)=>{const y0=330+i*9,c=i<7?'#ff8a8a':'#ffffff';return `<path d="M-20,${y0+40} L980,${y0-30-i*2}" stroke="${c}" stroke-width=".8" opacity=".8"/>`}).join('')}
${[100,320,560,800].map(x=>`<rect x="${x}" y="${190-x*.03}" width="6" height="${130}" fill="#0c0e16"/><path d="M${x+3},${190-x*.03} q20,-6 34,4" stroke="#0c0e16" stroke-width="5" fill="none"/>${phGlow('tp5l'+x,x+36,196-x*.03,40,'#ffcf8a',.4)}`).join('')}
${phGrain('tp5n')}
`);
S.tpPlanBot=()=>clip('tp6',`
${phSky('tp6s',[[0,'#8ec2ea'],[1,'#eaf2ee']])}
${phGlow('tp6g',220,110,280,'#fff6d6',.8)}
<path d="${phRidge(751,170,140)}" fill="#a8b8c8"/>
<path d="${phRidge(752,240,90)}" fill="#7c9a6a"/>
<path d="M0,470 L0,300 Q480,270 960,300 L960,470 Z" fill="#6a8a54"/>
${loRoad(270,'#c8b48a','#a8946a','#c8b48a')}
${[[0.15,1],[0.42,-1],[0.68,1]].map(([t,sg],i)=>{const y=470-(470-270)*(1-Math.pow(1-t,2.2)),cx=470+150*Math.sin(t*Math.PI*1.6)*(1-t)+20*t,w=150*Math.pow(1-t,1.6),k=Math.pow(1-t,1.3),x=cx+sg*(w+30*k);return `<rect x="${(x-3*k).toFixed(0)}" y="${(y-90*k).toFixed(0)}" width="${(6*k+1).toFixed(1)}" height="${(90*k).toFixed(0)}" fill="#6a4a2e"/><path d="M${x.toFixed(0)},${(y-86*k).toFixed(0)} h${(sg*-44*k).toFixed(0)} l${(sg*-10*k).toFixed(0)},${(10*k).toFixed(0)} l${(sg*10*k).toFixed(0)},${(10*k).toFixed(0)} h${(sg*44*k).toFixed(0)} Z" fill="#c8935f" stroke="#6a4a2e" stroke-width="${(2*k).toFixed(1)}"/>`}).join('')}
${phGrain('tp6n')}
`);

// 4 想證明自己對：浪打沙堡 → 調整風帆的帆船
S.tpWindTop=()=>clip('tp7',`
${phSky('tp7s',[[0,'#0a0e18'],[1,'#202838']])}
${phClouds('tp7c',[.22,.25,.32],.75,'0.004 0.012',76,0,220)}
<rect y="230" width="960" height="90" fill="#141c2a"/>
${loWaves(761,230,4,'#1a2232','#141c2a')}
<path d="M0,330 Q480,300 960,330 L960,470 L0,470 Z" fill="#3a3a40"/>
<g fill="#4e4a48"><rect x="400" y="330" width="200" height="66"/><rect x="530" y="290" width="40" height="50"/><rect x="465" y="262" width="50" height="78"/><path d="M530,290 l8,-10 l8,10 l8,-10 l8,10 l8,-10 Z M465,262 l10,-12 l10,12 l10,-12 l10,12 l10,-12 Z"/><path d="M400,330 L410,312 L424,322 L440,306 L452,330 Z"/></g>
<path d="M0,360 Q160,350 300,372 Q380,384 430,372 Q470,362 520,380 Q620,410 760,430 Q860,446 960,440 L960,470 L0,470 Z" fill="#26344a" opacity=".85"/>
<path d="M0,360 Q160,350 300,372 Q380,384 430,372 Q470,362 520,380 Q620,410 760,430 Q860,446 960,440" stroke="#dfe8f2" stroke-width="3" fill="none" opacity=".8"/>
${phBlur('tp7b',3)}<g filter="url(#tp7b)" opacity=".6"><ellipse cx="420" cy="372" rx="50" ry="10" fill="#e6eef8"/><ellipse cx="300" cy="368" rx="60" ry="8" fill="#e6eef8"/></g>
${[...Array(40)].map((_,i)=>`<circle cx="${380+((i*41)%110)}" cy="${330+((i*29)%46)}" r="${1+i%2}" fill="#e6eef8" opacity=".6"/>`).join('')}
${phGrain('tp7n')}
`);
S.tpWindBot=()=>clip('tp8',`
${phSky('tp8s',[[0,'#6fb2e6'],[1,'#d6ecf8']])}
${phClouds('tp8c',[1,1,1],.7,'0.004 0.015',77,0,220)}
${phGlow('tp8g',150,90,240,'#fff8dc',.8)}
<rect y="270" width="960" height="200" fill="#3f8cc4"/>
${(()=>{const r=phRand(771);let s='';for(let i=0;i<90;i++){const y=272+Math.pow(r(),.8)*198,x=r()*960,w=4+(y-270)/6;s+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(w/2).toFixed(0)},-3 ${w.toFixed(0)},0" stroke="#e6f4fc" stroke-width="1.5" fill="none" opacity=".6"/>`}return s})()}
<g transform="rotate(-6 520 330)">
<path d="M420,330 L640,330 L610,360 L450,360 Z" fill="#f4f0e6"/><path d="M450,360 L610,360" stroke="#c8b49a" stroke-width="3"/>
<path d="M525,330 V110" stroke="#5a4a3a" stroke-width="5"/>
<path d="M530,118 Q620,190 610,320 L530,320 Z" fill="#fffaf0"/><path d="M520,140 Q470,220 450,310 L520,310 Z" fill="#ffd9b0"/>
</g>
<path d="M410,368 q60,10 120,6 q60,-4 110,-14" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>
${[...Array(5)].map((_,i)=>`<path d="M${80+i*30},${150+i*24} q50,-10 110,0" stroke="#fff" stroke-width="2" fill="none" opacity=".55"/>`).join('')}
${phGrain('tp8n')}
`);

// 5 大跌恐慌：雷雨城市夜空 → 雨後清晨的霧與露水
S.tpPanicTop=()=>clip('tp9',`
${phSky('tp9s',[[0,'#0a0c16'],[1,'#1c2030']])}
${phClouds('tp9c',[.25,.27,.34],.85,'0.004 0.012',78,0,260)}
${phGlow('tp9g',620,120,260,'#cfd8ff',.35)}
${phBlur('tp9b',4)}<path id="tp9z" d="M640,0 L600,90 L630,100 L570,210 L610,220 L540,330" stroke="#e6ecff" stroke-width="10" fill="none" filter="url(#tp9b)" opacity=".8"/><path d="M640,0 L600,90 L630,100 L570,210 L610,220 L540,330" stroke="#fff" stroke-width="3" fill="none"/><path d="M600,90 L560,130 M570,210 L520,240" stroke="#fff" stroke-width="1.5" fill="none" opacity=".8"/>
${phCity(781,470,80,230,'#0c0e18','#ffd98a','#141824',.05)}
${phRain(782,300,'#b8c6dc',.35)}
${phGrain('tp9n')}
`);
S.tpPanicBot=()=>clip('tp10',`
${phSky('tp10s',[[0,'#c8dcec'],[.6,'#f4e8d4'],[1,'#eae6d8']])}
${phGlow('tp10g',300,200,340,'#fff4d6',.9)}
<path d="${phRidge(791,230,60,.5)}" fill="#b8c4c0" opacity=".7"/>
${phClouds('tp10m',[1,1,1],.7,'0.002 0.03',79,180,140)}
<path d="M0,470 L0,320 Q480,290 960,320 L960,470 Z" fill="#8fb27a"/>
${(()=>{const r=phRand(792);let s='';for(let i=0;i<200;i++){const x=r()*960,h=30+r()*90;s+=`<path d="M${x.toFixed(0)},470 q${((r()-.5)*20).toFixed(0)},-${(h/2).toFixed(0)} ${((r()-.5)*30).toFixed(0)},-${h.toFixed(0)}" stroke="#5f8a46" stroke-width="${(1.5+r()*2).toFixed(1)}" fill="none"/>`}
  for(let i=0;i<70;i++){const x=r()*960,y=380+r()*90;s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5+r()*2.5).toFixed(1)}" fill="#e8f6ff" opacity=".9"/><circle cx="${(x-1).toFixed(0)}" cy="${(y-1).toFixed(0)}" r="1" fill="#fff"/>`}return s})()}
${phGrain('tp10n')}
`);

// 6 這次不一樣：暗夜巨浪 → 夕陽沙灘一道道浪痕
S.tpCycleTop=()=>clip('tp11',`
${phSky('tp11s',[[0,'#080c16'],[1,'#1a2232']])}
${phClouds('tp11c',[.2,.23,.3],.8,'0.004 0.012',80,0,220)}
<rect y="300" width="960" height="170" fill="#0e1622"/>
<path d="M-20,470 L-20,320 Q200,300 380,180 Q520,90 660,120 Q760,150 740,230 Q700,200 650,210 Q600,240 640,300 Q700,380 980,360 L980,470 Z" fill="#16243a"/>
<path d="M380,180 Q520,90 660,120 Q760,150 740,230" stroke="#c8d6e8" stroke-width="5" fill="none" opacity=".75"/>
${phBlur('tp11b',5)}<path d="M640,120 Q760,140 745,230" stroke="#e6eef8" stroke-width="16" fill="none" filter="url(#tp11b)" opacity=".5"/>
${[...Array(50)].map((_,i)=>`<circle cx="${620+((i*37)%150)}" cy="${100+((i*23)%120)}" r="${1+i%2}" fill="#e6eef8" opacity=".6"/>`).join('')}
${loWaves(811,330,5,'#122032','#0e1828')}
${phGrain('tp11n')}
`);
S.tpCycleBot=()=>clip('tp12',`
${phSky('tp12s',[[0,'#7a7ab8'],[.4,'#f2a088'],[.6,'#ffd29a'],[.62,'#e89a7a'],[1,'#7a6a88']])}
${phClouds('tp12c',[1,.78,.66],.5,'0.003 0.03',81,30,170)}
${phGlow('tp12g',480,250,300,'#ffe6a8',.9)}<path d="M446,250 a34,34 0 0 1 68,0 Z" fill="#fff4d6"/>
<rect y="250" width="960" height="70" fill="#8a7a98"/>
${[...Array(20)].map((_,i)=>`<rect x="${470-((i*13)%30)}" y="${254+i*3}" width="${30-i}" height="2" fill="#ffe6b0" opacity=".6"/>`).join('')}
<path d="M0,320 Q480,300 960,320 L960,470 L0,470 Z" fill="#e2c49a"/>
${[0,1,2,3,4].map(i=>{const y=330+i*i*6+i*14;return `<path d="M0,${y} Q160,${y+10} 320,${y-2} T640,${y+4} T960,${y-2}" stroke="#c8a87a" stroke-width="${2+i*.6}" fill="none" opacity=".8"/><path d="M0,${y+3} Q160,${y+13} 320,${y+1} T640,${y+7} T960,${y+1}" stroke="#fff4e0" stroke-width="1.2" fill="none" opacity=".6"/>`}).join('')}
<path d="M0,322 Q480,306 960,322 L960,334 Q480,318 0,334 Z" fill="#f4ece0" opacity=".7"/>
${phGrain('tp12n')}
`);
