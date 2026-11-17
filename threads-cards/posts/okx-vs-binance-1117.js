// CoinDesk、DL News（Yahoo）、Stocktwits 11/16：OKX 執行長徐明星指幣安與 CZ 連兩年 10 月引發崩盤（2025、2026），稱不是攻擊而是談根本原因；2025/10 他指向幣安 USDe 收益產品助長槓桿，BTC 數小時內從約 12.2 萬跌破 10.5 萬；這次 BTC 從約 7.4 萬跌到一度低於 6.2 萬；CZ 稱幣安沒賣幣、自己在買，未直接回應；報導指徐未提出新數據
POST({
  caption:'OKX 老闆公開說：連兩年 10 月崩盤，都是幣安造成的。',
  theme:'ink',width:1600,height:900,
  title:'OKX 徐明星開砲：兩年崩盤都怪幣安',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const box=(y,a,b,c,hl)=>{
      g+=`<rect x="110" y="${y}" width="840" height="210" rx="22" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.14:0.06}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="150" y="${y+58}" class="sm">${a}</text>`;
      g+=`<text x="150" y="${y+128}" style="font-size:44px;font-weight:700;fill:${hl?T.fg:T.text}">${b}</text>`;
      g+=`<text x="150" y="${y+180}" class="sm">${c}</text>`;
    };
    box(170,'2025 年 10 月','約 12.2 萬 → 跌破 10.5 萬','他怪幣安的 USDe 收益產品助長槓桿',false);
    box(420,'2026 年 10–11 月','約 7.4 萬 → 一度低於 6.2 萬','他說 CZ 誤導用戶「長期持有」',true);
    g+=`<text x="110" y="710" class="sm">報導指出：徐明星這次沒有拿出新的數據</text>`;
    const stats=[['開砲的人','徐明星','OKX 執行長'],['CZ 的說法','幣安沒賣幣','自己還在買'],['CZ 回應了嗎','沒正面回應','只否認責任']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:52px;font-weight:700}</style>`;
    return g;
  },
});
