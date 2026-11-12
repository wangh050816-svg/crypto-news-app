// Nvidia 黃仁勳事件時間軸（台灣時間標日期以美東為準）：11/8 承認婚外情、董事會啟動調查；11/9 股東提集體訴訟；11/11 WSJ 報導董事會準備讓他下台，盤後跌逾 8% 至 159.51（CNBC、CBS、NBC）；財報美東 11/17 盤後
POST({
  caption:'如果報導屬實，Nvidia 可能要換掉創辦人了。',
  theme:'ink',width:1600,height:900,
  title:'Nvidia 董事會傳出準備換掉黃仁勳',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=960,Y=430,ev=[['11/8','承認婚外情','董事會啟動調查'],['11/9','股東提','集體訴訟'],['11/11','WSJ：董事會','準備讓他下台'],['11/17','財報','（美東盤後）']];
    const x=i=>X0+i/(ev.length-1)*(X1-X0);
    g+=`<line x1="${x(0)}" x2="${x(2)}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    g+=`<line x1="${x(2)}" x2="${x(3)}" y1="${Y}" y2="${Y}" stroke="${T.grid}" stroke-opacity="0.6" stroke-width="8" stroke-dasharray="4 14"/>`;
    ev.forEach(([d,a,b],i)=>{
      const cx=x(i),an=i===0?'start':i===3?'end':'middle',tx=i===0?cx-18:i===3?cx+18:cx,c=i===2?T.fg:T.text,up=i%2===0;
      g+=`<circle cx="${cx}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${up?Y-130:Y+90}" text-anchor="${an}" style="font-size:44px;font-weight:700;fill:${c}">${d}</text>`;
      g+=`<text x="${tx}" y="${up?Y-86:Y+134}" text-anchor="${an}" class="sm">${a}</text>`;
      g+=`<text x="${tx}" y="${up?Y-50:Y+170}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="690" class="nt" style="font-size:40px">目前仍是<tspan fill="${T.fg}" font-weight="700">媒體報導</tspan>，董事會尚未正式宣布</text>`;
    const stats=[['WSJ 報導後盤後','跌逾 8%','來到 159.51 美元'],['黃仁勳','1993 年創辦','一路帶到現在'],['接班安排','未公開','董事會目前沒有董事長']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:58px;font-weight:700}</style>`;
    return g;
  },
});
