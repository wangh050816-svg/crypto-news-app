// 納瓦爾寶典類場景（納瓦爾寶典教我的6件事）
const nvLaptop=(x,y,txt='</>')=>`<path d="M${x},${y+110} h200 l14,16 h-228 Z" fill="#b8c0c8" ${st()}/><rect x="${x+10}" y="${y}" width="180" height="110" rx="8" fill="#333" ${st()}/><rect x="${x+20}" y="${y+10}" width="160" height="90" rx="4" fill="#1e3a2e"/><text x="${x+100}" y="${y+68}" font-size="36" font-weight="900" text-anchor="middle" fill="#7ef0b0" font-family="monospace">${txt}</text>`;
const nvCloud=(x,y,w,h,fill='#fff')=>`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${h/2}" fill="${fill}" ${st(3)}/>`;
const nvNote=(x,y,txt,rot=0,fill='#ffe57a')=>`<g transform="rotate(${rot} ${x+55} ${y+35})"><rect x="${x}" y="${y}" width="110" height="70" fill="${fill}" ${st(3)}/><text x="${x+55}" y="${y+45}" font-size="26" font-weight="900" text-anchor="middle" fill="${K}">${txt}</text></g>`;
const nvAlarm=(x,y)=>`<circle cx="${x-20}" cy="${y-32}" r="10" fill="#ff8a8d" ${st(3)}/><circle cx="${x+20}" cy="${y-32}" r="10" fill="#ff8a8d" ${st(3)}/><circle cx="${x}" cy="${y}" r="30" fill="#fff" ${st(4)}/><path d="M${x},${y} V${y-18} M${x},${y} L${x+14},${y+6}" ${st(3)}/>`;
const nvGrass=(fill,y=380)=>`<path d="M0,${y} Q240,${y-30} 480,${y} T960,${y-10} V470 H0 Z" fill="${fill}" ${st()}/>`;

// 1 拿時間換錢 → 打造槓桿
S.leverageTop=()=>clip('nv1',`
<rect width="960" height="470" fill="#232a40"/>
${win(60,40,180,160,'#141833','<circle cx="200" cy="80" r="20" fill="#f6e7a8"/><circle cx="100" cy="150" r="2.5" fill="#fff"/>')}
<circle cx="840" cy="100" r="62" fill="#fff" ${st()}/><path d="M840,100 V56 M840,100 L828,62" ${st(5)}/><text x="840" y="196" font-size="26" font-weight="900" text-anchor="middle" fill="#ff6b6b">23:58</text>
${char(480,200,0.9,'tired','desk',{look:0,sweat:true})}
${desk(430,'#5a4a3a','#47392c')}
<path d="M690,380 h80 v50 h-80 Z" fill="#cfe8f7" opacity=".85" ${st(3)}/>
${coin(730,330,12)}${coin(730,410,12)}
<text x="730" y="300" font-size="22" font-weight="700" text-anchor="middle" fill="#9fb6c9">1 小時</text>
`);
S.leverageBot=()=>clip('nv2',`
<rect width="960" height="470" fill="#fdf0d9"/>
${win(60,40,180,160,'#bfe3f7','<circle cx="200" cy="80" r="20" fill="#fff3b0"/>')}
<rect x="80" y="300" width="380" height="180" rx="22" fill="#f2b8a0" ${st()}/>
<ellipse cx="270" cy="250" rx="130" ry="46" fill="#fff" ${st()}/>
${char(270,235,0.8,'sleep','down')}
<path d="M70,360 Q270,330 470,360 L480,470 L60,470 Z" fill="#ffd9a8" ${st()}/>
${zzz(370,170)}
${desk(410,'#d6a46d','#c08b55')}
${nvLaptop(560,290)}
<rect x="800" y="330" width="70" height="80" rx="4" fill="#7fb3e0" ${st()}/><text x="835" y="378" font-size="22" font-weight="900" text-anchor="middle" fill="#fff">作品</text>
${coin(600,230,18)}${coin(680,180,22)}${coin(760,230,18)}${coin(840,270,16)}${coin(720,120,16)}
<path d="M640,260 l-10,-20 M700,240 l0,-22 M760,260 l10,-20" stroke="#e0a03a" stroke-width="4" stroke-linecap="round"/>
`);

// 2 什麼都想要 → 少一個欲望
S.desireTop=()=>clip('nv3',`
<rect width="960" height="470" fill="#2c2f45"/>
${char(480,230,0.9,'worried','chinboth',{look:0,sweat:true})}
${nvCloud(150,90,200,120)}<rect x="90" y="80" width="120" height="34" rx="10" fill="#ff6b5b" ${st(3)}/><path d="M108,80 l16,-22 h52 l16,22" fill="#ff6b5b" ${st(3)}/><circle cx="118" cy="118" r="11" fill="#555" ${st(3)}/><circle cx="182" cy="118" r="11" fill="#555" ${st(3)}/>
${nvCloud(810,90,200,120)}<path d="M760,100 L810,58 L860,100 Z" fill="#f7c6d0" ${st(3)}/><rect x="772" y="100" width="76" height="40" fill="#fff" ${st(3)}/><rect x="800" y="112" width="20" height="28" fill="#c8935f" ${st(2)}/>
${nvCloud(140,300,180,110)}<rect x="125" y="262" width="30" height="76" rx="6" fill="#9aa3ad" ${st(3)}/><circle cx="140" cy="300" r="26" fill="#ffcf3d" ${st(3)}/><path d="M140,300 V286 M140,300 L150,306" ${st(3)}/>
${nvCloud(820,300,180,110)}<path d="M790,290 L805,272 H835 L850,290 L820,330 Z" fill="#bfe8ff" ${st(3)}/><path d="M790,290 H850" ${st(2)}/>
<circle cx="290" cy="140" r="9" fill="#fff" ${st(2)}/><circle cx="670" cy="140" r="9" fill="#fff" ${st(2)}/><circle cx="290" cy="290" r="9" fill="#fff" ${st(2)}/><circle cx="670" cy="290" r="9" fill="#fff" ${st(2)}/>
`);
S.desireBot=()=>clip('nv4',`
<rect width="960" height="470" fill="#fbf0dc"/>
${tmSun(840,90,36)}
${char(480,200,0.9,'smile','hold',{look:0})}
${mug(450,386)}
${nvCloud(240,110,170,90)}<text x="240" y="122" font-size="32" font-weight="900" text-anchor="middle" fill="${K}">夠了</text>
<circle cx="330" cy="160" r="9" fill="#fff" ${st(2)}/><circle cx="360" cy="185" r="6" fill="#fff" ${st(2)}/>
<path d="M80,300 q20,-40 50,-10 q30,-30 50,10 q-20,30 -50,50 q-30,-20 -50,-50 Z" fill="#f4a6a6" opacity=".7"/>
`);

// 3 不知道學什麼 → 做像在玩的事
S.playTop=()=>clip('nv5',`
<rect width="960" height="470" fill="#2a3346"/>
<path d="M0,400 L380,330 L580,330 L960,400 V470 H0 Z" fill="#3c4660" ${st()}/>
<rect x="690" y="70" width="18" height="320" fill="#a97446" ${st(3)}/>
<path d="M708,90 h150 l26,22 l-26,22 h-150 Z" fill="#e9e4da" ${st(3)}/><text x="790" y="122" font-size="24" font-weight="900" text-anchor="middle" fill="${K}">投資</text>
<path d="M690,150 h-150 l-26,22 l26,22 h150 Z" fill="#e9e4da" ${st(3)}/><text x="610" y="182" font-size="24" font-weight="900" text-anchor="middle" fill="${K}">寫程式</text>
<path d="M708,210 h150 l26,22 l-26,22 h-150 Z" fill="#e9e4da" ${st(3)}/><text x="790" y="242" font-size="24" font-weight="900" text-anchor="middle" fill="${K}">考證照</text>
<path d="M690,270 h-150 l-26,22 l26,22 h150 Z" fill="#e9e4da" ${st(3)}/><text x="610" y="302" font-size="24" font-weight="900" text-anchor="middle" fill="${K}">學行銷</text>
${char(260,215,0.9,'worried','scratch',{look:10})}
`);
S.playBot=()=>clip('nv6',`
<rect width="960" height="470" fill="#fff1d6"/>
${char(400,175,0.9,'happy','write',{look:0})}
${desk(426,'#d6a46d','#c08b55')}
<rect x="560" y="140" width="300" height="230" fill="#fff" ${st()}/><path d="M600,340 V390 M820,340 V390" ${st(6)}/>
<path d="M590,320 L660,240 L710,290 L760,210 L830,320 Z" fill="#a9d68f" ${st(3)}/><circle cx="790" cy="180" r="18" fill="#ffd66b" ${st(3)}/>
<path d="M110,90 l8,20 l20,8 l-20,8 l-8,20 l-8,-20 l-20,-8 l20,-8 Z" fill="#ffcf3d" ${st(3)}/>
<path d="M500,60 l6,15 l15,6 l-15,6 l-6,15 l-6,-15 l-15,-6 l15,-6 Z" fill="#ffcf3d" ${st(3)}/>
${bubble(80,170,170,70,'好好玩',30)}
`);

// 4 想賺快錢的人 → 不玩短期遊戲
S.shortTop=()=>clip('nv7',`
<rect width="960" height="470" fill="#2b2a33"/><rect y="410" width="960" height="60" fill="#3a3842"/>
${char(660,215,0.9,'happy','wave',{look:-10,dark:true,shirt:'#5a5a6a'})}
<rect x="596" y="208" width="52" height="30" rx="8" fill="#111" ${st(3)}/><rect x="660" y="208" width="52" height="30" rx="8" fill="#111" ${st(3)}/><path d="M648,220 h12" ${st(3)}/>
<path d="M820,330 q-30,-60 20,-80 q-10,-14 6,-20 h30 q16,6 6,20 q50,20 20,80 Z" fill="#c8a35f" ${st()}/><text x="858" y="310" font-size="34" font-weight="900" text-anchor="middle" fill="#5a3d10">$</text>
${char(250,215,0.9,'neutral','down',{look:10})}
${bubble(370,30,300,74,'一個月翻倍！',32)}
`);
S.shortBot=()=>clip('nv8',`
<rect width="960" height="470" fill="#e4f3f9"/>
${tmSun(120,80,34)}
${nvGrass('#a9d68f')}
${char(300,160,0.55,'smile','down',{legs:true,look:6})}
${char(660,160,0.55,'happy','wave',{legs:true,look:-6,dark:true,shirt:'#ffe9a8'})}
<path d="M480,370 V300" stroke="#6b4a2b" stroke-width="8"/><path d="M480,320 q-40,-10 -50,-50 q40,0 50,40 Z M480,305 q40,-10 50,-50 q-40,0 -50,40 Z" fill="#8cc47a" ${st(3)}/>
<ellipse cx="480" cy="372" rx="50" ry="12" fill="#8a6a4a" ${st(3)}/>
<rect x="540" y="330" width="16" height="70" fill="#a97446" ${st(2)}/><rect x="510" y="300" width="80" height="40" rx="6" fill="#fff" ${st(3)}/><text x="550" y="328" font-size="22" font-weight="900" text-anchor="middle" fill="${K}">複利</text>
`);

// 5 被手機餵資訊 → 讀真正喜歡的書
S.readTop=()=>clip('nv9',`
<rect width="960" height="470" fill="#1f2438"/>
<radialGradient id="nvglow"><stop offset="0" stop-color="#bfe6ff" stop-opacity=".35"/><stop offset="1" stop-color="#bfe6ff" stop-opacity="0"/></radialGradient>
${char(480,200,0.9,'tired','hold',{look:0})}
<circle cx="480" cy="260" r="160" fill="url(#nvglow)"/>
<rect x="444" y="350" width="72" height="112" rx="12" fill="#2a2a2a" ${st()}/><rect x="452" y="360" width="56" height="90" rx="5" fill="#d6f0ff"/>
<circle cx="453" cy="420" r="15" fill="#fff" ${st()}/><circle cx="507" cy="420" r="15" fill="#fff" ${st()}/>
${[[60,60,'快訊'],[90,190,'爆料'],[70,320,'限動'],[720,50,'99+'],[760,190,'熱門'],[730,320,'推薦']].map(([x,y,t])=>`<rect x="${x}" y="${y}" width="170" height="70" rx="14" fill="#fff" ${st(3)}/><circle cx="${x+30}" cy="${y+35}" r="14" fill="#ff5a5f"/><text x="${x+105}" y="${y+45}" font-size="28" font-weight="900" text-anchor="middle" fill="${K}">${t}</text>`).join('')}
`);
S.readBot=()=>clip('nv10',`
<rect width="960" height="470" fill="#fdf0d9"/>
${win(60,40,200,170,'#bfe3f7','<circle cx="220" cy="80" r="20" fill="#fff3b0"/>')}
<path d="M260,210 L460,470 L80,470 L60,210 Z" fill="#fff6c8" opacity=".5"/>
<rect x="680" y="60" width="230" height="330" fill="#c8935f" ${st()}/><path d="M680,170 h230 M680,280 h230" ${st(4)}/>
${[[700,90,'#f7c6d0'],[730,100,'#b9e3c6'],[760,85,'#bfe3f7'],[790,95,'#ffe57a'],[710,200,'#ffe57a'],[745,195,'#f7c6d0'],[780,205,'#b9e3c6'],[815,190,'#bfe3f7']].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="28" height="${(y<170?170:280)-y}" fill="${c}" ${st(3)}/>`).join('')}
${char(460,165,0.9,'smile','hold',{look:0})}
<path d="M380,400 L460,410 L540,400 L540,470 L460,478 L380,470 Z" fill="#fff" ${st()}/><path d="M460,410 V478" ${st(3)}/>
<path d="M398,420 h44 M398,436 h44 M478,420 h44 M478,436 h44" stroke="#bbb" stroke-width="3"/>
<rect x="600" y="420" width="140" height="50" fill="#d6a46d" ${st()}/><rect x="630" y="400" width="80" height="20" rx="6" fill="#2a2a2a" ${st(3)}/>
`);

// 6 忙到停不下來 → 什麼都不做
S.stillTop=()=>clip('nv11',`
<rect width="960" height="470" fill="#262b3e"/>
${char(480,215,0.9,'worried','scratch',{look:0,sweat:true})}
${nvNote(70,50,'待辦',-8)}${nvNote(110,200,'開會',6,'#f7c6d0')}${nvNote(60,340,'回信',-4,'#b9e3c6')}
${nvNote(760,60,'KPI',8,'#bfe3f7')}${nvNote(790,320,'報告',-6)}
${nvAlarm(260,90)}${nvAlarm(700,260)}${nvAlarm(860,220)}
`);
S.stillBot=()=>clip('nv12',`
<linearGradient id="nvsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd59e"/><stop offset="1" stop-color="#ffb38a"/></linearGradient>
<rect width="960" height="470" fill="url(#nvsky)"/>
<circle cx="760" cy="300" r="70" fill="#fff0b3" ${st(3)}/>
${char(400,215,0.9,'sleep','down')}
${nvGrass('#b5d98a',390)}
${tmTree(120,250)}
<path d="M560,140 q20,-14 40,0 q20,-14 40,0" fill="none" ${st(3)}/><path d="M640,100 q14,-10 28,0 q14,-10 28,0" fill="none" ${st(3)}/>
`);
