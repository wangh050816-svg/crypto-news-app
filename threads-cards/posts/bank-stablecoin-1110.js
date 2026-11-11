// Project Faro：Bloomberg 報導、CoinDesk 11/10 轉述。參與：高盛、花旗、桑坦德、德意志銀行、富國、富達、三菱 UFJ、標準銀行；約 2.7 億美元支應五年營運成本；先發美元穩定幣，也規劃其他 G7 貨幣，歐元優先
POST({
  caption:'華爾街大銀行準備自己發穩定幣了。',
  theme:'ink',width:1600,height:900,
  title:'大銀行聯手，要發自己的穩定幣',
  footer:['@zqqnc',''],
  draw:T=>{
    let g='';
    g+=`<text x="110" y="190" class="sm">參與的金融機構</text>`;
    const names=['高盛','花旗','桑坦德','德意志銀行','富國銀行','富達','三菱 UFJ','標準銀行'];
    names.forEach((n,i)=>{
      const col=i%2,row=Math.floor(i/2),x=110+col*430,y=230+row*120,w=400,h=96;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${i<2?T.fg:T.text}" fill-opacity="${i<2?1:0.08}" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${x+w/2}" y="${y+62}" text-anchor="middle" style="font-size:38px;font-weight:700;fill:${i<2?T.bg:T.text}">${n}</text>`;
    });
    const stats=[['承諾投入','約 2.7 億美元','支應五年營運成本'],['專案名稱','Project Faro','預計在美國成立'],['發行計畫','美元穩定幣','之後還有歐元等 G7 貨幣']];
    stats.forEach(([a,b,c],i)=>{
      const x=1060,yy=150+i*200,w=490,h=175;
      g+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${x+32}" y="${yy+50}" class="sm">${a}</text>`;
      g+=`<text x="${x+32}" y="${yy+118}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${x+32}" y="${yy+156}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:23px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
