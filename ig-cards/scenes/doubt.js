// 自我懷疑時的6個真相：寫實風景場景（共用 photo.js / lost.js / toxic.js / check.js 的工具）
const sdSapling=(x,y,c,lean,leaves)=>`<path d="M${x},${y} Q${x+lean*.4},${y-60} ${x+lean},${y-120}" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${x+lean*.5},${y-70} q${-20+lean*.3},-10 ${-30+lean*.4},-30 M${x+lean*.7},${y-95} q${20+lean*.3},-6 ${30+lean*.4},-26" stroke="${c}" stroke-width="3" fill="none"/>${leaves}`;
const sdSteps=(hy,stone,edge)=>[...Array(9)].map((_,i)=>{const t=i/8,y=470-t*(470-hy),hw=200-t*150,h=26-t*18;return `<path d="M${480-hw},${y} L${480+hw},${y} L${480+hw*.96},${y-h} L${480-hw*.96},${y-h} Z" fill="${stone}"/><path d="M${480-hw*.96},${y-h} L${480+hw*.96},${y-h}" stroke="${edge}" stroke-width="${2-t}"/>`}).join('');

// 1 覺得自己很失敗：滿城燈火 → 窗台上的植物和一杯茶
S.sdFailTop=()=>clip('sd1',`
${phSky('sd1s',[[0,'#070912'],[1,'#1a1e30']])}
${phGlow('sd1g',480,380,520,'#ffcf8a',.12)}
${phCity(1101,330,60,220,'#121626','#ffe0a0','#1a1e30',.45)}
${phCity(1102,400,30,120,'#0c0f1a','#fff0c8','#141826',.55)}
<rect y="400" width="960" height="70" fill="#080a12"/>
${phGrain('sd1n')}
`);
S.sdFailBot=()=>clip('sd2',`
<rect width="960" height="470" fill="#f4e4c8"/>
${ckWin(200,30,560,320,'#fbf4e6',`${phSky('sd2s',[[0,'#9ccbec'],[1,'#f2eedc']]).replace('<rect width="960" height="470"','<rect x="200" y="30" width="560" height="320"')}${phTree(1103,330,350,.9,'#7aa860')}${phTree(1104,640,350,1,'#6a9a50')}`)}
<path d="M200,350 L760,350 L900,470 L60,470 Z" fill="#fff4c8" opacity=".45"/>
<rect x="150" y="350" width="660" height="22" fill="#e8d4b4"/><rect x="150" y="372" width="660" height="98" fill="#d8c0a0"/>
<path d="M300,350 q-26,-60 6,-110 q30,50 6,110 Z M318,350 q30,-50 64,-60 q-12,46 -56,60 Z M296,350 q-40,-30 -54,-70 q40,10 50,64 Z" fill="#5f9a46"/><path d="M276,350 h56 l-8,44 h-40 Z" fill="#d87a4a"/>
${ckCup(560,318,'#ffffff',true)}
${phGlow('sd2g',480,150,360,'#fff6d0',.45)}
${phGrain('sd2n')}
`);

// 2 害怕開始新的事：夜裡的懸崖邊 → 天亮才發現只是緩坡
S.sdNewTop=()=>clip('sd3',`
${phSky('sd3s',[[0,'#05070e'],[1,'#141a2a']])}
${(()=>{const r=phRand(1105);let o='';for(let i=0;i<50;i++)o+=`<circle cx="${(r()*960).toFixed(0)}" cy="${(r()*200).toFixed(0)}" r="${(.6+r()*1.3).toFixed(1)}" fill="#fff" opacity="${(.3+r()*.6).toFixed(2)}"/>`;return o})()}
<rect y="260" width="960" height="210" fill="#06080e"/>
${phClouds('sd3f',[.15,.18,.25],.85,'0.004 0.02',1106,240,230)}
<path d="M0,470 L0,300 Q300,290 560,320 L600,330 L640,470 Z" fill="#10141c"/>
<path d="M560,320 L600,330 L620,380 L640,470" stroke="#2a3040" stroke-width="3" fill="none"/>
${phGrain('sd3n')}
`);
S.sdNewBot=()=>clip('sd4',`
${phSky('sd4s',[[0,'#8cc4ec'],[1,'#eef4e6']])}
${phClouds('sd4c',[1,1,1],.6,'0.004 0.015',1107,0,180)}
<path d="${phRidge(1108,230,50,.5)}" fill="#a8bcc8"/>
<path d="M0,470 L0,300 Q300,290 560,320 Q700,350 820,380 Q900,400 960,400 L960,470 Z" fill="#8fbf6a"/>
<path d="M0,300 Q300,290 560,320 Q700,350 820,380 Q900,400 960,400" stroke="#6a9a4a" stroke-width="3" fill="none"/>
<path d="M560,320 Q700,350 820,380 Q900,400 960,400 L960,470 L560,470 Z" fill="#a8d07a" opacity=".6"/>
${(()=>{const r=phRand(1109),cols=['#ffd23d','#ffffff','#ff8fa8'];let o='';for(let i=0;i<120;i++){const x=r()*960,y=330+r()*140;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5+(y-320)/50).toFixed(1)}" fill="${cols[i%3]}"/>`}return o})()}
${phGlow('sd4g',700,90,280,'#fff8d8',.7)}
${phGrain('sd4n')}
`);

// 3 一直拖延：濃霧中看不到頂的大山 → 晨光裡的前幾階石階
S.sdDelayTop=()=>clip('sd5',`
${phSky('sd5s',[[0,'#1a2030'],[1,'#3a4456']])}
<path d="M120,470 L380,60 L480,10 L580,60 L860,470 Z" fill="#1c2230"/>
<path d="${phRidge(1110,300,60,.5)}" fill="#141a26"/>
${phClouds('sd5f',[.55,.6,.68],.9,'0.003 0.012',1111,0,300)}
${phClouds('sd5g',[.45,.5,.58],.6,'0.004 0.02',1112,260,200)}
${phGrain('sd5n')}
`);
S.sdDelayBot=()=>clip('sd6',`
${phSky('sd6s',[[0,'#a8d0ee'],[.6,'#fbe8c8'],[1,'#f2e2c0']])}
${phGlow('sd6g',480,160,320,'#fff4d0',.9)}
<path d="M120,330 L380,120 L480,90 L580,120 L860,330 Z" fill="#b8c4b8" opacity=".7"/>
<path d="M0,470 L0,260 Q480,240 960,260 L960,470 Z" fill="#7aa862"/>
${phTree(1113,110,330,1,'#4f8a3a')}${phTree(1114,860,320,1.1,'#4f8a3a')}${phTree(1115,250,300,.6,'#5f9a46')}${phTree(1116,720,295,.55,'#5f9a46')}
${sdSteps(270,'#c8bca8','#f4ecdc')}
${phGrain('sd6n')}
`);

// 4 明明沒做什麼卻好累：翻滾的烏雲與海 → 黃昏平靜的湖
S.sdTiredTop=()=>clip('sd7',`
${phSky('sd7s',[[0,'#0a0d16'],[1,'#1e2434']])}
${phClouds('sd7a',[.3,.33,.4],.9,'0.006 0.014',1117,0,260)}
${phClouds('sd7b',[.18,.2,.26],.8,'0.01 0.02',1118,40,220)}
${loWaves(1119,260,10,'#162030','#101826')}
${phGrain('sd7n')}
`);
S.sdTiredBot=()=>clip('sd8',`
${phSky('sd8s',[[0,'#8a9ad0'],[.45,'#f2b8a0'],[.55,'#ffd8b0'],[1,'#d8c0c8']])}
${phGlow('sd8g',480,250,300,'#ffe6c0',.8)}
<path d="${phRidge(1120,240,50,.5)}" fill="#8a7a98"/>
<rect y="252" width="960" height="218" fill="#d8b8b8"/>
<g transform="translate(0,504) scale(1,-1)" opacity=".55"><rect width="960" height="252" fill="url(#sd8s)"/><path d="${phRidge(1120,240,50,.5)}" fill="#8a7a98"/></g>
${[...Array(10)].map((_,i)=>`<path d="M${(i*157)%880+40},${280+i*17} h${30+(i*23)%60}" stroke="#fff" stroke-width="1.2" opacity=".4"/>`).join('')}
${phGrain('sd8n')}
`);

// 5 被一句話難過一整天：雨夜水窪的漣漪 → 晨光下葉子上的露珠
S.sdHurtTop=()=>clip('sd9',`
<rect width="960" height="470" fill="#0a0c14"/>
<rect y="0" width="960" height="470" fill="#141820"/>
<ellipse cx="480" cy="300" rx="380" ry="110" fill="#06080e"/>
${phGlow('sd9g',620,250,120,'#ffcf8a',.35)}
${[1,2,3,4,5].map(i=>`<ellipse cx="480" cy="300" rx="${i*44}" ry="${i*13}" fill="none" stroke="#9fb0c8" stroke-width="${2.4-i*.35}" opacity="${.9-i*.15}"/>`).join('')}
<path d="M480,120 q-6,14 0,22 q6,-8 0,-22 Z" fill="#cfe0f6"/>
${phRain(1121,160,'#9fb0c8',.25)}
${phGrain('sd9n')}
`);
S.sdHurtBot=()=>clip('sd10',`
${phSky('sd10s',[[0,'#d8ecc8'],[1,'#f6ecd0']])}
${phBlur('sd10b',12)}<g filter="url(#sd10b)">${[...Array(12)].map((_,i)=>`<circle cx="${(i*173)%960}" cy="${(i*97)%470}" r="${30+(i*13)%40}" fill="${i%2?'#fff8d8':'#b8d89a'}" opacity=".6"/>`).join('')}</g>
<path d="M60,470 Q300,250 700,180 Q880,150 940,90 Q800,260 560,330 Q320,400 60,470 Z" fill="#5f9a46"/>
<path d="M60,470 Q400,300 940,90" stroke="#8fc46a" stroke-width="4" fill="none"/>
<ellipse cx="560" cy="250" rx="36" ry="30" fill="#e8f6ff" opacity=".85"/><ellipse cx="548" cy="238" rx="10" ry="7" fill="#fff"/>
${phGlow('sd10g',560,250,70,'#fffbe0',.5)}
${phGrain('sd10n')}
`);

// 6 總覺得不夠好：寒風中的瘦小樹苗 → 春天冒出新葉
const sdGround=(c)=>`<path d="M0,470 L0,380 Q480,360 960,380 L960,470 Z" fill="${c}"/>`;
S.sdHardTop=()=>clip('sd11',`
${phSky('sd11s',[[0,'#0e1424'],[1,'#2e3a52']])}
${phClouds('sd11c',[.35,.4,.5],.6,'0.004 0.02',1122,0,220)}
${sdGround('#202838')}
<g transform="translate(480,385) scale(1.9) translate(-480,-385)">${sdSapling(480,385,'#0c1018',34,'')}</g>
${[...Array(14)].map((_,i)=>`<path d="M${(i*131)%900},${80+i*22} q70,-6 150,4" stroke="#9fb6d0" stroke-width="1.5" fill="none" opacity=".4"/>`).join('')}
${phRain(1123,90,'#e6eef8',.4).replace(/l-[\d.]+,([\d.]+)/g,(m,l)=>`l-${(l*.8).toFixed(1)},${(l*.25).toFixed(1)}`)}
${phGrain('sd11n')}
`);
S.sdHardBot=()=>clip('sd12',`
${phSky('sd12s',[[0,'#8cc4ec'],[1,'#eef6ea']])}
${phGlow('sd12g',760,110,280,'#fff8d8',.9)}<circle cx="760" cy="110" r="30" fill="#fffbe8"/>
${phClouds('sd12c',[1,1,1],.55,'0.004 0.015',1124,0,180)}
${sdGround('#8fbf6a')}
<g transform="translate(480,385) scale(1.9) translate(-480,-385)">${sdSapling(480,385,'#6a4a2e',4,[[484,270],[452,296],[512,282],[470,318],[500,300],[488,250]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${i%2?'#7cc65a':'#9ad870'}" transform="rotate(${i*50-60} ${x} ${y})"/>`).join(''))}</g>
${(()=>{const r=phRand(1125);let o='';for(let i=0;i<80;i++){const x=r()*960,y=385+r()*85;o+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} l2,-10" stroke="#6a9a4a" stroke-width="2"/>`}return o})()}
${phGrain('sd12n')}
`);
