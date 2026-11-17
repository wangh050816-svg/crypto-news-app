// CoinDesk、MLex、CryptoBriefing、Cryptopolitan 11/16：前 Robinhood 工程師 Huaisong Xiang 認罪電匯詐欺，利用未公開上幣資訊在 Hyperliquid 交易永續合約（2025–2026），至少 11 次上架公告前交易；同意沒收獲利 125,523 美元；最高可判 20 年；同案同事 Hefu Chai 仍待審；Robinhood 稱全力配合、零容忍
POST({
  caption:'Robinhood 工程師偷看上幣名單，去 Hyperliquid 下單，認罪了。',
  theme:'ink',width:1600,height:900,
  title:'Robinhood 工程師內線上幣，認罪了',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=930,Y=380,x=t=>X0+t*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    [[0,'先知道','哪些幣要上架','start',false],[0.5,'去 Hyperliquid','開永續合約','middle',false],[1,'公告後','獲利了結','end',true]].forEach(([t,a,b,an,hl])=>{
      const c=hl?T.fg:T.text,tx=an==='start'?x(t)-18:an==='end'?x(t)+18:x(t);
      g+=`<circle cx="${x(t)}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:42px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+76}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="620" style="font-size:40px;font-weight:700;fill:${T.text}">罪名是<tspan fill="${T.fg}">電匯詐欺</tspan>，最高可判 20 年</text>`;
    g+=`<text x="${X0-20}" y="676" class="sm">同案的另一位同事還在審理中</text>`;
    const stats=[['偷跑次數','至少 11 次','Robinhood 上架公告前'],['要吐回的獲利','約 12.6 萬','美元'],['交易時間','2025–2026','永續合約']];
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
