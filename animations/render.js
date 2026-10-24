// 用法：node animations/render.js [動畫資料夾名，預設 btc-black-swan] [--fps 30] [--frames 2,10.2,13]
// 輸出：animations/out/<名稱>.mp4（1080×1920，含音效）
//      加 --frames 只輸出指定秒數的截圖到 animations/out/<名稱>-frames/，方便檢查
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const args=process.argv.slice(2),opt=k=>{const i=args.indexOf(k);return i>=0?args.splice(i,2)[1]:null};
const fps=+(opt('--fps')||30),frames=opt('--frames'),name=args[0]||'btc-black-swan';
const page=path.join(__dirname,name,'index.html'),out=path.join(__dirname,'out');
if(!fs.existsSync(page)){console.error('找不到 '+page);process.exit(1)}
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1920}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+page+'?export',{waitUntil:'networkidle'});await p.evaluate(()=>window.ready);
  if(errs.length){console.error(errs.join('\n'));await b.close();process.exit(1)}
  const shot=t=>p.evaluate(t=>window.renderAt(t),t).then(()=>p.screenshot({type:'jpeg',quality:93}));
  if(frames){
    const dir=path.join(out,name+'-frames');fs.mkdirSync(dir,{recursive:true});
    for(const t of frames.split(',').map(Number))fs.writeFileSync(path.join(dir,`t${t.toFixed(2)}.jpg`),await shot(t));
    await b.close();console.log('截圖 → '+dir);return;
  }
  const T=await p.evaluate(()=>T),wav=path.join(out,name+'.wav'),mp4=path.join(out,name+'.mp4');
  fs.writeFileSync(wav,Buffer.from(await p.evaluate(()=>window.renderAudioWav()),'base64'));
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-i',wav,
    '-c:v','libx264','-pix_fmt','yuv420p','-crf','19','-preset','medium','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',mp4],{stdio:['pipe','inherit','inherit']});
  const n=Math.round(T*fps);
  for(let f=0;f<n;f++){const img=await shot(f/fps);if(!ff.stdin.write(img))await new Promise(r=>ff.stdin.once('drain',r));if(f%60===0)process.stdout.write(`\r${f}/${n}`)}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();fs.unlinkSync(wav);
  console.log(`\r完成 ${n} 格 → ${mp4}`);
})();
