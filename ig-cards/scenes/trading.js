// 交易心態類場景（交易心態的6個提醒）
const tmChips=(x,y,n,col='#e5474b')=>{let s='';for(let i=0;i<n;i++)s+=`<ellipse cx="${x}" cy="${y-i*12}" rx="34" ry="12" fill="${col}" ${st(3)}/><path d="M${x-14},${y-i*12} h28" stroke="#fff" stroke-width="3"/>`;return s};
const tmSun=(x,y,r=40)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd66b" ${st(3)}/>`+[0,45,90,135,180,225,270,315].map(a=>{const c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);return `<path d="M${x+c*(r+10)},${y+s*(r+10)} L${x+c*(r+26)},${y+s*(r+26)}" ${st(4)}/>`}).join('');
const tmTree=(x,y,c='#8cc47a')=>`<rect x="${x-8}" y="${y}" width="16" height="70" fill="#a97446" ${st(3)}/><circle cx="${x}" cy="${y-20}" r="46" fill="${c}" ${st(3)}/>`;
const tmPlatform=(top,front)=>`<rect y="360" width="960" height="24" fill="${top}" ${st()}/><path d="M0,372 h960" stroke="#f2c94c" stroke-width="6" stroke-dasharray="26 14"/><rect y="384" width="960" height="90" fill="${front}" ${st()}/>`;
const tmTrain=(x,col,label)=>`<rect x="${x}" y="150" width="520" height="200" rx="30" fill="${col}" ${st()}/>
<rect x="${x+30}" y="180" width="90" height="70" rx="10" fill="#cfe8f7" ${st(3)}/><rect x="${x+140}" y="180" width="90" height="70" rx="10" fill="#cfe8f7" ${st(3)}/><rect x="${x+250}" y="180" width="90" height="70" rx="10" fill="#cfe8f7" ${st(3)}/><rect x="${x+360}" y="180" width="90" height="70" rx="10" fill="#cfe8f7" ${st(3)}/>
<rect x="${x+150}" y="276" width="220" height="50" rx="8" fill="#fff" ${st(3)}/><text x="${x+260}" y="312" font-size="32" font-weight="900" text-anchor="middle" fill="${K}">${label}</text>
<circle cx="${x+90}" cy="356" r="22" fill="#555" ${st(3)}/><circle cx="${x+430}" cy="356" r="22" fill="#555" ${st(3)}/>`;

// 1 連虧想扳回
S.revengeTop=()=>clip('tm1',`
<rect width="960" height="470" fill="#2a1f2e"/>
${monitor(60,40,400,260,'down','-4 連虧')}
<radialGradient id="tmglow1"><stop offset="0" stop-color="#ff5a5f" stop-opacity=".22"/><stop offset="1" stop-color="#ff5a5f" stop-opacity="0"/></radialGradient>
<circle cx="260" cy="170" r="300" fill="url(#tmglow1)"/>
${char(680,200,0.92,'determined','desk',{look:-8,sweat:true})}
${desk(436,'#5a4a3a','#47392c')}
${bubble(520,14,330,78,'這把一定贏回來',32)}
`);
S.revengeBot=()=>clip('tm2',`
<rect width="960" height="470" fill="#cfeaf7"/>
${tmSun(110,90)}
<path d="M0,330 Q240,290 480,330 T960,320 V470 H0 Z" fill="#a9d68f" ${st()}/>
${tmTree(820,250)}${tmTree(720,280,'#9fd08a')}
<rect x="90" y="330" width="230" height="22" rx="6" fill="#c8935f" ${st()}/><path d="M110,352 v60 M300,352 v60" ${st(6)}/>
<rect x="150" y="314" width="110" height="16" rx="4" fill="#9aa3ad" ${st(3)}/>
${char(480,150,0.6,'smile','wave',{legs:true})}
${bubble(560,40,260,78,'今天到此為止',32)}
`);

// 2 跌破停損
S.stopTop=()=>clip('tm3',`
<rect width="960" height="470" fill="#1f2a3c"/>
<rect x="420" y="40" width="500" height="300" rx="12" fill="#222" ${st()}/><rect x="432" y="52" width="476" height="276" rx="4" fill="#0f1420"/>
<path d="M440,200 H900" stroke="#ff5a5f" stroke-width="4" stroke-dasharray="16 10"/><text x="896" y="190" font-size="26" font-weight="900" text-anchor="end" fill="#ff5a5f">停損</text>
<path d="M450,110 L520,140 L570,120 L630,170 L680,160 L740,230 L790,215 L850,290 L890,300" fill="none" stroke="#ff8a8d" stroke-width="5" stroke-linejoin="round"/>
<circle cx="890" cy="300" r="8" fill="#ff5a5f"/>
${char(230,215,0.92,'worried','scratch',{look:8,sweat:true})}
${bubble(330,370,320,74,'再等等就反彈…',30)}
`);
S.stopBot=()=>clip('tm4',`
<rect width="960" height="470" fill="#fbecd6"/>
${win(700,50,190,160,'#bfe3f7','<circle cx="850" cy="90" r="18" fill="#fff3b0"/>')}
${char(380,165,0.92,'determined','hold',{look:0})}
<g transform="rotate(-3 380 400)"><rect x="300" y="340" width="160" height="125" fill="#fff" ${st()}/>
<text x="380" y="374" font-size="24" font-weight="900" text-anchor="middle" fill="${K}">交易計畫</text>
<path d="M318,388 h124" ${st(2)}/>
<text x="322" y="418" font-size="20" font-weight="700" fill="${K}">進場 ✔</text><text x="322" y="448" font-size="20" font-weight="700" fill="#d9454a">停損 ✔</text></g>
<rect x="620" y="300" width="180" height="90" rx="18" fill="#ff8a5b" ${st()}/><text x="710" y="358" font-size="38" font-weight="900" text-anchor="middle" fill="#fff">出場</text>
<rect x="600" y="390" width="220" height="80" fill="#c8935f" ${st()}/>
${bubble(50,40,230,74,'照計畫來',32)}
`);

// 3 錯過大漲
S.missTop=()=>clip('tm5',`
<rect width="960" height="470" fill="#2b3350"/>
<path d="M0,120 h960" stroke="#3d4668" stroke-width="40"/>
${tmTrain(500,'#4f7fc9','大漲列車')}
<path d="M420,190 h60 M400,240 h80 M430,290 h50" stroke="#9fb6c9" stroke-width="5" stroke-linecap="round"/>
<text x="620" y="120" font-size="44" font-weight="900" fill="#2fd18a">+150% ↗</text>
${tmPlatform('#6b7290','#4c5270')}
${char(200,205,0.85,'sad','wave',{look:10})}
`);
S.missBot=()=>clip('tm6',`
<rect width="960" height="470" fill="#ffe9cf"/>
${tmSun(860,80,34)}
${tmTrain(-130,'#f2a65a','下一班')}
<rect x="380" y="40" width="220" height="64" rx="10" fill="#fff" ${st()}/><text x="490" y="84" font-size="30" font-weight="900" text-anchor="middle" fill="${K}">機會時常有</text>
${tmPlatform('#e9d2b6','#d9b994')}
${char(640,150,0.82,'smile','hold',{look:-8})}
${mug(612,328)}
`);

// 4 憑感覺進場
S.gutTop=()=>clip('tm7',`
<rect width="960" height="470" fill="#2d2440"/>
${char(330,215,0.92,'sleep','wave',{look:0})}
<g transform="rotate(-18 560 110)"><rect x="510" y="60" width="100" height="100" rx="16" fill="#fff" ${st()}/><text x="560" y="128" font-size="48" font-weight="900" text-anchor="middle" fill="#2fd18a">買</text></g>
<g transform="rotate(14 720 200)"><rect x="680" y="160" width="80" height="80" rx="14" fill="#fff" ${st()}/><text x="720" y="215" font-size="40" font-weight="900" text-anchor="middle" fill="#ff5a5f">賣</text></g>
<path d="M600,180 q30,40 60,10" fill="none" stroke="#9a8fc0" stroke-width="4" stroke-dasharray="8 8"/>
${bubble(620,320,280,74,'感覺會漲！',32)}
<text x="80" y="110" font-size="70" font-weight="900" fill="#7a6aa8">?</text>
`);
S.gutBot=()=>clip('tm8',`
<rect width="960" height="470" fill="#fff4dc"/>
${win(70,50,190,160,'#bfe3f7','<circle cx="220" cy="90" r="18" fill="#fff3b0"/>')}
${char(500,170,0.92,'determined','write',{look:0})}
${desk(426,'#d6a46d','#c08b55')}
<rect x="610" y="250" width="270" height="170" fill="#fff" ${st()}/>
<text x="745" y="286" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">今日交易</text>
<g font-size="20" font-weight="700" fill="${K}"><text x="630" y="324">理由：突破</text><text x="630" y="356">停損：-2%</text><text x="630" y="388">心得：有耐心</text></g>
${mug(150,362)}
`);

// 5 看不懂行情
S.chopTop=()=>clip('tm9',`
<rect width="960" height="470" fill="#232a3a"/>
<rect x="480" y="40" width="440" height="280" rx="12" fill="#222" ${st()}/><rect x="492" y="52" width="416" height="256" rx="4" fill="#0f1420"/>
<path d="M510,180 L540,110 L570,250 L600,90 L630,230 L660,140 L690,280 L720,100 L750,240 L780,130 L810,260 L840,120 L870,200 L890,170" fill="none" stroke="#ffcf5c" stroke-width="4" stroke-linejoin="round"/>
<path d="M700,320 v40 M640,360 h120" ${st(8)}/>
${char(260,210,0.92,'worried','chinboth',{look:8})}
<g font-weight="900" fill="#8a9ac0"><text x="70" y="110" font-size="60">?</text><text x="400" y="90" font-size="48">?</text><text x="420" y="300" font-size="56">?</text></g>
`);
S.chopBot=()=>clip('tm10',`
<rect width="960" height="470" fill="#fdf0d9"/>
${win(80,40,220,180,'#bfe3f7','<circle cx="250" cy="85" r="22" fill="#fff3b0"/>')}
<path d="M300,220 L520,470 L120,470 L80,220 Z" fill="#fff6c8" opacity=".5"/>
${char(460,165,0.92,'smile','hold',{look:0})}
<path d="M380,400 L460,410 L540,400 L540,470 L460,478 L380,470 Z" fill="#ffffff" ${st()}/><path d="M460,410 V478" ${st(3)}/>
<path d="M398,420 h44 M398,436 h44 M478,420 h44 M478,436 h44" stroke="#bbb" stroke-width="3"/>
<rect x="660" y="190" width="240" height="160" rx="12" fill="#444" ${st()}/><rect x="672" y="202" width="216" height="136" rx="4" fill="#2a2a2a"/>
<path d="M780,350 v40 M720,390 h120" ${st(8)}/>
<path d="M250,174 q-20,-50 10,-80 q30,30 10,80 Z" fill="#8cc47a" ${st(3)}/><rect x="236" y="174" width="48" height="46" rx="6" fill="#e58f5c" ${st(3)}/>
${bubble(620,40,280,74,'空手也是一種部位',28)}
`);

// 6 連贏覺得自己很神
S.streakTop=()=>clip('tm11',`
<rect width="960" height="470" fill="#2b1f3a"/>
<rect x="40" y="40" width="200" height="80" rx="12" fill="#222" ${st()}/><text x="140" y="94" font-size="34" font-weight="900" text-anchor="middle" fill="#2fd18a">5 連勝</text>
${char(480,175,0.9,'happy','hold',{look:0})}
<path d="M420,98 L430,50 L455,78 L480,40 L505,78 L530,50 L540,98 Z" fill="#ffcf3d" ${st(4)}/>
${tmChips(420,440,5)}${tmChips(490,440,7,'#3a7bd5')}${tmChips(560,440,6,'#2fae6a')}
<rect x="640" y="380" width="240" height="60" rx="10" fill="#ff5a5f" ${st()}/><text x="760" y="422" font-size="32" font-weight="900" text-anchor="middle" fill="#fff">ALL IN</text>
${bubble(640,40,260,74,'我是天才吧',32)}
`);
S.streakBot=()=>clip('tm12',`
<rect width="960" height="470" fill="#e9f3e4"/>
${tmSun(110,90,34)}
${char(480,175,0.9,'smile','hold',{look:0})}
${tmChips(480,445,2,'#3a7bd5')}
${tmChips(780,440,9,'#2fae6a')}<text x="780" y="300" font-size="24" font-weight="900" text-anchor="middle" fill="#2f4a26">先放旁邊</text>
<rect x="620" y="40" width="270" height="80" rx="12" fill="#fff" ${st()}/><text x="755" y="94" font-size="32" font-weight="900" text-anchor="middle" fill="${K}">固定部位 1%</text>
`);
