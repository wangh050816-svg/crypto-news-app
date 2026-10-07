// 生活類場景（人生糾結時的6個建議）
// 1 sleep
S.sleepTop=()=>clip('a1',`
<rect width="960" height="470" fill="#2f3556"/>
${win(70,50,200,190,'#1b2040','<circle cx="215" cy="100" r="26" fill="#f6e7a8"/><circle cx="110" cy="80" r="3" fill="#fff"/><circle cx="150" cy="170" r="2.5" fill="#fff"/>')}
<rect x="300" y="110" width="400" height="360" rx="26" fill="#4a5080" ${st()}/>
<ellipse cx="500" cy="200" rx="150" ry="58" fill="#e8e9f5" ${st()}/>
<radialGradient id="glow"><stop offset="0" stop-color="#bfe6ff" stop-opacity=".4"/><stop offset="1" stop-color="#bfe6ff" stop-opacity="0"/></radialGradient>
${char(500,215,0.95,'tired','hold')}
<circle cx="500" cy="230" r="150" fill="url(#glow)"/>
<path d="M240,350 Q500,320 760,350 L790,470 L210,470 Z" fill="#c9cde6" ${st()}/>
<rect x="462" y="300" width="76" height="118" rx="12" fill="#2a2a2a" ${st()}/><rect x="470" y="310" width="60" height="96" rx="5" fill="#d6f0ff"/>
<circle cx="467" cy="372" r="16" fill="#fff" ${st()}/><circle cx="533" cy="372" r="16" fill="#fff" ${st()}/>
<rect x="760" y="300" width="150" height="170" fill="#5b4a6e" ${st()}/>
<rect x="785" y="250" width="105" height="56" rx="10" fill="#222" ${st()}/><text x="837" y="290" font-size="34" font-weight="900" fill="#ff6b6b" text-anchor="middle" font-family="monospace">02:17</text>
`);
S.sleepBot=()=>clip('a2',`
<rect width="960" height="470" fill="#1e2340"/>
${win(70,50,200,190,'#141833','<circle cx="215" cy="100" r="26" fill="#f6e7a8"/><circle cx="110" cy="80" r="3" fill="#fff"/><circle cx="150" cy="170" r="2.5" fill="#fff"/><circle cx="240" cy="200" r="2" fill="#fff"/>')}
<path d="M80,240 L230,470 L-40,470 Z" fill="#f6e7a8" opacity=".08"/>
<rect x="300" y="110" width="400" height="360" rx="26" fill="#3a3f68" ${st()}/>
<ellipse cx="500" cy="200" rx="150" ry="58" fill="#d5d8ee" ${st()}/>
${char(500,215,0.95,'sleep','down')}
<path d="M240,330 Q500,300 760,330 L790,470 L210,470 Z" fill="#aeb3d6" ${st()}/>
<path d="M300,360 Q360,350 420,365 M560,355 Q630,345 700,360" fill="none" stroke="#8f94bd" stroke-width="4" stroke-linecap="round"/>
<rect x="760" y="300" width="150" height="170" fill="#45385a" ${st()}/>
<rect x="790" y="284" width="70" height="20" rx="5" fill="#222" ${st(3)}/>
${zzz(600,150)}
`);

// 2 midnight snack
const fridgeOpen=()=>`
<rect x="110" y="40" width="250" height="440" rx="14" fill="#fff8d9" ${st()}/>
<path d="M120,170 H350 M120,290 H350" ${st(4)}/>
<path d="M150,170 l40,-60 l40,60 Z" fill="#f7c6d0" ${st(3)}/><path d="M150,170 l40,-60 l40,60" fill="none" ${st(3)}/><path d="M168,140 h44" stroke="#fff" stroke-width="6"/><circle cx="190" cy="104" r="9" fill="#e5474b" ${st(3)}/>
<rect x="270" y="90" width="44" height="80" rx="8" fill="#b9e3c6" ${st(3)}/>
<rect x="150" y="225" width="90" height="65" rx="6" fill="#ffd27a" ${st(3)}/><text x="195" y="268" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">炸雞</text>
<ellipse cx="300" cy="270" rx="34" ry="20" fill="#f5a35c" ${st(3)}/>
<path d="M110,40 L30,10 L30,470 L110,480 Z" fill="#e7eef2" ${st()}/><path d="M52,190 v80" ${st(7)}/>
<path d="M360,40 L700,470 L360,470 Z" fill="#fff4b0" opacity=".35"/>`;
S.snackTop=()=>clip('b1',`
<rect width="960" height="470" fill="#3b3a4a"/><rect y="400" width="960" height="70" fill="#2d2c39"/>
${fridgeOpen()}
<circle cx="820" cy="90" r="48" fill="#fff" ${st()}/><path d="M820,90 V60 M820,90 L842,98" ${st(4)}/>
<text x="820" y="170" font-size="26" font-weight="900" fill="#ddd" text-anchor="middle">23:48</text>
${char(600,215,0.95,'worried','chin',{look:-6,sweat:true})}
<text x="470" y="120" font-size="54" font-weight="900" fill="#ffcf5c">?</text>
`);
S.snackBot=()=>clip('b2',`
<rect width="960" height="470" fill="#dfe7ef"/><rect y="400" width="960" height="70" fill="#c3cfdb"/>
<rect x="110" y="40" width="250" height="440" rx="14" fill="#f2f6f8" ${st()}/><path d="M110,200 H360" ${st()}/><path d="M330,90 v70 M330,240 v100" ${st(8)}/>
<rect x="160" y="250" width="70" height="70" fill="#ffe57a" ${st(3)} transform="rotate(-6 195 285)"/><text x="195" y="296" font-size="38" text-anchor="middle" fill="#e5474b" transform="rotate(-6 195 285)">♥</text>
${char(560,215,0.95,'happy','wave',{look:-4})}
${bubble(690,40,230,90,'晚安～',36)}
`);

// 3 text the ex
S.exTop=()=>clip('c1',`
<rect width="960" height="470" fill="#c9d6e3"/>
<rect x="60" y="250" width="620" height="230" rx="40" fill="#5f7fa3" ${st()}/><rect x="40" y="300" width="80" height="170" rx="30" fill="#6e8eb2" ${st()}/><rect x="620" y="300" width="80" height="170" rx="30" fill="#6e8eb2" ${st()}/>
${char(370,215,0.95,'worried','hold',{look:4,sweat:true})}
<g transform="translate(700,40)">
<rect width="220" height="400" rx="30" fill="#2a2a2a" ${st()}/><rect x="12" y="14" width="196" height="372" rx="20" fill="#f4f6f9"/>
<rect x="12" y="14" width="196" height="54" rx="20" fill="#fff"/><text x="110" y="52" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">前任</text>
<rect x="28" y="96" width="120" height="44" rx="16" fill="#e3e6ea"/><text x="88" y="126" font-size="20" text-anchor="middle" fill="#666">（三個月前）</text>
<rect x="24" y="320" width="172" height="48" rx="18" fill="#fff" ${st(3)}/><text x="40" y="353" font-size="26" font-weight="700" fill="${K}">在嗎？</text><path d="M122,332 v26" stroke="#3a7bf7" stroke-width="3"/>
<circle cx="174" cy="344" r="15" fill="#3a7bf7"/><path d="M168,344 h12 M175,338 l6,6 l-6,6" stroke="#fff" stroke-width="3" fill="none"/>
</g>`);
S.exBot=()=>clip('c2',`
<rect width="960" height="470" fill="#f1e6d4"/>
${win(640,40,220,180,'#bfe3f7','<circle cx="820" cy="80" r="22" fill="#fff3b0"/>')}
<path d="M110,190 q-30,-60 10,-110 q20,40 -10,110 M110,190 q40,-70 90,-80 q-20,60 -90,80 M110,190 q-60,-30 -70,-80 q50,10 70,80" fill="#8fc38a" ${st(3)}/><path d="M80,190 h60 l-10,60 h-40 Z" fill="#e7a37a" ${st()}/>
${char(420,215,0.95,'happy','hold',{look:0})}
<path d="M530,322 h70 v50 q0,20 -20,20 h-30 q-20,0 -20,-20 Z" fill="#ffffff" ${st()}/><path d="M600,336 q22,0 20,20 q-2,16 -20,14" fill="none" ${st()}/><path d="M546,330 h38" stroke="#a0623a" stroke-width="6"/>
<path d="M550,305 q-10,-14 0,-28 M575,300 q-10,-14 0,-28" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round"/>
<rect x="140" y="390" width="680" height="30" fill="#c8935f" ${st()}/><rect x="170" y="420" width="20" height="60" fill="#a97446" ${st()}/><rect x="770" y="420" width="20" height="60" fill="#a97446" ${st()}/>
<rect x="640" y="370" width="110" height="22" rx="6" fill="#2a2a2a" ${st(3)}/>
<text x="695" y="350" font-size="24" font-weight="700" text-anchor="middle" fill="#7a6a55">（蓋著）</text>
`);

// 4 apologize
S.sorryTop=()=>clip('d1',`
<rect width="960" height="470" fill="#d9d4cc"/><rect y="410" width="960" height="60" fill="#c4bdb2"/>
${char(270,225,0.92,'pout','cross',{look:-8})}
${char(690,225,0.92,'pout','cross',{look:8,dark:true,shirt:'#ffe9a8'})}
<path d="M430,90 q0,-40 40,-40 q20,-30 55,-10 q40,-10 45,30 q30,10 10,40 h-140 q-20,-5 -10,-20 Z" fill="#8a8f99" ${st()}/>
<path d="M500,140 l-14,30 h18 l-12,30" fill="none" stroke="#ffd34d" stroke-width="6" stroke-linejoin="round"/>
<path d="M200,110 l-16,-14 M214,98 l-6,-20 M226,104 l8,-18" ${st(4)}/>
`);
S.sorryBot=()=>clip('d2',`
<rect width="960" height="470" fill="#fbe9dc"/><rect y="410" width="960" height="60" fill="#f1d3bd"/>
${char(300,225,0.92,'smile','scratch',{look:6})}
${char(690,225,0.92,'happy','down',{look:-6,dark:true,shirt:'#ffe9a8'})}
${bubble(360,40,190,84,'對不起',36)}
<path d="M495,215 c-26,-26 -60,4 -30,32 l30,26 l30,-26 c30,-28 -4,-58 -30,-32 Z" fill="#ff7d8a" ${st()}/>
`);

// 5 umbrella
S.umbTop=()=>clip('e1',`
<rect width="960" height="470" fill="#b9b3a7"/>
<rect x="60" y="30" width="230" height="440" fill="#8a5a3c" ${st()}/><circle cx="260" cy="260" r="10" fill="#e8c35a" ${st(3)}/>
${win(640,50,240,180,'#8e98a3','<path d="M670,110 q10,-30 40,-24 q16,-24 46,-8 q30,-6 32,24 q20,10 0,26 h-104 q-20,-6 -14,-18 Z" fill="#cfd4da" stroke="#555" stroke-width="3"/>'+'<path d="M690,160 l-6,16 M720,160 l-6,16 M750,160 l-6,16 M780,160 l-6,16" stroke="#dde6ee" stroke-width="3"/>')}
<rect x="330" y="340" width="70" height="130" fill="#6c7a89" ${st()}/><path d="M365,340 V230 q0,-14 -14,-14" fill="none" ${st(5)}/><path d="M345,345 q20,-140 40,0 Z" fill="#3f8fd8" ${st()}/>
${char(560,215,0.95,'worried','chin',{look:6})}
<text x="420" y="160" font-size="54" font-weight="900" fill="#fff">?</text>
`);
S.umbBot=()=>clip('e2',`
<rect width="960" height="470" fill="#9fb2c2"/>${rain(70,'#e3ecf3')}
<rect y="400" width="960" height="70" fill="#7b8a96"/><ellipse cx="760" cy="430" rx="90" ry="14" fill="#a9c2d3"/><ellipse cx="190" cy="440" rx="70" ry="10" fill="#a9c2d3"/>
${char(480,225,0.92,'happy','umbrella',{look:0})}
<g transform="translate(480,225) scale(0.92)">
<path d="M120,118 L52,-120" ${st(6)}/>
<path d="M-140,-100 Q50,-260 240,-100 Q205,-118 170,-100 Q135,-120 100,-100 Q50,-122 0,-100 Q-35,-120 -70,-100 Q-105,-118 -140,-100 Z" fill="#3f8fd8" ${st()}/>
<path d="M52,-195 Q0,-160 0,-100 M52,-195 Q105,-160 100,-100" fill="none" ${st(3)}/>
</g>
`);

// 6 try again
S.tryTop=()=>clip('f1',`
<rect width="960" height="470" fill="#8f8a85"/>
${char(480,172,0.95,'sad','desk',{look:0,headAfter:true})}
<rect x="80" y="426" width="800" height="30" fill="#b98a5d" ${st()}/><rect x="80" y="456" width="800" height="20" fill="#a3764b" ${st()}/>
<circle cx="200" cy="408" r="22" fill="#fff" ${st(3)}/><path d="M188,398 l20,10 l-14,10" fill="none" ${st(2)}/>
<circle cx="745" cy="410" r="20" fill="#fff" ${st(3)}/><path d="M735,402 l18,12" fill="none" ${st(2)}/>
<circle cx="800" cy="396" r="24" fill="#fff" ${st(3)}/><path d="M790,388 l12,16 l8,-12" fill="none" ${st(2)}/>
<circle cx="140" cy="414" r="16" fill="#fff" ${st(3)}/>
<path d="M420,40 q0,-30 34,-30 q18,-24 46,-8 q34,-8 38,24 q26,8 8,32 h-116 q-16,-4 -10,-18 Z" fill="#5f5a56" stroke="#3a3633" stroke-width="3"/><path d="M450,80 l-6,16 M480,80 l-6,16 M510,80 l-6,16" stroke="#6e8aa3" stroke-width="3"/>
`);
S.tryBot=()=>clip('f2',`
<rect width="960" height="470" fill="#fff1c7"/>
<path d="M480,0 L380,470 M480,0 L580,470" stroke="#fff" stroke-width="0"/>
${char(480,172,0.95,'determined','write',{look:0})}
<rect x="80" y="426" width="800" height="30" fill="#d6a46d" ${st()}/><rect x="80" y="456" width="800" height="20" fill="#c08b55" ${st()}/>
<rect x="400" y="408" width="170" height="20" fill="#fff" ${st(3)}/>
<path d="M150,90 l10,24 l24,10 l-24,10 l-10,24 l-10,-24 l-24,-10 l24,-10 Z" fill="#ffcf3d" ${st(3)}/>
<path d="M800,70 l7,17 l17,7 l-17,7 l-7,17 l-7,-17 l-17,-7 l17,-7 Z" fill="#ffcf3d" ${st(3)}/>
<path d="M770,190 l5,12 l12,5 l-12,5 l-5,12 l-5,-12 l-12,-5 l12,-5 Z" fill="#ffcf3d" ${st(2)}/>
<g transform="translate(700,250) rotate(8)"><path d="M0,0 V-150" ${st(5)}/><path d="M0,-150 L110,-125 L0,-100 Z" fill="#ff6b5b" ${st()}/><text x="40" y="-117" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">GO</text></g>
`);


