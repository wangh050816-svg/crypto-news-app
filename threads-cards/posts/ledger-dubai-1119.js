// 杜拜兩名用戶稱在 Virgin Megastore（Ledger 列為阿聯授權通路）買的 Ledger 遭植入，合計損失約 60.4 萬美元；Flex 已確認植入、Stax 疑似；Ledger 已確認柏林有被動手腳的裝置，改裝都是為了偷助記詞；Ledger 稱晶片與系統無漏洞，官網買的沒有確認案例（Cointelegraph、Decrypt、crypto.news、Crypto Briefing）
const card=require('./lib-barcard.js');
POST({
  caption:'授權通路買的冷錢包被動了手腳。',
  theme:'ink',width:1600,height:900,
  title:'在授權店買冷錢包，還是被偷 60 萬美元',titleSize:52,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const rows=[['柏林','Ledger 已確認被動手腳',true],['杜拜','2 台，損失約 60.4 萬美元',true],['官網買的','目前沒有確認案例',false]];
    rows.forEach(([a,b,hl],i)=>{const y=270+i*150;
      g+=`<circle cx="150" cy="${y-14}" r="16" fill="${hl?T.fg:T.dim}"/>`;
      g+=`<text x="190" y="${y}" style="font-size:46px;font-weight:700;fill:${hl?T.text:T.dim}">${a}</text>`;
      g+=`<text x="190" y="${y+52}" style="font-size:32px;fill:${T.dim}">${b}</text>`;});
    const stats=[['杜拜損失','約 60.4 萬美元','兩位用戶合計'],['在哪買的','Virgin Megastore','Ledger 列的授權通路'],['改裝目的','偷助記詞','Ledger：晶片沒有漏洞']];
    stats.forEach(([a,b,c],i)=>{const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;});
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
