// Ethlabs 11/11 在 Ethereum Magicians 撤回 EIP-8198（Quick Slots，12 秒→10 秒），改推 2027 初步抗量子（pqai27，用 EIP-8141 Frames）；以太坊基金會路線圖目標 2029/12；仍為社群提案，需核心開發者共識；用戶仍須換用抗量子簽章（CoinDesk、Cointelegraph、MLQ、CoinCodex）
POST({
  caption:'以太坊研究團隊：先別加快出塊，先防量子電腦。',
  theme:'ink',width:1600,height:900,
  title:'以太坊：先不加速，先防量子電腦',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=930,Y=400,x=t=>X0+t*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    [[0,'2027','初步抗量子','start',true],[0.5,'2028','加快出塊延後','middle',false],[1,'2029/12','基金會原本目標','end',false]].forEach(([t,a,b,an,hl])=>{
      const c=hl?T.fg:T.text,tx=an==='start'?x(t)-18:an==='end'?x(t)+18:x(t);
      g+=`<circle cx="${x(t)}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:44px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+76}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="640" style="font-size:40px;font-weight:700;fill:${T.text}">就算升級上線，持幣人<tspan fill="${T.fg}">還要自己換簽章</tspan></text>`;
    g+=`<text x="${X0-20}" y="696" class="sm">錢包也要支援新的抗量子簽章方式</text>`;
    const stats=[['撤回的提案','12 秒→10 秒','EIP-8198 快速出塊'],['目前狀態','社群提案','還要核心開發者同意'],['基金會說法','量子還沒那麼近','能破解錢包的機器']];
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
