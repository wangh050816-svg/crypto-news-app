// CNBC 11/14：兩家主要投資人致信 Nvidia 董事會，要求考慮黃仁勳回任；Yahoo Finance：「Stand with Jensen」連署逾 10 萬人，其中逾 5,000 人自稱 Nvidia 員工，馬斯克也連署；馬斯克公開質疑董事會（TokenPost、Yahoo）；目前 10 席董事全為非員工董事
// Nvidia 財報：台灣 11/18（三）06:00
POST({
  caption:'黃仁勳才剛下台，已經有人在推他回來。',
  theme:'ink',width:1600,height:900,
  title:'黃仁勳下台 3 天，有人要他回來',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    g+=`<rect x="110" y="170" width="840" height="300" rx="26" fill="${T.fg}" fill-opacity="0.12" stroke="${T.fg}" stroke-opacity="0.8" stroke-width="3"/>`;
    g+=`<text x="150" y="235" class="sm">「Stand with Jensen」連署</text>`;
    g+=`<text x="150" y="350" style="font-size:96px;font-weight:700;fill:${T.fg}">逾 10 萬人</text>`;
    g+=`<text x="150" y="430" style="font-size:38px;font-weight:700;fill:${T.text}">其中逾 5,000 人自稱 Nvidia 員工</text>`;
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">兩家主要投資人<tspan fill="${T.fg}">致信董事會</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">要求考慮讓黃仁勳回任（CNBC）</text>`;
    g+=`<text x="110" y="700" class="sm">馬斯克也簽了連署，並公開質疑董事會</text>`;
    const stats=[['現在的董事會','10 人','全是非員工董事'],['臨時執行長','Kress','原財務長'],['Nvidia 財報','11/18 06:00','台灣時間（週三）']];
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
