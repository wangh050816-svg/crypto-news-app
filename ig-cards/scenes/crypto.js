// 幣圈類場景（幣圈生存的6個體悟）
S.fomoTop=()=>clip('g1',`
<rect width="960" height="470" fill="#2c3047"/>
${monitor(540,40,380,250,'up','+87%')}
${char(300,215,0.95,'worried','chin',{look:6,sweat:true})}
${bubble(40,40,170,70,'必漲！',32)}${bubble(370,20,150,64,'會漲！',30)}
<text x="470" y="200" font-size="60" font-weight="900" fill="#ffcf5c">?!</text>
`);
S.fomoBot=()=>clip('g2',`
<rect width="960" height="470" fill="#efe4d3"/>
${win(80,40,200,170,'#bfe3f7','<circle cx="240" cy="80" r="20" fill="#fff3b0"/>')}
${char(480,195,0.95,'smile','down',{look:0})}
${desk(410)}
<path d="M640,404 l150,0 l-10,-12 l-130,0 Z" fill="#9aa3ad" ${st(3)}/><rect x="650" y="380" width="130" height="14" rx="4" fill="#b8c0c8" ${st(3)}/>
${mug(300,348)}
${bubble(600,60,250,84,'等等再說',34)}
`);

S.nightTop=()=>clip('h1',`
<rect width="960" height="470" fill="#1d2138"/>
${monitor(60,40,400,260,'down','-23%')}
<radialGradient id="mglow"><stop offset="0" stop-color="#ff5a5f" stop-opacity=".25"/><stop offset="1" stop-color="#ff5a5f" stop-opacity="0"/></radialGradient>
<circle cx="260" cy="170" r="300" fill="url(#mglow)"/>
${char(660,190,0.95,'tired','chin',{look:-8,sweat:true})}
${desk(420,'#5a4a3a','#47392c')}
<rect x="780" y="40" width="140" height="60" rx="10" fill="#222" ${st()}/><text x="850" y="82" font-size="34" font-weight="900" fill="#ff6b6b" text-anchor="middle" font-family="monospace">03:12</text>
`);
S.nightBot=()=>S.sleepBot();

S.x100Top=()=>clip('i1',`
<rect width="960" height="470" fill="#2a1f3d"/>
<rect x="580" y="130" width="250" height="360" rx="20" fill="#d94b5b" ${st()}/>
<rect x="560" y="60" width="290" height="80" rx="16" fill="#ffcf3d" ${st()}/><text x="705" y="116" font-size="44" font-weight="900" text-anchor="middle" fill="#7a2030">100x 槓桿</text>
<rect x="605" y="170" width="200" height="90" rx="10" fill="#fff" ${st()}/>
<g font-size="52" font-weight="900" text-anchor="middle" fill="${K}"><text x="640" y="234">7</text><text x="705" y="234" fill="#f7931a">₿</text><text x="770" y="234">7</text></g>
<path d="M672,170 v90 M738,170 v90" ${st(3)}/>
<path d="M838,320 L870,200" ${st(8)}/><circle cx="872" cy="192" r="18" fill="#ff5a5f" ${st()}/>
${char(360,215,0.95,'happy','wave',{look:6,sweat:true})}
${coin(120,90,24)}${coin(200,170,18)}${coin(90,260,20)}
`);
S.x100Bot=()=>{
  let st5='';const labels=['學習','存錢','定投','等待','複利'];
  labels.forEach((l,i)=>{const x=60+i*170,y=410-i*65;st5+=`<rect x="${x}" y="${y}" width="${960-x}" height="${470-y+10}" fill="${['#cfe0c3','#bcd4ae','#a9c799','#96bb85','#84ae72'][i]}" ${st()}/><text x="${x+120}" y="${y+40}" font-size="28" font-weight="900" text-anchor="middle" fill="#2f4a26">${l}</text>`});
  return clip('i2',`<rect width="960" height="470" fill="#eaf4fb"/>
<circle cx="120" cy="90" r="40" fill="#ffe08a"/>
${st5}
${char(440,45,0.5,'smile','down',{legs:true})}
<path d="M845,150 V40" ${st(5)}/><path d="M845,40 L920,58 L845,76 Z" fill="#ff6b5b" ${st(3)}/><text x="870" y="64" font-size="18" font-weight="900" fill="#fff" text-anchor="middle">自由</text>
`)};

S.tipTop=()=>clip('j1',`
<rect width="960" height="470" fill="#d9d4cc"/><rect y="410" width="960" height="60" fill="#c4bdb2"/>
${char(300,225,0.92,'smile','chin',{look:8})}
${char(660,225,0.92,'happy','chin',{look:-8,dark:true,shirt:'#ffe9a8'})}
${bubble(560,30,340,90,'穩賺不賠！內線！',34)}
${coin(470,130,22)}${coin(510,180,16)}
`);
S.tipBot=()=>clip('j2',`
<rect width="960" height="470" fill="#fbe9dc"/><rect y="410" width="960" height="60" fill="#f1d3bd"/>
${char(660,225,0.92,'neutral','down',{look:-8,dark:true,shirt:'#ffe9a8'})}
${char(280,225,0.92,'smile','wave',{look:0})}
${bubble(330,30,240,84,'不了，謝謝',34)}
<text x="760" y="140" font-size="56" font-weight="900" fill="#c9a07a">?</text>
<g transform="translate(60,60)"><path d="M0,0 h70 M10,24 h50 M20,48 h30" stroke="#d6b394" stroke-width="6" stroke-linecap="round"/></g>
`);

S.bagTop=()=>clip('k1',`
<rect width="960" height="470" fill="#7d7a78"/>
${monitor(300,20,360,150,'down','-60%')}
${char(480,262,0.85,'sad','desk',{look:0,headAfter:true})}
${desk(440,'#8f6a4a','#7a5a3d')}
<path d="M140,80 q0,-30 34,-30 q18,-24 46,-8 q34,-8 38,24 q26,8 8,32 h-116 q-16,-4 -10,-18 Z" fill="#5f5a56" stroke="#3a3633" stroke-width="3"/><path d="M170,120 l-6,16 M200,120 l-6,16 M230,120 l-6,16" stroke="#9fb6c9" stroke-width="3"/>
`);
S.bagBot=()=>clip('k2',`
<rect width="960" height="470" fill="#fff1c7"/>
<g transform="rotate(-4 140 110)"><rect x="80" y="60" width="130" height="110" fill="#ffe57a" ${st(3)}/><text x="145" y="125" font-size="30" font-weight="900" text-anchor="middle" fill="${K}">設停損</text></g>
<g transform="rotate(5 800 100)"><rect x="740" y="50" width="130" height="110" fill="#b9e3c6" ${st(3)}/><text x="805" y="115" font-size="30" font-weight="900" text-anchor="middle" fill="${K}">別追高</text></g>
<g transform="rotate(-3 810 250)"><rect x="750" y="200" width="130" height="100" fill="#f7c6d0" ${st(3)}/><text x="815" y="260" font-size="30" font-weight="900" text-anchor="middle" fill="${K}">控倉位</text></g>
${char(480,172,0.95,'determined','write',{look:0})}
${desk(426,'#d6a46d','#c08b55')}
<rect x="370" y="400" width="200" height="30" fill="#fff" ${st(3)}/><text x="470" y="424" font-size="20" font-weight="900" text-anchor="middle" fill="${K}">交易日記</text>
`);

S.profitTop=()=>clip('l1',`
<rect width="960" height="470" fill="#24304a"/>
${monitor(520,40,400,260,'up','+300%')}
${char(300,215,0.95,'happy','chin',{look:6})}
<g fill="#fff" opacity=".9"><circle cx="40" cy="410" r="0"/></g>
${bubble(40,30,300,84,'再等等會更高',32)}
${coin(470,330,20)}${coin(440,400,16)}
`);
S.profitBot=()=>clip('l2',`
<rect width="960" height="470" fill="#e6f2e4"/>
${char(480,170,0.95,'happy','hold',{look:0})}
<path d="M410,330 h140 v110 q0,26 -26,26 h-88 q-26,0 -26,-26 Z" fill="#dff3ff" opacity=".95" ${st()}/><rect x="402" y="314" width="156" height="22" rx="6" fill="#8a6a4a" ${st()}/>
<rect x="430" y="366" width="100" height="40" rx="6" fill="#fff" ${st(3)}/><text x="480" y="395" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">落袋</text>
${coin(450,440,14)}${coin(492,446,14)}${coin(520,432,12)}
${coin(590,280,18)}${coin(370,300,16)}
<path d="M170,120 l10,24 l24,10 l-24,10 l-10,24 l-10,-24 l-24,-10 l24,-10 Z" fill="#ffcf3d" ${st(3)}/>
<path d="M800,90 l7,17 l17,7 l-17,7 l-7,17 l-7,-17 l-17,-7 l17,-7 Z" fill="#ffcf3d" ${st(3)}/>
`);

