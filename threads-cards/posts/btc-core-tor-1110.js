// Bitcoin Core 11/10 安全公告 CVE-2025-62860（CoinDesk 11/12、CryptoSlate）：Tor 連入會顯示為本機 Tor 位址，開了 -whitelist 涵蓋該位址的節點會把所有 Tor 對象視為受信任；數千個可連線主網節點受影響；嚴重度中；2025/10 已修補（約 13 個月前）；未說明是否遭利用
POST({
  caption:'比特幣核心軟體揭露了一個藏了很久的漏洞。',
  theme:'ink',width:1600,height:900,
  title:'Bitcoin Core 揭露：數千節點把陌生人當自己人',titleSize:50,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=960,Y=430,x=i=>X0+i*(X1-X0);
    g+=`<line x1="${x(0)}" x2="${x(1)}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    [[0,'2025/10','漏洞已修補','start'],[1,'2026/11/10','才對外公開','end']].forEach(([i,a,b,an],k)=>{
      const cx=x(i),tx=an==='start'?cx-18:cx+18,c=k?T.fg:T.text;
      g+=`<circle cx="${cx}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:46px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y-110}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${(x(0)+x(1))/2}" y="${Y+80}" text-anchor="middle" style="font-size:44px;font-weight:700;fill:${T.text}">相隔約 <tspan fill="${T.fg}">13 個月</tspan></text>`;
    g+=`<text x="${X0-20}" y="660" class="nt" style="font-size:40px">只影響<tspan fill="${T.fg}" font-weight="700">開了白名單設定</tspan>的節點</text>`;
    g+=`<text x="${X0-20}" y="712" class="sm">公告沒有說明是否有人實際利用</text>`;
    const stats=[['受影響節點','數千個','可連線的主網節點'],['問題','Tor 陌生人','被當成受信任對象'],['嚴重程度','中等','防垃圾與隱私保護被削弱']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:56px;font-weight:700}</style>`;
    return g;
  },
});
