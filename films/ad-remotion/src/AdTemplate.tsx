// 你的品牌 × OURBIT 萬聖節狂歡夜 · 資料驅動廣告範本（ad-creative-video skill）
// 結構：Hook 0–3s → Context 3–7s → Payoff 7–15s（五個福利快剪）→ Proof 15–17s → CTA 17–20s（與 hook 訊息對應）
// 每一個動畫數值都只由 useCurrentFrame() 算出；要 A/B 測試的欄位全部來自 variant（CSV 的一列）。
import React from "react";
import {
  AbsoluteFill, Img, Sequence, continueRender, delayRender, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig, Easing,
} from "remotion";
import {z} from "zod";
import {theme} from "./theme";
import {ASPECTS, Aspect} from "./aspects";

export const variantSchema = z.object({
  id: z.string(),
  hook: z.string(),        // 0–3s 抓住人的那句話
  hookSub: z.string(),     // hook 下面的一行條件／補充
  hero: z.enum(["pack", "paper", "card1"]),   // hook 的主視覺，和 hook 是同一個承諾
  cta: z.string(),         // 和 hook 對應的行動呼籲
  accent: z.string(),
  bg: z.string(),
});
export type Variant = z.infer<typeof variantSchema>;

/* 字型：Noto Sans（含繁中）。delayRender 等字型載入完才開始算圖 */
const fontHandle = typeof window !== "undefined" ? delayRender("font") : null;
if (typeof window !== "undefined") {
  const f = new FontFace("NotoSans", `url(${staticFile("NotoSansSC-VF.ttf")})`, {weight: "100 900"});
  f.load().then((ff) => { (document as any).fonts.add(ff); continueRender(fontHandle!); });
}

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

/* ---------- 背景：模糊的活動海報 + 壓暗 + 綠橘光暈 + 往上飄的餘燼（全幅，跟比例走） ---------- */
const Background: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const t = frame / theme.fps; const {width, height} = useVideoConfig();
  const s = 1.15 + 0.04 * Math.sin(t * 0.25);
  return (
    <AbsoluteFill style={{backgroundColor: v.bg, overflow: "hidden"}}>
      <Img src={staticFile("bg.jpg")} style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s}) translate(${Math.sin(t * .13) * 20}px, ${Math.cos(t * .11) * 25}px)`, opacity: .55}} />
      <AbsoluteFill style={{background: "rgba(6,8,10,.72)"}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 20% 25%, rgba(61,240,160,${.16 + .05 * Math.sin(t * 1.3)}), transparent 45%), radial-gradient(circle at 85% 70%, rgba(255,140,40,${.12 + .04 * Math.sin(t * 1.7)}), transparent 45%)`}} />
      {Array.from({length: 60}).map((_, i) => {
        const sp = 40 + hash(i * 3) * 90, life = height + 200, y = height + 100 - ((t * sp + hash(i) * life) % life), x = hash(i * 7) * width + Math.sin(t * (.5 + hash(i)) + i) * 30;
        const r = 2 + hash(i * 5) * 4, col = hash(i * 11) < .35 ? "61,240,160" : "255,170,70", a = (.35 + .5 * hash(i * 13)) * (.6 + .4 * Math.sin(t * 3 + i));
        return <div key={i} style={{position: "absolute", left: x - r * 3, top: y - r * 3, width: r * 6, height: r * 6, borderRadius: "50%", background: `radial-gradient(circle, rgba(${col},${a}) 0%, rgba(${col},0) 70%)`}} />;
      })}
      <AbsoluteFill style={{background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.65) 100%)"}} />
    </AbsoluteFill>
  );
};

/* ---------- 小工具 ---------- */
const Pic: React.FC<{src: string; h: number; x?: number; y: number; scale?: number; rot?: number; opacity?: number; glow?: string}> = ({src, h, x = 540, y, scale = 1, rot = 0, opacity = 1, glow}) => (
  <Img src={staticFile(src)} style={{position: "absolute", left: x, top: y, height: h, transform: `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`, opacity, filter: glow ? `drop-shadow(0 0 28px ${glow})` : undefined}} />
);
/* 逐字彈出的大字（kinetic type）：每個字晚 1 格，彈簧進場 */
const KineticLine: React.FC<{text: string; y: number; size: number; color: string; delay?: number; weight?: number}> = ({text, y, size, color, delay = 0, weight = 900}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const chars = Array.from(text);
  return (
    <div style={{position: "absolute", left: 0, right: 0, top: y, transform: "translateY(-50%)", textAlign: "center", fontSize: size, fontWeight: weight, color, letterSpacing: size * .04, whiteSpace: "nowrap", textShadow: "0 6px 24px rgba(0,0,0,.6)"}}>
      {chars.map((c, i) => {
        const k = spring({frame: frame - delay - i * 1, fps, config: {damping: 13, stiffness: 180, mass: .6}});
        return <span key={i} style={{display: "inline-block", opacity: Math.min(1, k * 1.4), transform: `translateY(${(1 - k) * size * .7}px) scale(${.6 + .4 * k})`}}>{c === " " ? " " : c}</span>;
      })}
    </div>
  );
};
const Label: React.FC<{text: string; y: number; size: number; color?: string; opacity?: number; weight?: number}> = ({text, y, size, color = "#E9F5EF", opacity = 1, weight = 600}) => (
  <div style={{position: "absolute", left: 0, right: 0, top: y, transform: "translateY(-50%)", textAlign: "center", fontSize: size, fontWeight: weight, color, opacity, letterSpacing: size * .03, whiteSpace: "nowrap", textShadow: "0 4px 16px rgba(0,0,0,.6)"}}>{text}</div>
);
const Pill: React.FC<{text: string; y: number; w: number; opacity: number; accent: string}> = ({text, y, w, opacity, accent}) => (
  <div style={{position: "absolute", left: 540 - w / 2, top: y - 42, width: w, height: 84, borderRadius: 42, background: "rgba(10,14,12,.78)", border: `3px solid ${accent}`, opacity, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, color: theme.ink}}>{text}</div>
);
/* 頂端常駐的 B × OURBIT */
const Lockup: React.FC<{y: number; scale: number; opacity: number}> = ({y, scale, opacity}) => (
  <div style={{position: "absolute", left: 540, top: y, transform: `translate(-50%, -50%) scale(${scale})`, opacity, display: "flex", alignItems: "center", gap: 26}}>
    <Img src={staticFile("brandmark.png")} style={{height: 96}} />
    <span style={{fontSize: 40, fontWeight: 300, color: theme.rose}}>×</span>
    <Img src={staticFile("logo.png")} style={{height: 48}} />
  </div>
);

/* ---------- Hook 0–3s：主視覺彈進來，hook 逐字跳出（第 6 格就開始出字，1.7 秒前讀完） ---------- */
const HERO: Record<Variant["hero"], {src: string; h: number; y: number; rot: number}> = {
  pack: {src: "pack.png", h: 600, y: 420, rot: -.06}, paper: {src: "paper.png", h: 380, y: 430, rot: -.03}, card1: {src: "card1.png", h: 600, y: 420, rot: -.03},
};
const Hook: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const h = HERO[v.hero];
  const k = spring({frame, fps, config: {damping: 12, stiffness: 140}});
  const out = interpolate(frame, [80, 90], [1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{position: "absolute", left: 540 - 380, top: h.y - 380, width: 760, height: 760, borderRadius: "50%", background: `radial-gradient(circle, ${v.accent}33, transparent 65%)`, transform: `scale(${.8 + .2 * k})`}} />
      <Pic src={h.src} h={h.h} y={h.y} scale={.5 + .5 * k} rot={h.rot * k + (1 - k) * .3} glow={v.accent + "66"} />
      <KineticLine text={v.hook} y={830} size={78} color={theme.ink} delay={4} />
      <Label text={v.hookSub} y={935} size={36} color={v.accent} opacity={interpolate(frame, [22, 32], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};

/* ---------- Context 3–7s：萬聖節狂歡夜 標題重擊 + 標語帶 + 日期 ---------- */
const Context: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const k = spring({frame, fps, config: {damping: 11, stiffness: 160}});
  const kr = spring({frame: frame - 16, fps, config: {damping: 14, stiffness: 140}});
  const out = interpolate(frame, [110, 120], [1, 0], clamp);
  const shake = frame < 10 ? Math.sin(frame * 3.1) * (10 - frame) * 1.6 : 0;
  return (
    <AbsoluteFill style={{opacity: out, transform: `translate(${shake}px, ${-shake * .6}px)`}}>
      <Pic src="title.png" h={460} y={420} scale={interpolate(k, [0, 1], [1.8, 1])} opacity={Math.min(1, k * 2)} glow={v.accent + "55"} />
      <Pic src="ribbon.png" h={160} x={interpolate(kr, [0, 1], [-400, 540])} y={720} rot={-.02} opacity={Math.min(1, kr * 2)} />
      <Pill text="活動時間 10/16 – 10/31（UTC+8）" y={870} w={640} opacity={interpolate(frame, [30, 40], [0, 1], clamp)} accent={v.accent} />
    </AbsoluteFill>
  );
};

/* ---------- Payoff 7–15s：五個福利，每個 1.6 秒快剪 ---------- */
const SHOTS = [
  {src: "pack.png", h: 560, y: 430, rot: -.05, extra: "sign", key: "註冊免費送 PKM 卡牌", sub: "萬聖節限定 · 新用戶"},
  {src: "paper.png", h: 360, y: 390, rot: -.02, extra: "badge", key: "最高 30% 儲值返利", sub: "依儲值與交易量階梯發放"},
  {src: "card1.png", h: 620, y: 430, rot: -.02, key: "交易返利 588 USDT 體驗金", sub: "完成合約交易・最高 588 USDT"},
  {src: "card2.png", h: 620, y: 430, rot: .02, key: "完成任務 免費領 PRL", sub: "PRL 空投"},
  {src: "card4.png", h: 620, y: 430, rot: -.02, key: "VIP 寶可夢轉盤 +10 次", sub: "VIP 用戶額外抽獎機會"},
];
const Shot: React.FC<{s: typeof SHOTS[number]; v: Variant; i: number}> = ({s, v, i}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const k = spring({frame, fps, config: {damping: 13, stiffness: 170}});
  const push = interpolate(frame, [0, 48], [1, 1.06], clamp);
  const dir = i % 2 ? 1 : -1;
  return (
    <AbsoluteFill style={{transform: `scale(${push})`}}>
      <div style={{position: "absolute", left: 540 - 340, top: s.y - 340, width: 680, height: 680, borderRadius: "50%", background: `radial-gradient(circle, ${s.src === "pack.png" ? "#F4C86044" : v.accent + "33"}, transparent 65%)`}} />
      <Pic src={s.src} h={s.h} x={540 + dir * (1 - k) * 500} y={s.y} rot={s.rot + dir * (1 - k) * .25} opacity={Math.min(1, k * 2)} glow={s.src === "pack.png" ? "#F4C86088" : "#00000099"} />
      {s.extra === "sign" && <Pic src="sign.png" h={190} x={800} y={interpolate(spring({frame: frame - 8, fps, config: {damping: 9}}), [0, 1], [-100, 200])} rot={.06 + Math.sin(frame * .25) * .03 * Math.exp(-frame / 20)} />}
      {s.extra === "badge" && <Pic src="badge.png" h={270} x={870} y={700} scale={spring({frame: frame - 10, fps, config: {damping: 10}})} rot={(1 - spring({frame: frame - 10, fps, config: {damping: 10}})) * 2} />}
      <KineticLine text={s.key} y={845} size={64} color={theme.ink} delay={3} />
      <Label text={s.sub} y={935} size={32} color={v.accent} opacity={interpolate(frame, [12, 20], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};

/* ---------- Proof 15–17s：最高 30% 數字跳上去 ---------- */
const Proof: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [0, 24], [0, 30], {...clamp, easing: Easing.out(Easing.cubic)}));
  const pop = frame >= 24 ? interpolate(frame, [24, 30], [1.08, 1], clamp) : 1;
  return (
    <AbsoluteFill>
      <Label text="萬聖節限定加碼" y={250} size={48} color={theme.rose} opacity={interpolate(frame, [0, 8], [0, 1], clamp)} weight={700} />
      <Label text="最高" y={360} size={90} color={theme.ink} weight={900} opacity={interpolate(frame, [0, 8], [0, 1], clamp)} />
      <div style={{position: "absolute", left: 0, right: 0, top: 560, transform: `translateY(-50%) scale(${pop})`, textAlign: "center", fontSize: 320, fontWeight: 900, color: v.accent, textShadow: `0 0 60px ${v.accent}88`, lineHeight: 1}}>{n}%</div>
      <Label text="儲值返利・依儲值與交易量階梯發放" y={780} size={40} opacity={interpolate(frame, [20, 30], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};

/* ---------- CTA 17–20s：B × OURBIT + 和 hook 對應的按鈕，停 ≥2 秒 ---------- */
const CTA: React.FC<{v: Variant}> = ({v}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const kl = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const kb = spring({frame: frame - 10, fps, config: {damping: 12, stiffness: 140}});
  const pulse = 1 + .035 * Math.sin(Math.max(0, frame - 25) * .35);
  return (
    <AbsoluteFill>
      <Lockup y={250} scale={interpolate(kl, [0, 1], [.7, 1.55])} opacity={Math.min(1, kl * 1.5)} />
      <Pic src="title.png" h={250} y={470} opacity={interpolate(frame, [6, 14], [0, 1], clamp)} glow={v.accent + "44"} />
      <div style={{position: "absolute", left: 540, top: 690, transform: `translate(-50%, -50%) scale(${kb * pulse})`, padding: "30px 64px", borderRadius: 70, background: v.accent, color: theme.dark, fontSize: 54, fontWeight: 900, whiteSpace: "nowrap", boxShadow: `0 0 50px ${v.accent}99`}}>{v.cta}</div>
      <Label text="10/16 – 10/31（UTC+8）" y={830} size={40} opacity={interpolate(frame, [14, 22], [0, 1], clamp)} weight={700} />
      <Label text="活動詳情以 OURBIT 官方公告為準｜加密資產交易具風險" y={1020} size={24} color="rgba(220,230,225,.65)" opacity={interpolate(frame, [10, 20], [0, 1], clamp)} weight={400} />
    </AbsoluteFill>
  );
};

/* 快剪之間的白閃（打在剪接點上） */
const CutFlash: React.FC<{at: number[]; accent: string}> = ({at, accent}) => {
  const frame = useCurrentFrame(); let a = 0;
  for (const c of at) { const d = frame - c; if (d >= 0 && d < 6) a = Math.max(a, (1 - d / 6) * .35); }
  return <AbsoluteFill style={{background: accent, opacity: a, mixBlendMode: "screen"}} />;
};

export const AdTemplate: React.FC<{v: Variant; aspect: Aspect}> = ({v, aspect}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const A = ASPECTS[aspect];
  const lockA = interpolate(frame, [fps * 3, fps * 3.4], [0, 1], clamp) * interpolate(frame, [fps * 16.6, fps * 17], [1, 0], clamp);
  const cuts = [fps * 3, ...SHOTS.map((_, i) => fps * 7 + i * 48), fps * 15, fps * 17];
  return (
    <AbsoluteFill style={{fontFamily: theme.fontFamily, overflow: "hidden"}}>
      <Background v={v} />
      {/* 安全舞台：1080×1080，所有重點都在這裡面 */}
      <div style={{position: "absolute", width: 1080, height: 1080, left: (A.w - 1080 * A.stageScale) / 2, top: aspect === "9x16" ? A.stageY : (A.h - 1080 * A.stageScale) / 2, transform: `scale(${A.stageScale})`, transformOrigin: "0 0"}}>
        <Sequence durationInFrames={fps * 3} layout="none"><Hook v={v} /></Sequence>
        <Sequence from={fps * 3} durationInFrames={fps * 4} layout="none"><Context v={v} /></Sequence>
        {SHOTS.map((s, i) => (
          <Sequence key={i} from={fps * 7 + i * 48} durationInFrames={48} layout="none"><Shot s={s} v={v} i={i} /></Sequence>
        ))}
        <Sequence from={fps * 15} durationInFrames={fps * 2} layout="none"><Proof v={v} /></Sequence>
        <Sequence from={fps * 17} layout="none"><CTA v={v} /></Sequence>
        <Lockup y={60} scale={.8} opacity={lockA} />
      </div>
      <CutFlash at={cuts} accent={v.accent} />
    </AbsoluteFill>
  );
};
