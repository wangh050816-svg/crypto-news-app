// FOMO的6種下場：上格 FOMO 當下（亮、熱鬧），下格下場（暗、冷）；第 6 張翻轉，下格是清晨的下一班車
const fmLantern=(x,y,k,c)=>`<path d="M${x},${y-30*k} v${10*k}" stroke="#3a2a20" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="${16*k}" ry="${20*k}" fill="${c}"/><rect x="${x-8*k}" y="${y-22*k}" width="${16*k}" height="${4*k}" fill="#3a2a20"/><rect x="${x-8*k}" y="${y+18*k}" width="${16*k}" height="${4*k}" fill="#3a2a20"/>`;
const fmStall=(x,w,roof,lit)=>`<rect x="${x}" y="250" width="${w}" height="110" fill="#3a2a24"/><rect x="${x+8}" y="262" width="${w-16}" height="60" fill="${lit}"/><path d="M${x-10},252 L${x+w/2},214 L${x+w+10},252 Z" fill="${roof}"/><rect x="${x-4}" y="322" width="${w+8}" height="14" fill="#5a3e30"/>`;
const fmShutter=(x,w,c)=>`<rect x="${x}" y="230" width="${w}" height="130" fill="${c}"/>${[...Array(12)].map((_,i)=>`<path d="M${x},${240+i*10} h${w}" stroke="#000" stroke-opacity=".25" stroke-width="2"/>`).join('')}`;
const fmCabin=(x,y,body,win,tilt=0)=>`<g transform="rotate(${tilt} ${x} ${y})"><path d="M${x},${y} v30" stroke="#2a2a30" stroke-width="4"/><rect x="${x-44}" y="${y+30}" width="88" height="70" rx="12" fill="${body}"/><rect x="${x-34}" y="${y+40}" width="30" height="26" rx="4" fill="${win}"/><rect x="${x+4}" y="${y+40}" width="30" height="26" rx="4" fill="${win}"/></g>`;
const fmBoat=(x,y,hull,sink)=>`<path d="M${x-170},${y-40+sink} L${x+170},${y-40+sink} L${x+130},${y+20+sink} L${x-130},${y+20+sink} Z" fill="${hull}"/><rect x="${x-170}" y="${y-48+sink}" width="340" height="10" fill="#e8e2d4"/>`;
const fmCrates=(x,y,rows,c1,c2)=>{let s='';for(let r=0;r<rows;r++)for(let i=0;i<5-r;i++){const cx=x-120+r*30+i*60;s+=`<rect x="${cx}" y="${y-(r+1)*44}" width="56" height="42" fill="${(i+r)%2?c1:c2}" stroke="#000" stroke-opacity=".25" stroke-width="2"/>`}return s};
const fmBus=(x,y,body,win,lights)=>`<rect x="${x}" y="${y-110}" width="300" height="100" rx="14" fill="${body}"/>${[0,1,2,3,4].map(i=>`<rect x="${x+16+i*56}" y="${y-96}" width="44" height="38" rx="4" fill="${win}"/>`).join('')}<circle cx="${x+60}" cy="${y-10}" r="22" fill="#1a1a1e"/><circle cx="${x+240}" cy="${y-10}" r="22" fill="#1a1a1e"/>${lights}`;
const fmStop=(x,y,c)=>`<rect x="${x-3}" y="${y-150}" width="6" height="150" fill="${c}"/><rect x="${x-26}" y="${y-160}" width="52" height="36" rx="6" fill="${c}"/><rect x="${x+40}" y="${y-110}" width="120" height="8" fill="${c}"/><rect x="${x+40}" y="${y-110}" width="6" height="110" fill="${c}"/><rect x="${x+154}" y="${y-110}" width="6" height="110" fill="${c}"/><rect x="${x+50}" y="${y-40}" width="100" height="10" fill="${c}"/>`;

// 1 看到身邊的人都在賺 → 買在他們準備賣的位置：熱鬧夜市 → 散場拉下鐵門的空街
S.fmCrowdTop=()=>clip('fm1',`
${phSky('fm1s',[[0,'#1a1430'],[1,'#4a2a40']])}
${phCity(1601,250,40,120,'#241a2a','#ffd98a','#2e2234',.18)}
${phGlow('fm1g',480,290,420,'#ffb860',.45)}
${fmStall(60,180,'#d8443a','#ffe2a0')}${fmStall(290,180,'#e89a2a','#fff0c0')}${fmStall(520,180,'#d8443a','#ffe2a0')}${fmStall(750,180,'#3a8a5a','#fff0c0')}
<rect y="360" width="960" height="110" fill="#2a2024"/>
<path d="M0,190 Q480,230 960,190" stroke="#3a2a20" stroke-width="2" fill="none"/>
${[...Array(12)].map((_,i)=>{const x=40+i*80;return fmLantern(x,212+Math.sin(i/11*Math.PI)*20,1,i%2?'#ff5a3a':'#ffb03a')}).join('')}
${phGlow('fm1r',480,420,300,'#ffb860',.25)}
${phGrain('fm1n')}
`);
S.fmCrowdBot=()=>clip('fm2',`
${phSky('fm2s',[[0,'#05060c'],[1,'#141620']])}
${phCity(1601,250,40,120,'#0e0e14','#ffd98a','#141420',.01)}
${fmShutter(60,180,'#2a2c32')}${fmShutter(290,180,'#26282e')}${fmShutter(520,180,'#2a2c32')}${fmShutter(750,180,'#26282e')}
<rect y="360" width="960" height="110" fill="#101116"/>
<path d="M0,190 Q480,230 960,190" stroke="#222" stroke-width="2" fill="none"/>
${[...Array(12)].map((_,i)=>{const x=40+i*80;return fmLantern(x,212+Math.sin(i/11*Math.PI)*20,1,'#3a2a2a')}).join('')}
${[[200,420,-20],[420,440,30],[640,410,10],[780,450,-40]].map(([x,y,r])=>`<rect x="${x}" y="${y}" width="22" height="14" fill="#5a5a60" opacity=".6" transform="rotate(${r} ${x} ${y})"/>`).join('')}
${guLamp(880,370,190,'#2a3040','#ffd98a')}${phGlow('fm2l',920,186,110,'#ffd98a',.3)}
${phGrain('fm2n')}
`);

// 2 怕錯過大陽線 → 買在最高點一路套牢：陽光下衝上山頂的纜車 → 大霧中停在半空的纜車
S.fmPeakTop=()=>clip('fm3',`
${phSky('fm3s',[[0,'#3a9ae8'],[1,'#d8eef8']])}
${phGlow('fm3g',820,70,220,'#fffbe0',.9)}
<path d="${phRidge(1602,120,60,.5)}" fill="#7a9ab0"/>
<path d="M0,470 L0,330 L600,70 L700,90 L960,260 L960,470 Z" fill="#5a8a5a"/>
<path d="M560,88 L600,70 L640,82 L620,100 Z" fill="#f4f4f4"/>
<path d="M0,420 L620,60" stroke="#2a2a30" stroke-width="3"/>
${fmCabin(440,163,'#e84a3a','#cfeaff',0)}
${phClouds('fm3c',[1,1,1],.5,'0.004 0.015',1603,0,160)}
${phGrain('fm3n')}
`);
S.fmPeakBot=()=>clip('fm4',`
${phSky('fm4s',[[0,'#3a4250'],[1,'#1a1e26']])}
<path d="M0,470 L0,330 L600,70 L700,90 L960,260 L960,470 Z" fill="#20262c"/>
<path d="M0,420 L620,60" stroke="#111" stroke-width="3"/>
${fmCabin(330,227,'#7a3a34','#3a4450',4)}
${phClouds('fm4c',[.55,.58,.62],.9,'0.004 0.012',1604,0,470)}
${phClouds('fm4d',[.4,.42,.46],.6,'0.006 0.02',1605,240,230)}
${phGrain('fm4n')}
`);

// 3 沒做功課就跟單 → 跌了不知道該不該賣：黃昏跟著前車尾燈 → 霧中岔路、空白路牌
S.fmFollowTop=()=>clip('fm5',`
${phSky('fm5s',[[0,'#3a4a8a'],[.6,'#f0906a'],[1,'#ffd08a']])}
${phGlow('fm5g',480,260,260,'#ffd890',.7)}
<path d="${phRidge(1606,250,40,.5)}" fill="#4a3a5a"/>
<path d="M0,470 L0,270 L960,270 L960,470 Z" fill="#3a3040"/>
${loRoad(270,'#4a4450','#ddd','#ffd25a')}
<rect x="440" y="300" width="70" height="34" rx="6" fill="#1a1a22"/><circle cx="452" cy="322" r="6" fill="#ff3a3a"/><circle cx="498" cy="322" r="6" fill="#ff3a3a"/>${phGlow('fm5t',475,322,40,'#ff3a3a',.5)}
${phGrain('fm5n')}
`);
S.fmFollowBot=()=>clip('fm6',`
${phSky('fm6s',[[0,'#2a2e36'],[1,'#3a3e46']])}
<path d="M0,470 L0,280 L960,280 L960,470 Z" fill="#22262c"/>
<path d="M380,470 L470,330 L260,280 L290,280 L480,320 L670,280 L700,280 L490,330 L580,470 Z" fill="#30343c"/>
<rect x="476" y="190" width="8" height="150" fill="#4a4e56"/><path d="M380,190 h90 v34 h-90 l-16,-17 Z" fill="#5a5e66"/><path d="M490,190 h90 l16,17 l-16,17 h-90 Z" fill="#5a5e66"/>
${phClouds('fm6c',[.6,.62,.66],.85,'0.004 0.012',1607,0,470)}
${phGrain('fm6n')}
`);

// 4 想一次賺回來 → 越加越多越虧越大：晴天碼頭往船上堆貨 → 吃水過深、浪打進船裡
S.fmLoadTop=()=>clip('fm7',`
${phSky('fm7s',[[0,'#4aa8f0'],[1,'#dff2fa']])}
${phGlow('fm7g',160,70,220,'#fffbe0',.9)}
${phClouds('fm7c',[1,1,1],.6,'0.004 0.015',1608,0,180)}
<rect y="300" width="960" height="170" fill="#3a8ac8"/>
${loWaves(1609,320,4,'#4a9ad8','#5aaae0')}
${fmBoat(480,330,'#2a5a8a',0)}${fmCrates(480,282,2,'#c89a5a','#a87a3a')}
<rect x="680" y="292" width="300" height="18" fill="#8a6a4a"/><rect x="700" y="310" width="10" height="60" fill="#6a4e36"/><rect x="800" y="310" width="10" height="60" fill="#6a4e36"/><rect x="900" y="310" width="10" height="60" fill="#6a4e36"/><rect x="760" y="250" width="56" height="42" fill="#c89a5a" stroke="#000" stroke-opacity=".25" stroke-width="2"/><rect x="822" y="250" width="56" height="42" fill="#a87a3a" stroke="#000" stroke-opacity=".25" stroke-width="2"/>
${phGrain('fm7n')}
`);
S.fmLoadBot=()=>clip('fm8',`
${phSky('fm8s',[[0,'#10141e'],[1,'#2a3240']])}
${phClouds('fm8c',[.25,.28,.34],.8,'0.004 0.015',1610,0,220)}
${phRain(1611,160,'#9aa8bc',.3)}
<rect y="300" width="960" height="170" fill="#141c26"/>
${fmBoat(480,330,'#1a2a3a',40)}${fmCrates(480,322,4,'#5a4a3a','#4a3a2e')}
<path d="M0,360 Q120,330 240,360 T480,356 T720,362 T960,352 L960,470 L0,470 Z" fill="#1a2430"/>
<path d="M260,358 q40,-40 90,-10 M600,356 q50,-46 100,-6" stroke="#cfd8e4" stroke-width="4" fill="none" opacity=".6"/>
${loWaves(1612,390,3,'#1e2a38','#18222e')}
${phGrain('fm8n')}
`);

// 5 半夜刷到暴漲消息 → 整晚沒睡隔天判斷全亂：深夜床邊亮著的手機 → 灰濛濛清晨、冷掉的咖啡
S.fmNightTop=()=>clip('fm9',`
<rect width="960" height="470" fill="#0a0c16"/>
${ckWin(80,50,260,200,'#1a1c26',`${phSky('fm9w',[[0,'#05070e'],[1,'#141a2c']]).replace('<rect width="960" height="470"','<rect x="80" y="50" width="260" height="200"')}${phCity(1613,250,30,100,'#0c0e18','#ffd98a','#141826',.05)}`)}
${ckBed('#2a2e44','#1c2034','#3a3e5a','#30365a')}
${phGlow('fm9g',640,250,260,'#5affb0',.35)}
<rect x="590" y="200" width="100" height="170" rx="14" fill="#111" transform="rotate(-8 640 285)"/>
<g transform="rotate(-8 640 285)"><rect x="598" y="210" width="84" height="150" rx="8" fill="#0e2a20"/><path d="M606,340 L626,320 L640,328 L656,290 L668,260 L676,226" stroke="#3aff8a" stroke-width="4" fill="none"/><text x="640" y="236" font-size="20" font-weight="900" text-anchor="middle" fill="#3aff8a">+38%</text></g>
${phGrain('fm9n')}
`);
S.fmNightBot=()=>clip('fm10',`
<rect width="960" height="470" fill="#4a4e56"/>
${ckWin(560,40,320,240,'#6a6e76',`${phSky('fm10w',[[0,'#8a9098'],[1,'#b0b4ba']]).replace('<rect width="960" height="470"','<rect x="560" y="40" width="320" height="240"')}${phCity(1614,280,30,120,'#7a7e86',null,null)}${phClouds('fm10c',[.8,.8,.82],.6,'0.004 0.015',1615,40,240)}`)}
${ckTable(320,'#5a5248','#3e3830')}
${ckCup(300,262,'#d8d4cc',false)}
<rect x="430" y="300" width="70" height="14" rx="4" fill="#1a1a1e"/>
<rect x="540" y="290" width="160" height="26" fill="#d8d4c8" transform="rotate(4 620 303)"/>
${phGrain('fm10n')}
`);

// 6 覺得是最後一次機會 → 天天有機會，本金沒了才是真錯過：夜裡開走的末班車 → 清晨下一班車進站
S.fmBusTop=()=>clip('fm11',`
${phSky('fm11s',[[0,'#05070e'],[1,'#161c2c']])}
${phCity(1616,320,40,150,'#0c1018','#ffd98a','#121624',.03)}
<rect y="320" width="960" height="150" fill="#14161e"/><rect y="400" width="960" height="70" fill="#1c1e26"/>
${fmStop(160,400,'#3a3e4a')}${phGlow('fm11l',160,256,60,'#ffd98a',.25)}
${fmBus(760,420,'#3a4a5a','#ffe6a0',`<rect x="760" y="330" width="6" height="22" fill="#ff3a3a"/>`)}${phGlow('fm11t',763,341,50,'#ff3a3a',.5)}
${phGrain('fm11n')}
`);
S.fmBusBot=()=>clip('fm12',`
${phSky('fm12s',[[0,'#8ac4f0'],[.6,'#ffe2b0'],[1,'#ffd08a']])}
${phGlow('fm12g',800,300,320,'#fff2c0',.8)}
${phCity(1616,320,40,150,'#c8a890',null,null)}
<rect y="320" width="960" height="150" fill="#a89a8a"/><rect y="400" width="960" height="70" fill="#8a7e72"/>
${fmStop(160,400,'#4a5060')}
${fmBus(380,420,'#e8b04a','#cfeaff',`<rect x="672" y="370" width="8" height="16" fill="#fff6c0"/>`)}${phGlow('fm12h',676,378,50,'#fff6c0',.6)}
${phGrain('fm12n')}
`);
