// 寫實風景場景：程式產生的漸層、霧氣、山脈與雲（不畫小人、不用描邊）
const phRand=seed=>()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
// 山稜線：中點位移法，回傳填滿到底部的 path
function phRidge(seed,base,amp,rough=.55,w=960,h=470){
  const r=phRand(seed),n=64;let pts=[base,base+(r()-.5)*amp];let a=amp;
  while(pts.length<n+1){const nx=[];for(let i=0;i<pts.length-1;i++){nx.push(pts[i],(pts[i]+pts[i+1])/2+(r()-.5)*a)}nx.push(pts[pts.length-1]);pts=nx;a*=rough}
  const step=w/(pts.length-1);
  return `M0,${h} `+pts.map((y,i)=>`L${(i*step).toFixed(1)},${y.toFixed(1)}`).join(' ')+` L${w},${h} Z`;
}
const phSky=(id,stops)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient><rect width="960" height="470" fill="url(#${id})"/>`;
const phGlow=(id,x,y,r,c,op=.8)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${op}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;
// 雲／霧：feTurbulence 雜訊，透過 alpha 控制濃淡
const phClouds=(id,c,op=.5,freq='0.006 0.02',seed=3,y=0,h=470)=>`<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="5" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  0 0 0 2.2 -1.1"/></filter><rect y="${y}" width="960" height="${h}" filter="url(#${id})" opacity="${op}"/>`;
const phGrain=id=>`<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .08 0"/></filter><rect width="960" height="470" filter="url(#${id})"/>`;
function phCity(seed,base,minH,maxH,fill,winLit,winDark,litOdds=.04,sky=0){
  const r=phRand(seed);let x=-10,s='';
  while(x<960){const w=40+r()*70,h=minH+r()*(maxH-minH),top=base-h;
    s+=`<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${h+500}" fill="${fill}"/>`;
    if(winLit){for(let wy=top+10;wy<base+60;wy+=14)for(let wx=x+6;wx<x+w-8;wx+=11){const lit=r()<litOdds;s+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7" fill="${lit?winLit:winDark}"/>`}}
    x+=w+2+r()*6}
  return s;
}
const phRain=(seed,n,c='#c9d6e8',op=.35)=>{const r=phRand(seed);let s='';for(let i=0;i<n;i++){const x=r()*1000,y=r()*470,l=14+r()*22;s+=`<path d="M${x.toFixed(1)},${y.toFixed(1)} l-${(l*.25).toFixed(1)},${l.toFixed(1)}" stroke="${c}" stroke-width="1.4" opacity="${op}"/>`}return s};
const phTurbine=(x,y,h,c,rot=0)=>`<path d="M${x-3},${y} L${x-1.5},${y-h} L${x+1.5},${y-h} L${x+3},${y} Z" fill="${c}"/><g transform="rotate(${rot} ${x} ${y-h})">${[0,120,240].map(a=>`<path d="M${x},${y-h} l-2,0 l1,-${h*.55} l2,0 Z" fill="${c}" transform="rotate(${a} ${x} ${y-h})"/>`).join('')}</g><circle cx="${x}" cy="${y-h}" r="2.5" fill="${c}"/>`;

// 拿時間換錢：雨夜城市，只剩一扇窗亮著
S.phLevTop=()=>clip('ph1',`
${phSky('ph1s',[[0,'#0b1020'],[.6,'#1a2438'],[1,'#2a3348']])}
${phClouds('ph1c',[.35,.4,.5],.55,'0.004 0.012',11,0,260)}
${phGlow('ph1g',480,300,420,'#ff9a4a',.08)}
${phCity(5,330,40,140,'#1a2232')}
<rect y="300" width="960" height="40" fill="#2a3348" opacity=".45"/>
${phCity(9,380,90,260,'#0e1420','#ffd98a','#1b2333',.015)}
<rect x="452" y="210" width="5" height="7" fill="#ffe6a8"/>${phGlow('ph1w',454,214,40,'#ffd98a',.5)}
<rect y="380" width="960" height="90" fill="#0b0f18"/>
<g opacity=".25" transform="translate(0,760) scale(1,-1)">${phCity(9,380,90,260,'#0e1420','#ffd98a','#1b2333',.015)}</g>
<rect y="380" width="960" height="90" fill="#0b0f18" opacity=".55"/>
${phRain(4,260)}
${phGrain('ph1n')}
`);
// 打造槓桿：清晨山谷，遠方風車在轉
S.phLevBot=()=>clip('ph2',`
${phSky('ph2s',[[0,'#7fb0d8'],[.45,'#f7c98f'],[.7,'#ffdcaa'],[1,'#fbe8c8']])}
${phGlow('ph2g',700,170,320,'#fff2c4',.9)}<circle cx="700" cy="170" r="30" fill="#fff8e0"/>
${phClouds('ph2c',[1,.93,.85],.6,'0.003 0.015',21,0,220)}
<path d="${phRidge(3,250,140)}" fill="#c9b3c4" opacity=".75"/>
<path d="${phRidge(8,290,110)}" fill="#a796ac" opacity=".85"/>
${phClouds('ph2m',[1,.95,.9],.35,'0.002 0.03',5,230,120)}
<path d="${phRidge(13,330,80)}" fill="#7e8a7a"/>
${phTurbine(560,318,70,'#6f7a6c',10)}${phTurbine(620,312,60,'#6f7a6c',50)}${phTurbine(500,322,52,'#6f7a6c',85)}
<path d="${phRidge(17,370,60,.5)}" fill="#5f7a4e"/>
<path d="${phRidge(22,420,40,.5)}" fill="#3f5a34"/>
${phGlow('ph2h',700,330,500,'#ffd9a0',.25)}
${phGrain('ph2n')}
`);
