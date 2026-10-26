// 其實沒人在盯著你（聚光燈效應）：上格尷尬當下（暗、冷，常有一道聚光燈），下格真相（亮、暖）
const spBeam=(x,w,op=.14)=>`<path d="M${x-30},0 L${x+30},0 L${x+w},470 L${x-w},470 Z" fill="#fff6d8" opacity="${op}"/>`;
const spPhone=(x,y,k,screen,bubbles)=>`<rect x="${x-50*k}" y="${y-90*k}" width="${100*k}" height="${180*k}" rx="${14*k}" fill="#111"/><rect x="${x-42*k}" y="${y-80*k}" width="${84*k}" height="${160*k}" rx="${8*k}" fill="${screen}"/>${bubbles}`;
const spBubble=(x,y,w,c)=>`<rect x="${x}" y="${y}" width="${w}" height="16" rx="8" fill="${c}"/>`;
const spMirror=(x,y,w,h,frame,glass)=>`<rect x="${x-8}" y="${y-8}" width="${w+16}" height="${h+16}" rx="10" fill="${frame}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${glass}"/><path d="M${x+20},${y+h-30} L${x+w*.5},${y+20} M${x+50},${y+h-20} L${x+w*.7},${y+30}" stroke="#fff" stroke-opacity=".18" stroke-width="10"/>`;
const spDumbbell=(x,y,c)=>`<rect x="${x-40}" y="${y-5}" width="80" height="10" fill="${c}"/><rect x="${x-56}" y="${y-22}" width="16" height="44" rx="4" fill="${c}"/><rect x="${x+40}" y="${y-22}" width="16" height="44" rx="4" fill="${c}"/>`;
const spBowl=(x,y,bowl,soup,steam)=>`<path d="M${x-60},${y} h120 q-8,50 -60,54 q-52,-4 -60,-54 Z" fill="${bowl}"/><ellipse cx="${x}" cy="${y}" rx="60" ry="10" fill="${soup}"/>${steam?`<path d="M${x-20},${y-12} q-10,-16 0,-32 q10,-16 0,-32 M${x+14},${y-14} q-10,-16 0,-32 q10,-16 0,-32" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`:''}`;

// 1 在群組傳錯訊息 → 大家滑過去就忘了：深夜發亮的手機 → 白天咖啡桌上、訊息早被洗掉
S.spChatTop=()=>clip('sp1',`
<rect width="960" height="470" fill="#06070c"/>
${phGlow('sp1g',480,230,260,'#6a9aff',.3)}
${ckTable(380,'#14161e','#0c0d12')}
${spPhone(480,250,1.3,'#1a2236',[[430,160,80,'#3a4a6a'],[430,190,60,'#3a4a6a'],[470,226,70,'#e85a5a'],[430,262,90,'#3a4a6a']].map(([x,y,w,c])=>spBubble(x,y,w,c)).join(''))}
<text x="505" y="222" font-size="18" font-weight="900" fill="#ff8a8a">!</text>
${phGrain('sp1n')}
`);
S.spChatBot=()=>clip('sp2',`
<rect width="960" height="470" fill="#fbe8cc"/>
${phGlow('sp2g',260,100,360,'#fff6d8',.9)}
${ckTable(330,'#d8b088','#b8906a')}
${spPhone(480,250,1.3,'#eef4fa',[...Array(8)].map((_,i)=>spBubble(i%2?430:470,148+i*25,i%3?70:50,i%2?'#cfd8e4':'#9ad08a')).join(''))}
${ckCup(720,276,'#f4f0e8',true)}
${phGrain('sp2n')}
`);

// 2 髮型很失敗 → 根本沒人發現：深夜浴室鏡子 → 晴天熱鬧的街，大家各走各的
S.spHairTop=()=>clip('sp3',`
<rect width="960" height="470" fill="#0a0c12"/>
${[...Array(8)].map((_,i)=>`<path d="M0,${i*60} H960" stroke="#14161e" stroke-width="2"/>`).join('')}
${spBeam(480,200)}
${spMirror(360,70,240,280,'#2a2c34','#1a2030')}
<rect y="380" width="960" height="90" fill="#16181e"/><rect x="300" y="370" width="360" height="20" rx="6" fill="#2a2c34"/>
${phGrain('sp3n')}
`);
S.spHairBot=()=>clip('sp4',`
${phSky('sp4s',[[0,'#6ab4f0'],[1,'#e8f4f8']])}
${phGlow('sp4g',800,60,220,'#fffbe0',.9)}
${phCity(1801,320,80,220,'#e8d8c4','#cfe6f8','#bcd4e8',.3)}
<rect y="320" width="960" height="150" fill="#9a9aa2"/>
${[...Array(8)].map((_,i)=>`<rect x="${60+i*120}" y="370" width="70" height="80" fill="#f4f4f4" transform="skewX(-20)"/>`).join('')}
${phTree(1802,80,330,.9,'#5a9a46')}${phTree(1803,880,330,.9,'#5a9a46')}
${phGrain('sp4n')}
`);

// 3 開會講錯一句話 → 你記三天，別人三分鐘就忘：會議室一張椅子被聚光燈照著 → 散會後陽光下的會議室
S.spMeetTop=()=>clip('sp5',`
<rect width="960" height="470" fill="#06070c"/>
${spBeam(480,170)}
<ellipse cx="480" cy="330" rx="380" ry="70" fill="#14161c"/>
${[180,330,630,780].map(x=>ckChair(x,300,'#1a1c22')).join('')}
${ckChair(480,300,'#5a5e6a')}
${phGrain('sp5n')}
`);
S.spMeetBot=()=>clip('sp6',`
<rect width="960" height="470" fill="#f4e6d0"/>
${ckWin(80,30,800,220,'#fff8ec',`${phSky('sp6w',[[0,'#8ac8f0'],[1,'#e8f4f8']]).replace('<rect width="960" height="470"','<rect x="80" y="30" width="800" height="220"')}${phCity(1804,250,30,120,'#c8d4e0','#eef4fa','#dfe8f0',.2)}`)}
<ellipse cx="480" cy="330" rx="380" ry="70" fill="#c89a6a"/>
${[180,330,480,630,780].map(x=>ckChair(x,300,'#8a6a4a')).join('')}
${[260,560,700].map(x=>ckCup(x,300,'#fff',x===560)).join('')}
${phGrain('sp6n')}
`);

// 4 一個人去吃飯 → 大家忙著吃自己的：夜裡空蕩餐廳的單人桌 → 白天熱鬧小館，每桌都在吃自己的
S.spMealTop=()=>clip('sp7',`
<rect width="960" height="470" fill="#08090e"/>
${spBeam(480,180)}
${ckTable(340,'#1e1a16','#121010')}
${spBowl(480,300,'#5a5e66','#3a3226',false)}
<rect x="560" y="280" width="6" height="60" fill="#4a4e56" transform="rotate(20 563 310)"/><rect x="572" y="280" width="6" height="60" fill="#4a4e56" transform="rotate(20 575 310)"/>
${ckChair(260,360,'#1a1c22')}${ckChair(700,360,'#1a1c22')}
${phGrain('sp7n')}
`);
S.spMealBot=()=>clip('sp8',`
<rect width="960" height="470" fill="#fbe2c4"/>
${phGlow('sp8g',480,60,420,'#fff2d0',.8)}
${[160,480,800].map(x=>`<path d="M${x},0 v40" stroke="#5a3a2a" stroke-width="2"/><path d="M${x-30},70 h60 l-12,-30 h-36 Z" fill="#e8a04a"/>${phGlow('sp8l'+x,x,80,90,'#ffd890',.6)}`).join('')}
${ckTable(320,'#c88a5a','#a86a3a')}
${[160,480,800].map(x=>spBowl(x,290,'#f4f0e8','#e8a04a',true)).join('')}
${phGrain('sp8n')}
`);

// 5 健身房怕被笑 → 大家都在看鏡子裡的自己：黑暗中被照亮的啞鈴 → 明亮健身房一整面鏡子
S.spGymTop=()=>clip('sp9',`
<rect width="960" height="470" fill="#06070c"/>
${spBeam(480,170)}
<rect y="360" width="960" height="110" fill="#121318"/>
${spDumbbell(480,350,'#6a6e7a')}
${[150,810].map(x=>spDumbbell(x,350,'#16181e')).join('')}
${phGrain('sp9n')}
`);
S.spGymBot=()=>clip('sp10',`
<rect width="960" height="470" fill="#eef0f2"/>
${[0,1,2,3].map(i=>spMirror(40+i*230,40,200,280,'#c8ccd4','#cfe0ea')).join('')}
${phGlow('sp10g',480,100,420,'#ffffff',.6)}
<rect y="360" width="960" height="110" fill="#5a5e6a"/>
${[150,380,610,840].map(x=>spDumbbell(x,350,'#2a2c34')).join('')}
${phGrain('sp10n')}
`);

// 6 在路上跌倒 → 路人十秒就忘，你也可以：夜裡人行道上的一塊突起 → 清晨陽光下的人行道和花
const spWalk=(c,line)=>`<path d="M0,470 L360,250 L600,250 L960,470 Z" fill="${c}"/>${[...Array(8)].map((_,i)=>{const t=Math.pow(i/7,1.8),y=250+t*220,hw=120+t*360;return `<path d="M${480-hw},${y.toFixed(0)} H${480+hw}" stroke="${line}" stroke-width="${1+t*2}"/>`}).join('')}`;
S.spTripTop=()=>clip('sp11',`
${phSky('sp11s',[[0,'#05070e'],[1,'#141a28']])}
${phCity(1805,250,60,180,'#0c1018','#ffd98a','#121624',.03)}
<rect y="250" width="960" height="220" fill="#0e1016"/>
${spWalk('#1c1e26','#14161c')}
${spBeam(480,160,.12)}
<path d="M440,400 L470,384 L520,388 L540,402 Z" fill="#4a4e5a"/>
${phGrain('sp11n')}
`);
S.spTripBot=()=>clip('sp12',`
${phSky('sp12s',[[0,'#8ac4f0'],[.7,'#ffe8c0'],[1,'#ffd8a0']])}
${phGlow('sp12g',480,240,300,'#fff2c0',.8)}
${phCity(1805,250,60,180,'#d8c4b0',null,null)}
<rect y="250" width="960" height="220" fill="#8ac06a"/>
${spWalk('#d8d0c4','#bcb4a8')}
${(()=>{const r=phRand(1806);let o='';for(let i=0;i<50;i++){const side=i%2,t=r(),y=270+t*190,x=side?480+130+t*360+r()*80:480-130-t*360-r()*80;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(3+t*5).toFixed(1)}" fill="${['#ff8fa8','#ffd25a','#ffffff','#c88aff'][i%4]}"/>`}return o})()}
${phGrain('sp12n')}
`);
