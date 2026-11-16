// WSJ 11/15（Forbes、MLQ、JPost、Cryptopolitan 轉述）：政府計畫將 20 多家 AI 公司列為「國家冠軍」，含 Nvidia、Amazon、Microsoft、OpenAI、Anthropic；打包美國晶片、模型賣給外國政府與企業，對抗華為等中國供應商；入選者可加速取得晶片與技術出口許可；源自行政命令 14320；名單尚未正式公布
// NPR 2026/2/27：川普下令聯邦政府停用 Anthropic 產品
POST({
  caption:'川普年初才禁用 Anthropic，現在要把它列進 AI 國家隊。',
  theme:'ink',width:1600,height:900,
  title:'AI 國家隊名單：連 Anthropic 都在內',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const names=['Nvidia','OpenAI','Anthropic','Microsoft','Amazon'];
    g+=`<text x="110" y="200" class="sm">WSJ 報導的部分名單（共 20 多家）</text>`;
    names.forEach((n,i)=>{
      const x=110+(i%3)*285,y=230+Math.floor(i/3)*130,hl=i===2;
      g+=`<rect x="${x}" y="${y}" width="265" height="105" rx="20" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.16:0.07}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="${x+132}" y="${y+66}" text-anchor="middle" style="font-size:38px;font-weight:700;fill:${hl?T.fg:T.text}">${n}</text>`;
    });
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">今年 2 月，川普才下令<tspan fill="${T.fg}">停用 Anthropic</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">名單還沒正式公布，以 WSJ 報導為準</text>`;
    g+=`<text x="110" y="700" style="font-size:36px;font-weight:700;fill:${T.text}">目的：打包美國 AI 賣到海外，對抗華為</text>`;
    const stats=[['入選家數','20 多家','AI 國家冠軍'],['最大好處','出口許可加速','晶片與技術'],['正式名單','還沒公布','WSJ 引述知情人士']];
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
