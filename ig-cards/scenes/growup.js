// 長大後才發現的6件事：上格童年（亮、暖），下格長大後（暗、冷）。電影感版型（layout:'cine'）使用
const guEnvelope=(x,y,k,rot,fill)=>`<g transform="rotate(${rot} ${x} ${y})"><rect x="${x-34*k}" y="${y-48*k}" width="${68*k}" height="${96*k}" rx="${4*k}" fill="${fill}"/><rect x="${x-14*k}" y="${y-20*k}" width="${28*k}" height="${28*k}" fill="none" stroke="#ffcf3d" stroke-width="${2*k}"/><text x="${x}" y="${y}" font-size="${18*k}" font-weight="900" text-anchor="middle" fill="#ffcf3d">福</text></g>`;
const guLamp=(x,y,h,c,lit)=>`<rect x="${x-4}" y="${y-h}" width="8" height="${h}" fill="${c}"/><path d="M${x},${y-h} q30,-6 40,10" stroke="${c}" stroke-width="7" fill="none"/><rect x="${x+28}" y="${y-h+6}" width="26" height="10" rx="3" fill="${lit}"/>`;
const guBike=(x,y,c)=>`<circle cx="${x-40}" cy="${y}" r="28" fill="none" stroke="${c}" stroke-width="5"/><circle cx="${x+40}" cy="${y}" r="28" fill="none" stroke="${c}" stroke-width="5"/><path d="M${x-40},${y} L${x-6},${y-40} L${x+26},${y-40} L${x+40},${y} M${x-6},${y-40} L${x+4},${y} L${x-40},${y} M${x+22},${y-50} h16 M${x-12},${y-48} h18" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`;

// 1 以為長大會很了不起 → 能過完一天就很了不起：晴空風箏 → 深夜回家路上一盞路燈
S.guAmazeTop=()=>clip('gu1',`
${phSky('gu1s',[[0,'#5fb0f0'],[1,'#e2f2f8']])}
${phClouds('gu1c',[1,1,1],.7,'0.004 0.015',1501,0,220)}
${phGlow('gu1g',160,80,240,'#fffbe0',.9)}
<path d="M0,470 L0,360 Q480,330 960,360 L960,470 Z" fill="#8fc46a"/>
<g transform="translate(-40,90)"><path d="M620,120 L680,90 L700,150 L640,170 Z" fill="#ff6b6b"/><path d="M620,120 L700,150 M680,90 L640,170" stroke="#fff" stroke-width="2"/>
<path d="M660,150 Q600,260 520,300 Q440,340 380,420" stroke="#fff" stroke-width="2" fill="none"/>
${[[640,180],[628,196],[612,210]].map(([x,y],i)=>`<path d="M${x},${y} l${-8+i*2},6 l8,4 Z" fill="${['#ffd25a','#5fb0f0','#7cc65a'][i]}"/>`).join('')}</g>
${phGrain('gu1n')}
`);
S.guAmazeBot=()=>clip('gu2',`
${phSky('gu2s',[[0,'#05070e'],[1,'#121826']])}
${phCity(1502,330,40,140,'#0c1018','#ffd98a','#121624',.03)}
<path d="M0,470 L0,330 L960,330 L960,470 Z" fill="#0e1018"/>
<path d="M360,470 L470,330 L490,330 L600,470 Z" fill="#1a1e28"/>
${guLamp(640,380,200,'#2a3040','#ffd98a')}${phGlow('gu2l',680,192,160,'#ffd98a',.4)}
<path d="M670,196 L560,470 L820,470 Z" fill="#ffd98a" opacity=".06"/>
${phGrain('gu2n')}
`);

// 2 拿紅包 → 包紅包：陽光桌上的紅包和糖果盒 → 深夜桌上的空紅包袋和鈔票
S.guRedTop=()=>clip('gu3',`
<rect width="960" height="470" fill="#fbe2c4"/>
${phGlow('gu3g',300,100,380,'#fff2d0',.8)}<path d="M120,0 L560,470 L-60,470 Z" fill="#fff6d8" opacity=".35"/>
${ckTable(330,'#d89a6a','#b87a4a')}
${guEnvelope(340,300,1.3,-12,'#d8333a')}${guEnvelope(420,296,1.3,6,'#e0403a')}${guEnvelope(490,304,1.3,18,'#d8333a')}
<ellipse cx="700" cy="320" rx="120" ry="30" fill="#c8302a"/><ellipse cx="700" cy="310" rx="110" ry="26" fill="#e84a3a"/>${[[650,306,'#ffcf3d'],[700,300,'#7cc65a'],[745,308,'#ff8fa8'],[690,318,'#5fb0f0']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="12" fill="${c}"/>`).join('')}
${phGrain('gu3n')}
`);
S.guRedBot=()=>clip('gu4',`
<rect width="960" height="470" fill="#08090e"/>
<path d="M720,0 L660,70 H780 Z" fill="#2a2c34"/>${phGlow('gu4g',720,280,300,'#ffe6b0',.25)}
${ckTable(340,'#1e1a16','#141210')}
${[0,1,2,3,4].map(i=>guEnvelope(520+i*44,300,1.1,-10+i*5,'#7a2024')).join('')}
${[0,1,2].map(i=>`<rect x="${300+i*6}" y="${296-i*6}" width="150" height="70" rx="4" fill="#6a8a6a" opacity=".85"/>`).join('')}<text x="390" y="320" font-size="22" font-weight="900" text-anchor="middle" fill="#cfe0cf">1000</text>
${phGrain('gu4n')}
`);

// 3 一百塊很有錢 → 薪水先少一半：陽光糖果罐 → 深夜帳單與手機
S.guRichTop=()=>clip('gu5',`
<rect width="960" height="470" fill="#fbe8cc"/>
${phGlow('gu5g',480,120,420,'#fff2d0',.8)}
<rect x="80" y="40" width="800" height="16" fill="#c89a6a"/>
${ckTable(320,'#d8b088','#b8906a')}
${[0,1,2,3].map(i=>{const x=200+i*170,c=['#ff8fa8','#ffd25a','#7cc65a','#5fb0f0'][i];return `<rect x="${x-50}" y="180" width="100" height="140" rx="14" fill="#e6f4fb" fill-opacity=".35" stroke="#cfe2ee" stroke-width="3"/>${[...Array(12)].map((_,j)=>`<circle cx="${x-34+(j%4)*22}" cy="${300-Math.floor(j/4)*24}" r="10" fill="${c}"/>`).join('')}<rect x="${x-54}" y="168" width="108" height="16" rx="5" fill="#c8a47a"/>`}).join('')}
<rect x="380" y="372" width="200" height="56" rx="6" fill="#fff8e8"/><text x="480" y="410" font-size="30" font-weight="900" text-anchor="middle" fill="#d84a4a">NT$100</text>
${phGrain('gu5n')}
`);
S.guRichBot=()=>clip('gu6',`
<rect width="960" height="470" fill="#07080e"/>
${phGlow('gu6g',600,280,280,'#7fa8ff',.12)}
${ckTable(340,'#1e1a16','#141210')}
${[0,1,2,3].map(i=>`<g transform="rotate(${i*7-10} ${330+i*40} 310)"><rect x="${260+i*40}" y="270" width="150" height="80" fill="#d8d4c8"/><path d="M${272+i*40},286 h90 M${272+i*40},300 h70 M${272+i*40},314 h110" stroke="#888" stroke-width="3"/><text x="${398+i*40}" y="340" font-size="16" font-weight="900" text-anchor="end" fill="#a83a3a">-${[3200,1800,12000,4500][i]}</text></g>`).join('')}
<rect x="620" y="240" width="90" height="160" rx="12" fill="#1a1c24"/><rect x="628" y="252" width="74" height="136" rx="6" fill="#2a3a5a"/><path d="M640,330 L660,300 L676,316 L692,280" stroke="#ff6b6b" stroke-width="3" fill="none"/><text x="665" y="280" font-size="14" font-weight="900" text-anchor="middle" fill="#cfe0ff">-50%</text>
${phGrain('gu6n')}
`);

// 4 吵完架隔天和好 → 不用吵架也會走散：公園並排的腳踏車 → 夜裡分岔的兩條路
S.guFriendTop=()=>clip('gu7',`
${phSky('gu7s',[[0,'#7ec0f0'],[1,'#eef6e6']])}
${phGlow('gu7g',780,80,240,'#fffbe0',.9)}
${phClouds('gu7c',[1,1,1],.55,'0.004 0.015',1503,0,170)}
<path d="M0,470 L0,330 Q480,310 960,330 L960,470 Z" fill="#8fc46a"/>
${phTree(1504,150,340,1,'#4f8a3a')}${phTree(1505,830,330,.9,'#5a9a46')}
${guBike(400,400,'#d8333a')}${guBike(560,400,'#3a7bd5')}
${phGrain('gu7n')}
`);
S.guFriendBot=()=>clip('gu8',`
${phSky('gu8s',[[0,'#05070e'],[1,'#141a28']])}
${phClouds('gu8c',[.2,.22,.28],.6,'0.004 0.015',1506,0,200)}
<path d="M0,470 L0,300 L960,300 L960,470 Z" fill="#0c0f16"/>
<path d="M400,470 L470,390 L240,300 L262,300 L480,380 L700,300 L722,300 L490,390 L560,470 Z" fill="#1c2030"/>
${guLamp(220,330,140,'#2a3040','#ffd98a')}${phGlow('gu8a',260,196,90,'#ffd98a',.35)}
${guLamp(700,330,140,'#2a3040','#ffd98a')}${phGlow('gu8b',740,196,90,'#ffd98a',.35)}
${phGrain('gu8n')}
`);

// 5 十八歲好遙遠 → 一年快得像一個月：夏日慢飄的雲 → 深夜只剩幾頁的日曆
S.guTimeTop=()=>clip('gu9',`
${phSky('gu9s',[[0,'#4aa8f0'],[1,'#d8f0f8']])}
${phClouds('gu9c',[1,1,1],.85,'0.003 0.012',1507,0,300)}
${phGlow('gu9g',800,90,240,'#fffbe0',.9)}
<path d="M0,470 L0,390 Q480,370 960,390 L960,470 Z" fill="#8fc46a"/>
${phGrain('gu9n')}
`);
S.guTimeBot=()=>clip('gu10',`
<rect width="960" height="470" fill="#0a0c12"/>
${phGlow('gu10g',480,200,260,'#cfd8ff',.1)}
<rect x="400" y="80" width="160" height="200" fill="#e6e2d6"/><rect x="400" y="80" width="160" height="44" fill="#a83a3a"/><text x="480" y="112" font-size="24" font-weight="900" text-anchor="middle" fill="#fff">DEC</text><text x="480" y="230" font-size="90" font-weight="900" text-anchor="middle" fill="#2a2a2a">31</text>
<circle cx="440" cy="70" r="6" fill="#555"/><circle cx="520" cy="70" r="6" fill="#555"/>
<rect x="400" y="80" width="160" height="200" fill="#000" opacity=".35"/>
${[...Array(12)].map((_,i)=>`<rect x="${200+(i*53)%560}" y="${380+(i*17)%60}" width="60" height="40" fill="#cfcabc" opacity=".35" transform="rotate(${(i*37)%60-30} ${230+(i*53)%560} ${400+(i*17)%60})"/>`).join('')}
<rect y="440" width="960" height="30" fill="#07080c"/>
${phGrain('gu10n')}
`);

// 6 生日願望想要很多 → 只希望大家平安健康：陽光下插滿蠟燭的蛋糕 → 夜裡窗邊一根蠟燭
S.guWishTop=()=>clip('gu11',`
<rect width="960" height="470" fill="#fbe8cc"/>
${ckWin(600,40,300,250,'#fff8ec',`${phSky('gu11s',[[0,'#9ccbec'],[1,'#eef4e2']]).replace('<rect width="960" height="470"','<rect x="600" y="40" width="300" height="250"')}${phTree(1508,760,290,.8,'#7aa860')}`)}
${ckTable(370,'#e8c49a','#c8a47a')}
${chCake(360,370,true)}
${[...Array(16)].map((_,i)=>`<rect x="${80+(i*67)%460}" y="${40+(i*53)%200}" width="8" height="14" fill="${['#ff8fa8','#ffd25a','#8fc0f0','#9ad870'][i%4]}" transform="rotate(${i*30} ${84+(i*67)%460} ${47+(i*53)%200})"/>`).join('')}
${phGrain('gu11n')}
`);
S.guWishBot=()=>clip('gu12',`
<rect width="960" height="470" fill="#06070c"/>
${ckWin(300,40,360,280,'#0c0e14',`${phSky('gu12s',[[0,'#070a14'],[1,'#141c2c']]).replace('<rect width="960" height="470"','<rect x="300" y="40" width="360" height="280"')}${(()=>{const r=phRand(1509);let o='';for(let i=0;i<30;i++)o+=`<circle cx="${(300+r()*360).toFixed(0)}" cy="${(40+r()*200).toFixed(0)}" r="${(.6+r()*1.2).toFixed(1)}" fill="#fff" opacity="${(.3+r()*.6).toFixed(2)}"/>`;return o})()}`)}
<rect y="330" width="960" height="140" fill="#0e0f14"/><rect x="260" y="320" width="440" height="16" fill="#1a1c24"/>
${pmCandle(480,320,0,.55,'gu12c')}
${phGrain('gu12n')}
`);
