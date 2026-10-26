// 偷偷影響你的6個心理效應：上格情境（暗、冷），下格說破（亮、暖）
const psSeats=(y0,rows,c,top)=>{let s='';for(let r=0;r<rows;r++){const y=y0+r*34,k=1+r*.22,n=Math.ceil(960/(46*k))+1;for(let i=0;i<n;i++){const x=i*46*k-(r%2)*23*k;s+=`<rect x="${x.toFixed(0)}" y="${y}" width="${(40*k).toFixed(0)}" height="${(30*k).toFixed(0)}" rx="${6*k}" fill="${c}"/><rect x="${x.toFixed(0)}" y="${y}" width="${(40*k).toFixed(0)}" height="${(6*k).toFixed(0)}" rx="3" fill="${top}"/>`}}return s};
const psCurtain=(c,d)=>`<path d="M0,0 H170 Q150,200 120,330 L0,330 Z" fill="${c}"/><path d="M960,0 H790 Q810,200 840,330 L960,330 Z" fill="${c}"/>${[30,70,110].map(x=>`<path d="M${x},0 Q${x-10},180 ${x-20},330" stroke="${d}" stroke-width="6" fill="none"/><path d="M${960-x},0 Q${970-x},180 ${980-x},330" stroke="${d}" stroke-width="6" fill="none"/>`).join('')}<rect width="960" height="30" fill="${c}"/>`;
const psFlag=(x,y,c)=>`<path d="M${x},${y} v-40" stroke="#2a2a2a" stroke-width="3"/><path d="M${x},${y-40} l26,8 l-26,8 Z" fill="${c}"/>`;
const psClock=(x,y,r,h,m,face,hand)=>{const a=(h%12+m/60)*30-90,b=m*6-90,rad=d=>d*Math.PI/180;return `<circle cx="${x}" cy="${y}" r="${r}" fill="${face}" stroke="${hand}" stroke-width="4"/><path d="M${x},${y} L${(x+Math.cos(rad(a))*r*.5).toFixed(1)},${(y+Math.sin(rad(a))*r*.5).toFixed(1)}" stroke="${hand}" stroke-width="5" stroke-linecap="round"/><path d="M${x},${y} L${(x+Math.cos(rad(b))*r*.8).toFixed(1)},${(y+Math.sin(rad(b))*r*.8).toFixed(1)}" stroke="${hand}" stroke-width="3" stroke-linecap="round"/>`};
const psPapers=(x,y,n,c)=>[...Array(n)].map((_,i)=>`<rect x="${x+(i*13)%30-15}" y="${y-i*7}" width="130" height="8" fill="${c}" transform="rotate(${(i*17)%9-4} ${x+65} ${y-i*7})"/>`).join('');

// 1 聚光燈效應：黑暗舞台一道聚光燈 → 燈全亮，觀眾席其實是空的
S.psSpotTop=()=>clip('ps1',`
<rect width="960" height="470" fill="#06070c"/>
<rect y="250" width="960" height="80" fill="#14121a"/>
<path d="M440,0 L520,0 L640,300 L320,300 Z" fill="#fff6d8" opacity=".14"/>
<ellipse cx="480" cy="290" rx="170" ry="26" fill="#fff6d8" opacity=".45"/>
${psCurtain('#3a0e16','#2a080e')}
<rect y="330" width="960" height="140" fill="#030306"/>${psSeats(340,4,'#0c0c12','#16161e')}
${phGrain('ps1n')}
`);
S.psSpotBot=()=>clip('ps2',`
<rect width="960" height="470" fill="#f4dcb0"/>
${phGlow('ps2g',480,120,460,'#fff6e0',.9)}
<rect y="250" width="960" height="80" fill="#c89a6a"/>
${psCurtain('#c8303a','#a8202a')}
<rect y="330" width="960" height="140" fill="#4a1e1a"/>${psSeats(340,4,'#b8343a','#d8545a')}
${phGrain('ps2n')}
`);

// 2 沉沒成本謬誤：霧中蓋到一半的斷橋 → 日出照亮旁邊完整的另一座橋
const psBridge=(x0,x1,y,deck,pier)=>`<rect x="${x0}" y="${y}" width="${x1-x0}" height="16" fill="${deck}"/>${[...Array(Math.floor((x1-x0)/120)+1)].map((_,i)=>`<rect x="${x0+20+i*120}" y="${y+16}" width="16" height="${330-y}" fill="${pier}"/>`).join('')}`;
S.psSunkTop=()=>clip('ps3',`
${phSky('ps3s',[[0,'#1a1e28'],[1,'#3a404c']])}
<path d="${phRidge(1701,250,40,.5)}" fill="#2a2e38"/>
<rect y="300" width="960" height="170" fill="#22262e"/>
${psBridge(-20,560,250,'#4a4e56','#3a3e46')}<path d="M560,250 l-14,24 l-10,-8 l-12,16" stroke="#3a3e46" stroke-width="4" fill="none"/>
${phClouds('ps3c',[.5,.52,.56],.8,'0.004 0.012',1702,120,350)}
${phGrain('ps3n')}
`);
S.psSunkBot=()=>clip('ps4',`
${phSky('ps4s',[[0,'#7ab8e8'],[.6,'#ffd8a0'],[1,'#ffc07a']])}
${phGlow('ps4g',860,250,240,'#fff2c0',.9)}
<path d="${phRidge(1701,250,40,.5)}" fill="#a08a7a"/>
<rect y="300" width="960" height="170" fill="#7aa8c8"/>
${loWaves(1703,320,3,'#8ab8d8','#9ac4e0')}
${psBridge(-20,560,180,'#9a8a7a','#8a7a6a').replace(/height="(\d+)" fill="#8a7a6a"/g,(m,h)=>`height="${+h}" fill="#8a7a6a" opacity=".6"`)}
${psBridge(-20,980,290,'#e8d8c0','#c8b8a0')}
${phGrain('ps4n')}
`);

// 3 確認偏誤：夜裡手電筒只照亮一條小路 → 白天整片森林有很多條路
const psForest=(seed,c,n)=>{const r=phRand(seed);let s='';for(let i=0;i<n;i++){const x=r()*960,y=250+r()*60,k=.6+r()*.6;s+=phTree(seed+i,x,y,k,c)}return s};
const psPaths=c=>[[480,260,300,470],[480,260,660,470],[480,260,80,420],[480,260,900,420]].map(([x1,y1,x2,y2])=>`<path d="M${x1},${y1} L${x2-40},${y2} L${x2+40},${y2} Z" fill="${c}"/>`).join('');
S.psConfTop=()=>clip('ps5',`
<rect width="960" height="470" fill="#05070a"/>
${psForest(1704,'#0c1210',14)}
<rect y="300" width="960" height="170" fill="#080a0c"/>
<path d="M440,470 L470,280 L490,280 L520,470 Z" fill="#2a2a22"/>
<path d="M380,470 L466,270 L494,270 L580,470 Z" fill="#fff6c0" opacity=".16"/>
${phGrain('ps5n')}
`);
S.psConfBot=()=>clip('ps6',`
${phSky('ps6s',[[0,'#8ac8f0'],[1,'#e8f4e0']])}
${phGlow('ps6g',200,60,220,'#fffbe0',.9)}
<rect y="260" width="960" height="210" fill="#8ac06a"/>
${psPaths('#d8c49a')}
${psForest(1704,'#4a8a3a',14)}
${phGrain('ps6n')}
`);

// 4 達克效應：夜裡以為小山丘就是山頂 → 天亮後看見後面更高的群山
S.psDunTop=()=>clip('ps7',`
${phSky('ps7s',[[0,'#05070e'],[1,'#141a2a']])}
${(()=>{const r=phRand(1705);let o='';for(let i=0;i<40;i++)o+=`<circle cx="${(r()*960).toFixed(0)}" cy="${(r()*220).toFixed(0)}" r="${(.6+r()*1.2).toFixed(1)}" fill="#fff" opacity="${(.3+r()*.6).toFixed(2)}"/>`;return o})()}
${phGlow('ps7h',480,330,360,'#3a4a70',.35)}<path d="M0,470 L0,360 Q300,330 480,260 Q660,330 960,360 L960,470 Z" fill="#1c2232"/>
${psFlag(480,262,'#d84a3a')}
${phGrain('ps7n')}
`);
S.psDunBot=()=>clip('ps8',`
${phSky('ps8s',[[0,'#6aaee8'],[.7,'#ffe2b8'],[1,'#ffd8a0']])}
${phGlow('ps8g',780,200,240,'#fff2c0',.8)}
<path d="M0,470 L0,200 L180,60 L300,150 L470,20 L640,140 L780,70 L960,190 L960,470 Z" fill="#8a96b0"/>
<path d="M150,84 L180,60 L210,84 L195,90 Z M440,44 L470,20 L500,44 L480,52 Z M752,92 L780,70 L808,92 L790,98 Z" fill="#f4f6fa"/>
<path d="${phRidge(1706,280,40,.5)}" fill="#7a9a7a"/>
<path d="M0,470 L0,360 Q300,330 480,260 Q660,330 960,360 L960,470 Z" fill="#6a9a5a"/>
${psFlag(480,262,'#d84a3a')}
${phGrain('ps8n')}
`);

// 5 負面偏誤：烏雲壓滿整個畫面 → 拉遠看，其實晴空裡只有一朵小烏雲
S.psNegTop=()=>clip('ps9',`
${phSky('ps9s',[[0,'#1a1e26'],[1,'#2e343e']])}
${phClouds('ps9c',[.12,.13,.16],1,'0.003 0.008',1707,0,470)}
${phClouds('ps9d',[.22,.24,.28],.7,'0.005 0.014',1708,0,470)}
${phGlow('ps9g',700,120,80,'#cfd8e8',.25)}
${phGrain('ps9n')}
`);
S.psNegBot=()=>clip('ps10',`
${phSky('ps10s',[[0,'#3a9ae8'],[1,'#d8eef8']])}
${phGlow('ps10g',820,80,240,'#fffbe0',.9)}
${[[220,140,1],[520,90,.8],[760,200,.9]].map(([x,y,k])=>`<g fill="#fff" opacity=".9"><ellipse cx="${x}" cy="${y}" rx="${70*k}" ry="${26*k}"/><ellipse cx="${x-30*k}" cy="${y-14*k}" rx="${36*k}" ry="${26*k}"/><ellipse cx="${x+24*k}" cy="${y-20*k}" rx="${40*k}" ry="${30*k}"/></g>`).join('')}
<g fill="#4a505c"><ellipse cx="420" cy="230" rx="44" ry="16"/><ellipse cx="402" cy="220" rx="22" ry="16"/><ellipse cx="434" cy="216" rx="24" ry="18"/></g>
<path d="M0,470 L0,380 Q480,360 960,380 L960,470 Z" fill="#8fc46a"/>
${phGrain('ps10n')}
`);

// 6 計畫謬誤：深夜趕工的書桌和時鐘 → 清晨從容的書桌、熱咖啡
S.psPlanTop=()=>clip('ps11',`
<rect width="960" height="470" fill="#08090e"/>
${phGlow('ps11g',300,260,260,'#ffd98a',.35)}
${psClock(720,120,56,3,0,'#2a2c34','#c8ccd8')}
${ckTable(330,'#2a241e','#1a1612')}
<path d="M240,330 L260,250 L300,230" stroke="#3a3a40" stroke-width="8" fill="none"/><path d="M280,214 L340,226 L322,256 Z" fill="#3a3a40"/>
${psPapers(420,326,10,'#cfcabc')}${psPapers(580,326,7,'#bfbaac')}
${ckCup(760,286,'#3a3a40',false)}
${phGrain('ps11n')}
`);
S.psPlanBot=()=>clip('ps12',`
<rect width="960" height="470" fill="#fbe8cc"/>
${ckWin(60,40,300,240,'#fff8ec',`${phSky('ps12w',[[0,'#8ac8f0'],[1,'#fff2d8']]).replace('<rect width="960" height="470"','<rect x="60" y="40" width="300" height="240"')}${phGlow('ps12s',300,240,120,'#fff6c0',.9)}`)}
<path d="M360,40 L700,470 L60,470 Z" fill="#fff6d8" opacity=".3"/>
${psClock(720,120,56,7,0,'#fff8ec','#5a4a3a')}
${ckTable(330,'#d8b088','#b8906a')}
${psPapers(520,326,3,'#fff')}
${ckCup(760,286,'#f4f0e8',true)}
${phGrain('ps12n')}
`);
