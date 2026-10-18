// 插畫：30 疊硬幣代表 30 年，每年報酬 8% 複利（1.08^n）
// 第 10 年 2.16 倍、第 20 年 4.66 倍、第 30 年 10.06 倍
// 總獲利 9.06 倍裡：前 10 年只占 13%，最後 10 年占 60%
const r=1.08, v=n=>Math.pow(r,n);
const gain=v(30)-1, first=(v(10)-1)/gain, last=(v(30)-v(20))/gain; // 0.13, 0.60

POST({
  caption:`複利最難熬的，是前 10 年什麼都沒發生；
最後 10 年，才賺走一大半。`,
  theme:'paper',
  width:1080,height:1080,
  footer:['@zqqnc','Grey = what you put in · 8% a year, compounded'],
  draw:T=>{
    const base=900,x0=205,step=27.3,w=21,k=62; // k：每 1 倍的高度
    let g='';
    g+=`<line x1="80" x2="1000" y1="${base}" y2="${base}" stroke="${T.grid}" stroke-width="4" stroke-linecap="round"/>`;
    for(let n=1;n<=30;n++){
      const h=v(n)*k, x=x0+(n-1)*step, late=n>20, c=late?T.fg:'#c9a46a', edge=late?'#b84a22':'#a8854f';
      g+=`<rect x="${x}" y="${base-h}" width="${w}" height="${h}" rx="3" fill="${c}"/>`;
      g+=`<rect x="${x}" y="${base-k}" width="${w}" height="${k}" fill="#d9d0c2"/>`; // 本金：灰色，上面才是賺到的
      for(let y=base-9;y>base-h+4;y-=9) g+=`<line x1="${x+2}" x2="${x+w-2}" y1="${y}" y2="${y}" stroke="${y>base-k?'#b9ae9d':edge}" stroke-width="1.5" opacity=".55"/>`;
      g+=`<ellipse cx="${x+w/2}" cy="${base-h}" rx="${w/2}" ry="4" fill="${edge}"/>`;
      if([1,10,20,30].includes(n)) g+=`<text x="${x+w/2}" y="${base+40}" class="yr" text-anchor="middle">${n===1?'year 1':n}</text>`;
    }
    // 前 10 年：坐著發呆的人
    const px=125, py=base-110;
    g+=`<g transform="translate(${px},${base}) scale(1.6)"><circle cx="0" cy="-30" r="9" fill="${T.text}"/><rect x="-8" y="-20" width="16" height="16" rx="7" fill="${T.text}"/><rect x="-8" y="-8" width="22" height="8" rx="4" fill="${T.text}"/></g>`;
    g+=`<g transform="translate(${px-40},${py-40})"><rect x="0" y="-38" width="250" height="56" rx="28" fill="#fff" stroke="${T.grid}" stroke-width="2"/><path d="M28 16 L18 40 L48 16Z" fill="#fff" stroke="${T.grid}" stroke-width="2"/><rect x="26" y="14" width="24" height="5" fill="#fff"/><text x="125" y="0" class="hn" text-anchor="middle">Is this working?</text></g>`;
    // 標註
    g+=`<text x="${x0}" y="${base-262}" class="hn">Years 1–10:</text><text x="${x0}" y="${base-224}" class="hn"><tspan font-weight="700">${Math.round(first*100)}%</tspan> of the growth</text>`;
    const lx=x0+20*step-30;
    g+=`<text x="${lx}" y="250" class="hn" text-anchor="end">Years 21–30:</text><text x="${lx}" y="290" class="hn" text-anchor="end"><tspan fill="${T.fg}" font-weight="700">${Math.round(last*100)}%</tspan> of the growth</text>`;
    g+=`<style>.hn{fill:${T.text};font-size:38px;font-family:"Caveat",Inter,sans-serif}.yr{fill:${T.dim};font-size:22px;font-family:Inter,sans-serif}</style>`;
    return g;
  },
});
