// 萬聖節場景元素：全部用 SVG / CSS 現畫，不用任何海報裁切。每個元件都只由 frame 算出（可重現、可逐格算圖）。
import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

/* ---------- 夜空：深色漸層 + 圓月 + 飄過的雲 + 墓園剪影 + 霧 + 螢火 ---------- */
export const NightSky: React.FC<{accent: string}> = ({accent}) => {
  const frame = useCurrentFrame(); const {width: W, height: H, fps} = useVideoConfig(); const t = frame / fps;
  const mx = W * .78, my = H * .16, mr = Math.min(W, H) * .13;
  return (
    <AbsoluteFill style={{background: "#000000", overflow: "hidden"}}>
      {/* 月光暈 + 月亮 + 坑 */}
      <div style={{position: "absolute", left: mx - mr * 4, top: my - mr * 4, width: mr * 8, height: mr * 8, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,236,190,.22) 0%, rgba(255,236,190,.06) 35%, transparent 65%)"}} />
      <svg style={{position: "absolute", left: mx - mr, top: my - mr}} width={mr * 2} height={mr * 2} viewBox="-100 -100 200 200">
        <defs><radialGradient id="moon" cx="-25%" cy="-25%" r="120%"><stop offset="0" stopColor="#FFF6DA" /><stop offset=".6" stopColor="#F2DFAE" /><stop offset="1" stopColor="#C9B07A" /></radialGradient></defs>
        <circle r="100" fill="url(#moon)" />
        {[[-30, -20, 18], [25, 15, 12], [-10, 40, 9], [40, -35, 8], [-45, 30, 6]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#C9AE78" opacity=".45" />)}
      </svg>
      {/* 雲：從月亮前面慢慢飄過 */}
      {[0, 1, 2].map((i) => {
        const x = ((t * (18 + i * 10) + i * 420) % (W + 600)) - 300, y = my + (i - 1) * mr * .9;
        return <div key={i} style={{position: "absolute", left: x, top: y, width: 420 + i * 80, height: 70 + i * 10, borderRadius: 999, background: "rgba(22,22,24,.85)", filter: "blur(18px)"}} />;
      })}
      {/* 遠方墓園 + 枯樹剪影 */}
      <svg style={{position: "absolute", left: 0, bottom: 0}} width={W} height={H * .3} viewBox={`0 0 ${W} ${H * .3}`} preserveAspectRatio="none">
        <path d={`M0 ${H * .3} L0 ${H * .16} Q${W * .2} ${H * .1} ${W * .45} ${H * .15} T${W} ${H * .12} L${W} ${H * .3} Z`} fill="#0A0A0A" />
        {Array.from({length: 7}).map((_, i) => { const x = W * (.08 + i * .13) + hash(i) * 30, h = 40 + hash(i + 5) * 40, y = H * .16 - (i % 2) * 10;
          return <path key={i} d={`M${x - 22} ${y + 30} L${x - 22} ${y - h + 20} Q${x} ${y - h - 14} ${x + 22} ${y - h + 20} L${x + 22} ${y + 30} Z`} fill="#0D0D0D" />; })}
        <path d={`M${W * .14} ${H * .16} L${W * .15} ${H * .04} M${W * .15} ${H * .07} L${W * .1} ${H * .03} M${W * .15} ${H * .06} L${W * .2} ${H * .02} M${W * .2} ${H * .02} L${W * .23} ${H * .03}`} stroke="#0D0D0D" strokeWidth="9" strokeLinecap="round" fill="none" />
      </svg>
      {/* 地面的綠色霧 */}
      {[0, 1, 2, 3].map((i) => {
        const x = ((t * (12 + i * 6) + i * 300) % (W + 800)) - 400;
        return <div key={i} style={{position: "absolute", left: x, bottom: H * (.02 + i * .05), width: 700, height: 160, borderRadius: 999, background: "radial-gradient(ellipse, rgba(160,160,160,.08), transparent 70%)", filter: "blur(10px)"}} />;
      })}
      {/* 螢火／餘燼 */}
      {Array.from({length: 46}).map((_, i) => {
        const sp = 30 + hash(i * 3) * 70, life = H + 200, y = H + 100 - ((t * sp + hash(i) * life) % life), x = hash(i * 7) * W + Math.sin(t * (.5 + hash(i)) + i) * 30;
        const r = 2 + hash(i * 5) * 3, col = hash(i * 11) < .45 ? "61,240,160" : "255,170,70", a = (.4 + .5 * hash(i * 13)) * (.5 + .5 * Math.sin(t * 3 + i));
        return <div key={i} style={{position: "absolute", left: x - r * 3, top: y - r * 3, width: r * 6, height: r * 6, borderRadius: "50%", background: `radial-gradient(circle, rgba(${col},${a}) 0%, rgba(${col},0) 70%)`}} />;
      })}
      <AbsoluteFill style={{background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.8) 100%)"}} />
    </AbsoluteFill>
  );
};

/* ---------- 蝙蝠群：從畫面一側飛過，翅膀拍動 ---------- */
export const Bats: React.FC<{start: number; count?: number; dir?: 1 | -1; y?: number}> = ({start, count = 7, dir = 1, y = .3}) => {
  const frame = useCurrentFrame(); const {width: W, height: H} = useVideoConfig(); const f = frame - start; if (f < 0 || f > 120) return null;
  return (
    <AbsoluteFill>
      {Array.from({length: count}).map((_, i) => {
        const k = (f - i * 4) / 90; if (k < 0 || k > 1.2) return null;
        const x = dir > 0 ? -100 + k * (W + 200) : W + 100 - k * (W + 200), yy = H * y + (hash(i) - .5) * H * .18 - Math.sin(k * Math.PI) * 120 + Math.sin((f + i * 7) * .3) * 14;
        const s = .6 + hash(i + 3) * .7, flap = Math.sin((f + i * 5) * .9);
        return (
          <svg key={i} style={{position: "absolute", left: x, top: yy, transform: `scale(${s * dir}, ${s})`}} width="120" height="70" viewBox="-60 -35 120 70">
            <g fill="#0B0B10">
              <path d={`M0 0 C-14 ${-10 * flap - 6} -34 ${-24 * flap - 4} -58 ${-14 * flap} C-46 ${-2 * flap + 4} -40 ${6} -30 ${8} C-24 2 -16 6 -10 10 Z`} />
              <path d={`M0 0 C14 ${-10 * flap - 6} 34 ${-24 * flap - 4} 58 ${-14 * flap} C46 ${-2 * flap + 4} 40 6 30 8 C24 2 16 6 10 10 Z`} />
              <ellipse cx="0" cy="4" rx="9" ry="12" /><path d="M-6 -6 L-9 -16 L-2 -8 Z M6 -6 L9 -16 L2 -8 Z" />
            </g>
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------- 可愛小幽靈：上下飄、身體下緣波浪、眨眼 ---------- */
export const Ghost: React.FC<{x: number; y: number; size: number; phase?: number; opacity?: number}> = ({x, y, size, phase = 0, opacity = .9}) => {
  const frame = useCurrentFrame(); const t = frame / 30 + phase;
  const w1 = Math.sin(t * 4) * 6, blink = (Math.sin(t * 1.7) > .97) ? .15 : 1;
  return (
    <svg style={{position: "absolute", left: x - size / 2, top: y - size / 2 + Math.sin(t * 1.6) * 16, opacity, filter: "drop-shadow(0 0 18px rgba(220,255,240,.35))"}} width={size} height={size} viewBox="-60 -70 120 140">
      <path d={`M-45 0 C-45 -40 -25 -62 0 -62 C25 -62 45 -40 45 0 L45 52 Q36 ${62 + w1} 27 52 Q18 ${42 - w1} 9 52 Q0 ${62 + w1} -9 52 Q-18 ${42 - w1} -27 52 Q-36 ${62 + w1} -45 52 Z`} fill="#F2F7F4" />
      <ellipse cx="-14" cy="-14" rx="7" ry={9 * blink} fill="#151518" /><ellipse cx="14" cy="-14" rx="7" ry={9 * blink} fill="#151518" />
      <ellipse cx="0" cy="8" rx="7" ry="9" fill="#151518" /><ellipse cx="-26" cy="0" rx="7" ry="4" fill="#F7A9B8" opacity=".6" /><ellipse cx="26" cy="0" rx="7" ry="4" fill="#F7A9B8" opacity=".6" />
    </svg>
  );
};

/* ---------- 南瓜燈：橘色瓣紋 + 雕刻的臉，裡面的光會閃 ---------- */
export const Pumpkin: React.FC<{x: number; y: number; size: number; seed?: number}> = ({x, y, size, seed = 0}) => {
  const frame = useCurrentFrame(); const fl = .75 + .25 * Math.sin(frame * .5 + seed) * Math.sin(frame * .23 + seed * 2);
  return (
    <div style={{position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size}}>
      <div style={{position: "absolute", inset: -size * .4, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,150,40,${.35 * fl}), transparent 60%)`}} />
      <svg width={size} height={size} viewBox="-100 -100 200 200" style={{position: "absolute", inset: 0}}>
        <defs><radialGradient id={`pk${seed}`} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#FFB347" /><stop offset=".6" stopColor="#F07A12" /><stop offset="1" stopColor="#9C3D05" /></radialGradient></defs>
        <path d="M-6 -70 Q-4 -92 12 -96 L16 -88 Q4 -84 6 -68 Z" fill="#4E6B2A" />
        {[-58, -30, 0, 30, 58].map((cx, i) => <ellipse key={i} cx={cx * .9} cy="0" rx={i === 2 ? 46 : 40} ry="70" fill={`url(#pk${seed})`} stroke="#8A3604" strokeWidth="2" />)}
        <g fill={`rgba(255,${200 + 40 * fl},${90 + 60 * fl},1)`} style={{filter: `drop-shadow(0 0 ${10 * fl}px #FFB000)`}}>
          <path d="M-46 -18 L-20 -18 L-33 -42 Z" /><path d="M46 -18 L20 -18 L33 -42 Z" /><path d="M-6 0 L6 0 L0 -12 Z" />
          <path d="M-52 12 Q0 58 52 12 L40 16 L34 28 L24 18 L12 32 L0 20 L-12 32 L-24 18 L-34 28 L-40 16 Z" />
        </g>
      </svg>
    </div>
  );
};

/* ---------- 蠟燭：燭身 + 會晃的火焰 ---------- */
export const Candle: React.FC<{x: number; y: number; h: number; seed?: number}> = ({x, y, h, seed = 0}) => {
  const frame = useCurrentFrame(); const sway = Math.sin(frame * .4 + seed) * 4, fl = .8 + .2 * Math.sin(frame * .9 + seed);
  return (
    <svg style={{position: "absolute", left: x - 40, top: y - h - 70}} width="80" height={h + 80} viewBox={`-40 ${-h - 70} 80 ${h + 80}`}>
      <defs><radialGradient id={`fl${seed}`}><stop offset="0" stopColor="#FFF6C8" /><stop offset=".5" stopColor="#FFB13B" /><stop offset="1" stopColor="#FF6A00" stopOpacity="0" /></radialGradient></defs>
      <circle cx="0" cy={-h - 30} r={34 * fl} fill="rgba(255,170,60,.25)" />
      <path d={`M0 ${-h - 4} C${-10 + sway} ${-h - 20} ${-4 + sway} ${-h - 46 * fl} ${sway} ${-h - 56 * fl} C${4 + sway} ${-h - 46 * fl} ${10 + sway} ${-h - 20} 0 ${-h - 4} Z`} fill={`url(#fl${seed})`} />
      <rect x="-14" y={-h} width="28" height={h} rx="4" fill="#E9E2D0" /><path d={`M-14 ${-h + 6} Q-8 ${-h + 30} -10 ${-h + 46}`} stroke="#F7F2E6" strokeWidth="6" fill="none" />
    </svg>
  );
};

/* ---------- 角落的蜘蛛網 + 垂下來的蜘蛛 ---------- */
export const Cobweb: React.FC<{corner: "tl" | "tr"; size: number; opacity?: number}> = ({corner, size, opacity = .55}) => {
  const {width: W} = useVideoConfig(); const sx = corner === "tl" ? 1 : -1;
  return (
    <svg style={{position: "absolute", left: corner === "tl" ? 0 : W - size, top: 0, opacity, transform: `scaleX(${sx})`}} width={size} height={size} viewBox="0 0 200 200">
      <g stroke="#C9D3CE" strokeWidth="1.6" fill="none">
        {[0, 18, 36, 54, 72, 90].map((a) => { const r = (a * Math.PI) / 180; return <line key={a} x1="0" y1="0" x2={200 * Math.cos(r)} y2={200 * Math.sin(r)} />; })}
        {[40, 75, 110, 150, 190].map((r) => <path key={r} d={Array.from({length: 6}).map((_, i) => { const a1 = (i * 18 * Math.PI) / 180, a2 = ((i + 1) * 18 * Math.PI) / 180; return `${i === 0 ? "M" : ""}${r * Math.cos(a1)} ${r * Math.sin(a1)} Q${r * .82 * Math.cos((a1 + a2) / 2)} ${r * .82 * Math.sin((a1 + a2) / 2)} ${r * Math.cos(a2)} ${r * Math.sin(a2)}`; }).join(" ")} />)}
      </g>
    </svg>
  );
};
export const Spider: React.FC<{x: number; len: number}> = ({x, len}) => {
  const frame = useCurrentFrame(); const l = len * (.75 + .25 * Math.sin(frame * .05)), sw = Math.sin(frame * .07) * 8;
  return (
    <svg style={{position: "absolute", left: x - 40, top: 0}} width="80" height={l + 50} viewBox={`-40 0 80 ${l + 50}`}>
      <line x1="0" y1="0" x2={sw} y2={l} stroke="#C9D3CE" strokeWidth="1.5" />
      <g transform={`translate(${sw},${l + 12})`} fill="#111" stroke="#111" strokeWidth="3" strokeLinecap="round">
        {[-1, 1].map((s) => [0, 1, 2, 3].map((i) => <path key={`${s}${i}`} d={`M0 0 Q${s * 18} ${-10 + i * 7} ${s * 26} ${2 + i * 8}`} fill="none" />))}
        <ellipse rx="10" ry="12" /><circle cy="-12" r="7" /><circle cx="-3" cy="-13" r="1.8" fill="#3DF0A0" stroke="none" /><circle cx="3" cy="-13" r="1.8" fill="#3DF0A0" stroke="none" />
      </g>
    </svg>
  );
};

/* ---------- 掉落的糖果（包裝紙兩端扭轉） ---------- */
export const CandyRain: React.FC<{start: number; count?: number}> = ({start, count = 16}) => {
  const frame = useCurrentFrame(); const {width: W, height: H} = useVideoConfig(); const f = frame - start; if (f < 0 || f > 75) return null;
  const COLS = ["#3DF0A0", "#FF8A2A", "#B48CFF", "#FFD34D"];
  return (
    <AbsoluteFill>
      {Array.from({length: count}).map((_, i) => {
        const d = hash(i) * 12, k = (f - d) / 55; if (k < 0 || k > 1.1) return null;
        const x = hash(i * 3) * W, y = -80 + k * k * (H + 160), rot = (f + i * 20) * (hash(i + 2) - .5) * 14;
        return (
          <svg key={i} style={{position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`}} width="90" height="44" viewBox="-45 -22 90 44">
            <path d="M-22 0 L-42 -16 L-38 0 L-42 16 Z M22 0 L42 -16 L38 0 L42 16 Z" fill={COLS[i % 4]} opacity=".85" />
            <ellipse rx="24" ry="16" fill={COLS[i % 4]} /><path d="M-12 -14 L-4 14 M4 -14 L12 14" stroke="rgba(255,255,255,.6)" strokeWidth="5" /></svg>
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------- 福利圖示 ---------- */
export const CoinStack: React.FC<{size: number; grow: number; accent: string}> = ({size, grow, accent}) => (
  <svg width={size} height={size} viewBox="-120 -120 240 240">
    <defs><linearGradient id="cg" x1="0" x2="1"><stop offset="0" stopColor="#1C8F5E" /><stop offset=".5" stopColor={accent} /><stop offset="1" stopColor="#1C8F5E" /></linearGradient></defs>
    {[[-60, 6], [0, 9], [60, 5]].map(([cx, n], s) => Array.from({length: Math.round(n * Math.min(1, grow * 1.2 - s * .1))}).map((_, i) => (
      <g key={`${s}${i}`} transform={`translate(${cx},${90 - i * 16})`}><ellipse rx="44" ry="13" cy="6" fill="#0E5A3A" /><ellipse rx="44" ry="13" fill="url(#cg)" /><ellipse rx="30" ry="8" fill="none" stroke="#0E5A3A" strokeWidth="2.5" /></g>)))}
    <g opacity={grow} transform={`translate(${-10 + 20 * grow},${-20 - 30 * grow})`}>
      <path d="M-80 30 L-20 -10 L10 10 L60 -40" stroke="#F3C64A" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 -56 L82 -60 L76 -18 Z" fill="#F3C64A" />
    </g>
  </svg>
);
export const GiftBox: React.FC<{size: number; open: number; accent: string}> = ({size, open, accent}) => (
  <svg width={size} height={size} viewBox="-120 -120 240 240">
    <circle cy="-40" r={90 * open} fill={accent} opacity={.18 * open} />
    <g transform={`translate(0,${-60 * open}) rotate(${-14 * open})`}><rect x="-80" y="-30" width="160" height="34" rx="6" fill="#2FA873" stroke="#9FF5CF" strokeWidth="3" /><rect x="-12" y="-30" width="24" height="34" fill="#F3C64A" />
      <path d="M0 -30 C-40 -80 -70 -40 -10 -30 M0 -30 C40 -80 70 -40 10 -30" stroke="#F3C64A" strokeWidth="12" fill="none" strokeLinecap="round" /></g>
    <defs><linearGradient id="gb" x1="0" x2="1"><stop offset="0" stopColor="#1F6B4A" /><stop offset=".5" stopColor="#2FA873" /><stop offset="1" stopColor="#1F6B4A" /></linearGradient></defs>
    <rect x="-70" y="4" width="140" height="100" rx="8" fill="url(#gb)" stroke="#9FF5CF" strokeWidth="3" /><rect x="-12" y="4" width="24" height="100" fill="#F3C64A" />
    <g opacity={open} transform={`translate(0,${-30 - 70 * open})`}><circle r="34" fill="#F3C64A" stroke="#B98A1E" strokeWidth="5" /><text y="10" textAnchor="middle" fontFamily="BebasNeue" fontSize="30" fill="#7A5A10">USDT</text></g>
  </svg>
);
export const Airdrop: React.FC<{size: number; drop: number; accent: string}> = ({size, drop, accent}) => {
  const frame = useCurrentFrame(); const sw = Math.sin(frame * .12) * 6;
  return (
    <svg width={size} height={size} viewBox="-120 -120 240 240">
      <g transform={`translate(0,${-80 + 80 * drop}) rotate(${sw})`}>
        <path d="M-90 -40 Q0 -140 90 -40 Q60 -55 30 -40 Q0 -58 -30 -40 Q-60 -55 -90 -40 Z" fill={accent} />
        <path d="M-30 -40 Q0 -120 30 -40" fill="rgba(255,255,255,.25)" />
        {[-90, -30, 30, 90].map((x) => <line key={x} x1={x} y1="-40" x2={x / 3} y2="40" stroke="#CFEFE2" strokeWidth="2" />)}
        <rect x="-36" y="40" width="72" height="60" rx="6" fill="#1D2A24" stroke={accent} strokeWidth="4" /><text y="80" textAnchor="middle" fontFamily="BebasNeue" fontSize="34" fill={accent}>PRL</text>
      </g>
    </svg>
  );
};
export const Wheel: React.FC<{size: number; spin: number; accent: string}> = ({size, spin, accent}) => (
  <svg width={size} height={size} viewBox="-120 -120 240 240">
    <circle r="104" fill="#0E1512" stroke="#E2C07A" strokeWidth="8" />
    <g transform={`rotate(${spin})`}>
      {Array.from({length: 10}).map((_, i) => { const a1 = (i * 36 * Math.PI) / 180, a2 = ((i + 1) * 36 * Math.PI) / 180;
        return <path key={i} d={`M0 0 L${96 * Math.cos(a1)} ${96 * Math.sin(a1)} A96 96 0 0 1 ${96 * Math.cos(a2)} ${96 * Math.sin(a2)} Z`} fill={i % 2 ? accent : "#13241C"} opacity={i % 2 ? .85 : 1} />; })}
      {Array.from({length: 10}).map((_, i) => <circle key={i} cx={100 * Math.cos((i * 36 * Math.PI) / 180)} cy={100 * Math.sin((i * 36 * Math.PI) / 180)} r="4" fill="#FFF3C4" />)}
    </g>
    <circle r="22" fill="#E2C07A" /><path d="M-12 -104 L12 -104 L0 -80 Z" fill="#FF8A2A" />
    <g transform="translate(0,58)"><path d="M-40 0 L-30 -30 L-14 -12 L0 -36 L14 -12 L30 -30 L40 0 Z" fill="#F3C64A" stroke="#9C7420" strokeWidth="3" /><text y="-6" textAnchor="middle" fontFamily="BebasNeue" fontSize="22" fill="#5A3E08">VIP</text></g>
  </svg>
);
