// 情緒崩潰前的檢查清單：寫實室內／風景場景（共用 scenes/photo.js 的 ph* 工具）
let ckWinN=0;
const ckWin=(x,y,w,h,frame,inner)=>{const id='ckw'+(ckWinN++);return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})">${inner}</g><path d="M${x+w/2},${y} V${y+h} M${x},${y+h/2} H${x+w}" stroke="${frame}" stroke-width="10"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="14"/>`};
const ckBed=(top,side,pillow,blanket)=>`<rect x="420" y="300" width="540" height="40" fill="${top}"/><rect x="420" y="340" width="540" height="130" fill="${side}"/><rect x="440" y="270" width="150" height="50" rx="20" fill="${pillow}"/><path d="M560,300 Q700,280 960,300 L960,370 Q760,380 560,360 Z" fill="${blanket}"/>`;
const ckTable=(y,top,front)=>`<rect y="${y}" width="960" height="${470-y}" fill="${front}"/><rect y="${y}" width="960" height="14" fill="${top}"/>`;
const ckCup=(x,y,c,steam)=>`<path d="M${x-28},${y} h56 l-6,46 q-2,10 -12,10 h-20 q-10,0 -12,-10 Z" fill="${c}"/><path d="M${x+28},${y+10} q18,2 14,18 q-4,12 -18,10" stroke="${c}" stroke-width="6" fill="none"/><ellipse cx="${x}" cy="${y}" rx="28" ry="5" fill="#6a4a2e"/>${steam?`<path d="M${x-10},${y-10} q-8,-14 0,-28 q8,-14 0,-28 M${x+10},${y-14} q-8,-14 0,-28" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`:''}`;

// 1 人生沒意義 → 睡飽了嗎：凌晨手機光的房間 → 早晨陽光的床
S.ckSleepTop=()=>clip('ck1',`
<rect width="960" height="470" fill="#0c0f1a"/>
${ckWin(80,50,240,220,'#05070c',`<rect x="80" y="50" width="240" height="220" fill="#141c30"/>${phCity(901,270,30,120,'#0a0e18','#ffd98a','#10141f',.05).replace(/x="(-?[\d.]+)"/g,(m,x)=>`x="${(80+(+x)*.25).toFixed(1)}"`).replace(/width="([\d.]+)"/g,(m,w)=>`width="${(w*.25).toFixed(1)}"`)}`)}
${ckBed('#1a1e2c','#12151f','#22283a','#1c2232')}
${phGlow('ck1g',700,300,180,'#9fd0ff',.35)}<rect x="680" y="292" width="40" height="22" rx="4" fill="#cfe8ff"/>
<rect x="840" y="200" width="90" height="46" rx="8" fill="#12151f"/><text x="885" y="234" font-size="28" font-weight="900" text-anchor="middle" fill="#ff5a5a" font-family="monospace">3:12</text>
${phGrain('ck1n')}
`);
S.ckSleepBot=()=>clip('ck2',`
<rect width="960" height="470" fill="#f2e2c8"/>
${ckWin(80,50,240,220,'#fbf4e6',`${phSky('ck2s',[[0,'#9ccbec'],[1,'#e8f2f2']]).replace('<rect width="960" height="470"','<rect x="80" y="50" width="240" height="220"')}<circle cx="260" cy="100" r="22" fill="#fff6d0"/>`)}
<path d="M80,50 L320,50 L860,470 L180,470 Z" fill="#fff6d8" opacity=".35"/>
${ckBed('#f8f2e8','#d8c0a0','#ffffff','#bcd8ec')}
<path d="M560,300 Q700,280 960,300" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
${phGlow('ck2g',200,120,260,'#fff4d0',.5)}
${phGrain('ck2n')}
`);

// 2 世界跟你作對 → 吃飯了嗎：雨夜便利商店 → 冒熱氣的湯麵
S.ckMealTop=()=>clip('ck3',`
${phSky('ck3s',[[0,'#0a0d16'],[1,'#1a1f2c']])}
<rect x="300" y="110" width="440" height="230" fill="#e6f4ff" opacity=".9"/>${phGlow('ck3g',520,230,340,'#cfeaff',.45)}
<rect x="290" y="80" width="460" height="34" fill="#2a8a5a"/><rect x="290" y="114" width="460" height="6" fill="#d84a4a"/>
<path d="M300,110 V340 M450,110 V340 M600,110 V340" stroke="#9fb6c9" stroke-width="5"/>
${[0,1,2,3].map(i=>`<rect x="${320+i*100}" y="${170}" width="70" height="${120}" fill="#bcd8ec" opacity=".6"/>`).join('')}
<rect y="340" width="960" height="130" fill="#141820"/>
<g opacity=".4" transform="translate(0,680) scale(1,-1)"><rect x="300" y="110" width="440" height="230" fill="#e6f4ff"/></g>
<rect y="340" width="960" height="130" fill="#141820" opacity=".5"/>
${phRain(902,280,'#c8d6e8',.35)}
${phGrain('ck3n')}
`);
S.ckMealBot=()=>clip('ck4',`
<rect width="960" height="470" fill="#e8d4b4"/>
${phGlow('ck4g',480,180,420,'#fff2d0',.8)}
${ckTable(300,'#b88a5a','#9a6e44')}
<ellipse cx="480" cy="340" rx="190" ry="40" fill="#7a5434" opacity=".35"/>
<path d="M310,300 Q320,400 480,400 Q640,400 650,300 Z" fill="#f6f2ea"/><ellipse cx="480" cy="300" rx="170" ry="36" fill="#d8a060"/>
${[...Array(14)].map((_,i)=>`<path d="M${350+i*18},${290+(i%3)*6} q10,10 20,0" stroke="#f6e0a0" stroke-width="5" fill="none"/>`).join('')}
<ellipse cx="420" cy="294" rx="30" ry="12" fill="#fff6e0"/><circle cx="420" cy="294" r="8" fill="#ffc83a"/>
<path d="M520,290 q20,-6 40,0" stroke="#5f9a46" stroke-width="8" fill="none"/>
<path d="M600,340 L760,180 M620,346 L776,190" stroke="#8a5a34" stroke-width="7" stroke-linecap="round"/>
${phBlur('ck4b',6)}<g filter="url(#ck4b)" opacity=".7">${[400,460,520,570].map((x,i)=>`<path d="M${x},270 q-20,-40 0,-80 q20,-40 0,-80" stroke="#fff" stroke-width="10" fill="none"/>`).join('')}</g>
${phGrain('ck4n')}
`);

// 3 什麼都做不好 → 曬太陽了嗎：拉上窗簾的暗房 → 陽光灑滿木地板
const ckFloor=(c1,c2)=>`<path d="M0,330 L960,330 L960,470 L0,470 Z" fill="${c1}"/>${[...Array(12)].map((_,i)=>`<path d="M${480+(i-6)*40},330 L${480+(i-6)*180},470" stroke="${c2}" stroke-width="2"/>`).join('')}`;
S.ckSunTop=()=>clip('ck5',`
<rect width="960" height="470" fill="#14161e"/>
${ckFloor('#1c1a1e','#121014')}
<rect x="300" y="40" width="360" height="290" fill="#1e2230"/>
<path d="M300,40 Q330,180 300,330 L478,330 Q460,180 478,40 Z M660,40 Q630,180 660,330 L482,330 Q500,180 482,40 Z" fill="#2a2c3a"/>
<path d="M478,40 V330" stroke="#fff4d0" stroke-width="3" opacity=".5"/>${phGlow('ck5g',480,330,120,'#fff4d0',.15)}
<path d="M478,330 L470,470 L500,470 L482,330 Z" fill="#fff4d0" opacity=".12"/>
<rect x="280" y="30" width="400" height="12" fill="#3a3a44"/>
${phGrain('ck5n')}
`);
S.ckSunBot=()=>clip('ck6',`
<rect width="960" height="470" fill="#f4e6cc"/>
${ckFloor('#c8935f','#a8784a')}
${ckWin(330,50,300,270,'#fbf4e6',`${phSky('ck6s',[[0,'#8cc4ec'],[1,'#e8f4f0']]).replace('<rect width="960" height="470"','<rect x="330" y="50" width="300" height="270"')}<path d="M330,250 Q480,220 630,250 V320 H330 Z" fill="#9cc884"/>`)}
<path d="M240,40 Q260,180 230,330 L320,330 Q300,180 320,40 Z M720,40 Q700,180 730,330 L640,330 Q660,180 640,40 Z" fill="#f6e8d8"/>
<rect x="220" y="30" width="520" height="12" fill="#b88a5a"/>
<path d="M330,320 L630,320 L880,470 L80,470 Z" fill="#fff4c8" opacity=".55"/>
<path d="M480,320 V470 M330,395 H630" stroke="#c8935f" stroke-width="6" opacity=".25"/>
${phGrain('ck6n')}
`);

// 4 什麼都不順眼 → 滑太久了嗎：發光螢幕牆 → 手機蓋著、窗外綠樹
S.ckPhoneTop=()=>S.phReadTop().replace(/ph9/g,'ck7x').replace("clip-path=\"url(#ck7x)\"","clip-path=\"url(#ck7x)\"");
S.ckPhoneBot=()=>clip('ck8',`
<rect width="960" height="470" fill="#eef0e6"/>
${ckWin(180,40,600,280,'#fbfbf4',`${phSky('ck8s',[[0,'#8cc4ec'],[1,'#e6f4f8']]).replace('<rect width="960" height="470"','<rect x="180" y="40" width="600" height="280"')}${phTree(903,300,320,.9,'#6aa85a')}${phTree(904,620,320,1.1,'#5a9a4a')}${phTree(905,460,320,.7,'#7ab86a')}`)}
${phGlow('ck8g',480,160,380,'#fff8d8',.4)}
${ckTable(330,'#d6b48a','#b8946a')}
<g transform="rotate(-8 520 360)"><rect x="470" y="340" width="110" height="56" rx="10" fill="#2a2a30"/><circle cx="560" cy="356" r="6" fill="#444"/></g>
${ckCup(340,330,'#fff',true)}
${phGrain('ck8n')}
`);

// 5 沒人懂你 → 多久沒好好聊天：空房一張椅子 → 咖啡廳窗邊兩杯咖啡
const ckChair=(x,y,c)=>`<rect x="${x-40}" y="${y}" width="80" height="12" fill="${c}"/><rect x="${x-40}" y="${y-90}" width="10" height="100" fill="${c}"/><rect x="${x-40}" y="${y-90}" width="80" height="10" fill="${c}"/><rect x="${x-38}" y="${y+12}" width="8" height="70" fill="${c}"/><rect x="${x+30}" y="${y+12}" width="8" height="70" fill="${c}"/>`;
S.ckTalkTop=()=>clip('ck9',`
<rect width="960" height="470" fill="#14171f"/>
${ckFloor('#1a1c22','#121418')}
<path d="M440,0 L520,0 L700,470 L260,470 Z" fill="#cfd8e6" opacity=".07"/>
<rect x="470" y="0" width="20" height="40" fill="#0c0e14"/><path d="M450,40 h60 l-10,18 h-40 Z" fill="#2a2e3a"/>${phGlow('ck9g',480,60,90,'#fff0c8',.35)}
${ckChair(480,330,'#4a4e5c')}
<ellipse cx="480" cy="414" rx="80" ry="10" fill="#000" opacity=".4"/>
${phGrain('ck9n')}
`);
S.ckTalkBot=()=>clip('ck10',`
<rect width="960" height="470" fill="#efe0c8"/>
${ckWin(60,30,840,290,'#6a4a2e',`${phSky('ck10s',[[0,'#9ccbec'],[1,'#f2ecd8']]).replace('<rect width="960" height="470"','<rect x="60" y="30" width="840" height="290"')}${phCity(906,320,40,160,'#d8c8b0','#fff','#c8b8a0',0)}${phTree(907,150,320,.8,'#7aa860')}${phTree(908,800,320,.9,'#6a9a50')}`)}
${phGlow('ck10g',480,150,420,'#fff6d6',.45)}
${ckTable(330,'#a8784a','#8a5e38')}
${ckCup(380,320,'#f6f2ea',true)}${ckCup(580,320,'#e8d8c0',true)}
<path d="M440,360 h80" stroke="#6a4a2e" stroke-width="3" opacity=".3"/>
${phGrain('ck10n')}
`);

// 6 半夜否定一切 → 先睡：凌晨兩點的窗 → 隔天早晨陽光照進房間
S.ckNightTop=()=>clip('ck11',`
<rect width="960" height="470" fill="#080a12"/>
${ckWin(200,40,560,320,'#04050a',`${phSky('ck11s',[[0,'#05070e'],[1,'#121a2a']]).replace('<rect width="960" height="470"','<rect x="200" y="40" width="560" height="320"')}${phCity(909,360,40,200,'#0a0e18','#ffd98a','#0e121c',.01).replace(/x="(-?[\d.]+)"/g,(m,x)=>`x="${(200+(+x)*.58).toFixed(1)}"`).replace(/width="([\d.]+)"/g,(m,w)=>`width="${(w*.58).toFixed(1)}"`)}`)}
<rect y="360" width="960" height="110" fill="#06070c"/>
<rect x="780" y="370" width="110" height="50" rx="8" fill="#10121a"/><text x="835" y="406" font-size="30" font-weight="900" text-anchor="middle" fill="#ff5a5a" font-family="monospace">2:00</text>
${phGrain('ck11n')}
`);
S.ckNightBot=()=>clip('ck12',`
<rect width="960" height="470" fill="#f6e6cc"/>
${ckWin(200,40,560,320,'#fbf4e6',`${phSky('ck12s',[[0,'#8cc4ec'],[.7,'#ffe8c8'],[1,'#ffd8a8']]).replace('<rect width="960" height="470"','<rect x="200" y="40" width="560" height="320"')}${phGlow('ck12g',620,250,200,'#fff6d0',.9)}<circle cx="620" cy="250" r="30" fill="#fffbe8"/>${phCity(909,360,40,200,'#c8b8a8','#fff','#bcaea0',0).replace(/x="(-?[\d.]+)"/g,(m,x)=>`x="${(200+(+x)*.58).toFixed(1)}"`).replace(/width="([\d.]+)"/g,(m,w)=>`width="${(w*.58).toFixed(1)}"`)}`)}
<path d="M200,360 L760,360 L960,470 L0,470 Z" fill="#fff4c8" opacity=".5"/>
<rect y="360" width="960" height="110" fill="#d8b890" opacity=".7"/>
<path d="M120,360 q-20,-50 10,-90 q30,40 10,90 Z M140,360 q30,-40 60,-50 q-10,40 -50,50 Z" fill="#6aa85a"/><rect x="110" y="360" width="50" height="50" rx="6" fill="#e58f5c"/>
${phGrain('ck12n')}
`);
