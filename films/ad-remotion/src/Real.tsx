// 實拍素材場景：月夜、霧中林道、地面霧、南瓜燈、蝙蝠、煙，全部來自 Pexels（Pexels License，可商用）。
// 黑底照片（霧、煙、比特幣、金條、南瓜鬼臉）用 screen / lighten 直接疊在黑色上，不摳圖；南瓜燈、禮盒、蝙蝠是摳好的 PNG。
// 每個元件都只由 frame 算出，可逐格算圖。素材處理見 prep_real.py，出處見 sources/CREDITS.md。
import React from "react";
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
export const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const real = (f: string) => staticFile(`real/${f}`);
/* 燭光閃爍：幾個不同頻率的正弦疊在一起，避免規律感 */
export const flicker = (t: number, seed = 0) => .82 + .1 * Math.sin(t * 9.1 + seed) + .06 * Math.sin(t * 23.7 + seed * 2) + .04 * Math.sin(t * 47.3 + seed * 3);

/* ---------- 背景板：月夜雲層 ↔ 霧中林道（Context 時切到林道），慢推鏡 ---------- */
export const Plate: React.FC = () => {
  const frame = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig();
  const push = interpolate(frame, [0, durationInFrames], [1.12, 1.0]);
  const forest = interpolate(frame, [fps * 2.8, fps * 3.3, fps * 6.7, fps * 7.2], [0, 1, 1, 0], clamp);
  const cover: React.CSSProperties = {position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})`};
  return (
    <AbsoluteFill style={{background: "#000"}}>
      <Img src={real("sky.jpg")} style={{...cover, objectPosition: "50% 30%"}} />
      <Img src={real("forest.jpg")} style={{...cover, opacity: forest, transform: `scale(${push * 1.04})`}} />
      {/* 壓暗＋暗角：維持黑色基調，讓字和福利卡跳出來 */}
      <AbsoluteFill style={{background: "radial-gradient(ellipse 75% 60% at 50% 42%, rgba(0,0,0,.25), rgba(0,0,0,.82) 78%, #000 100%)"}} />
    </AbsoluteFill>
  );
};

/* ---------- 地面霧：兩層實拍霧，screen 疊加、反方向慢慢飄 ---------- */
export const GroundFog: React.FC<{opacity?: number}> = ({opacity = .55}) => {
  const frame = useCurrentFrame(); const {width: W, height: H, fps} = useVideoConfig(); const t = frame / fps;
  const h = Math.max(H * .38, W * .45);
  const layer = (src: string, speed: number, o: number, flip: boolean, y: number, hh: number) => (
    <Img src={real(src)} style={{position: "absolute", left: -W * .25 + speed * t, bottom: y, width: W * 1.5, height: hh, objectFit: "fill", mixBlendMode: "screen", opacity: o * opacity, transform: flip ? "scaleX(-1)" : undefined}} />
  );
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      {layer("fog_tall.jpg", -6, .45, true, -h * .3, h)}
      {layer("fog_low.jpg", 9, .9, false, -h * .08, h * .55)}
    </AbsoluteFill>
  );
};

/* ---------- 南瓜燈：實拍摳圖 + 燭光閃爍的暖光暈 ---------- */
export const Pumpkin: React.FC<{x: number; y: number; w: number; seed?: number; flip?: boolean; blur?: number}> = ({x, y, w, seed = 0, flip, blur = 0}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const f = flicker(frame / fps, seed);
  return (
    <div style={{position: "absolute", left: x - w / 2, top: y - w * .83, width: w, height: w * .83}}>
      <div style={{position: "absolute", left: -w * .6, top: -w * .55, width: w * 2.2, height: w * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,140,40,${.32 * f}), rgba(255,100,20,${.1 * f}) 40%, transparent 68%)`}} />
      <Img src={real("pumpkin_a.png")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", transform: flip ? "scaleX(-1)" : undefined, filter: `brightness(${f * 1.1}) blur(${blur}px)`}} />
    </div>
  );
};

/* ---------- 蝙蝠：實拍剪影，翅膀用垂直縮放模擬拍動，遠的小、糊、淡 ---------- */
export const Bats: React.FC<{start: number; count?: number; dir?: 1 | -1; y?: number}> = ({start, count = 6, dir = 1, y = .2}) => {
  const frame = useCurrentFrame(); const {width: W, height: H, fps} = useVideoConfig();
  const t = (frame - start) / fps; if (t < 0 || t > 6) return null;
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      {Array.from({length: count}).map((_, i) => {
        const depth = .35 + hash(i + start) * .65, s = Math.min(W, H) * .075 * depth;
        const p = t * (.22 + depth * .25) - hash(i * 3 + start) * .5;
        if (p < -.1 || p > 1.2) return null;
        const x = dir > 0 ? -s + p * (W + s * 2) : W + s - p * (W + s * 2);
        const yy = H * y + (hash(i * 7 + start) - .5) * H * .16 + Math.sin(t * 2.4 + i) * s * .4;
        const flap = .45 + .55 * Math.abs(Math.sin(t * (9 + depth * 5) + i * 1.3));
        return <Img key={i} src={real("bat.png")} style={{position: "absolute", left: x - s / 2, top: yy - s / 2, width: s, transform: `scaleX(${dir > 0 ? -1 : 1}) scaleY(${flap}) rotate(${Math.sin(t * 3 + i) * 10 - 20}deg)`, filter: `blur(${(1 - depth) * 3}px)`, opacity: .55 + depth * .45}} />;
      })}
    </AbsoluteFill>
  );
};

/* ---------- 黑底照片：lighten 疊在黑底上，加徑向遮罩讓邊緣融進背景 ---------- */
export const DarkPhoto: React.FC<{src: string; w: number; h: number; pos?: string; scale?: number; style?: React.CSSProperties; mask?: string}> = ({src, w, h, pos = "50% 50%", scale = 1, style, mask = "radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%)"}) => (
  <div style={{width: w, height: h, overflow: "hidden", mixBlendMode: "lighten", WebkitMaskImage: mask, maskImage: mask, ...style}}>
    <Img src={real(src)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${scale})`}} />
  </div>
);

/* ---------- 轉場煙：每個剪接點冒一團實拍煙 ---------- */
export const SmokeCuts: React.FC<{at: number[]}> = ({at}) => {
  const frame = useCurrentFrame(); const {width: W, height: H} = useVideoConfig();
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      {at.map((c, i) => {
        const d = frame - c; if (d < -2 || d > 16) return null;
        const o = interpolate(d, [-2, 2, 16], [0, .55, 0], clamp), s = interpolate(d, [-2, 16], [.8, 1.5], clamp);
        return <Img key={i} src={real("puff.jpg")} style={{position: "absolute", left: W / 2 - W * .6, top: H / 2 - W * .4, width: W * 1.2, height: W * .8, objectFit: "cover", mixBlendMode: "screen", opacity: o, transform: `scale(${s}) rotate(${i % 2 ? 180 : 0}deg)`}} />;
      })}
    </AbsoluteFill>
  );
};

/* ---------- 往上飄的煙（Proof、CTA 的背景） ---------- */
export const RisingSmoke: React.FC<{opacity?: number}> = ({opacity = .4}) => {
  const frame = useCurrentFrame(); const {width: W, height: H, fps} = useVideoConfig(); const t = frame / fps;
  return <Img src={real("smoke.jpg")} style={{position: "absolute", left: 0, top: H * .1 - t * 18, width: W, height: H * .9, objectFit: "cover", mixBlendMode: "screen", opacity}} />;
};

/* ---------- 黑暗中的南瓜鬼臉（Proof 背景） ---------- */
export const Faces: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useCurrentFrame(); const {width: W, height: H, fps} = useVideoConfig(); const f = flicker(frame / fps, 4);
  return <Img src={real("faces.jpg")} style={{position: "absolute", left: 0, top: H * .5 - W * .33, width: W, height: W * .66, objectFit: "cover", mixBlendMode: "lighten", opacity: opacity * f, filter: "blur(2px)"}} />;
};

/* ---------- 官方卡牌扇形展開（VIP 轉盤福利） ---------- */
export const CardFan: React.FC<{size: number; open: number}> = ({size, open}) => {
  const cards = ["card_gengar.png", "card_pikachu.png", "card_arceus.png"];
  const w = size * .5;
  return (
    <div style={{position: "relative", width: size, height: size}}>
      {cards.map((c, i) => {
        const a = (i - 1) * 16 * open, dx = (i - 1) * w * .55 * open;
        return <Img key={c} src={real(c)} style={{position: "absolute", left: size / 2 - w / 2 + dx, top: size * .04 + Math.abs(i - 1) * 14 * open, width: w, borderRadius: w * .045, transform: `rotate(${a}deg)`, transformOrigin: "50% 110%", boxShadow: "0 18px 40px rgba(0,0,0,.6)", zIndex: i === 1 ? 2 : 1}} />;
      })}
    </div>
  );
};
