// 美國商務部 BIS 11/16 臨時最終規則（SCMP、The Hill、Yahoo、TheNextWeb、MLQ）：先進 AI 晶片出口到印尼、馬來西亞、新加坡、泰國、巴西需許可；對提供大量算力給中國總部企業的海外資料中心需許可（門檻約 1,200 萬 TPP）；既有資料中心 90 天內取得許可；美國總部企業豁免但需月報；同時廢除 AI Diffusion Rule
POST({
  caption:'美國正式出手，堵住中國用海外機房租 AI 晶片的漏洞。',
  theme:'ink',width:1600,height:900,
  title:'美國堵漏洞：5 國進口 AI 晶片要許可',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const names=['新加坡','馬來西亞','泰國','印尼','巴西'];
    g+=`<text x="110" y="200" class="sm">先進 AI 晶片出口到這 5 國，都要先拿許可</text>`;
    names.forEach((n,i)=>{
      const x=110+(i%3)*285,y=230+Math.floor(i/3)*130,hl=i===0;
      g+=`<rect x="${x}" y="${y}" width="265" height="105" rx="20" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.16:0.07}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="${x+132}" y="${y+66}" text-anchor="middle" style="font-size:40px;font-weight:700;fill:${hl?T.fg:T.text}">${n}</text>`;
    });
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">海外機房租算力給中國企業，<tspan fill="${T.fg}">也要許可</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">美國總部的業者豁免，但要每月申報</text>`;
    g+=`<text x="110" y="700" style="font-size:36px;font-weight:700;fill:${T.text}">同時廢除拜登時代的 AI 擴散規則</text>`;
    const stats=[['生效形式','臨時最終規則','商務部 11/16 公布'],['既有機房','90 天內','要補拿許可'],['分析師看法','中國更靠華為','轉用自家晶片']];
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
