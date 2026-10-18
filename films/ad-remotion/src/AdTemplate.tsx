// 你的品牌 × OURBIT 萬聖節狂歡夜 · 資料驅動廣告範本（ad-creative-video skill）
// v2：所有文字都用字體即時排版（Noto Sans TC / Creepster / Bebas Neue），場景元素全部程式現畫；只有兩個 Logo 和寶可夢卡包是圖片。
// 結構：Hook 0–3s → Context 3–7s → Payoff 7–15s（五個福利快剪）→ Proof 15–17s → CTA 17–20s（與 hook 訊息對應）
import React from "react";
import {AbsoluteFill, Img, Sequence, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from "remotion";
import {z} from "zod";
import {theme} from "./theme";
import {ASPECTS, Aspect} from "./aspects";
import {NightSky, Bats, Ghost, Pumpkin, Candle, Cobweb, Spider, CandyRain, CoinStack, GiftBox, Airdrop, Wheel} from "./Halloween";

export const variantSchema = z.object({
  id: z.string(),
  hook: z.string(),
  hookSub: z.string(),
  hero: z.enum(["pack", "coins", "gift"]),   // hook 的主視覺，和 hook 是同一個承諾
  cta: z.string(),
  accent: z.string(),
  bg: z.string(),
});
export type Variant = z.infer<typeof variantSchema>;

/* 字型：全部等載入完才開始算圖 */
const fontHandle = typeof window !== "undefined" ? delayRender("fonts") : null;
if (typeof window !== "undefined") {
  Promise.all([
    new FontFace("NotoTC", `url(${staticFile("NotoSansTC.ttf")})`, {weight: "100 900"}).load(),
    new FontFace("Creepster", `url(${staticFile("Creepster-Regular.ttf")})`).load(),
    new FontFace("BebasNeue", `url(${staticFile("BebasNeue-Regular.ttf")})`).load(),
  ]).then((fs) => { fs.forEach((f) => (document as any).fonts.add(f)); continueRender(fontHandle!); });
}

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const neon = (c: string, s = 1) => `0 0 ${6 * s}px ${c}, 0 0 ${22 * s}px ${c}AA, 0 0 ${48 * s}px ${c}55, 0 8px 24px rgba(0,0,0,.7)`;

/* ---------- 排版元件 ---------- */
/* 逐字彈出（kinetic type）：每個字晚 1 格、彈簧進場 */
const Kinetic: React.FC<{text: string; y: number; size: number; color: string; delay?: number; weight?: number; family?: string; glow?: string; stroke?: string; track?: number}> = ({text, y, size, color, delay = 0, weight = 900, family = "NotoTC", glow, stroke, track = .03}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <div style={{position: "absolute", left: 0, right: 0, top: y, transform: "translateY(-50%)", textAlign: "center", fontFamily: family, fontSize: size, fontWeight: weight, color, letterSpacing: size * track, whiteSpace: "nowrap", lineHeight: 1, textShadow: glow ? neon(glow) : "0 8px 28px rgba(0,0,0,.75)", WebkitTextStroke: stroke}}>
      {Array.from(text).map((c, i) => {
        const k = spring({frame: frame - delay - i, fps, config: {damping: 12, stiffness: 190, mass: .6}});
        return <span key={i} style={{display: "inline-block", opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * size * .8}px) scale(${.5 + .5 * k}) rotate(${(1 - k) * (i % 2 ? 12 : -12)}deg)`}}>{c === " " ? " " : c}</span>;
      })}
    </div>
  );
};
const Line: React.FC<{text: string; y: number; size: number; color?: string; opacity?: number; weight?: number; family?: string; glow?: string; track?: number}> = ({text, y, size, color = "#E9F5EF", opacity = 1, weight = 600, family = "NotoTC", glow, track = .03}) => (
  <div style={{position: "absolute", left: 0, right: 0, top: y, transform: "translateY(-50%)", textAlign: "center", fontFamily: family, fontSize: size, fontWeight: weight, color, opacity, letterSpacing: size * track, whiteSpace: "nowrap", lineHeight: 1.1, textShadow: glow ? neon(glow, .7) : "0 4px 16px rgba(0,0,0,.7)"}}>{text}</div>
);
/* 綠色膠帶標語（斜貼、邊緣粗糙） */
const Tape: React.FC<{text: string; y: number; progress: number; accent: string}> = ({text, y, progress, accent}) => (
  <div style={{position: "absolute", left: "50%", top: y, transform: `translate(-50%,-50%) rotate(-3deg) scaleX(${progress})`, transformOrigin: "left center", padding: "16px 46px", background: accent, color: "#06140D", fontFamily: "NotoTC", fontWeight: 900, fontSize: 40, letterSpacing: 3, whiteSpace: "nowrap", clipPath: "polygon(2% 8%, 98% 0%, 100% 50%, 97% 100%, 1% 94%, 0% 50%)", boxShadow: `0 0 40px ${accent}66`}}>
    <span style={{opacity: progress > .8 ? 1 : 0}}>{text}</span>
  </div>
);
const Pill: React.FC<{text: string; y: number; opacity: number; accent: string; size?: number}> = ({text, y, opacity, accent, size = 36}) => (
  <div style={{position: "absolute", left: "50%", top: y, transform: "translate(-50%,-50%)", padding: "16px 40px", borderRadius: 60, background: "rgba(10,10,10,.85)", border: `2px solid ${accent}`, opacity, fontFamily: "NotoTC", fontSize: size, fontWeight: 700, color: theme.ink, whiteSpace: "nowrap", boxShadow: `0 0 24px ${accent}44`}}>{text}</div>
);
const Lockup: React.FC<{y: number; scale: number; opacity: number}> = ({y, scale, opacity}) => (
  <div style={{position: "absolute", left: 540, top: y, transform: `translate(-50%,-50%) scale(${scale})`, opacity, display: "flex", alignItems: "center", gap: 26}}>
    <Img src={staticFile("brandmark.png")} style={{height: 96}} />
    <span style={{fontFamily: "NotoTC", fontSize: 40, fontWeight: 200, color: theme.rose}}>×</span>
    <Img src={staticFile("logo.png")} style={{height: 48}} />
  </div>
);

/* 「萬聖節狂歡夜」字標：白色粗體 + 綠色霓虹 + 橘色 HALLOWEEN */
const TitleMark: React.FC<{y: number; scale: number; opacity: number; accent: string; delay?: number}> = ({y, scale, opacity, accent, delay = 0}) => {
  const frame = useCurrentFrame(); const flick = frame - delay > 18 && (frame - delay) % 47 < 2 ? .6 : 1;
  return (
    <div style={{position: "absolute", left: 0, right: 0, top: y, transform: `translateY(-50%) scale(${scale})`, opacity}}>
      <Kinetic text="萬聖節" y={-70} size={150} color="#FFFFFF" delay={delay} track={.06} glow="#FF8A2A55" />
      <div style={{opacity: flick}}><Kinetic text="狂歡夜" y={95} size={170} color={accent} glow={accent} delay={delay + 5} track={.06} /></div>
      <div style={{position: "absolute", left: 0, right: 0, top: -235, textAlign: "center", fontFamily: "Creepster", fontSize: 72, color: "#FF8A2A", letterSpacing: 6, transform: `rotate(-7deg) translateX(250px)`, textShadow: neon("#FF7A00", .6), opacity: interpolate(frame - delay, [10, 18], [0, 1], clamp)}}>Halloween</div>
    </div>
  );
};

/* 毛玻璃福利卡：圖示 + 標題 + 說明（全部字體排版） */
const BenefitCard: React.FC<{icon: React.ReactNode; num: string; title: string; big: string; sub: string; accent: string; k: number; x: number}> = ({icon, num, title, big, sub, accent, k, x}) => (
  <div style={{position: "absolute", left: 540 + x, top: 480, width: 660, height: 760, transform: `translate(-50%,-50%) scale(${.7 + .3 * k}) rotate(${(1 - k) * 8}deg)`, opacity: Math.min(1, k * 1.6), borderRadius: 40, background: "linear-gradient(160deg, rgba(28,28,30,.9), rgba(6,6,7,.95))", border: `2px solid ${accent}66`, boxShadow: `0 30px 80px rgba(0,0,0,.6), inset 0 0 60px ${accent}14`}}>
    <div style={{position: "absolute", left: 40, top: 30, fontFamily: "BebasNeue", fontSize: 72, color: `${accent}AA`, letterSpacing: 4}}>{num}</div>
    <div style={{position: "absolute", left: 0, right: 0, top: 70, display: "flex", justifyContent: "center"}}>{icon}</div>
    <div style={{position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", fontFamily: "NotoTC", fontWeight: 700, fontSize: 40, color: "#D9EFE5"}}>{title}</div>
    <div style={{position: "absolute", left: 0, right: 0, top: 540, textAlign: "center", fontFamily: "NotoTC", fontWeight: 900, fontSize: 64, color: accent, textShadow: neon(accent, .5)}}>{big}</div>
    <div style={{position: "absolute", left: 0, right: 0, top: 650, textAlign: "center", fontFamily: "NotoTC", fontWeight: 500, fontSize: 30, color: "#A9C7B9"}}>{sub}</div>
  </div>
);

/* ---------- Hook 0–3s ---------- */
const HeroVisual: React.FC<{v: Variant; k: number}> = ({v, k}) => {
  const frame = useCurrentFrame();
  if (v.hero === "pack") return <Img src={staticFile("pack.png")} style={{position: "absolute", left: 540, top: 400, height: 560, transform: `translate(-50%,-50%) scale(${.5 + .5 * k}) rotate(${-4 + (1 - k) * 20}deg)`, filter: "drop-shadow(0 0 40px rgba(244,200,96,.6))"}} />;
  const node = v.hero === "coins" ? <CoinStack size={520} grow={Math.min(1, frame / 40)} accent={v.accent} /> : <GiftBox size={520} open={interpolate(frame, [14, 34], [0, 1], clamp)} accent={v.accent} />;
  return <div style={{position: "absolute", left: 540, top: 400, transform: `translate(-50%,-50%) scale(${.5 + .5 * k})`}}>{node}</div>;
};
const Hook: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const k = spring({frame, fps, config: {damping: 12, stiffness: 140}}); const out = interpolate(frame, [80, 90], [1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{position: "absolute", left: 540 - 400, top: 400 - 400, width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${v.hero === "pack" ? "#F4C86040" : v.accent + "33"}, transparent 62%)`, transform: `scale(${.7 + .3 * k})`}} />
      <HeroVisual v={v} k={k} />
      <Kinetic text={v.hook} y={810} size={80} color="#FFFFFF" delay={4} glow={v.accent} />
      <Line text={v.hookSub} y={920} size={36} color={v.accent} opacity={interpolate(frame, [22, 32], [0, 1], clamp)} weight={700} />
    </AbsoluteFill>
  );
};

/* ---------- Context 3–7s ---------- */
const Context: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const k = spring({frame, fps, config: {damping: 11, stiffness: 160}}); const out = interpolate(frame, [110, 120], [1, 0], clamp);
  const shake = frame < 10 ? Math.sin(frame * 3.1) * (10 - frame) * 1.6 : 0;
  return (
    <AbsoluteFill style={{opacity: out, transform: `translate(${shake}px, ${-shake * .6}px)`}}>
      <Ghost x={170} y={300} size={150} phase={0} /><Ghost x={920} y={250} size={110} phase={1.7} opacity={.75} />
      <TitleMark y={400} scale={interpolate(k, [0, 1], [1.5, 1])} opacity={Math.min(1, k * 2)} accent={v.accent} />
      <Tape text="糖果可以不拿，福利可別錯過！" y={690} progress={interpolate(frame, [16, 26], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)})} accent={v.accent} />
      <Pill text="活動時間　10/16 – 10/31（UTC+8）" y={830} opacity={interpolate(frame, [30, 40], [0, 1], clamp)} accent={v.accent} />
    </AbsoluteFill>
  );
};

/* ---------- Payoff 7–15s：五個福利，每個 1.6 秒 ---------- */
const Shot: React.FC<{i: number; v: Variant}> = ({i, v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const k = spring({frame, fps, config: {damping: 13, stiffness: 170}}); const dir = i % 2 ? 1 : -1, x = dir * (1 - k) * 420;
  const a = v.accent;
  const cards = [
    {num: "01", title: "新用戶註冊", big: "免費送 PKM 卡牌", sub: "萬聖節限定", icon: <Img src={staticFile("pack.png")} style={{height: 380, transform: `rotate(${-6 + Math.sin(frame * .1) * 2}deg)`, filter: "drop-shadow(0 0 30px rgba(244,200,96,.55))"}} />},
    {num: "02", title: "萬聖節限定加碼", big: "最高 30% 儲值返利", sub: "依儲值與交易量階梯發放", icon: <CoinStack size={380} grow={Math.min(1, frame / 30)} accent={a} />},
    {num: "03", title: "完成合約交易", big: "588 USDT 體驗金", sub: "最高可領 588 USDT", icon: <GiftBox size={380} open={interpolate(frame, [8, 26], [0, 1], clamp)} accent={a} />},
    {num: "04", title: "完成任務", big: "免費領 PRL 空投", sub: "PRL 空投", icon: <Airdrop size={380} drop={interpolate(frame, [0, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)})} accent={a} />},
    {num: "05", title: "VIP 用戶加碼", big: "寶可夢轉盤 +10 次", sub: "額外 10 次抽獎機會", icon: <Wheel size={380} spin={interpolate(frame, [0, 48], [0, 540], {...clamp, easing: Easing.out(Easing.cubic)})} accent={a} />},
  ];
  const c = cards[i];
  return <BenefitCard {...c} accent={a} k={k} x={x} />;
};

/* ---------- Proof 15–17s ---------- */
const Proof: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [0, 24], [0, 30], {...clamp, easing: Easing.out(Easing.cubic)}));
  const pop = frame >= 24 ? interpolate(frame, [24, 30], [1.1, 1], clamp) : 1;
  return (
    <AbsoluteFill>
      <Line text="萬聖節限定加碼" y={220} size={46} color="#FF8A2A" weight={800} opacity={interpolate(frame, [0, 8], [0, 1], clamp)} glow="#FF7A00" />
      <Line text="最高" y={350} size={90} color="#FFFFFF" weight={900} opacity={interpolate(frame, [0, 8], [0, 1], clamp)} />
      <div style={{position: "absolute", left: 0, right: 0, top: 590, transform: `translateY(-50%) scale(${pop})`, textAlign: "center", fontFamily: "BebasNeue", fontSize: 380, color: v.accent, lineHeight: 1, textShadow: neon(v.accent, 1.2)}}>{n}%</div>
      <Line text="儲值返利・依儲值與交易量階梯發放" y={830} size={40} opacity={interpolate(frame, [20, 30], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};

/* ---------- CTA 17–20s ---------- */
const CTA: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const kl = spring({frame, fps, config: {damping: 14, stiffness: 120}}); const kb = spring({frame: frame - 12, fps, config: {damping: 12, stiffness: 140}});
  const pulse = 1 + .035 * Math.sin(Math.max(0, frame - 27) * .35);
  return (
    <AbsoluteFill>
      <Lockup y={200} scale={interpolate(kl, [0, 1], [.7, 1.5])} opacity={Math.min(1, kl * 1.5)} />
      <TitleMark y={470} scale={.62} opacity={interpolate(frame, [4, 12], [0, 1], clamp)} accent={v.accent} delay={4} />
      <div style={{position: "absolute", left: 540, top: 720, transform: `translate(-50%,-50%) scale(${kb * pulse})`, padding: "30px 66px", borderRadius: 80, background: `linear-gradient(180deg, #7DFFC6, ${v.accent})`, color: theme.dark, fontFamily: "NotoTC", fontSize: 56, fontWeight: 900, whiteSpace: "nowrap", boxShadow: `0 0 60px ${v.accent}AA`}}>{v.cta}</div>
      <Line text="10/16 – 10/31（UTC+8）" y={860} size={42} weight={700} opacity={interpolate(frame, [16, 24], [0, 1], clamp)} />
      <Line text="活動詳情以 OURBIT 官方公告為準｜加密資產交易具風險" y={1030} size={24} color="rgba(220,230,225,.65)" weight={400} opacity={interpolate(frame, [10, 20], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};

const CutFlash: React.FC<{at: number[]; accent: string}> = ({at, accent}) => {
  const frame = useCurrentFrame(); let a = 0;
  for (const c of at) { const d = frame - c; if (d >= 0 && d < 6) a = Math.max(a, (1 - d / 6) * .3); }
  return <AbsoluteFill style={{background: accent, opacity: a, mixBlendMode: "screen"}} />;
};

export const AdTemplate: React.FC<{v: Variant; aspect: Aspect}> = ({v, aspect}) => {
  const frame = useCurrentFrame(); const {fps, width: W, height: H} = useVideoConfig(); const A = ASPECTS[aspect];
  const lockA = interpolate(frame, [fps * 3, fps * 3.4], [0, 1], clamp) * interpolate(frame, [fps * 16.6, fps * 17], [1, 0], clamp);
  const cuts = [fps * 3, ...[0, 1, 2, 3, 4].map((i) => fps * 7 + i * 48), fps * 15, fps * 17];
  const short = Math.min(W, H);
  return (
    <AbsoluteFill style={{fontFamily: "NotoTC", overflow: "hidden", backgroundColor: v.bg}}>
      <NightSky accent={v.accent} />
      {/* 全幅裝飾：角落蜘蛛網、垂下的蜘蛛、兩側南瓜燈和蠟燭、飛過的蝙蝠、糖果雨 */}
      <Cobweb corner="tl" size={short * .32} /><Cobweb corner="tr" size={short * .26} opacity={.4} />
      <Spider x={W * .86} len={H * .16} />
      <Pumpkin x={W * .1} y={H - short * .1} size={short * .2} seed={1} /><Pumpkin x={W * .9} y={H - short * .08} size={short * .16} seed={2} />
      <Candle x={W * .2} y={H - short * .03} h={short * .1} seed={1} /><Candle x={W * .8} y={H - short * .02} h={short * .07} seed={3} />
      <Bats start={0} count={8} dir={1} y={.22} /><Bats start={fps * 7} count={6} dir={-1} y={.18} /><Bats start={fps * 15} count={7} dir={1} y={.26} />
      <CandyRain start={fps * 17} />
      {/* 安全舞台 1080×1080：所有重點都在這裡面 */}
      <div style={{position: "absolute", width: 1080, height: 1080, left: (W - 1080 * A.stageScale) / 2, top: aspect === "9x16" ? A.stageY : (H - 1080 * A.stageScale) / 2, transform: `scale(${A.stageScale})`, transformOrigin: "0 0"}}>
        <Sequence durationInFrames={fps * 3} layout="none"><Hook v={v} /></Sequence>
        <Sequence from={fps * 3} durationInFrames={fps * 4} layout="none"><Context v={v} /></Sequence>
        {[0, 1, 2, 3, 4].map((i) => <Sequence key={i} from={fps * 7 + i * 48} durationInFrames={48} layout="none"><Shot i={i} v={v} /></Sequence>)}
        <Sequence from={fps * 15} durationInFrames={fps * 2} layout="none"><Proof v={v} /></Sequence>
        <Sequence from={fps * 17} layout="none"><CTA v={v} /></Sequence>
        <Lockup y={40} scale={.75} opacity={lockA} />
      </div>
      <CutFlash at={cuts} accent={v.accent} />
    </AbsoluteFill>
  );
};
