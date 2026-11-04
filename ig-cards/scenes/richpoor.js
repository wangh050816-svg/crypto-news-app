// 有錢人和普通人的6個差距：寫實風景／室內場景（共用 photo.js、check.js、scenery.js、doubt.js 的工具）
const rpJar=(x,y,inner)=>`<path d="M${x-50},${y-150} h100 v14 q20,10 20,40 v86 q0,10 -10,10 h-120 q-10,0 -10,-10 v-86 q0,-30 20,-40 Z" fill="#dff1fb" fill-opacity=".18" stroke="#cfe2ee" stroke-opacity=".7" stroke-width="3"/>${inner}<rect x="${x-56}" y="${y-166}" width="112" height="18" rx="5" fill="#b89a6a"/>`;
const rpChair=(x,y,c,cushion)=>`<path d="M${x-120},${y} L${x+80},${y} L${x+130},${y-70} L${x-70},${y-70} Z" fill="${cushion}"/><path d="M${x+130},${y-70} L${x+170},${y-150}" stroke="${c}" stroke-width="10"/><path d="M${x-110},${y} v40 M${x+70},${y} v40 M${x+120},${y-60} v100" stroke="${c}" stroke-width="8"/><path d="M${x+90},${y-60} L${x+170},${y-150} L${x+190},${y-140} L${x+120},${y-60} Z" fill="${cushion}"/>`;
const rpBoat=(x,y,k,hull,sail,mast)=>`<path d="M${x-60*k},${y} h${120*k} l${-14*k},${20*k} h${-92*k} Z" fill="${hull}"/><path d="M${x},${y} V${y-110*k}" stroke="${mast}" stroke-width="${3*k}"/>${sail?`<path d="M${x+4*k},${y-106*k} Q${x+70*k},${y-60*k} ${x+60*k},${y-6*k} L${x+4*k},${y-6*k} Z" fill="${sail}"/><path d="M${x-4*k},${y-90*k} Q${x-46*k},${y-46*k} ${x-50*k},${y-8*k} L${x-4*k},${y-8*k} Z" fill="${sail}" opacity=".85"/>`:''}`;

// 1 花剩才存 → 存剩才花：空存錢罐 → 硬幣罐長出小苗
S.rpSaveTop=()=>clip('rp1',`
<rect width="960" height="470" fill="#0e1018"/>
${phGlow('rp1g',480,200,260,'#9fb6d0',.12)}
${ckTable(360,'#2a2420','#1c1814')}
${rpJar(480,360,'')}
<path d="M200,0 L140,60 H260 Z" fill="#2a2c34"/>
${phGrain('rp1n')}
`);
S.rpSaveBot=()=>clip('rp2',`
<rect width="960" height="470" fill="#f2e2c4"/>
${ckWin(560,40,320,270,'#fbf4e6',`${phSky('rp2s',[[0,'#9ccbec'],[1,'#eef4e2']]).replace('<rect width="960" height="470"','<rect x="560" y="40" width="320" height="270"')}${phTree(1301,720,310,.8,'#7aa860')}`)}
<path d="M560,310 L880,310 L700,470 L200,470 Z" fill="#fff4c8" opacity=".4"/>
${ckTable(360,'#c8a47a','#a8845a')}
${rpJar(400,360,[...Array(26)].map((_,i)=>coin(352+(i%6)*19,346-Math.floor(i/6)*14,10)).join(''))}
<path d="M400,290 Q396,250 404,210" stroke="#5f9a46" stroke-width="5" fill="none"/><ellipse cx="386" cy="222" rx="18" ry="9" fill="#7cc65a" transform="rotate(-30 386 222)"/><ellipse cx="420" cy="212" rx="18" ry="9" fill="#9ad870" transform="rotate(25 420 212)"/>
${phGrain('rp2n')}
`);

// 2 用時間換錢 → 用錢買時間：深夜的沙漏 → 午後草地的躺椅
S.rpTimeTop=()=>clip('rp3',`
<rect width="960" height="470" fill="#0c0e16"/>
${phGlow('rp3g',480,240,240,'#cfd8ff',.1)}
${ckTable(400,'#22201e','#161412')}
${scHourglass(480,100,300)}
<path d="M420,170 Q480,200 540,170 L520,120 H440 Z" fill="#c8b48a" opacity=".85"/><path d="M480,250 V372" stroke="#c8b48a" stroke-width="3"/><path d="M430,380 Q480,350 530,380 Z" fill="#c8b48a"/>
<rect x="760" y="300" width="120" height="60" rx="8" fill="#14161e"/><text x="820" y="342" font-size="30" font-weight="900" text-anchor="middle" fill="#ff5a5a" font-family="monospace">23:47</text>
${phGrain('rp3n')}
`);
S.rpTimeBot=()=>clip('rp4',`
${phSky('rp4s',[[0,'#8cc4ec'],[1,'#f2f2dc']])}
${phGlow('rp4g',760,90,260,'#fff8d8',.9)}
${phClouds('rp4c',[1,1,1],.55,'0.004 0.015',1302,0,170)}
<path d="M0,470 L0,300 Q480,280 960,300 L960,470 Z" fill="#8fbf6a"/>
${phTree(1303,180,320,1.3,'#5a8a44')}
${rpChair(520,400,'#8a6a4a','#f4ecdc')}
${(()=>{const r=phRand(1304);let o='';for(let i=0;i<90;i++){const x=r()*960,y=310+r()*160;o+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} l2,-9" stroke="#6a9a4a" stroke-width="2"/>`}return o})()}
${phGrain('rp4n')}
`);

// 3 等有把握才開始 → 先開始再修正：霧中停泊的船 → 揚帆出海
S.rpStartTop=()=>clip('rp5',`
${phSky('rp5s',[[0,'#3a4250'],[1,'#5a6270']])}
<rect y="270" width="960" height="200" fill="#3a424e"/>
<rect x="0" y="300" width="380" height="40" fill="#2a2620"/>${[40,140,240,340].map(x=>`<rect x="${x}" y="300" width="12" height="90" fill="#221e1a"/>`).join('')}
${rpBoat(560,330,1.3,'#2a2e36',null,'#1c2028')}
<path d="M380,320 Q470,330 500,330" stroke="#1c2028" stroke-width="2" fill="none"/>
${phClouds('rp5f',[.6,.64,.7],.9,'0.003 0.012',1305)}
${phGrain('rp5n')}
`);
S.rpStartBot=()=>clip('rp6',`
${phSky('rp6s',[[0,'#6fb2e6'],[1,'#d6ecf8']])}
${phClouds('rp6c',[1,1,1],.7,'0.004 0.015',1306,0,200)}
${phGlow('rp6g',160,90,240,'#fff8dc',.8)}
<rect y="270" width="960" height="200" fill="#3f8cc4"/>
${(()=>{const r=phRand(1307);let s='';for(let i=0;i<80;i++){const y=272+Math.pow(r(),.8)*198,x=r()*960,w=4+(y-270)/6;s+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(w/2).toFixed(0)},-3 ${w.toFixed(0)},0" stroke="#e6f4fc" stroke-width="1.5" fill="none" opacity=".6"/>`}return s})()}
<g transform="rotate(-6 520 340)">${rpBoat(520,340,1.5,'#f4f0e6','#fffaf0','#5a4a3a')}</g>
<path d="M420,374 q60,8 120,4 q60,-4 100,-12" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/>
${phGrain('rp6n')}
`);

// 4 只看價格 → 先看價值：貼滿標籤的櫥窗 → 老師傅的手工木椅
S.rpValueTop=()=>clip('rp7',`
<rect width="960" height="470" fill="#0e1016"/>
<rect x="80" y="40" width="800" height="340" fill="#1a1e28"/>${phGlow('rp7g',480,200,400,'#cfd8ff',.12)}
${[[140,180],[300,150],[460,200],[620,160],[760,190]].map(([x,y],i)=>`<rect x="${x}" y="${y}" width="${100-i*4}" height="${330-y}" fill="#2a2e3a"/><rect x="${x+10}" y="${y-30}" width="70" height="34" rx="4" fill="#d84a4a"/><text x="${x+45}" y="${y-6}" font-size="20" font-weight="900" text-anchor="middle" fill="#fff">-${[30,50,70,40,60][i]}%</text>`).join('')}
<rect x="80" y="40" width="800" height="340" fill="none" stroke="#2a2e38" stroke-width="16"/>
<rect y="380" width="960" height="90" fill="#0a0c10"/>
${phGrain('rp7n')}
`);
S.rpValueBot=()=>clip('rp8',`
<rect width="960" height="470" fill="#e8d4b4"/>
${phGlow('rp8g',300,80,360,'#fff2d0',.8)}
<path d="M200,0 L520,470 L80,470 L0,0 Z" fill="#fff4c8" opacity=".3"/>
<rect y="380" width="960" height="90" fill="#b8946a"/>
<g fill="#8a5a34"><rect x="380" y="290" width="200" height="22" rx="4"/><rect x="390" y="312" width="14" height="90"/><rect x="556" y="312" width="14" height="90"/><rect x="556" y="140" width="14" height="160"/><rect x="390" y="140" width="14" height="160"/></g>
<g fill="#a87048">${[0,1,2,3].map(i=>`<rect x="${410+i*38}" y="150" width="18" height="140" rx="3"/>`).join('')}</g><rect x="384" y="132" width="192" height="20" rx="6" fill="#9a6440"/>
<path d="M390,290 h190" stroke="#c89060" stroke-width="2" opacity=".6"/>
${[...Array(14)].map((_,i)=>`<path d="M${640+(i*23)%200},${400+(i*13)%50} q8,-4 16,0" stroke="#e6c8a0" stroke-width="2" fill="none"/>`).join('')}
${phGrain('rp8n')}
`);

// 5 想馬上看到回報 → 願意等複利：寒冬的小樹苗 → 多年後的大樹
S.rpGrowTop=()=>clip('rp9',`
${phSky('rp9s',[[0,'#141a2a'],[1,'#3a4660']])}
${phClouds('rp9c',[.4,.45,.55],.6,'0.004 0.02',1308,0,200)}
<path d="M0,470 L0,380 Q480,360 960,380 L960,470 Z" fill="#c8d0dc"/>
<g transform="translate(480,385) scale(1.6) translate(-480,-385)">${sdSapling(480,385,'#1a1e28',6,'')}</g>
${phRain(1309,90,'#e6eef8',.45).replace(/l-[\d.]+,([\d.]+)/g,(m,l)=>`l-1,${(l*.15).toFixed(1)}`)}
${phGrain('rp9n')}
`);
S.rpGrowBot=()=>clip('rp10',`
${phSky('rp10s',[[0,'#8cc4ec'],[1,'#eef6e6']])}
${phGlow('rp10g',780,90,260,'#fff8d8',.9)}
${phClouds('rp10c',[1,1,1],.5,'0.004 0.015',1310,0,170)}
<path d="M0,470 L0,380 Q480,360 960,380 L960,470 Z" fill="#8fbf6a"/>
${phTree(1311,480,385,1.45,'#4f8a3a')}
<ellipse cx="480" cy="400" rx="220" ry="22" fill="#5a8a3a" opacity=".45"/>
${phGrain('rp10n')}
`);

// 6 下班後只想放空 → 留時間投資自己：電視光的客廳 → 清晨書桌
S.rpSelfTop=()=>clip('rp11',`
<rect width="960" height="470" fill="#07080e"/>
<rect x="560" y="120" width="300" height="180" rx="6" fill="#1a2a4a"/><rect x="572" y="132" width="276" height="156" fill="#4a7ac8" opacity=".55"/>
${phGlow('rp11g',710,210,320,'#7fa8ff',.25)}
<rect x="600" y="300" width="220" height="16" fill="#14161e"/>
<path d="M60,470 L60,330 Q60,300 90,300 H420 Q450,300 450,330 V470 Z" fill="#14161e"/><rect x="60" y="360" width="390" height="40" fill="#1a1c26"/>
<path d="M60,330 Q60,300 90,300 H420 Q450,300 450,330" stroke="#7fa8ff" stroke-width="2" opacity=".3" fill="none"/>
${phGrain('rp11n')}
`);
S.rpSelfBot=()=>clip('rp12',`
<rect width="960" height="470" fill="#f4e6cc"/>
${ckWin(100,40,320,270,'#fbf4e6',`${phSky('rp12s',[[0,'#a8d0ee'],[.7,'#ffe8c8'],[1,'#ffd8a8']]).replace('<rect width="960" height="470"','<rect x="100" y="40" width="320" height="270"')}${phGlow('rp12w',300,250,120,'#fff6d0',.9)}`)}
<path d="M100,310 L420,310 L700,470 L100,470 Z" fill="#fff4c8" opacity=".4"/>
${ckTable(340,'#c8a47a','#a8845a')}
<path d="M480,330 L600,320 L720,330 L720,346 L600,338 L480,346 Z" fill="#fffaf0"/><path d="M600,320 V338" stroke="#c8b49a" stroke-width="2"/>
${[0,1,2].map(i=>`<path d="M500,${328+i*0} h0" />`).join('')}
${ckCup(820,320,'#ffffff',true)}
${phGrain('rp12n')}
`);
