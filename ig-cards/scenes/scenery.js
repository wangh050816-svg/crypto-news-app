// 無人物場景：風景版與靜物版（用比喻呈現，不畫小人）
const scStars=(n,w=960,h=200)=>{let s='';for(let i=0;i<n;i++)s+=`<circle cx="${(i*137)%w}" cy="${(i*71)%h+10}" r="${i%3?1.6:2.4}" fill="#fff" opacity=".8"/>`;return s};
const scHourglass=(x,y,h=300)=>{const w=h*.55;return `
<rect x="${x-w/2-16}" y="${y}" width="${w+32}" height="20" rx="6" fill="#a97446" ${st()}/><rect x="${x-w/2-16}" y="${y+h-20}" width="${w+32}" height="20" rx="6" fill="#a97446" ${st()}/>
<path d="M${x-w/2},${y+20} Q${x-w/2},${y+h/2-20} ${x-8},${y+h/2} Q${x-w/2},${y+h/2+20} ${x-w/2},${y+h-20} H${x+w/2} Q${x+w/2},${y+h/2+20} ${x+8},${y+h/2} Q${x+w/2},${y+h/2-20} ${x+w/2},${y+20} Z" fill="#dff3ff" fill-opacity=".35" ${st()}/>`};

// 風景版：深夜辦公大樓 → 陽光下自己轉的風車
S.landLevTop=()=>clip('sc1',`
<rect width="960" height="470" fill="#1a2036"/>${scStars(40)}
<circle cx="820" cy="80" r="34" fill="#f6e7a8"/>
<rect x="40" y="200" width="150" height="270" fill="#2a3150" ${st()}/><rect x="700" y="230" width="200" height="240" fill="#2a3150" ${st()}/>
<rect x="330" y="70" width="300" height="400" fill="#323a5c" ${st()}/>
${[...Array(28)].map((_,i)=>{const c=i%4,r=Math.floor(i/4),lit=i===13;return `<rect x="${355+c*70}" y="${100+r*48}" width="44" height="30" fill="${lit?'#ffe9a0':'#1f2540'}" ${st(2)}/>`}).join('')}
<path d="M430,${100+3*48+30} l0,0" /><circle cx="510" cy="40" r="0"/>
<rect x="408" y="38" width="144" height="30" rx="6" fill="#222" ${st(3)}/><text x="480" y="62" font-size="22" font-weight="900" text-anchor="middle" fill="#ff6b6b" font-family="monospace">23:58</text>
<path d="M0,440 H960" stroke="#3d4668" stroke-width="60"/>
`);
S.landLevBot=()=>clip('sc2',`
<rect width="960" height="470" fill="#cfeaf7"/>
${tmSun(130,90,40)}
<path d="M0,330 Q240,280 480,320 T960,300 V470 H0 Z" fill="#a9d68f" ${st()}/>
<path d="M0,400 Q300,370 600,400 T960,390 V470 H0 Z" fill="#f2d27a" ${st()}/>
${[60,140,220,300,380,460,540,620,700,780,860,940].map(x=>`<path d="M${x},${470} q6,-40 0,-70" fill="none" stroke="#c9a64a" stroke-width="4"/>`).join('')}
<path d="M600,330 L630,130 L670,130 L700,330 Z" fill="#fff" ${st()}/><rect x="636" y="270" width="28" height="60" rx="12" fill="#c8935f" ${st(3)}/>
<g transform="rotate(20 650 130)"><path d="M650,130 L650,10 L690,20 L660,130 Z M650,130 L770,130 L760,170 L650,140 Z M650,130 L650,250 L610,240 L640,130 Z M650,130 L530,130 L540,90 L650,120 Z" fill="#ffe9a8" ${st(3)}/></g>
<circle cx="650" cy="130" r="12" fill="#c8935f" ${st(3)}/>
<path d="M790,90 q30,10 40,40 M520,230 q-30,-10 -40,-40" fill="none" stroke="#7aa6c2" stroke-width="4" stroke-linecap="round"/>
${coin(820,240,16)}${coin(860,200,13)}${coin(780,280,12)}
`);

// 靜物版：沙漏漏下的是硬幣 → 窗台上自己長的錢樹
S.objLevTop=()=>clip('sc3',`
<rect width="960" height="470" fill="#20263a"/>
<path d="M120,0 L60,70 H220 Z" fill="#555" ${st(3)}/><path d="M60,70 L-20,470 H320 L220,70 Z" fill="#9fb6c9" opacity=".08"/>
<rect y="400" width="960" height="70" fill="#3a3046" ${st()}/>
${scHourglass(480,90,310)}
<path d="M480,250 V376" stroke="#ffcf3d" stroke-width="3" stroke-dasharray="4 10"/>
${coin(480,384,14)}${coin(456,380,12)}${coin(502,382,12)}
<path d="M420,170 Q480,200 540,170 L520,120 H440 Z" fill="#ffcf3d" opacity=".9"/>
<rect x="680" y="300" width="200" height="100" fill="#e9e4da" ${st()}/><rect x="690" y="285" width="200" height="100" fill="#f4f0e8" ${st()}/><text x="790" y="345" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">工時表</text>
`);
S.objLevBot=()=>clip('sc4',`
<rect width="960" height="470" fill="#fdf0d9"/>
${win(560,40,320,280,'#bfe3f7','<circle cx="820" cy="90" r="26" fill="#fff3b0"/><path d="M570,270 Q700,230 870,260 V320 H570 Z" fill="#a9d68f"/>')}
<path d="M560,320 L360,470 H120 L560,40 Z" fill="#fff6c8" opacity=".35"/>
<path d="M330,410 h140 l-16,60 h-108 Z" fill="#e58f5c" ${st()}/><rect x="320" y="396" width="160" height="22" rx="6" fill="#d77a4a" ${st()}/>
<path d="M400,396 C400,320 380,260 400,180" fill="none" stroke="#6b4a2b" stroke-width="10" stroke-linecap="round"/>
<path d="M398,300 C360,290 330,260 320,230 M402,250 C440,240 470,210 480,180" fill="none" stroke="#6b4a2b" stroke-width="7" stroke-linecap="round"/>
${[[320,226],[300,196],[480,176],[500,146],[400,170],[430,130],[370,140],[350,260],[455,215]].map(([x,y],i)=>i%3===0?coin(x,y,18):`<ellipse cx="${x}" cy="${y}" rx="24" ry="14" fill="#8cc47a" ${st(3)}/>`).join('')}
<path d="M140,330 h110 v70 q0,20 -20,20 h-70 q-20,0 -20,-20 Z" fill="#7fb3e0" ${st()}/><path d="M250,345 l60,-40" ${st(8)}/><path d="M250,345 l60,-40" stroke="#7fb3e0" stroke-width="4"/>
<rect x="100" y="420" width="760" height="50" fill="#d6a46d" ${st()}/>
`);
