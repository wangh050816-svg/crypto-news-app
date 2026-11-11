// 台灣《虛擬資產服務法》配圖（依使用者 11/11 定稿文字）
// 金管會證期局 11/11：預計明年 Q1 上路（實際日期由行政院公告）；第 55 條：既有業者施行後 12 個月內申請、21 個月內取得牌照，必要時延長一次 3 個月；
// 第 48 條：無照經營最高 7 年；子法草案：交易平台實收資本至少 1 億元（動區 11/11；經濟日報 6 月報導亦同）
// 背景照片：Night skyline of Taipei 20190421，攝影 HC Lin，CC BY 2.0（Wikimedia Commons），需標示作者與授權
const bg='data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/taipei-night.jpg').toString('base64');
POST({
  caption:'台灣的加密專法，終於有比較明確的上路時間了。',
  theme:'ink',width:1600,height:900,
  title:'台灣加密專法：既有交易所的取照倒數',
  titleSize:58,titleY:100,
  footer:['',''],
  draw:T=>{
    let g=`<image href="${bg}" x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice" opacity="0.2"/>`;
    const X0=150,X1=960,Y=420,x=m=>X0+m/24*(X1-X0);
    g+=`<line x1="${x(0)}" x2="${x(21)}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    g+=`<line x1="${x(21)}" x2="${x(24)}" y1="${Y}" y2="${Y}" stroke="${T.grid}" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 14"/>`;
    const pts=[[0,'明年 Q1','專法上路（預計）','start',T.text],[12,'12 個月內','提出申請','middle',T.text],[21,'21 個月內','取得牌照','middle',T.fg],[24,'+3 個月','必要時可延長','end',T.dim]];
    pts.forEach(([m,a,b,an,c],i)=>{
      const cx=x(m), tx=an==='start'?cx-18:an==='end'?cx+18:cx;
      g+=`<circle cx="${cx}" cy="${Y}" r="${i===3?14:20}" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      const up=i%2===0;
      g+=`<text x="${tx}" y="${up?Y-52:Y+78}" text-anchor="${an}" style="font-size:34px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${up?Y-96:Y+116}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="660" class="nt">期限到了沒拿到牌照，就不能繼續經營</text>`;
    g+=`<text x="${X0-20}" y="708" class="sm">適用符合過渡條款的既有業者；實際上路日期以行政院公告為準</text>`;
    const stats=[['無照營業','最重 7 年','刑責'],['交易平台實收資本','至少 1 億元','目前公布的草案'],['監管範圍擴大','反洗錢之外','客戶資產、資安、營運制度']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1060,yy=150+i*200,w=490,h=175;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+50}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+118}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+156}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:23px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
