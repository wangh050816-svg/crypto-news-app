// CPI 公布後 BTC 下跌資訊圖（中文、16:9）
// BTC 每日價格：CoinGecko（每日 00:00 UTC），10/28–11/11，最後一點為 11/11 抓取時即時價
// 盤中低點 72,787、24 小時爆倉約 7.16 億美元且以多單為主：Coinglass，經 Bitcoin.com 報導
// 核心 CPI 10 月月增 0.3%：BLS；Waller 11/10 演講：核心約 0.3% 以上應考慮升 50bp
const all=require('./btc-120d.json');
const pts=all.slice(-15,-2).concat([all[all.length-1]]); // 10/28 起，11/11 只留最新一點
POST({
  caption:'CPI 一出來，BTC 又被往下砸，最低摸到 72,787 🫠',
  theme:'ink',
  width:1600,height:900,
  title:'CPI 公布後，BTC 一路滑到 7 萬 3',
  footer:['@zqqnc',''],
  draw:T=>{
    let g='';
    const X0=150,X1=960,Y0=700,Y1=170,lo=72000,hi=82000;
    const n=pts.length;
    const sx=i=>X0+i/(n-1)*(X1-X0), sy=v=>Y0-(v-lo)/(hi-lo)*(Y0-Y1);
    for(const v of [72000,74000,76000,78000,80000,82000]){
      g+=`<line x1="${X0}" x2="${X1}" y1="${sy(v)}" y2="${sy(v)}" stroke="${T.grid}" stroke-opacity="0.13" stroke-width="2"/>`;
      g+=`<text x="${X0-16}" y="${sy(v)+8}" class="ax" text-anchor="end">${(v/10000).toFixed(1)} 萬</text>`;
    }
    pts.forEach((p,i)=>{ if(i%3===0||i===n-1) g+=`<text x="${sx(i)}" y="${Y0+40}" class="ax" text-anchor="middle">${p[0]}</text>`; });
    // CPI 公布日
    const ci=pts.findIndex(p=>p[0]==='11/10');
    g+=`<line x1="${sx(ci)}" x2="${sx(ci)}" y1="${Y1}" y2="${Y0}" stroke="${T.text}" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="6 6"/>`;
    g+=`<text x="${sx(ci)-12}" y="${Y1+28}" class="sm" text-anchor="end">11/10 CPI 公布</text>`;
    // 價格線與面積
    const line=pts.map((p,i)=>`${sx(i).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
    g+=`<polygon points="${sx(0)},${Y0} ${line} ${sx(n-1)},${Y0}" fill="${T.fill}" fill-opacity="0.35"/>`;
    g+=`<polyline points="${line}" fill="none" stroke="${T.fg}" stroke-width="5" stroke-linejoin="round"/>`;
    // 盤中低點
    g+=`<line x1="${X0}" x2="${X1}" y1="${sy(72787)}" y2="${sy(72787)}" stroke="${T.fg}" stroke-width="2" stroke-dasharray="10 8"/>`;
    g+=`<text x="${X0+12}" y="${sy(72787)-12}" class="sm" style="fill:${T.fg}">CPI 後盤中最低 72,787</text>`;
    g+=`<circle cx="${sx(n-1)}" cy="${sy(pts[n-1][1])}" r="9" fill="${T.text}" stroke="${T.bg}" stroke-width="3"/>`;
    const pk=pts.findIndex(p=>p[0]==='11/05');
    g+=`<text x="${sx(pk)}" y="${sy(80443)-24}" class="sm" text-anchor="middle">上週還在 8 萬附近</text>`;
    // 右側三格
    const stats=[['CPI 後盤中最低','$72,787','11/10'],['24 小時爆倉','7.16 億美元','多單為主'],['10 月核心 CPI 月增','0.3%','剛好踩到 Waller 的升兩碼門檻']];
    stats.forEach(([a,b,c],i)=>{
      const x=1030,y=150+i*200,w=520,h=175;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${x+32}" y="${y+50}" class="sm">${a}</text>`;
      g+=`<text x="${x+32}" y="${y+118}" class="big" fill="${i===2?T.text:T.fg}">${b}</text>`;
      g+=`<text x="${x+32}" y="${y+156}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:23px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
