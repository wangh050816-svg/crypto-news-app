// 小時候和長大後的6個落差：上格童年（亮、暖），下格長大後（暗、冷）——和其他組相反
const chSlide=(x,y,c)=>`<path d="M${x},${y} L${x},${y-150} L${x+30},${y-150} L${x+30},${y}" stroke="${c}" stroke-width="8" fill="none"/>${[1,2,3,4].map(i=>`<path d="M${x},${y-i*30} h30" stroke="${c}" stroke-width="5"/>`).join('')}<path d="M${x+30},${y-150} Q${x+120},${y-120} ${x+180},${y}" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/>`;
const chSwing=(x,y,c)=>`<path d="M${x-80},${y} L${x-50},${y-170} L${x+50},${y-170} L${x+80},${y}" stroke="${c}" stroke-width="8" fill="none"/><path d="M${x-20},${y-170} V${y-50} M${x+20},${y-170} V${y-50}" stroke="${c}" stroke-width="3"/><rect x="${x-30}" y="${y-54}" width="60" height="10" fill="${c}"/>`;
const chCake=(x,y,big)=>`<ellipse cx="${x}" cy="${y}" rx="${big?110:44}" ry="${big?18:8}" fill="#e8e0d4"/><rect x="${x-(big?90:34)}" y="${y-(big?80:34)}" width="${big?180:68}" height="${big?80:34}" rx="6" fill="#ffd9e2"/><rect x="${x-(big?90:34)}" y="${y-(big?80:34)}" width="${big?180:68}" height="${big?18:8}" rx="6" fill="#fff4f6"/>${(big?[-50,-17,17,50]:[0]).map(dx=>`<rect x="${x+dx-3}" y="${y-(big?118:56)}" width="6" height="${big?38:22}" fill="#8fc0f0"/><path d="M${x+dx},${y-(big?120:58)} q-6,-10 0,-20 q6,10 0,20 Z" fill="#ffb84a"/>`).join('')}`;

// 1 最煩寫功課 → 才知道那是最簡單的事：陽光書桌上的作業本 → 深夜堆滿帳單的桌面
S.chWorkTop=()=>clip('ch1',`
<rect width="960" height="470" fill="#fbe8cc"/>
${ckWin(600,40,300,250,'#fff8ec',`${phSky('ch1s',[[0,'#9ccbec'],[1,'#eef4e2']]).replace('<rect width="960" height="470"','<rect x="600" y="40" width="300" height="250"')}${phTree(1411,760,290,.8,'#7aa860')}`)}
<path d="M600,290 L900,290 L700,470 L220,470 Z" fill="#fff4c8" opacity=".4"/>
${ckTable(340,'#e8c49a','#c8a47a')}
<g transform="rotate(-5 380 300)"><path d="M240,300 L380,288 L520,300 L520,330 L380,320 L240,330 Z" fill="#fffaf0"/><path d="M380,288 V320" stroke="#c8b49a" stroke-width="2"/>${[0,1,2].map(i=>`<path d="M260,${304+i*7} h100 M400,${300+i*7} h100" stroke="#8fb0d8" stroke-width="1.5"/>`).join('')}<path d="M270,310 q20,-10 40,4 q16,10 36,-2" stroke="#ff8a5b" stroke-width="3" fill="none"/></g>
${['#ff6b6b','#ffd25a','#5fb0f0','#7cc65a','#c77dff'].map((c,i)=>`<g transform="rotate(${-20+i*12} ${600+i*26} 330)"><rect x="${590+i*26}" y="300" width="14" height="60" rx="3" fill="${c}"/><path d="M${590+i*26},300 l7,-14 l7,14 Z" fill="${c}"/></g>`).join('')}
${phGrain('ch1n')}
`);
S.chWorkBot=()=>clip('ch2',`
<rect width="960" height="470" fill="#07080e"/>
<path d="M200,0 L130,90 H270 Z" fill="#2a2c34"/>${phGlow('ch2g',200,250,300,'#ffe6b0',.22)}
${ckTable(340,'#1e1a16','#141210')}
${[...Array(9)].map((_,i)=>`<rect x="${180+(i*61)%520}" y="${300-(i%4)*10}" width="150" height="46" fill="${i%3?'#d8d4c8':'#c8c0b0'}" transform="rotate(${(i*17)%24-12} ${255+(i*61)%520} ${323-(i%4)*10})"/>`).join('')}
${[[300,286,'#d84a4a'],[560,280,'#d84a4a'],[440,276,'#4a7ac8']].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="40" height="12" fill="${c}" opacity=".8"/>`).join('')}
<rect x="760" y="300" width="70" height="40" rx="4" fill="#2a2c34"/><text x="795" y="326" font-size="16" font-weight="900" text-anchor="middle" fill="#ff5a5a" font-family="monospace">01:12</text>
<rect width="960" height="470" fill="#000" opacity=".25"/>
${phGrain('ch2n')}
`);

// 2 生日最期待 → 又老一歲：陽光窗邊的大蛋糕 → 深夜辦公桌的小蛋糕
S.chBdayTop=()=>clip('ch3',`
<rect width="960" height="470" fill="#fbe8cc"/>
${ckWin(560,40,320,270,'#fff8ec',`${phSky('ch3s',[[0,'#9ccbec'],[1,'#eef4e2']]).replace('<rect width="960" height="470"','<rect x="560" y="40" width="320" height="270"')}${phTree(1402,720,310,.8,'#7aa860')}`)}
<path d="M560,310 L880,310 L700,470 L200,470 Z" fill="#fff4c8" opacity=".4"/>
${ckTable(370,'#e8c49a','#c8a47a')}
${chCake(360,370,true)}
${[...Array(14)].map((_,i)=>`<rect x="${100+(i*67)%400}" y="${40+(i*53)%220}" width="8" height="14" fill="${['#ff8fa8','#ffd25a','#8fc0f0','#9ad870'][i%4]}" transform="rotate(${i*30} ${104+(i*67)%400} ${47+(i*53)%220})"/>`).join('')}
${phGrain('ch3n')}
`);
S.chBdayBot=()=>clip('ch4',`
<rect width="960" height="470" fill="#080a10"/>
<rect x="520" y="90" width="320" height="200" rx="8" fill="#1a1e28"/><rect x="532" y="102" width="296" height="176" fill="#2a3a5a"/>${phGlow('ch4m',680,190,300,'#7fa8ff',.18)}
<path d="M680,290 v40 M620,330 h120" stroke="#14161e" stroke-width="10"/>
${ckTable(340,'#2a2420','#1c1814')}
${chCake(300,340,false)}${phGlow('ch4g',300,280,90,'#ffcf7a',.35)}
${[...Array(5)].map((_,i)=>`<rect x="${380+i*22}" y="${300-i*4}" width="90" height="40" fill="#e6e6e6" opacity=".15" transform="rotate(${i*3-6} ${425+i*22} ${320})"/>`).join('')}
${phGrain('ch4n')}
`);

// 3 哭完睡一覺就好 → 連哭都要找時間：陽光床鋪 → 雨夜車內
S.chCryTop=()=>clip('ch5',`
<rect width="960" height="470" fill="#f6e8d0"/>
${ckWin(80,40,260,240,'#fff8ec',`${phSky('ch5s',[[0,'#a8d0ee'],[1,'#f2f0dc']]).replace('<rect width="960" height="470"','<rect x="80" y="40" width="260" height="240"')}<circle cx="280" cy="90" r="22" fill="#fff6d0"/>`)}
<path d="M80,280 L340,280 L860,470 L180,470 Z" fill="#fff6d8" opacity=".45"/>
${ckBed('#fffaf2','#e6d0b0','#ffffff','#ffd9b0')}
<ellipse cx="760" cy="300" rx="40" ry="26" fill="#d8b890"/><circle cx="740" cy="280" r="14" fill="#d8b890"/><circle cx="780" cy="280" r="14" fill="#d8b890"/>
${phGrain('ch5n')}
`);
S.chCryBot=()=>clip('ch6',`
<rect width="960" height="470" fill="#05070c"/>
${phBlur('ch6b',10)}<g filter="url(#ch6b)">${[...Array(16)].map((_,i)=>`<circle cx="${80+(i*97)%800}" cy="${120+(i*37)%140}" r="${10+(i*7)%18}" fill="${['#ffcf7a','#ff6b6b','#cfe0ff'][i%3]}" opacity=".55"/>`).join('')}</g>
<g opacity=".6">${phRain(1403,220,'#cfd8e6',.5).replace(/l-[\d.]+,([\d.]+)/g,(m,l)=>`l0,${(l*.5).toFixed(1)}`)}</g>
<path d="M0,0 H960 V60 Q480,20 0,60 Z" fill="#0a0c12"/><path d="M0,470 L0,330 Q480,290 960,330 L960,470 Z" fill="#0c0e14"/>
<path d="M60,330 Q240,300 420,310" stroke="#1c2028" stroke-width="10" fill="none"/>
<circle cx="760" cy="420" r="70" fill="none" stroke="#1c2028" stroke-width="18"/>
${phGrain('ch6n')}
`);

// 4 暑假兩個月 → 請兩天假都猶豫：夏天河邊 → 塞滿的月曆
S.chSummerTop=()=>clip('ch7',`
${phSky('ch7s',[[0,'#5fb0f0'],[1,'#d8f0f8']])}
${phClouds('ch7c',[1,1,1],.75,'0.004 0.015',1404,0,190)}
${phGlow('ch7g',150,80,220,'#fffbe0',.9)}
<path d="${phRidge(1405,230,50,.5)}" fill="#6aa862"/>
<path d="M0,470 L0,260 L960,260 L960,470 Z" fill="#7ec06a"/>
<path d="M300,260 L420,260 Q560,360 760,470 L80,470 Q260,360 300,260 Z" fill="#5ab4d8"/>
${[...Array(30)].map((_,i)=>`<path d="M${220+(i*47)%420},${290+(i*29)%170} h${8+(i%4)*4}" stroke="#fff" stroke-width="2" opacity=".85"/>`).join('')}
${phTree(1406,820,300,1,'#4f9a3a')}
${phGrain('ch7n')}
`);
S.chSummerBot=()=>clip('ch8',`
<rect width="960" height="470" fill="#0e1018"/>
<path d="M120,0 L60,70 H220 Z" fill="#3a3c44"/><path d="M60,70 L-40,470 H360 L220,70 Z" fill="#ffe6b0" opacity=".03"/>
<rect x="300" y="60" width="420" height="320" fill="#d8d4c8"/><rect x="300" y="60" width="420" height="50" fill="#b8b2a4"/>
${[...Array(35)].map((_,i)=>{const c=i%7,r=Math.floor(i/7),x=310+c*58,y=118+r*52;return `<rect x="${x}" y="${y}" width="52" height="46" fill="#ecE8dc"/>${i%5!==3?`<rect x="${x+4}" y="${y+6}" width="${30+(i*7)%16}" height="8" fill="${['#d84a4a','#4a7ac8','#d8a04a'][i%3]}" opacity=".8"/><rect x="${x+4}" y="${y+20}" width="${20+(i*11)%22}" height="6" fill="#888" opacity=".6"/>`:''}`}).join('')}
<rect x="300" y="60" width="420" height="320" fill="#000" opacity=".35"/>
${ckTable(400,'#2a2420','#1c1814')}
${phGrain('ch8n')}
`);

// 5 覺得大人什麼都懂 → 大家都在硬撐：晴天大樹 → 被風吹歪的路燈
S.chAdultTop=()=>clip('ch9',`
${phSky('ch9s',[[0,'#7ec0f0'],[1,'#eaf6ea']])}
${phGlow('ch9g',800,80,240,'#fffbe0',.9)}
${phClouds('ch9c',[1,1,1],.6,'0.004 0.015',1407,0,170)}
<path d="M0,470 L0,390 Q480,370 960,390 L960,470 Z" fill="#8fbf6a"/>
${phTree(1408,480,395,1.45,'#4f8a3a')}
${phGrain('ch9n')}
`);
S.chAdultBot=()=>clip('ch10',`
${phSky('ch10s',[[0,'#05070e'],[1,'#141a28']])}
${phClouds('ch10c',[.2,.22,.28],.7,'0.005 0.015',1409,0,240)}
<rect y="380" width="960" height="90" fill="#0a0c12"/>
<g transform="rotate(8 480 400)"><rect x="474" y="140" width="12" height="260" fill="#3a4252"/><path d="M480,150 q50,-10 70,10" stroke="#3a4252" stroke-width="10" fill="none"/><rect x="530" y="156" width="40" height="14" rx="4" fill="#ffd98a"/></g>
${phGlow('ch10g',560,180,140,'#ffd98a',.45)}
<path d="M540,175 L470,400 L700,400 Z" fill="#ffd98a" opacity=".05"/>
${phRain(1410,260,'#aab8cc',.35).replace(/l-[\d.]+,/g,'l-12,')}
${phGrain('ch10n')}
`);

// 6 存錢買玩具 → 存錢買安全感：陽光下的小豬撲滿 → 深夜檯燈下的帳本
S.chSaveTop=()=>clip('ch11',`
<rect width="960" height="470" fill="#fbe8cc"/>
${phGlow('ch11g',300,100,380,'#fff2d0',.8)}<path d="M100,0 L520,470 L-80,470 Z" fill="#fff6d8" opacity=".35"/>
${ckTable(360,'#e8c49a','#c8a47a')}
<ellipse cx="480" cy="290" rx="110" ry="80" fill="#ffaabd"/><circle cx="570" cy="270" r="40" fill="#ffaabd"/><ellipse cx="600" cy="276" rx="16" ry="12" fill="#ff8fa8"/><circle cx="594" cy="272" r="3" fill="#a8546a"/><circle cx="606" cy="272" r="3" fill="#a8546a"/>
<circle cx="556" cy="250" r="5" fill="#3a2a2a"/><path d="M450,214 l-10,-26 l26,16 Z" fill="#ff8fa8"/><rect x="460" y="210" width="40" height="6" rx="3" fill="#a8546a"/>
${[[420,354],[460,360],[520,356],[560,362]].map(([x,y])=>`<rect x="${x-10}" y="${y}" width="20" height="10" fill="#ff8fa8"/>`).join('')}
${coin(480,180,18)}${coin(700,330,14)}${coin(730,342,14)}
${phGrain('ch11n')}
`);
S.chSaveBot=()=>clip('ch12',`
<rect width="960" height="470" fill="#07080e"/>
<path d="M720,40 L640,140 H800 Z" fill="#2a2c34"/>${phGlow('ch12g',720,260,320,'#ffe6b0',.3)}<path d="M640,140 L480,470 H960 L800,140 Z" fill="#ffe6b0" opacity=".03"/>
${ckTable(340,'#1e1a16','#141210')}
<g transform="rotate(-4 520 300)"><rect x="380" y="250" width="280" height="90" fill="#e8e4d8"/>${[0,1,2,3,4].map(i=>`<path d="M392,${264+i*15} h${200+(i*31)%60}" stroke="#7a7a7a" stroke-width="2"/><text x="640" y="${268+i*15}" font-size="12" text-anchor="end" fill="${i%2?'#a83a3a':'#3a3a3a'}" font-family="monospace">${['-1,280','-450','-3,600','-220','-890'][i]}</text>`).join('')}</g>
<rect x="720" y="270" width="110" height="70" rx="8" fill="#2a2c34"/><rect x="732" y="280" width="86" height="18" fill="#9fc0a0"/>${[...Array(8)].map((_,i)=>`<rect x="${734+(i%4)*21}" y="${306+Math.floor(i/4)*16}" width="16" height="12" rx="2" fill="#4a4c54"/>`).join('')}
${phGrain('ch12n')}
`);
