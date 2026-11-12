// 共用版型：左邊長條圖、右邊三格重點數字（中文、16:9）
// bars: [[標籤, 數值, 顯示文字, 是否強調]], range: [lo, hi], ticks: 刻度陣列, fmt: 刻度文字函式
// stats: [[小標, 大字, 說明]], line: 選填的參考線 {v, text}
module.exports=({bars,range,ticks,fmt,stats,line})=>T=>{
  let g='';
  const X0=170,X1=980,Y0=700,Y1=200,[lo,hi]=range;
  const y=v=>Y0-(v-lo)/(hi-lo)*(Y0-Y1);
  for(const v of ticks){
    g+=`<line x1="${X0}" x2="${X1}" y1="${y(v)}" y2="${y(v)}" stroke="${T.grid}" stroke-opacity="${v===0?0.6:0.13}" stroke-width="2"/>`;
    g+=`<text x="${X0-16}" y="${y(v)+8}" class="ax" text-anchor="end">${fmt(v)}</text>`;
  }
  if(line){
    g+=`<line x1="${X0}" x2="${X1}" y1="${y(line.v)}" y2="${y(line.v)}" stroke="${T.text}" stroke-width="3" stroke-dasharray="12 10"/>`;
    g+=`<text x="${X1}" y="${y(line.v)-14}" class="sm" text-anchor="end">${line.text}</text>`;
  }
  const n=bars.length,bw=Math.min(220,(X1-X0)/(n*1.6)),gap=(X1-X0-bw*n)/(n+1);
  const base=y(Math.max(lo,Math.min(0,hi)));
  bars.forEach(([lab,v,txt,hl],i)=>{
    const bx=X0+gap+(bw+gap)*i, top=Math.min(y(v),base), h=Math.abs(base-y(v));
    g+=`<rect x="${bx}" y="${top}" width="${bw}" height="${Math.max(h,4)}" rx="12" fill="${hl?T.fg:T.dim}" fill-opacity="${hl?1:0.5}"/>`;
    const ty=v>=0?top-20:top+h+46;
    g+=`<text x="${bx+bw/2}" y="${ty}" class="vl" text-anchor="middle" fill="${hl?T.fg:T.text}">${txt}</text>`;
    g+=`<text x="${bx+bw/2}" y="${Y0+44}" class="ax" text-anchor="middle">${lab}</text>`;
  });
  stats.forEach(([a,b,c],i)=>{
    const x=1040,yy=150+i*205,w=520,h=185;
    g+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
    g+=`<text x="${x+32}" y="${yy+48}" class="sm">${a}</text>`;
    g+=`<text x="${x+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
    g+=`<text x="${x+32}" y="${yy+164}" class="sm">${c}</text>`;
  });
  g+=`<style>.vl{font-size:40px;font-weight:700}.sm{fill:${T.dim};font-size:29px}.big{font-size:58px;font-weight:700}.ax{font-size:28px!important}</style>`;
  return g;
};
