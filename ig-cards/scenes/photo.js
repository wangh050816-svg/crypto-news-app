// 寫實風景場景：程式產生的漸層、霧氣、山脈與雲（不畫小人、不用描邊）
const phRand=seed=>()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
// 山稜線：中點位移法，回傳填滿到底部的 path
function phRidge(seed,base,amp,rough=.55,w=960,h=470){
  const r=phRand(seed),n=64;let pts=[base,base+(r()-.5)*amp];let a=amp;
  while(pts.length<n+1){const nx=[];for(let i=0;i<pts.length-1;i++){nx.push(pts[i],(pts[i]+pts[i+1])/2+(r()-.5)*a)}nx.push(pts[pts.length-1]);pts=nx;a*=rough}
  const step=w/(pts.length-1);
  return `M0,${h} `+pts.map((y,i)=>`L${(i*step).toFixed(1)},${y.toFixed(1)}`).join(' ')+` L${w},${h} Z`;
}
const phSky=(id,stops)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient><rect width="960" height="470" fill="url(#${id})"/>`;
const phGlow=(id,x,y,r,c,op=.8)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${op}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;
// 雲／霧：feTurbulence 雜訊，透過 alpha 控制濃淡
const phClouds=(id,c,op=.5,freq='0.006 0.02',seed=3,y=0,h=470)=>`<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="5" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  0 0 0 2.2 -1.1"/></filter><rect y="${y}" width="960" height="${h}" filter="url(#${id})" opacity="${op}"/>`;
const phGrain=id=>`<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .08 0"/></filter><rect width="960" height="470" filter="url(#${id})"/>`;
function phCity(seed,base,minH,maxH,fill,winLit,winDark,litOdds=.04,sky=0){
  const r=phRand(seed);let x=-10,s='';
  while(x<960){const w=40+r()*70,h=minH+r()*(maxH-minH),top=base-h;
    s+=`<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${h+500}" fill="${fill}"/>`;
    if(winLit){for(let wy=top+10;wy<base+60;wy+=14)for(let wx=x+6;wx<x+w-8;wx+=11){const lit=r()<litOdds;s+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7" fill="${lit?winLit:winDark}"/>`}}
    x+=w+2+r()*6}
  return s;
}
const phRain=(seed,n,c='#c9d6e8',op=.35)=>{const r=phRand(seed);let s='';for(let i=0;i<n;i++){const x=r()*1000,y=r()*470,l=14+r()*22;s+=`<path d="M${x.toFixed(1)},${y.toFixed(1)} l-${(l*.25).toFixed(1)},${l.toFixed(1)}" stroke="${c}" stroke-width="1.4" opacity="${op}"/>`}return s};
const phTurbine=(x,y,h,c,rot=0)=>`<path d="M${x-3},${y} L${x-1.5},${y-h} L${x+1.5},${y-h} L${x+3},${y} Z" fill="${c}"/><g transform="rotate(${rot} ${x} ${y-h})">${[0,120,240].map(a=>`<path d="M${x},${y-h} l-2,0 l1,-${h*.55} l2,0 Z" fill="${c}" transform="rotate(${a} ${x} ${y-h})"/>`).join('')}</g><circle cx="${x}" cy="${y-h}" r="2.5" fill="${c}"/>`;

// 拿時間換錢：雨夜城市，只剩一扇窗亮著
S.phLevTop=()=>clip('ph1',`
${phSky('ph1s',[[0,'#0b1020'],[.6,'#1a2438'],[1,'#2a3348']])}
${phClouds('ph1c',[.35,.4,.5],.55,'0.004 0.012',11,0,260)}
${phGlow('ph1g',480,300,420,'#ff9a4a',.08)}
${phCity(5,330,40,140,'#1a2232')}
<rect y="300" width="960" height="40" fill="#2a3348" opacity=".45"/>
${phCity(9,380,90,260,'#0e1420','#ffd98a','#1b2333',.015)}
<rect x="452" y="210" width="5" height="7" fill="#ffe6a8"/>${phGlow('ph1w',454,214,40,'#ffd98a',.5)}
<rect y="380" width="960" height="90" fill="#0b0f18"/>
<g opacity=".25" transform="translate(0,760) scale(1,-1)">${phCity(9,380,90,260,'#0e1420','#ffd98a','#1b2333',.015)}</g>
<rect y="380" width="960" height="90" fill="#0b0f18" opacity=".55"/>
${phRain(4,260)}
${phGrain('ph1n')}
`);
// 打造槓桿：清晨山谷，遠方風車在轉
S.phLevBot=()=>clip('ph2',`
${phSky('ph2s',[[0,'#7fb0d8'],[.45,'#f7c98f'],[.7,'#ffdcaa'],[1,'#fbe8c8']])}
${phGlow('ph2g',700,170,320,'#fff2c4',.9)}<circle cx="700" cy="170" r="30" fill="#fff8e0"/>
${phClouds('ph2c',[1,.93,.85],.6,'0.003 0.015',21,0,220)}
<path d="${phRidge(3,250,140)}" fill="#c9b3c4" opacity=".75"/>
<path d="${phRidge(8,290,110)}" fill="#a796ac" opacity=".85"/>
${phClouds('ph2m',[1,.95,.9],.35,'0.002 0.03',5,230,120)}
<path d="${phRidge(13,330,80)}" fill="#7e8a7a"/>
${phTurbine(560,318,70,'#6f7a6c',10)}${phTurbine(620,312,60,'#6f7a6c',50)}${phTurbine(500,322,52,'#6f7a6c',85)}
<path d="${phRidge(17,370,60,.5)}" fill="#5f7a4e"/>
<path d="${phRidge(22,420,40,.5)}" fill="#3f5a34"/>
${phGlow('ph2h',700,330,500,'#ffd9a0',.25)}
${phGrain('ph2n')}
`);

// ---- 納瓦爾寶典 寫實風景版（2–6）----
const phBlur=(id,sd)=>`<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
const phTree=(seed,x,y,s,c)=>{const r=phRand(seed);let o=`<path d="M${x-8*s},${y} Q${x-4*s},${y-60*s} ${x-3*s},${y-120*s} L${x+3*s},${y-120*s} Q${x+4*s},${y-60*s} ${x+8*s},${y} Z" fill="${c}"/>`;
  for(let i=0;i<46;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*70*s;o+=`<circle cx="${(x+Math.cos(a)*d*1.2).toFixed(1)}" cy="${(y-150*s+Math.sin(a)*d*.8).toFixed(1)}" r="${((14+r()*16)*s).toFixed(1)}" fill="${c}"/>`}return o};

// 2 欲望：霓虹夜市街 → 晨霧湖上的小船
S.phDesireTop=()=>clip('ph3',`
${phSky('ph3s',[[0,'#120a1e'],[1,'#2a1630']])}
${phBlur('ph3b',10)}${phBlur('ph3b2',3)}
${(()=>{const r=phRand(31),cols=['#ff3d7f','#3de1ff','#ffd23d','#a45cff','#ff7a3d','#3dff9a'];let s='',t='';for(let i=0;i<34;i++){const x=r()*940,y=40+r()*260,w=30+r()*110,h=20+r()*60,c=cols[i%6];s+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="4" fill="${c}" opacity=".55"/>`;t+=`<rect x="${(x+4).toFixed(0)}" y="${(y+4).toFixed(0)}" width="${(w-8).toFixed(0)}" height="${(h-8).toFixed(0)}" rx="3" fill="none" stroke="${c}" stroke-width="2.5" opacity=".9"/>`}return `<g filter="url(#ph3b)">${s}</g><g filter="url(#ph3b2)">${t}</g>`})()}
<path d="M0,470 L0,330 L960,330 L960,470 Z" fill="#140c18"/>
<g opacity=".35" filter="url(#ph3b)" transform="translate(0,660) scale(1,-1)">${(()=>{const r=phRand(31),cols=['#ff3d7f','#3de1ff','#ffd23d','#a45cff','#ff7a3d','#3dff9a'];let s='';for(let i=0;i<34;i++){const x=r()*940,y=40+r()*260,w=30+r()*110,h=20+r()*60;s+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${cols[i%6]}"/>`}return s})()}</g>
${(()=>{const r=phRand(44);let s='';for(let i=0;i<70;i++){const x=r()*960,h=40+r()*50;s+=`<ellipse cx="${x.toFixed(0)}" cy="${(470-h/2+10).toFixed(0)}" rx="${(9+r()*6).toFixed(0)}" ry="${(h/2).toFixed(0)}" fill="#07040a"/><circle cx="${x.toFixed(0)}" cy="${(470-h).toFixed(0)}" r="${(8+r()*3).toFixed(0)}" fill="#07040a"/>`}return s})()}
${phGrain('ph3n')}
`);
S.phDesireBot=()=>clip('ph4',`
${phSky('ph4s',[[0,'#bcd3e6'],[.55,'#f3dcc6'],[.62,'#e9d6c8'],[1,'#c7d3dc']])}
${phGlow('ph4g',300,200,300,'#fff1d6',.8)}
<path d="${phRidge(41,250,70,.5)}" fill="#a9b7c4" opacity=".7"/>
<rect y="262" width="960" height="210" fill="url(#ph4s)" opacity=".9"/>
<rect y="262" width="960" height="210" fill="#d8e2ea" opacity=".55"/>
${phClouds('ph4m',[1,1,1],.55,'0.002 0.04',9,200,120)}
<path d="M520,330 q40,14 100,0 l-10,10 q-40,8 -80,0 Z" fill="#2f3a44"/><path d="M570,330 v-46" stroke="#2f3a44" stroke-width="2"/>
<path d="M530,342 q40,6 80,0" stroke="#2f3a44" stroke-width="2" opacity=".3" fill="none"/>
<path d="M480,348 q90,8 180,0 M440,362 q130,10 260,0" stroke="#fff" stroke-width="1.5" opacity=".5" fill="none"/>
${phGrain('ph4n')}
`);

// 3 學什麼：霧中岔路 → 開滿花的小徑
S.phPlayTop=()=>clip('ph5',`
${phSky('ph5s',[[0,'#8d98a3'],[1,'#b9c0c6']])}
${phTree(5,120,300,1.1,'#7c868f')}${phTree(6,860,290,1.2,'#7c868f')}
${phTree(7,300,260,.6,'#9aa3ab')}${phTree(8,690,255,.55,'#9aa3ab')}
<path d="M0,470 L0,300 L960,300 L960,470 Z" fill="#8f979e"/>
<path d="M380,470 L470,300 L490,300 L580,470 Z" fill="#a4aab0"/>
<path d="M470,330 L250,300 L270,300 L480,320 Z M490,330 L720,300 L740,300 L490,322 Z" fill="#a4aab0"/>
<rect x="476" y="220" width="6" height="110" fill="#5b636b"/><path d="M482,232 h44 l8,8 l-8,8 h-44 Z M476,256 h-44 l-8,8 l8,8 h44 Z" fill="#5b636b"/>
${phClouds('ph5f',[.85,.87,.9],.85,'0.003 0.01',4)}
${phGrain('ph5n')}
`);
S.phPlayBot=()=>clip('ph6',`
${phSky('ph6s',[[0,'#8fc2ea'],[.6,'#d9ecf5'],[1,'#f6f1d8']])}
${phClouds('ph6c',[1,1,1],.7,'0.004 0.012',13,0,200)}
<path d="${phRidge(51,250,60,.5)}" fill="#8fb48a" opacity=".7"/>
<path d="${phRidge(52,290,50,.5)}" fill="#6fa25e"/>
<path d="M440,290 Q470,330 380,380 Q300,430 340,470 L620,470 Q560,430 600,380 Q640,330 470,290 Z" fill="#d9c49a"/>
${(()=>{const r=phRand(61),cols=['#ff6f91','#ffd23d','#ffffff','#c77dff','#ff9f43'];let s='';for(let i=0;i<520;i++){const y=290+Math.pow(r(),.7)*180,x=r()*960,rr=1+(y-290)/40;const onPath=Math.abs(x-470+(y-290)*.4*Math.sin((y-290)/60))<(y-290)*.75+10;if(onPath&&r()<.85)continue;s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rr.toFixed(1)}" fill="${cols[i%5]}" opacity=".9"/>`}return s})()}
${phGlow('ph6g',600,40,360,'#fff6c8',.6)}
${phGrain('ph6n')}
`);

// 4 短期遊戲：一閃即逝的煙火 → 並排長大的兩棵老樹
S.phShortTop=()=>clip('ph7',`
${phSky('ph7s',[[0,'#05070f'],[1,'#1a1d2c']])}
${phClouds('ph7c',[.4,.4,.46],.45,'0.006 0.02',17,180,200)}
${phBlur('ph7b',5)}
${[[300,150,110,'#ffcf7a',1],[650,120,85,'#ff7aa8',.55]].map(([x,y,R,c,op])=>{const rays=[...Array(40)].map((_,i)=>{const a=i*9*Math.PI/180,d=R*(.8+((i*7)%5)/16);return `<path d="M${(x+Math.cos(a)*d*.3).toFixed(0)},${(y+Math.sin(a)*d*.3).toFixed(0)} Q${(x+Math.cos(a)*d).toFixed(0)},${(y+Math.sin(a)*d).toFixed(0)} ${(x+Math.cos(a)*d*1.02).toFixed(0)},${(y+Math.sin(a)*d+26).toFixed(0)}" stroke="${c}" stroke-width="2.5" fill="none" stroke-dasharray="2 5" stroke-linecap="round"/>`}).join('');return `<g opacity="${op}"><g filter="url(#ph7b)" opacity=".8">${rays}</g>${rays}${phGlow('ph7g'+x,x,y,R*.6,c,.35)}</g>`}).join('')}
<path d="M300,470 Q296,330 300,260" stroke="#ffcf7a" stroke-width="1.5" opacity=".25" fill="none"/>
${phCity(12,420,20,90,'#06080e','#ffd98a','#0c0f18',.02)}
<rect y="420" width="960" height="50" fill="#05070c"/>
${phGrain('ph7n')}
`);
S.phShortBot=()=>clip('ph8',`
${phSky('ph8s',[[0,'#f2b56b'],[.55,'#ffd9a0'],[1,'#ffe9c8']])}
${phGlow('ph8g',480,330,420,'#fff3c4',.9)}<circle cx="480" cy="330" r="36" fill="#fffbe8"/>
<path d="${phRidge(71,330,50,.5)}" fill="#c99a6a" opacity=".6"/>
<path d="M0,400 Q480,330 960,400 V470 H0 Z" fill="#5c4a2e"/>
${phTree(73,400,375,1.25,'#3a2e1e')}${phTree(74,570,370,1.15,'#3a2e1e')}
${phGrain('ph8n')}
`);

// 5 讀書：霓虹廣告牆 → 陽光灑進的書架角落
S.phReadTop=()=>clip('ph9',`
${phSky('ph9s',[[0,'#07080f'],[1,'#121526']])}
${phBlur('ph9b',5)}${phBlur('ph9b2',1.2)}
${(()=>{const r=phRand(91);let far='',near='';for(let i=0;i<150;i++){const z=r(),w=8+z*30,h=w*1.9,x=r()*980-10,y=60+r()*360-z*40,c=['#bfe6ff','#ffffff','#ffd6f0','#c9ffe6'][i%4];const ph=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="${(w*.18).toFixed(1)}" fill="${c}" opacity="${(.35+z*.6).toFixed(2)}"/>`+(r()<.5?`<circle cx="${(x+w).toFixed(0)}" cy="${y.toFixed(0)}" r="${(2+z*4).toFixed(1)}" fill="#ff3b4f"/>`:'');if(z<.6)far+=ph;else near+=ph}return `<g filter="url(#ph9b)">${far}</g><g filter="url(#ph9b2)">${near}</g>`})()}
${phGlow('ph9g',480,300,500,'#7fb8ff',.15)}
${phGrain('ph9n')}
`);
S.phReadBot=()=>clip('ph10',`
${phSky('ph10s',[[0,'#e9d3b4'],[1,'#c9a87e']])}
<rect x="80" y="60" width="240" height="260" fill="#fff6dc"/><path d="M200,60 V320 M80,190 H320" stroke="#b08a5e" stroke-width="10"/>
<path d="M80,320 L320,320 L620,470 L230,470 Z" fill="#fff3cf" opacity=".55"/>
<path d="M80,60 L320,60 L720,470 L-50,470 Z" fill="#fff6dc" opacity=".12"/>
<rect x="560" y="20" width="360" height="450" fill="#6a4a2e"/>
${(()=>{const r=phRand(101),cols=['#a83f3f','#2f5e8a','#d8b45a','#3f7a5a','#e8e0d0','#7a4a8a'];let s='';[40,150,260,370].forEach(sy=>{let x=575;while(x<900){const w=12+r()*16,h=60+r()*36;s+=`<rect x="${x.toFixed(0)}" y="${(sy+100-h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${cols[Math.floor(r()*6)]}"/>`;x+=w+1}s+=`<rect x="560" y="${sy+100}" width="360" height="10" fill="#4a321e"/>`});return s})()}
${(()=>{const r=phRand(103);let s='';for(let i=0;i<40;i++)s+=`<circle cx="${(150+r()*350).toFixed(0)}" cy="${(200+r()*250).toFixed(0)}" r="${(1+r()*1.6).toFixed(1)}" fill="#fff" opacity="${(.3+r()*.5).toFixed(2)}"/>`;return s})()}
<rect y="440" width="960" height="30" fill="#8a6440"/>
${phGrain('ph10n')}
`);

// 6 停下來：塞車的高架橋 → 夕陽海邊的長椅
S.phStillTop=()=>clip('ph11',`
${phSky('ph11s',[[0,'#0e1220'],[1,'#2a2030']])}
${phCity(15,260,40,180,'#141826','#ffd98a','#1a1f30',.03)}
${phBlur('ph11b',4)}
<path d="M0,300 L960,250 L960,290 L0,345 Z" fill="#1c1f2a"/><path d="M0,345 L960,290 L960,300 L0,357 Z" fill="#0e1018"/>
${[120,330,560,780].map(x=>`<rect x="${x}" y="${352-x*.058}" width="22" height="200" fill="#10121a"/>`).join('')}
<g filter="url(#ph11b)">${(()=>{const r=phRand(111);let s='';for(let i=0;i<60;i++){const x=r()*960,y=320-x*.052+(r()-.5)*14;s+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(5+r()*4).toFixed(0)}" ry="3" fill="${i%3?'#ff3b3b':'#ffcf8a'}"/>`}return s})()}</g>
${(()=>{const r=phRand(112);let s='';for(let i=0;i<60;i++){const x=r()*960,y=320-x*.052+(r()-.5)*14;s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2" fill="${i%3?'#ff8a8a':'#fff1d6'}"/>`}return s})()}
${phClouds('ph11c',[.3,.25,.3],.6,'0.004 0.02',23,330,140)}
${phGrain('ph11n')}
`);
S.phStillBot=()=>clip('ph12',`
${phSky('ph12s',[[0,'#5f6fa8'],[.35,'#e88a7a'],[.58,'#ffc27a'],[.6,'#e8906a'],[1,'#3b3550']])}
${phClouds('ph12c',[1,.7,.6],.55,'0.003 0.03',29,20,200)}
${phGlow('ph12g',480,276,300,'#ffe1a0',.9)}<path d="M444,276 a36,36 0 0 1 72,0 Z" fill="#fff4d6"/>
<rect y="276" width="960" height="194" fill="#5a4a6a" opacity=".55"/>
${(()=>{const r=phRand(121);let s='';for(let i=0;i<60;i++){const y=280+r()*180,w=10+r()*60*(1-(y-280)/260);s+=`<rect x="${(480-w/2+(r()-.5)*40*(y-270)/60).toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="2" fill="#ffe1a0" opacity="${(.4+r()*.5).toFixed(2)}"/>`}return s})()}
<path d="M0,420 Q300,400 560,430 L560,470 L0,470 Z" fill="#1e1a26"/>
<g fill="#151219"><rect x="150" y="370" width="200" height="10"/><rect x="150" y="345" width="200" height="8"/><rect x="160" y="380" width="8" height="40"/><rect x="332" y="380" width="8" height="40"/><rect x="160" y="340" width="6" height="40"/><rect x="334" y="340" width="6" height="40"/></g>
${phGrain('ph12n')}
`);
