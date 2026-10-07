// 人生迷茫類寫實風景場景（共用 scenes/photo.js 的 ph* 工具）
const loRainbow=(cx,cy,R,op=.45)=>['#ff6b6b','#ffb36b','#ffe66b','#7be08a','#6bc4ff','#8a7bff'].map((c,i)=>`<path d="M${cx-R+i*9},${cy} A${R-i*9},${R-i*9} 0 0 1 ${cx+R-i*9},${cy}" fill="none" stroke="${c}" stroke-width="9" opacity="${op}"/>`).join('');
const loWaves=(seed,y0,n,c1,c2)=>{let s='';for(let i=0;i<n;i++){const y=y0+i*i*2.2+i*6;s+=`<path d="${phRidge(seed+i,y,10+i*3,.6)}" fill="${i%2?c1:c2}" opacity="${.85}"/>`}return s};

// 1 不知道想要什麼：濃霧平原 → 霧散開露出小路
S.loFogTop=()=>clip('lo1',`
${phSky('lo1s',[[0,'#5d6670'],[1,'#7d868e']])}
${phTree(301,200,330,.7,'#6a737b')}${phTree(302,720,320,.55,'#6a737b')}
<rect y="320" width="960" height="150" fill="#6b747c"/>
${phClouds('lo1f',[.62,.66,.7],.9,'0.002 0.008',31)}
${phClouds('lo1g',[.7,.73,.76],.7,'0.004 0.012',32,150,320)}
${phGrain('lo1n')}
`);
S.loFogBot=()=>clip('lo2',`
${phSky('lo2s',[[0,'#a9cbe6'],[.55,'#f6e2c4'],[1,'#f4e9d6']])}
${phGlow('lo2g',260,230,360,'#fff4d0',.8)}
<path d="${phRidge(311,250,40,.5)}" fill="#b9c4b4" opacity=".7"/>
${phClouds('lo2m',[1,.98,.94],.6,'0.002 0.04',33,200,90)}
<path d="M0,470 L0,280 Q480,250 960,280 L960,470 Z" fill="#8fb27a"/>
<path d="M440,470 Q470,380 478,282 L486,282 Q500,380 560,470 Z" fill="#e3d2a8"/>
<path d="M470,370 Q300,330 150,300 L162,298 Q320,322 476,352 Z" fill="#e3d2a8" opacity=".9"/>
<path d="M500,360 Q680,320 860,296 L870,300 Q700,330 504,374 Z" fill="#e3d2a8" opacity=".9"/>
${(()=>{const r=phRand(315);let s='';for(let i=0;i<260;i++){const y=300+Math.pow(r(),.8)*170;s+=`<path d="M${(r()*960).toFixed(0)},${y.toFixed(0)} l${((r()-.5)*4).toFixed(1)},-${(3+(y-300)/18).toFixed(1)}" stroke="#6f9a5e" stroke-width="1.5"/>`}return s})()}
${phGrain('lo2n')}
`);

// 2 別人過得比較好：遠看滿城燈火 → 照自己季節開的一朵花
S.loCompTop=()=>clip('lo3',`
${phSky('lo3s',[[0,'#0a0e1c'],[1,'#1e2538']])}
${phGlow('lo3g',480,360,520,'#ffb36b',.12)}
${phCity(321,340,40,170,'#141a2a','#ffd98a','#1a2032',.35)}
${phCity(322,380,20,90,'#0f1420','#ffe6a8','#151a28',.45)}
<path d="M0,470 L0,400 Q300,370 520,395 Q760,420 960,390 L960,470 Z" fill="#070a12"/>
${phGrain('lo3n')}
`);
S.loCompBot=()=>clip('lo4',`
${phSky('lo4s',[[0,'#bfe0f2'],[.6,'#f8ecd2'],[1,'#e8dcb8']])}
${phBlur('lo4b',8)}
<g filter="url(#lo4b)"><path d="M0,470 L0,250 Q480,220 960,250 L960,470 Z" fill="#a7c98a"/>${[...Array(14)].map((_,i)=>`<circle cx="${60+i*68}" cy="${200+(i*37)%60}" r="${10+(i*13)%14}" fill="#fff7d0" opacity=".6"/>`).join('')}</g>
${phGlow('lo4g',760,120,260,'#fff6d0',.7)}
${(()=>{const r=phRand(325);let s='';for(let i=0;i<120;i++){const x=r()*960,h=40+r()*120;s+=`<path d="M${x.toFixed(0)},470 q${((r()-.5)*30).toFixed(0)},-${(h/2).toFixed(0)} ${((r()-.5)*40).toFixed(0)},-${h.toFixed(0)}" stroke="#6f9a52" stroke-width="${(2+r()*2).toFixed(1)}" fill="none"/>`}
  [[220,330],[700,350],[840,320]].forEach(([x,y])=>{s+=`<path d="M${x},470 Q${x+6},${y+60} ${x},${y}" stroke="#5f8a46" stroke-width="3" fill="none"/><ellipse cx="${x}" cy="${y}" rx="6" ry="10" fill="#9cc47a"/>`});return s})()}
<path d="M480,470 Q470,360 486,250" stroke="#4f7a3a" stroke-width="6" fill="none"/>
<path d="M478,380 q-50,-10 -70,-50 q50,0 70,40 Z" fill="#6f9a52"/>
${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="486" cy="222" rx="18" ry="40" fill="#ffd2dc" stroke="#e8a0b4" stroke-width="1.5" transform="rotate(${a} 486 250)"/>`).join('')}
<circle cx="486" cy="250" r="16" fill="#ffcf5c"/>
${phGrain('lo4n')}
`);

// 3 覺得來不及：黃昏鐵軌伸進黑暗 → 海上日出
S.loLateTop=()=>clip('lo5',`
${phSky('lo5s',[[0,'#0d1222'],[.55,'#2b3048'],[.62,'#5a4a58'],[1,'#151826']])}
<path d="${phRidge(331,250,30,.5)}" fill="#1c2030"/>
<path d="M0,470 L0,262 L960,262 L960,470 Z" fill="#20232e"/>
<path d="M150,470 L470,262 L490,262 L810,470 Z" fill="#2c2e38"/>
${[...Array(16)].map((_,i)=>{const t=Math.pow(i/15,2.2),y=262+t*208,hw=12+t*330;return `<rect x="${480-hw}" y="${y}" width="${hw*2}" height="${1+t*9}" fill="#3a3530"/>`}).join('')}
<path d="M250,470 L474,262 M710,470 L486,262" stroke="#8a8f9c" stroke-width="4"/>
${phClouds('lo5c',[.15,.17,.24],.6,'0.003 0.02',34,0,240)}
${phGlow('lo5g',480,262,220,'#ff9a6b',.18)}
${phGrain('lo5n')}
`);
S.loLateBot=()=>clip('lo6',`
${phSky('lo6s',[[0,'#7fa6d8'],[.4,'#f6b98a'],[.6,'#ffd7a0'],[.62,'#e8a07a'],[1,'#4a5a7a']])}
${phClouds('lo6c',[1,.82,.7],.55,'0.003 0.03',35,40,180)}
${phGlow('lo6g',480,290,320,'#fff0c0',.95)}<path d="M436,290 a44,44 0 0 1 88,0 Z" fill="#fff8e0"/>
<rect y="290" width="960" height="180" fill="#6a7a98" opacity=".55"/>
${(()=>{const r=phRand(336);let s='';for(let i=0;i<70;i++){const y=294+r()*176,w=8+r()*70*(1-(y-290)/260);s+=`<rect x="${(480-w/2+(r()-.5)*50*(y-280)/60).toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="2" fill="#ffe6b0" opacity="${(.4+r()*.5).toFixed(2)}"/>`}return s})()}
${phGrain('lo6n')}
`);

// 4 想一次想清楚：濃霧吞掉的山路 → 清晨只看得見前一段的亮路
// 有透視的 S 形公路：t=0 在畫面底部，t=1 在地平線 hy；越遠越窄
const loRoad=(hy,fill,edge,line)=>{
  const N=60,L=[],R=[],C=[];
  for(let i=0;i<=N;i++){const t=i/N,k=Math.pow(1-t,1.6),y=470-(470-hy)*(1-Math.pow(1-t,2.2)),cx=470+150*Math.sin(t*Math.PI*1.6)*(1-t)+20*t,w=150*k+1.5;L.push([cx-w,y]);R.push([cx+w,y]);C.push([cx,y,w])}
  const f=a=>a.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
  let s=`<path d="M${f(L)} L${f(R.reverse())} Z" fill="${fill}"/>`;
  s+=`<path d="M${f(L.slice(0,N))}" stroke="${edge}" stroke-width="2" fill="none" opacity=".5"/>`;
  for(let i=0;i<N-6;i+=3){const [x1,y1,w]=C[i],[x2,y2]=C[i+1];s+=`<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="${line}" stroke-width="${(w/30+.6).toFixed(1)}" stroke-linecap="round"/>`}
  return s};
S.loRoadTop=()=>clip('lo7',`
${phSky('lo7s',[[0,'#0c1020'],[1,'#252c40']])}
<path d="${phRidge(341,170,120)}" fill="#1a2030"/>
<path d="${phRidge(342,240,90)}" fill="#141a28"/>
<path d="M0,470 L0,268 Q480,252 960,268 L960,470 Z" fill="#181d2a"/>
${loRoad(262,'#2c3140','#454b5a','#5a6070')}
${phClouds('lo7f',[.3,.33,.4],.9,'0.003 0.01',36,120,250)}
${phGrain('lo7n')}
`);
S.loRoadBot=()=>clip('lo8',`
${phSky('lo8s',[[0,'#9cc4e8'],[.5,'#f8d8b0'],[1,'#f8e8d0']])}
${phGlow('lo8g',620,150,300,'#fff2c8',.85)}
<path d="${phRidge(351,190,110)}" fill="#c4b4b8" opacity=".75"/>
<path d="${phRidge(352,250,80)}" fill="#8fa080"/>
<path d="M0,470 L0,300 Q480,270 960,300 L960,470 Z" fill="#7a9a62"/>
${loRoad(298,'#d9c9a6','#b8a684','#fffaf0')}
${phClouds('lo8m',[1,.97,.92],.75,'0.003 0.03',37,240,70)}
${phGrain('lo8n')}
`);

// 5 覺得一事無成：漆黑的曠野 → 一盞一盞亮起的小燈
S.loWinsTop=()=>clip('lo9',`
${phSky('lo9s',[[0,'#05060c'],[.6,'#0e1220'],[1,'#07080e']])}
${phClouds('lo9c',[.12,.13,.18],.7,'0.004 0.015',38,0,300)}
<path d="${phRidge(361,300,30,.5)}" fill="#090b12"/>
${phGrain('lo9n')}
`);
S.loWinsBot=()=>clip('lo10',`
${phSky('lo10s',[[0,'#3a4a7a'],[.45,'#c88a8a'],[.62,'#f6b884'],[1,'#3a3040']])}
${phClouds('lo10c',[1,.8,.75],.4,'0.003 0.03',39,30,180)}
<path d="${phRidge(371,290,50,.5)}" fill="#5a4a5a"/>
<path d="M0,470 L0,310 Q480,290 960,310 L960,470 Z" fill="#3a3040"/>
<path d="M330,470 Q440,380 470,300 L486,300 Q520,380 650,470 Z" fill="#6a5a5a"/>
${[...Array(9)].map((_,i)=>{const t=Math.pow(i/8,1.6),y=304+t*160,dx=10+t*190,r=2+t*9;return [-1,1].map(sg=>{const x=478+sg*dx;return `${phGlow('lo10l'+i+(sg>0?'r':'l'),x,y-r*3,r*7,'#ffd27a',.75)}<rect x="${x-1}" y="${y-r*3}" width="2" height="${r*3}" fill="#2a2228"/><circle cx="${x}" cy="${y-r*3}" r="${r}" fill="#fff0c0"/>`}).join('')}).join('')}
${phGrain('lo10n')}
`);

// 6 想放棄一切：暴風雨夜的海與燈塔 → 雨後水窪映著彩虹
S.loStormTop=()=>clip('lo11',`
${phSky('lo11s',[[0,'#0a0d16'],[1,'#1c2434']])}
${phClouds('lo11c',[.22,.25,.32],.85,'0.004 0.012',40,0,260)}
<path d="M790,262 Q835,236 880,262 Z" fill="#0a0c12"/><path d="M820,250 L827,180 L843,180 L850,250 Z" fill="#3a4254"/><path d="M823,228 h24 M825,205 h20" stroke="#8a2f36" stroke-width="7"/><path d="M822,180 h26 l-13,-14 Z" fill="#2a3040"/><rect x="826" y="170" width="18" height="12" fill="#ffe6a0"/>
<path d="M835,176 L560,140 L560,200 Z" fill="#ffe6a0" opacity=".12"/>${phGlow('lo11g',835,176,60,'#ffe6a0',.6)}
${loWaves(401,250,9,'#18202e','#121824')}
${phRain(402,320,'#aab8cc',.3)}
${phGrain('lo11n')}
`);
S.loStormBot=()=>clip('lo12',`
${phSky('lo12s',[[0,'#8ec4ea'],[.6,'#d8ecf4'],[1,'#eef3e8']])}
${phClouds('lo12c',[1,1,1],.55,'0.004 0.015',41,0,180)}
${loRainbow(520,330,300)}
<path d="${phRidge(411,300,40,.5)}" fill="#8fb48a"/>
<path d="M0,470 L0,330 Q480,315 960,330 L960,470 Z" fill="#9c8a6c"/>
<ellipse cx="420" cy="400" rx="260" ry="46" fill="#cfe6f4"/>
<g clip-path="url(#lo12p)"><clipPath id="lo12p"><ellipse cx="420" cy="400" rx="260" ry="46"/></clipPath><g transform="translate(0,700) scale(1,-1)" opacity=".7">${loRainbow(520,330,300,.5)}</g></g>
<ellipse cx="820" cy="430" rx="90" ry="18" fill="#cfe6f4" opacity=".9"/>
${phGlow('lo12g',700,60,300,'#fff8d8',.6)}
${phGrain('lo12n')}
`);
