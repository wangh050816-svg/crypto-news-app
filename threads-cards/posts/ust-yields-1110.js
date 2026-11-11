// CPI 公布後美債殖利率（中文、16:9）
// CNBC 11/10（更新 16:06 ET）：2 年期升逾 18bp 至 4.736%，10 年期升 13bp 至 4.992%，盤中一度站上 5%；S&P 500 收跌 0.38%（TheStreet、Yahoo）
POST({
  caption:'CPI 公布後，股市反應不大，債市直接動起來。',
  theme:'ink',
  width:1600,height:900,
  title:'CPI 後，債市比股市先表態',
  footer:['@zqqnc',''],
  draw:T=>{
    let g='';
    const X0=170,X1=1000,Y0=720,Y1=200,lo=4.0,hi=5.2;
    const y=v=>Y0-(v-lo)/(hi-lo)*(Y0-Y1);
    for(const v of [4.0,4.2,4.4,4.6,4.8,5.0,5.2]){
      g+=`<line x1="${X0}" x2="${X1}" y1="${y(v)}" y2="${y(v)}" stroke="${T.grid}" stroke-opacity="0.13" stroke-width="2"/>`;
      g+=`<text x="${X0-16}" y="${y(v)+8}" class="ax" text-anchor="end">${v.toFixed(1)}%</text>`;
    }
    g+=`<line x1="${X0}" x2="${X1}" y1="${y(5)}" y2="${y(5)}" stroke="${T.text}" stroke-width="3" stroke-dasharray="12 10"/>`;
    g+=`<text x="${X1}" y="${y(5)-14}" class="sm" text-anchor="end">5% 關卡</text>`;
    const bars=[['2 年期',4.736,'+18bp 以上'],['10 年期',4.992,'+13bp']];
    const bw=220,gap=(X1-X0-bw*2)/3;
    bars.forEach(([nm,v,ch],i)=>{
      const bx=X0+gap+(bw+gap)*i;
      g+=`<rect x="${bx}" y="${y(v)}" width="${bw}" height="${Y0-y(v)}" rx="12" fill="${T.fg}" fill-opacity="${i?1:0.75}"/>`;
      g+=`<text x="${bx+bw/2}" y="${y(v)+62}" class="vl" text-anchor="middle" style="fill:${T.bg}">${v.toFixed(2)}%</text>`;
      g+=`<text x="${bx+bw/2}" y="${y(v)+100}" class="sm" text-anchor="middle" style="fill:${T.bg};font-weight:700">一天 ${ch}</text>`;
      g+=`<text x="${bx+bw/2}" y="${Y0+44}" class="ax" text-anchor="middle">${nm}美債殖利率</text>`;
    });
    const stats=[['S&P 500','-0.38%','11/10 收盤'],['2 年期殖利率','4.74%','對升息預期最敏感'],['10 年期殖利率','4.99%','盤中一度站上 5%']];
    stats.forEach(([a,b,c],i)=>{
      const x=1060,yy=150+i*200,w=490,h=175;
      g+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${x+32}" y="${yy+50}" class="sm">${a}</text>`;
      g+=`<text x="${x+32}" y="${yy+118}" class="big" fill="${i?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${x+32}" y="${yy+156}" class="sm">${c}</text>`;
    });
    g+=`<style>.vl{font-size:40px;font-weight:700;fill:${T.text}}.sm{fill:${T.dim};font-size:23px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
