// 共用畫圖工具：人物 char()、對話框 bubble()、窗戶 win()、K線螢幕 monitor() 等
const K='#1d1d1d';
const st=(w=4)=>`stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

function tube(d){return `<path d="${d}" fill="none" stroke="${K}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`}

function face(m, o={}){
  const dx=o.look||0; let s='';
  // eyes
  if(m==='sleep'){
    s+=`<path d="M-34,12 Q-24,20 -14,12 M14,12 Q24,20 34,12" fill="none" ${st(4)}/>`;
  }else if(m==='tired'){
    s+=`<ellipse cx="${-24+dx}" cy="12" rx="7" ry="6" fill="${K}"/><ellipse cx="${24+dx}" cy="12" rx="7" ry="6" fill="${K}"/>`;
    s+=`<path d="M-35,7 L-13,7 M13,7 L35,7" ${st(4)}/><path d="M-32,24 Q-24,28 -16,24 M16,24 Q24,28 32,24" fill="none" stroke="#8a8aa8" stroke-width="3" stroke-linecap="round"/>`;
  }else{
    for(const x of [-24,24]){s+=`<ellipse cx="${x+dx}" cy="10" rx="7" ry="10" fill="${K}"/><circle cx="${x+dx+2.5}" cy="5" r="2.6" fill="#fff"/>`}
  }
  // brows
  if(m==='worried'||m==='sad'||m==='tired') s+=`<path d="M-38,-14 L-16,-21 M16,-21 L38,-14" ${st(4)}/>`;
  if(m==='determined') s+=`<path d="M-38,-22 L-15,-13 M15,-13 L38,-22" ${st(5)}/>`;
  if(m==='pout') s+=`<path d="M-38,-18 L-16,-14 M16,-14 L38,-18" ${st(4)}/>`;
  // mouth
  const mouth={happy:'M-14,34 Q0,48 14,34',smile:'M-10,36 Q0,43 10,36',sleep:'M-8,36 Q0,41 8,36',
    worried:'M-10,40 Q0,34 10,40',sad:'M-12,42 Q0,32 12,42',tired:'M-7,39 L7,39',neutral:'M-7,38 L7,38',
    determined:'M-12,35 Q0,44 12,35',pout:'M-9,40 Q0,35 9,40'}[m]||'M-7,38 L7,38';
  s+=`<path d="${mouth}" fill="none" ${st(4)}/>`;
  if(m==='happy'||m==='smile'||m==='sleep'||m==='determined') s+=`<ellipse cx="-44" cy="28" rx="10" ry="6" fill="#f4a6a6" opacity=".55"/><ellipse cx="44" cy="28" rx="10" ry="6" fill="#f4a6a6" opacity=".55"/>`;
  if(o.sweat) s+=`<path d="M56,-30 Q66,-14 60,-6 Q50,-6 56,-30 Z" fill="#9fd3f5" ${st(3)}/>`;
  return s;
}

function head(m,o={}){
  const hairFill=o.dark?'#2b2b2b':'#fff';
  let s=`<circle cx="-72" cy="8" r="13" fill="#fff" ${st()}/><circle cx="72" cy="8" r="13" fill="#fff" ${st()}/>`;
  s+=`<ellipse cx="0" cy="0" rx="72" ry="68" fill="#fff" ${st()}/>`;
  s+=`<path d="M-75,4 C-84,-62 -36,-98 4,-95 C46,-96 86,-60 75,4 L66,-14 L56,-30 L44,-17 L30,-38 L14,-24 L-2,-42 L-18,-24 L-34,-38 L-46,-20 L-60,-30 L-68,-12 Z" fill="${hairFill}" ${st()}/>`;
  if(!o.dark) s+=`<path d="M-30,-70 Q-10,-80 8,-72 M20,-80 Q36,-76 46,-64" fill="none" ${st(3)}/>`;
  if(o.pony) s+=`<path d="M60,-60 Q110,-60 104,10 Q96,-20 70,-30 Z" fill="${hairFill}" ${st()}/>`;
  return s+face(m,o);
}

const POSES={
  down:{back:['M-100,150 L-110,300','M100,150 L110,300']},
  chin:{back:['M-100,150 L-110,300'],front:['M100,155 L98,220 L28,92'],hands:[[26,84]]},
  wave:{back:['M-100,150 L-110,300','M100,150 L170,120 L190,20'],hands:[[192,12]]},
  hold:{front:['M-100,155 L-86,250 L-34,262','M100,155 L86,250 L34,262'],hands:[[-30,262],[30,262]]},
  cross:{front:['M-100,155 L-84,225 L66,212','M100,155 L84,232 L-64,226']},
  umbrella:{back:['M-100,150 L-110,300'],front:['M100,155 L150,215 L120,118'],hands:[[120,112]]},
  scratch:{back:['M-100,150 L-110,300','M100,150 L160,110 L76,-44'],hands:[[72,-50]]},
  desk:{mid:['M-100,158 L-150,250 L-10,262','M100,158 L150,250 L10,262'],hands:[[-6,262],[6,262]]},
  write:{mid:['M-100,158 L-140,252 L-40,262'],front:['M100,158 L150,240 L60,262'],hands:[[-36,262],[56,262]],pen:true},
  chinboth:{front:['M-100,158 L-120,250 L-40,70','M100,158 L120,250 L40,70'],hands:[[-40,64],[40,64]]},
};

function char(x,y,sc,m,pose='down',o={}){
  const p=POSES[pose]; let s=`<g transform="translate(${x},${y}) scale(${sc})">`;
  (p.back||[]).forEach(d=>s+=tube(d));
  if(o.legs) s+=`<path d="M-72,320 L-64,462 L-14,462 L-6,330 Z M6,330 L14,462 L64,462 L72,320 Z" fill="#d9dde6" ${st()}/><ellipse cx="-42" cy="470" rx="34" ry="14" fill="#fff" ${st()}/><ellipse cx="42" cy="470" rx="34" ry="14" fill="#fff" ${st()}/>`;
  s+=`<path d="M-30,62 L-96,88 L-126,162 L-92,176 L-80,146 L-80,330 L80,330 L80,146 L92,176 L126,162 L96,88 L30,62 Q0,80 -30,62 Z" fill="${o.shirt||'#fff'}" ${st()}/>`;
  s+=`<path d="M-30,62 Q0,84 30,62" fill="none" ${st(3)}/>`;
  if(o.logo) s+=`<text x="40" y="150" font-size="18" font-weight="700" fill="${K}" text-anchor="middle">${o.logo}</text>`;
  (p.mid||[]).forEach(d=>s+=tube(d));
  if(!o.headAfter) s+=head(m,o);
  (p.front||[]).forEach(d=>s+=tube(d));
  (p.hands||[]).forEach(([hx,hy])=>s+=`<circle cx="${hx}" cy="${hy}" r="17" fill="#fff" ${st()}/>`);
  if(p.pen) s+=`<path d="M52,266 L86,206" ${st(7)}/><path d="M52,266 L86,206" stroke="#f2b134" stroke-width="3"/>`;
  if(o.headAfter) s+=head(m,o);
  return s+'</g>';
}

const rain=(n,c='#9fb6c9')=>{let s='';for(let i=0;i<n;i++){const x=(i*97)%960,y=(i*53)%470;s+=`<path d="M${x},${y} l-10,26" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`}return s};
const win=(x,y,w,h,sky,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sky}" ${st(5)}/>${extra}<path d="M${x+w/2},${y} V${y+h} M${x},${y+h/2} H${x+w}" ${st(5)}/><rect x="${x-10}" y="${y+h}" width="${w+20}" height="14" fill="#e9e4da" ${st(4)}/>`;
const clip=(id,body)=>`<svg class="panel" viewBox="0 0 960 470" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><rect width="960" height="470"/></clipPath></defs><g clip-path="url(#${id})">${body}</g><rect width="960" height="470" fill="none" stroke="#000" stroke-width="2"/></svg>`;
const zzz=(x,y)=>`<g font-family="Noto Sans TC" font-weight="900" fill="#d9defa"><text x="${x}" y="${y}" font-size="44">Z</text><text x="${x+40}" y="${y-36}" font-size="34">z</text><text x="${x+72}" y="${y-66}" font-size="26">z</text></g>`;
const bubble=(x,y,w,h,txt,fs=34,fill='#fff')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" ${st()}/><path d="M${x+40},${y+h-2} l-14,26 l34,-26" fill="${fill}" ${st()}/><text x="${x+w/2}" y="${y+h/2+fs*.36}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="${K}">${txt}</text>`;

const S={};
function candles(x,y,w,h,dir,n=12){
  let s='',prev=dir==='up'?.85:.2;const cw=w/n;
  for(let i=0;i<n;i++){
    const t=dir==='up'?.85-i*.7/(n-1):.2+i*.7/(n-1);
    let c=t+(((i*37)%7)-3)*.02; if(i%4===2) c=prev+(dir==='up'?.06:-.06);
    const o=prev,top=Math.min(o,c),bot=Math.max(o,c),cx=x+cw*i+cw/2,g=c<o;
    const col=g?'#2fd18a':'#ff5a5f';
    s+=`<path d="M${cx},${y+(top-.05)*h} V${y+(bot+.05)*h}" stroke="${col}" stroke-width="3"/>`;
    s+=`<rect x="${cx-cw*.3}" y="${y+top*h}" width="${cw*.6}" height="${Math.max(4,(bot-top)*h)}" fill="${col}"/>`;
    prev=c;
  }
  return s;
}
const monitor=(x,y,w,h,dir,label)=>`<path d="M${x+w/2},${y+h} v40 M${x+w/2-60},${y+h+40} h120" ${st(8)}/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#222" ${st()}/><rect x="${x+12}" y="${y+12}" width="${w-24}" height="${h-24}" rx="4" fill="#0f1420"/>
${candles(x+24,y+50,w-48,h-80,dir)}<text x="${x+w-26}" y="${y+46}" font-size="30" font-weight="900" text-anchor="end" fill="${dir==='up'?'#2fd18a':'#ff5a5f'}">${label}</text>`;
const desk=(y,top='#c8935f',front='#a97446')=>`<rect x="40" y="${y}" width="880" height="28" fill="${top}" ${st()}/><rect x="40" y="${y+28}" width="880" height="60" fill="${front}" ${st()}/>`;
const mug=(x,y)=>`<path d="M${x},${y} h60 v44 q0,18 -18,18 h-24 q-18,0 -18,-18 Z" fill="#fff" ${st()}/><path d="M${x+60},${y+12} q20,0 18,18 q-2,14 -18,12" fill="none" ${st()}/><path d="M${x+14},${y-18} q-8,-12 0,-24 M${x+36},${y-22} q-8,-12 0,-24" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round"/>`;
const coin=(x,y,r=18)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffcf3d" ${st(3)}/><text x="${x}" y="${y+r*.4}" font-size="${r*1.1}" font-weight="900" text-anchor="middle" fill="#a8741a">₿</text>`;

