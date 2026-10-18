// 插畫：一條往上的山路，100 個人從同一個起點出發，大部分人在路上停下來，只有 1 個人走到旗子那裡
const bez=(t,a,b,c,d)=>{const m=1-t;return m*m*m*a+3*m*m*t*b+3*m*t*t*c+t*t*t*d};
// 路徑：先往下掉進谷底（熊市），再爬上右上的旗子
const P=t=>t<.45?[bez(t/.45,110,300,330,500),bez(t/.45,470,470,860,850)]
                :[bez((t-.45)/.55,500,680,720,940),bez((t-.45)/.55,850,840,250,240)];
// 固定亂數，每次輸出都一樣
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;

POST({
  caption:`大部分人不是輸在看錯方向，
是輸在撐不到自己看對的那一天。`,
  theme:'paper',
  width:1080,height:1080,
  footer:['@zqqnc',''],
  draw:T=>{
    let g='';
    // 路
    const road=[...Array(101)].map((_,i)=>P(i/100).map(v=>v.toFixed(1)).join(',')).join(' ');
    g+=`<polyline points="${road}" fill="none" stroke="${T.grid}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`;
    g+=`<polyline points="${road}" fill="none" stroke="${T.bg}" stroke-width="3" stroke-dasharray="14 16"/>`;
    // 人：大多停在谷底，少數在起點，很少人到後段
    const person=(x,y,c,s=1,sit=false)=>sit
      ?`<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-30" r="9" fill="${c}"/><rect x="-8" y="-20" width="16" height="16" rx="7" fill="${c}"/><rect x="-8" y="-8" width="22" height="8" rx="4" fill="${c}"/></g>`
      :`<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-40" r="9" fill="${c}"/><rect x="-8" y="-30" width="16" height="30" rx="7" fill="${c}"/></g>`;
    const stops=[...Array(99)].map((_,i)=>i<14?rnd()*.2:i<88?.25+rnd()*.25:.5+Math.pow(rnd(),1.6)*.32);
    for(const t of stops){const [x,y]=P(t);const side=rnd()<.5?-1:1;
      g+=person(x+side*(24+rnd()*44),y+side*(20+rnd()*30),T.dim,.9,true)}
    // 終點的旗子和走到的那個人
    const [ex,ey]=P(1);
    g+=`<line x1="${ex+30}" y1="${ey-6}" x2="${ex+30}" y2="${ey-120}" stroke="${T.text}" stroke-width="4" stroke-linecap="round"/><path d="M${ex+32} ${ey-118} L${ex+92} ${ey-100} L${ex+32} ${ey-82}Z" fill="${T.fg}"/>`;
    g+=person(ex-6,ey+4,T.fg,1.25);
    // 起點標記和文字
    const [sx0,sy0]=P(0);
    g+=`<text x="${sx0-10}" y="${sy0-60}" class="hn">100 people saw it coming.</text>`;
    g+=`<text x="420" y="955" class="hn">Most of them left here.</text>`;
    g+=`<text x="${ex-50}" y="${ey-40}" class="hn" text-anchor="end"><tspan fill="${T.fg}" font-weight="700">1</tspan> was still here.</text>`;
    g+=`<style>.hn{fill:${T.text};font-size:34px;font-family:"Caveat",Inter,sans-serif}</style>`;
    return g;
  },
});
