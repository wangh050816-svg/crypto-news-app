// Project Meridian FX APAC（英國央行、新加坡金管局、泰國央行，11/13 公布結果；CoinDesk、Crypto Times、CoinLaw、Grafa）：在 RTGS 與分散式帳本的央行測試環境間測試 PvP 同步結算與多邊淨額，讓連動的轉帳同時完成或同時不成立；英國央行計畫 2028 年推出正式同步介面，MAS、BOT 未承諾接入；非穩定幣測試，仍待法律、監管與參與者安排
POST({
  caption:'英國、新加坡、泰國三個央行，完成跨境換匯結算測試。',
  theme:'ink',width:1600,height:900,
  title:'三大央行測跨境結算，2028 要上線',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const nodes=[['英國央行',290,250],['新加坡金管局',770,250],['泰國央行',530,560]];
    g+=`<line x1="290" y1="250" x2="770" y2="250" stroke="${T.fg}" stroke-width="5" stroke-dasharray="14 10"/>`;
    g+=`<line x1="290" y1="250" x2="530" y2="560" stroke="${T.fg}" stroke-width="5" stroke-dasharray="14 10"/>`;
    g+=`<line x1="770" y1="250" x2="530" y2="560" stroke="${T.fg}" stroke-width="5" stroke-dasharray="14 10"/>`;
    nodes.forEach(([n,cx,cy],i)=>{
      g+=`<rect x="${cx-150}" y="${cy-55}" width="300" height="110" rx="22" fill="${T.bg}" stroke="${i===0?T.fg:T.grid}" stroke-width="3"/>`;
      g+=`<text x="${cx}" y="${cy+14}" text-anchor="middle" style="font-size:40px;font-weight:700;fill:${i===0?T.fg:T.text}">${n}</text>`;
    });
    g+=`<text x="110" y="690" style="font-size:38px;font-weight:700;fill:${T.text}">兩邊轉帳<tspan fill="${T.fg}">同時完成，或同時取消</tspan></text>`;
    g+=`<text x="110" y="745" class="sm">傳統即時結算系統＋區塊鏈系統串在一起測試</text>`;
    const stats=[['正式介面','2028 年','英國央行計畫'],['測試內容','同步換匯結算','加上多邊淨額'],['還沒解決','法律與監管','新加坡、泰國未承諾接入']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
