// OpenAI 11/13 推出 ChatGPT Wallet（CNBC、Quartz、Cointelegraph、Yahoo Tech）：與 Visa、Mastercard、American Express 合作；先開放美國 18 歲以上 ChatGPT Pro 訂閱者；由 dots 代理下單，每筆需 Face ID 或指紋核准；代理不會接觸卡號；OpenAI 初期不抽成；商家為賣方，退款找商家
POST({
  caption:'OpenAI 讓 ChatGPT 可以直接幫你刷卡買東西了。',
  theme:'ink',width:1600,height:900,
  title:'ChatGPT 能幫你刷卡了：Wallet 上線',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const cards=[['合作卡組織','Visa、MC、Amex',true],['先開放給','美國 Pro 用戶',false],['每一筆都要','臉部或指紋核准',false],['OpenAI 抽成','初期不抽',false]];
    cards.forEach(([a,b,hl],i)=>{
      const x=110+(i%2)*430,y=170+Math.floor(i/2)*230,w=400,h=200;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.14:0.07}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="${x+30}" y="${y+60}" class="sm">${a}</text>`;
      g+=`<text x="${x+30}" y="${y+140}" style="font-size:38px;font-weight:700;fill:${hl?T.fg:T.text}">${b}</text>`;
    });
    g+=`<text x="110" y="700" style="font-size:40px;font-weight:700;fill:${T.text}">AI 代理<tspan fill="${T.fg}">看不到你的卡號</tspan></text>`;
    g+=`<text x="110" y="756" class="sm">退款與爭議仍要找商家處理</text>`;
    const stats=[['下單的是','dots 代理','OpenAI 的 AI 代理'],['卡片回饋','照樣保留','含符合資格的爭議保障'],['可能卡關','商家擋 AI','防詐系統可能拒單']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
