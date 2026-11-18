// 共用版型：左邊大字重點（lines: [[文字, 字級, 是否橘色]]，可用 {y} 自訂起點）、右邊三格重點數字
module.exports=({lines,stats,y0=260,gap=20})=>T=>{
  let g='',y=y0;
  lines.forEach(([t,s,hl])=>{y+=s+gap;g+=`<text x="110" y="${y}" style="font-size:${s}px;font-weight:${s>=40?700:400};fill:${hl?T.fg:(s>=40?T.text:T.dim)}">${t}</text>`;});
  stats.forEach(([a,b,c],i)=>{
    const x=1040,yy=150+i*205,w=520,h=185;
    g+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
    g+=`<text x="${x+32}" y="${yy+48}" class="sm">${a}</text>`;
    g+=`<text x="${x+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
    g+=`<text x="${x+32}" y="${yy+164}" class="sm">${c}</text>`;
  });
  g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:54px;font-weight:700}</style>`;
  return g;
};
