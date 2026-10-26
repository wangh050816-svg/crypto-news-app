// 單格語錄場景（納瓦爾寶典）：S.<key>Q，畫布 960×640，用 qclip()
const stars=(n,h=300)=>{let s='';for(let i=0;i<n;i++){s+=`<circle cx="${(i*137)%960}" cy="${20+(i*71)%h}" r="${1.5+(i%3)}" fill="#fff" opacity="${.4+(i%4)*.15}"/>`}return s};
const sprout=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 V-26" stroke="#3f8a4f" stroke-width="5" stroke-linecap="round"/><path d="M0,-20 q-22,-4 -26,-22 q20,-2 26,22 Z M0,-24 q20,-8 28,-26 q-22,0 -28,26 Z" fill="#7cc576" ${st(3)}/></g>`;

// 1 財富是睡覺時也在賺錢的資產
S.wealthQ=()=>qclip('n1',`
<defs><linearGradient id="n1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141a38"/><stop offset="1" stop-color="#2f3f6e"/></linearGradient></defs>
<rect width="960" height="640" fill="url(#n1sky)"/>${stars(40,380)}
<circle cx="140" cy="110" r="46" fill="#f6e7a8"/><circle cx="162" cy="96" r="46" fill="#1a2142" opacity=".0"/>
<path d="M0,540 Q240,500 480,530 T960,520 V640 H0 Z" fill="#24402f"/>
<path d="M650,560 L668,250 Q690,230 712,250 L730,560 Z" fill="#7a5232" ${st()}/>
<path d="M690,300 q-50,-30 -90,-20 M700,280 q40,-40 90,-30" fill="none" ${st(6)}/>
<circle cx="690" cy="190" r="150" fill="#3f7a52" ${st()}/><circle cx="580" cy="230" r="80" fill="#4a8a5d" ${st()}/><circle cx="810" cy="230" r="90" fill="#4a8a5d" ${st()}/><circle cx="700" cy="110" r="90" fill="#4f9363" ${st()}/>
${[[620,150],[700,90],[770,170],[650,250],[840,250],[730,240],[590,220],[800,110]].map(([x,y])=>coin(x,y,20)).join('')}
${coin(830,390,18)}${coin(800,450,18)}
<path d="M760,500 h140 l-16,64 h-108 Z" fill="#c8935f" ${st()}/><path d="M770,520 h120 M774,540 h112" stroke="#a97446" stroke-width="4"/>
${coin(800,496,16)}${coin(835,490,16)}${coin(868,498,16)}
${char(470,330,0.78,'sleep','down')}
${zzz(330,250)}
<path d="M0,580 Q300,560 600,585 T960,575 V640 H0 Z" fill="#1c3426"/>
<path d="M300,585 l8,-22 l6,22 M520,590 l8,-24 l8,24 M120,596 l6,-18 l6,18" fill="none" stroke="#3f6b4c" stroke-width="4" stroke-linecap="round"/>
`);

// 2 和長期的人玩長期的遊戲
S.longQ=()=>qclip('n2',`
<defs><linearGradient id="n2sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb07a"/><stop offset="1" stop-color="#ffe2b0"/></linearGradient></defs>
<rect width="960" height="640" fill="url(#n2sky)"/>
<circle cx="480" cy="250" r="110" fill="#fff3cf" opacity=".85"/>
<path d="M0,380 Q200,320 420,360 T960,340 V640 H0 Z" fill="#e7a06e" opacity=".7"/>
<rect y="470" width="960" height="170" fill="#c98a5c"/>
<path d="M60,140 q20,-30 50,-10 M840,110 q24,-26 50,-6 M150,90 q14,-18 32,-6" fill="none" ${st(3)}/>
${char(280,250,0.86,'smile','chin',{look:6})}
${char(680,250,0.86,'happy','chin',{look:-6,dark:true,shirt:'#ffe9a8'})}
<path d="M390,438 L570,438 L600,470 L360,470 Z" fill="#f6e3bd" ${st(3)}/>
${[0,1,2,3,4,5].map(i=>`<path d="M${398+i*36},438 L${372+i*45.6},470" stroke="${K}" stroke-width="2"/>`).join('')}<path d="M376,454 H585" stroke="${K}" stroke-width="2"/>
<circle cx="430" cy="446" r="9" fill="#222" ${st(2)}/><circle cx="470" cy="460" r="9" fill="#fff" ${st(2)}/><circle cx="520" cy="446" r="9" fill="#222" ${st(2)}/><circle cx="548" cy="462" r="9" fill="#fff" ${st(2)}/><circle cx="500" cy="462" r="9" fill="#222" ${st(2)}/>
<rect x="150" y="470" width="660" height="30" fill="#8a5a3a" ${st()}/><rect x="190" y="500" width="22" height="140" fill="#734a2f" ${st()}/><rect x="748" y="500" width="22" height="140" fill="#734a2f" ${st()}/>
<text x="480" y="600" font-size="30" font-weight="900" text-anchor="middle" fill="#7a4e30" letter-spacing="6">第 3,650 局</text>
`);

// 3 欲望是和自己簽的不快樂合約
S.desireQ=()=>qclip('n3',`
<rect width="960" height="640" fill="#383452"/><rect y="560" width="960" height="80" fill="#2a2740"/>
<path d="M210,0 L120,0 L0,560 H330 Z" fill="#fff6c8" opacity=".07"/>
<path d="M150,0 v40" ${st(4)}/><path d="M110,40 h80 l20,40 h-120 Z" fill="#6c6a8a" ${st()}/>
${char(330,240,0.9,'worried','write',{look:10,sweat:true})}
<rect x="60" y="476" width="620" height="28" fill="#7a5a44" ${st()}/><rect x="80" y="504" width="24" height="136" fill="#654836" ${st()}/><rect x="636" y="504" width="24" height="136" fill="#654836" ${st()}/>
<path d="M330,478 L470,478 Q480,560 440,640 L300,640 Q330,560 330,478 Z" fill="#f7f0dc" ${st(3)}/>
<text x="395" y="520" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">合約</text>
<path d="M350,540 h86 M348,560 h92 M346,580 h88" stroke="#b9ae92" stroke-width="3"/>
<text x="378" y="616" font-size="14" font-weight="700" text-anchor="middle" fill="#a33">得到之前・不准快樂</text>
<circle cx="520" cy="250" r="12" fill="#fff" ${st(3)}/><circle cx="560" cy="210" r="18" fill="#fff" ${st(3)}/>
<ellipse cx="740" cy="140" rx="190" ry="110" fill="#fff" ${st()}/>
<g transform="translate(620,110)">
<path d="M10,60 L30,26 Q40,10 60,10 H120 Q140,10 152,30 L170,44 Q196,48 200,62 V80 H0 V66 Z" fill="#ff5a5f" ${st(4)}/>
<path d="M44,28 h40 v22 h-56 Z M96,28 h40 l14,22 h-54 Z" fill="#cfeaff" ${st(3)}/>
<circle cx="44" cy="82" r="18" fill="#333" ${st(3)}/><circle cx="160" cy="82" r="18" fill="#333" ${st(3)}/><circle cx="44" cy="82" r="6" fill="#ccc"/><circle cx="160" cy="82" r="6" fill="#ccc"/>
</g>
${coin(650,80,16)}${coin(840,86,16)}${coin(870,150,14)}
<path d="M800,330 h100 v120 h-100 Z" fill="#4a4568" ${st()}/><path d="M812,350 h76 M812,372 h60" stroke="#8b86b0" stroke-width="4"/>
`);

// 4 對行動要急，對結果要有耐心
S.actQ=()=>qclip('n4',`
<rect width="960" height="640" fill="#bfe6ff"/>
<circle cx="840" cy="100" r="56" fill="#ffe27a" ${st(3)}/><path d="M840,20 v-14 M920,100 h14 M896,44 l10,-10 M784,44 l-10,-10" ${st(4)}/>
<path d="M60,120 q20,-34 60,-20 q20,-26 50,-6 q30,-4 30,26 h-140 Z" fill="#fff" ${st(3)}/>
<path d="M0,420 Q480,380 960,420 V640 H0 Z" fill="#8bcf7d"/>
<path d="M0,470 H960 V640 H0 Z" fill="#a26b45"/>
${[500,580,660,740,820,900].map((x,i)=>`<ellipse cx="${x}" cy="${560+(i%2)*20}" rx="38" ry="14" fill="#8a5a39"/>${sprout(x,555+(i%2)*20,.7+(i%3)*.15)}`).join('')}
<path d="M120,330 h-70 M130,370 h-90 M110,410 h-60" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
${char(250,150,0.8,'determined','hold',{legs:true,sweat:true})}
<path d="M210,350 h96 v60 q0,14 -14,14 h-68 q-14,0 -14,-14 Z" fill="#5aa0e0" ${st()}/>
<path d="M226,350 q32,-34 64,0" fill="none" ${st(6)}/>
<path d="M306,370 L380,330 L392,346 L310,394 Z" fill="#5aa0e0" ${st(3)}/>
${[[410,360],[430,390],[452,420],[470,450],[420,430],[445,470]].map(([x,y])=>`<path d="M${x},${y} q-6,10 0,14 q6,-4 0,-14 Z" fill="#9fd3f5" ${st(2)}/>`).join('')}
<rect x="802" y="380" width="12" height="110" fill="#7a5232" ${st(3)}/>
<rect x="720" y="320" width="180" height="76" rx="8" fill="#fff4d6" ${st()}/><text x="810" y="350" font-size="22" font-weight="900" text-anchor="middle" fill="${K}">收成日</text><text x="810" y="382" font-size="22" font-weight="700" text-anchor="middle" fill="#a26b45">不急，慢慢來</text>
`);

// 5 讀你喜歡的書，直到你愛上讀書
S.readQ=()=>qclip('n5',`
<defs><radialGradient id="n5g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient></defs>
<rect width="960" height="640" fill="#4a3a30"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${i*100+30}" y="0" width="40" height="560" fill="#52412f"/>`).join('')}
<rect y="560" width="960" height="80" fill="#6b4a33"/>
${win(60,70,170,190,'#1e2a52','<circle cx="190" cy="110" r="20" fill="#f6e7a8"/><circle cx="100" cy="100" r="2.5" fill="#fff"/><circle cx="130" cy="200" r="2" fill="#fff"/>')}
<circle cx="800" cy="200" r="300" fill="url(#n5g)"/>
<path d="M800,170 V560 M760,560 h80" ${st(6)}/><path d="M740,170 h120 l-24,-70 h-72 Z" fill="#ffe7a8" ${st()}/>
<rect x="290" y="220" width="380" height="300" rx="60" fill="#b85c4a" ${st()}/>
${char(480,250,0.85,'smile','hold',{look:0})}
<rect x="250" y="400" width="90" height="170" rx="30" fill="#c96d58" ${st()}/><rect x="620" y="400" width="90" height="170" rx="30" fill="#c96d58" ${st()}/>
<rect x="320" y="470" width="320" height="100" rx="14" fill="#a14f3f" ${st()}/>
<path d="M480,452 L400,428 L392,478 L480,500 Z" fill="#fffaf0" ${st(3)}/><path d="M480,452 L560,428 L568,478 L480,500 Z" fill="#fffaf0" ${st(3)}/>
<path d="M408,446 l58,16 M406,458 l58,16 M552,446 l-58,16 M554,458 l-58,16" stroke="#c8bfa8" stroke-width="2.5"/>
<circle cx="398" cy="468" r="15" fill="#fff" ${st()}/><circle cx="562" cy="468" r="15" fill="#fff" ${st()}/>
${[['#5a8fd6',0],['#e6b04a',-6],['#7cb77a',4],['#d76a6a',-3],['#8f7ad6',2]].map(([c,r],i)=>`<rect x="${110+r}" y="${552-i*34}" width="130" height="30" rx="4" fill="${c}" ${st(3)} transform="rotate(${r} 175 ${567-i*34})"/>`).join('')}
<g transform="translate(830,575)"><ellipse cx="0" cy="0" rx="58" ry="26" fill="#f2a65a" ${st()}/><circle cx="-46" cy="-14" r="24" fill="#f2a65a" ${st()}/><path d="M-62,-30 l4,-22 l12,14 M-38,-34 l8,-20 l8,18" fill="#f2a65a" ${st(3)}/><path d="M-56,-14 q4,4 8,0 M-40,-14 q4,4 8,0" fill="none" ${st(3)}/><path d="M56,6 q30,-6 20,-30" fill="none" ${st(4)}/></g>
<g font-family="Noto Sans TC" font-weight="900" fill="#f6e2b0"><text x="880" y="520" font-size="26">z</text><text x="900" y="498" font-size="20">z</text></g>
`);

// 6 平靜是靜止的快樂，快樂是流動的平靜
S.peaceQ=()=>qclip('n6',`
<defs><linearGradient id="n6sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b7b2e0"/><stop offset=".55" stop-color="#ffd2b0"/><stop offset="1" stop-color="#ffe9c9"/></linearGradient></defs>
<rect width="960" height="640" fill="url(#n6sky)"/>
<circle cx="700" cy="360" r="74" fill="#fff1c9"/>
<path d="M0,360 L130,240 L230,320 L360,200 L520,340 L620,280 L760,360 Z" fill="#a98fb8"/>
<path d="M420,360 L560,270 L660,330 L800,230 L960,330 V360 Z" fill="#c4a3bf"/>
<rect y="360" width="960" height="280" fill="#9cc6dc"/>
<path d="M640,380 h120 M660,402 h80 M675,424 h50 M686,444 h28" stroke="#fff4d6" stroke-width="7" stroke-linecap="round"/>
<path d="M60,440 h90 M820,470 h80 M200,500 h60" stroke="#c4e0ee" stroke-width="4" stroke-linecap="round"/>
<path d="M520,150 q10,-10 20,0 q10,-10 20,0 M590,110 q8,-8 16,0 q8,-8 16,0" fill="none" ${st(3)}/>
<path d="M0,540 L560,510 L560,560 L0,600 Z" fill="#c8935f" ${st()}/>${[80,180,280,380,480].map(x=>`<path d="M${x},${540-x*.054} L${x},${598-x*.072}" stroke="#a97446" stroke-width="3"/>`).join('')}
<rect x="90" y="590" width="20" height="60" fill="#8a5a3a" ${st(3)}/><rect x="500" y="556" width="20" height="90" fill="#8a5a3a" ${st(3)}/>
${char(300,250,0.82,'sleep','down')}
${mug(425,452)}
`);
