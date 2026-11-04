// 悲觀主義者的6個真相：寫實風景場景（共用 photo.js / lost.js / tradepath.js 的工具）
const pmCabin=(x,y,s,wall,roof,win)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-60" y="-60" width="120" height="60" fill="${wall}"/><path d="M-72,-58 L0,-110 L72,-58 Z" fill="${roof}"/><rect x="30" y="-120" width="14" height="34" fill="${roof}"/><rect x="-42" y="-44" width="26" height="24" fill="${win}"/><rect x="16" y="-44" width="26" height="24" fill="${win}"/><rect x="-10" y="-36" width="20" height="36" fill="${roof}"/></g>`;
const pmCandle=(x,y,flameTilt,glowOp,id)=>`${phGlow(id,x,y-70,140,'#ffcf7a',glowOp)}<rect x="${x-16}" y="${y-60}" width="32" height="70" rx="4" fill="#f4ecdc"/><ellipse cx="${x}" cy="${y-60}" rx="16" ry="4" fill="#e6dccb"/><path d="M${x},${y-62} v-8" stroke="#3a2e24" stroke-width="2"/><g transform="rotate(${flameTilt} ${x} ${y-70})"><path d="M${x},${y-70} q-10,-14 0,-36 q10,22 0,36 Z" fill="#ffb84a"/><path d="M${x},${y-72} q-5,-8 0,-20 q5,12 0,20 Z" fill="#fff4c8"/></g><rect x="${x-34}" y="${y+10}" width="68" height="8" rx="4" fill="#8a6a4a"/>`;
const pmPath=(hy,fill)=>`<path d="M300,470 L460,${hy} L500,${hy} L660,470 Z" fill="${fill}"/>`;
const pmDoorWall=(wall,frame)=>`<rect width="960" height="470" fill="${wall}"/><rect x="340" y="40" width="280" height="430" fill="${frame}"/>`;

// 1 總是先想到最壞：暴風雨逼近曠野小屋 → 雨後黃昏小屋亮燈
S.pmWorstTop=()=>clip('pm1',`
${phSky('pm1s',[[0,'#0e121c'],[1,'#2a3040']])}
${phClouds('pm1c',[.2,.22,.28],.9,'0.005 0.012',1201,0,260)}
<g opacity=".35">${phRain(1202,140,'#9fb0c8',.5).replace(/<path d="M([\d.]+)/g,(m,x)=>`<path d="M${(+x*.45+520).toFixed(1)}`)}</g>
<path d="M0,470 L0,320 Q480,300 960,320 L960,470 Z" fill="#20262e"/>
${pmCabin(300,330,.9,'#14181f','#0c0f14','#1c2028')}
${phTree(1203,120,330,.6,'#0c0f14')}
${phGrain('pm1n')}
`);
S.pmWorstBot=()=>clip('pm2',`
${phSky('pm2s',[[0,'#5a6aa8'],[.45,'#e8a090'],[.7,'#ffd2a0'],[1,'#f4c898']])}
${phClouds('pm2c',[1,.8,.7],.45,'0.003 0.03',1204,40,170)}
<path d="M0,470 L0,320 Q480,300 960,320 L960,470 Z" fill="#6a7a4e"/>
${pmCabin(300,330,.9,'#8a6a4a','#5a3e2a','#ffd88a')}
${phGlow('pm2g',300,290,120,'#ffd88a',.6)}
${phTree(1203,120,330,.6,'#4a5a34')}
${[...Array(10)].map((_,i)=>`<ellipse cx="${(i*137)%900+30}" cy="${380+(i*23)%80}" rx="${30+(i*7)%30}" ry="4" fill="#fbe0b8" opacity=".35"/>`).join('')}
${phGrain('pm2n')}
`);

// 2 好事發生不敢開心：風中快熄的蠟燭 → 窗邊穩穩亮著的蠟燭
S.pmJoyTop=()=>clip('pm3',`
<rect width="960" height="470" fill="#0a0c12"/>
${pmCandle(480,360,-38,.25,'pm3g')}
${[...Array(9)].map((_,i)=>`<path d="M${80+i*40},${150+i*26} q140,-20 300,4" stroke="#8a9ab8" stroke-width="2" fill="none" opacity=".35"/>`).join('')}
<rect y="378" width="960" height="92" fill="#12141c"/>
${phGrain('pm3n')}
`);
S.pmJoyBot=()=>clip('pm4',`
<rect width="960" height="470" fill="#e8d4b4"/>
${ckWin(560,40,320,280,'#f6ecdc',`${phSky('pm4s',[[0,'#a8cce8'],[1,'#f2ead8']]).replace('<rect width="960" height="470"','<rect x="560" y="40" width="320" height="280"')}${phTree(1205,700,320,.9,'#7aa860')}`)}
<rect y="378" width="960" height="92" fill="#c8a47a"/>
${pmCandle(400,360,0,.7,'pm4g')}
${phGrain('pm4n')}
`);

// 3 反正不會成功：夜路上的深坑 → 白天坑旁鋪好的踏腳石
S.pmFallTop=()=>clip('pm5',`
${phSky('pm5s',[[0,'#080a12'],[1,'#1a1e2c']])}
<path d="${phRidge(1206,250,60,.5)}" fill="#10141c"/>
<rect y="270" width="960" height="200" fill="#141820"/>
${pmPath(270,'#262a32')}
<ellipse cx="480" cy="390" rx="110" ry="34" fill="#050608"/><path d="M370,390 Q480,420 590,390" stroke="#3a3e48" stroke-width="3" fill="none"/>
${phClouds('pm5f',[.2,.22,.28],.6,'0.004 0.02',1207,230,120)}
${phGrain('pm5n')}
`);
S.pmFallBot=()=>clip('pm6',`
${phSky('pm6s',[[0,'#8cc4ec'],[1,'#eaf2e6']])}
${phGlow('pm6g',700,90,260,'#fff8d8',.8)}
<path d="${phRidge(1206,250,60,.5)}" fill="#8aa87a"/>
<rect y="270" width="960" height="200" fill="#8fbf6a"/>
${pmPath(270,'#d8c49a')}
<ellipse cx="480" cy="390" rx="110" ry="34" fill="#8fc0dc"/><ellipse cx="460" cy="384" rx="60" ry="10" fill="#cfe8f6" opacity=".7"/>
${[[480,446,34],[478,414,30],[482,388,26],[480,366,22],[480,348,18]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y+3}" rx="${r}" ry="${r*.36}" fill="#9a9284"/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.36}" fill="#e6dfd2"/>`).join('')}
${phGrain('pm6n')}
`);

// 4 第一句就說不可能：緊閉的木門 → 門半開，陽光灑進來
S.pmDoorTop=()=>clip('pm7',`
${pmDoorWall('#14161c','#0c0d12')}
<rect x="360" y="60" width="240" height="410" fill="#2a2018"/>
${[0,1,2,3].map(i=>`<path d="M${360+i*60},60 V470" stroke="#1e1610" stroke-width="3"/>`).join('')}
<circle cx="570" cy="290" r="8" fill="#5a4a38"/>
<rect y="440" width="960" height="30" fill="#0e0f14"/>
${phGrain('pm7n')}
`);
S.pmDoorBot=()=>clip('pm8',`
${pmDoorWall('#e8dcc8','#c8b49a')}
<rect x="360" y="60" width="240" height="410" fill="#fff6dc"/>
${phSky('pm8s',[[0,'#9ccbec'],[1,'#eaf4e6']]).replace('<rect width="960" height="470"','<rect x="360" y="60" width="240" height="300"')}<rect x="360" y="300" width="240" height="170" fill="#9cc884"/>
<path d="M360,60 L470,90 L470,450 L360,470 Z" fill="#5a4030"/>
<path d="M360,470 L600,470 L900,470 L600,440 Z" fill="#fff4c8" opacity=".5"/>
<path d="M600,60 L960,300 L960,470 L600,470 Z" fill="#fff4c8" opacity=".2"/>
<rect y="440" width="960" height="30" fill="#c8a47a"/>
${phGrain('pm8n')}
`);

// 5 覺得自己太負面：暴風雨中的燈塔 → 清晨替船照路的燈塔
S.pmLightTop=()=>clip('pm9',`
${phSky('pm9s',[[0,'#080c16'],[1,'#1c2434']])}
${phClouds('pm9c',[.22,.25,.32],.85,'0.004 0.012',1208,0,240)}
<path d="M640,262 L700,226 L780,232 L860,212 L960,226 L960,300 L640,300 Z" fill="#0a0c12"/>
${tpLighthouse(790,224,120,'#3a4254','#ffe6a0')}${phGlow('pm9l',790,88,90,'#ffe6a0',.6)}
<path d="M790,88 L480,50 L480,130 Z" fill="#ffe6a0" opacity=".15"/>
${loWaves(1209,262,10,'#182030','#121826')}
${phRain(1210,260,'#aab8cc',.3)}
${phGrain('pm9n')}
`);
S.pmLightBot=()=>clip('pm10',`
${phSky('pm10s',[[0,'#8cb8e0'],[.6,'#ffd9b0'],[1,'#f6e2c8']])}
${phGlow('pm10g',300,240,300,'#fff2d0',.9)}<path d="M276,250 a24,24 0 0 1 48,0 Z" fill="#fffbe8"/>
<rect y="250" width="960" height="220" fill="#7aa4c4"/>
${[...Array(26)].map((_,i)=>`<path d="M${(i*131)%940},${262+i*7} h${20+(i*17)%50}" stroke="#e6f2fa" stroke-width="1.5" opacity=".55"/>`).join('')}
<path d="M640,252 L700,220 L800,214 L900,228 L960,224 L960,300 L640,300 Z" fill="#5a6070"/>
${tpLighthouse(800,218,110,'#f4f0e6','#ffe6a0')}${phGlow('pm10l',800,90,80,'#fff2b0',.6)}
${[[420,340,1],[540,380,1.3],[300,400,1.5]].map(([x,y,k])=>`<path d="M${x-30*k},${y} h${60*k} l${-8*k},${12*k} h${-44*k} Z" fill="#f4f0e6"/><path d="M${x},${y} V${y-50*k}" stroke="#5a4a3a" stroke-width="${2*k}"/><path d="M${x+2*k},${y-48*k} L${x+26*k},${y-6*k} L${x+2*k},${y-6*k} Z" fill="#fffaf0"/>`).join('')}
${phGrain('pm10n')}
`);

// 6 總覺得明天會更糟：濃雲壓著的夜晚小鎮 → 日出照亮小鎮
const pmTown=(roof,wall,lit,dark,odds)=>`<clipPath id="pmtk${roof.slice(1)}"><rect width="960" height="372"/></clipPath><g clip-path="url(#pmtk${roof.slice(1)})">${phCity(1211,370,30,110,wall,lit,dark,odds)}</g>`;
S.pmTomTop=()=>clip('pm11',`
${phSky('pm11s',[[0,'#06080e'],[1,'#161c2a']])}
${phClouds('pm11c',[.16,.18,.24],.95,'0.004 0.01',1212,0,280)}
${pmTown('#0a0c12','#0c0f18','#ffd98a','#121624',.04)}
<rect y="370" width="960" height="100" fill="#080a10"/>
${phGrain('pm11n')}
`);
S.pmTomBot=()=>clip('pm12',`
${phSky('pm12s',[[0,'#7aa8e0'],[.55,'#ffc890'],[.75,'#ffe0b0'],[1,'#f2d4b0']])}
${phGlow('pm12g',620,320,360,'#fff0c0',.95)}<path d="M586,330 a34,34 0 0 1 68,0 Z" fill="#fffbe8"/>
${phClouds('pm12c',[1,.88,.78],.45,'0.003 0.03',1213,40,170)}
${pmTown('#a88a7a','#c8a890','#fff4d8','#b89a86',.1)}
<rect y="370" width="960" height="100" fill="#a89070"/>
<path d="M0,370 L960,370 L960,470 L0,470 Z" fill="#fff0c8" opacity=".25"/>
${phGrain('pm12n')}
`);
