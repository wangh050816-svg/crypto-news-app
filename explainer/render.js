// 用法：node explainer/render.js explainer/videos/compound.js [--preview]
// 輸出：explainer/out/<名稱>.mp4（1920×1080, 30fps）和 <名稱>-sheet.png（每秒一格的總覽圖）
// --preview 只輸出總覽圖，不做影片，用來快速檢查版面。--mute 不做聲音。--music <檔案> 用自己的音樂當背景（要有使用權）。
// 聲音：場景 caps 的旁白用離線中文語音（先跑 explainer/audio/setup-voice.sh），加上合成的背景音樂和音效。
const fs=require('fs'),path=require('path'),os=require('os'),{spawn,execFileSync}=require('child_process');
const PY=process.env.EXPLAINER_TTS_PY||path.join(os.homedir(),'.cache/explainer-tts/bin/python'),mute=process.argv.includes('--mute');
const mi=process.argv.indexOf('--music'),musicFile=mi>0?path.resolve(process.argv[mi+1]||''):null;
if(musicFile&&!fs.existsSync(musicFile)){console.error('找不到音樂檔 '+musicFile);process.exit(1)}
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const dir=__dirname,vidFile=path.resolve(process.argv[2]||''),preview=process.argv.includes('--preview');
if(!fs.existsSync(vidFile)){console.error('請指定影片檔，例如 node explainer/render.js explainer/videos/compound.js');process.exit(1)}
const name=path.basename(vidFile,'.js'),out=path.join(dir,'out');fs.mkdirSync(out,{recursive:true});
const read=f=>fs.readFileSync(path.join(dir,f),'utf8');
const html=`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&family=Noto+Sans+TC:wght@500;700;900&display=swap" rel="stylesheet">
<style>
body{margin:0;background:#0d0c0e;font-family:"Noto Sans TC",sans-serif;overflow:hidden}
#stage{position:relative;width:1920px;height:1080px;background:#0d0c0e;overflow:hidden}
.scene{position:absolute;inset:0}
.t{position:absolute;white-space:nowrap;line-height:1}
.cap{position:absolute;left:0;width:1920px;display:flex;flex-direction:column;align-items:center;color:#f2efe9}
.cap b{font-size:58px;font-weight:900;letter-spacing:3px;min-height:70px}
.cap i{font-style:normal;font-family:"Noto Sans",sans-serif;font-size:26px;color:#8a8590;margin-top:10px;letter-spacing:1px}
</style></head><body><div id="stage"></div><script>
${read('engine.js')}
${fs.readFileSync(vidFile,'utf8')}
</script></body></html>`;
const tmp=path.join(out,`_${name}.html`);fs.writeFileSync(tmp,html);
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1920,height:1080}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  if(errs.length){console.error(errs.join('\n'));await b.close();process.exit(1)}
  // 旁白：先合成語音，拿到每句長度再重排時間軸
  let audioPlan=null;
  if(!mute){
    if(!fs.existsSync(PY)){console.error('找不到語音環境，先執行 explainer/audio/setup-voice.sh（或加 --mute）');process.exit(1)}
    const lines=await p.evaluate(()=>voiceLines()),lf=path.join(out,`_${name}-lines.json`);fs.writeFileSync(lf,JSON.stringify(lines));
    const voice=lines.length?JSON.parse(execFileSync(PY,[path.join(dir,'audio/tts.py'),lf,path.join(out,'voice')],{stdio:['ignore','pipe','ignore']}).toString()):{};
    fs.unlinkSync(lf);await p.evaluate(v=>setVoice(v),voice);
    audioPlan=await p.evaluate(()=>audioPlan());audioPlan.voice.forEach(v=>v.file=voice[v.id].file);
    if(musicFile) audioPlan.music={file:musicFile};
  }
  const {dur,fps}=await p.evaluate(()=>({dur:window.DURATION,fps:window.FPS}));
  const shot=async t=>{await p.evaluate(t=>renderFrame(t),t);if(errs.length)throw new Error(errs.join('\n'));return p.screenshot({type:'jpeg',quality:92})};
  // 總覽圖：每秒一格
  const thumbs=[];for(let t=.9;t<dur;t+=1) thumbs.push('data:image/jpeg;base64,'+(await shot(t)).toString('base64'));
  const sp=await b.newPage({viewport:{width:1926,height:100}});
  await sp.setContent(`<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(5,382px);gap:4px;width:1926px">${thumbs.map(s=>`<img src="${s}" width="382">`).join('')}</body>`);
  await sp.screenshot({path:path.join(out,name+'-sheet.png'),fullPage:true});
  if(!preview){
    const mp4=path.join(out,name+'.mp4'),n=Math.round(dur*fps),wav=path.join(out,`_${name}.wav`);let aIn=[];
    if(audioPlan){const pf=path.join(out,`_${name}-plan.json`);fs.writeFileSync(pf,JSON.stringify(audioPlan));
      execFileSync(PY,[path.join(dir,'audio/mix.py'),pf,wav],{stdio:'inherit'});fs.unlinkSync(pf);aIn=['-i',wav,'-c:a','aac','-b:a','192k','-shortest']}
    const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-i','-',...aIn,'-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',mp4],{stdio:['pipe','inherit','inherit']});
    for(let i=0;i<n;i++){const buf=await shot(i/fps);if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%fps===0)process.stdout.write(`\r${i}/${n}`)}
    ff.stdin.end();await new Promise((r,j)=>ff.on('close',c=>c?j(new Error('ffmpeg '+c)):r()));if(aIn.length)fs.unlinkSync(wav);
    console.log(`\n完成 ${dur.toFixed(1)}s → ${mp4}`);
  }
  await b.close();fs.unlinkSync(tmp);console.log('總覽圖 → '+path.join(out,name+'-sheet.png'));
})().catch(e=>{console.error(e.message);process.exit(1)});
