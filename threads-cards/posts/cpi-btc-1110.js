// 10 月 CPI（2026/11/10 公布）× BTC 反應資訊圖
// 核心 CPI 月增：8、9、10 月皆 0.3%（BLS 10 月新聞稿原文：rose 0.3 percent in October, as it did in September and August）
// 10 月核心共識約 0.22%（Bloomberg 調查）；Waller 11/10 演講：核心約 0.3% 以上時，12 月應考慮升 50bp
// BTC 公布後低點 72,787 美元、24 小時爆倉約 7.16 億美元（Coinglass，經 Bitcoin.com 報導）
POST({
  caption:`CPI 一出來，BTC 又被往下砸，最低摸到 72,787 🫠`,
  theme:'ink',
  width:1080,height:1080,
  title:'Core CPI just hit the line',
  footer:['@zqqnc','Data: BLS · Bloomberg survey · Coinglass'],
  draw:T=>{
    let g='';
    const X0=170,X1=1000,Y0=640,Y1=290, max=0.4;
    const y=v=>Y0-(v/max)*(Y0-Y1);
    // 格線與刻度
    for(const v of [0,0.1,0.2,0.3,0.4]){
      g+=`<line x1="${X0}" x2="${X1}" y1="${y(v)}" y2="${y(v)}" stroke="${T.grid}" stroke-opacity="${v?0.15:0.6}" stroke-width="2"/>`;
      g+=`<text x="${X0-18}" y="${y(v)+8}" class="ax" text-anchor="end">${v.toFixed(1)}%</text>`;
    }
    // 長條：8、9、10 月
    const bars=[['Aug',0.3,false],['Sep',0.3,false],['Oct',0.3,true]];
    const bw=150, gap=(X1-X0-bw*3)/4;
    bars.forEach(([m,v,hl],i)=>{
      const bx=X0+gap+(bw+gap)*i;
      g+=`<rect x="${bx}" y="${y(v)}" width="${bw}" height="${Y0-y(v)}" rx="10" fill="${hl?T.fg:T.dim}" fill-opacity="${hl?1:0.45}"/>`;
      g+=`<text x="${bx+bw/2}" y="${Y0+44}" class="ax" text-anchor="middle">${m}</text>`;
      g+=`<text x="${bx+bw/2}" y="${y(v)-18}" class="vl" text-anchor="middle" fill="${hl?T.fg:T.text}">0.3%</text>`;
      if(hl){ // 預期值標記
        g+=`<rect x="${bx-6}" y="${y(0.22)}" width="${bw+12}" height="4" fill="${T.text}"/>`;
        g+=`<text x="${bx+bw/2}" y="${y(0.22)+36}" class="sm" text-anchor="middle" style="fill:${T.bg};font-weight:700">expected</text><text x="${bx+bw/2}" y="${y(0.22)+64}" class="sm" text-anchor="middle" style="fill:${T.bg};font-weight:700">0.22%</text>`;
      }
    });
    // Waller 門檻線
    g+=`<line x1="${X0}" x2="${X1}" y1="${y(0.3)}" y2="${y(0.3)}" stroke="${T.text}" stroke-width="3" stroke-dasharray="12 10"/>`;
    g+=`<text x="${X0-60}" y="170" class="nt">Waller: core at <tspan fill="${T.fg}" font-weight="700">0.3%+</tspan></text>`;
    g+=`<text x="${X0-60}" y="215" class="nt">→ consider a <tspan fill="${T.fg}" font-weight="700">50bp</tspan> hike</text>`;
    // 底部三格數字
    const stats=[['Core CPI (m/m)','0.3%','vs 0.22% expected'],['BTC low after CPI','$72,787','Nov 10'],['Liquidations','$716M','in 24 hours']];
    const sw=(X1-X0+60-40)/3;
    stats.forEach(([a,b,c],i)=>{
      const sx=X0-60+i*(sw+20);
      g+=`<rect x="${sx}" y="740" width="${sw}" height="190" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${sx+28}" y="790" class="sm">${a}</text>`;
      g+=`<text x="${sx+28}" y="862" class="big" fill="${i?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${sx+28}" y="905" class="sm">${c}</text>`;
    });
    g+=`<style>.vl{font-size:30px;font-weight:700}.sm{fill:${T.dim};font-size:22px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
