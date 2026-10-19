import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C } from '../brand/tokens';
import { E, hitPulse, lmix, mix, prog } from '../lib/anim';
import { CUE, H, TOTAL, W } from '../timeline';

// THE NIGHT - one layer under every act, driven by the ABSOLUTE frame, so the sky, the fog and the
// device (the jack-o'-lantern) never jump at a cut: only the framing changes, and only on the cut
// to the headline. All of it is photography (Pexels); nothing here adds a glow or an orange.

const real = (f: string) => staticFile(`real/${f}`);

/** The device: the pumpkin's centre-bottom on screen and its width, per framing. */
export const PUMPKIN = {
  tight: { x: W / 2, y: H + 60, w: 980 }, // the hook: we are close to it
  wide: { x: W / 2, y: H - 40, w: 620 }, // the rest of the film
};
/** The light: the point above the pumpkin where every prize is presented and lit. */
export const LENS = { x: W / 2, y: 870 };

/** Flicker of a candle flame, from a few sines (deterministic, no random). */
const flicker = (t: number) => 0.9 + 0.05 * Math.sin(t * 9.1) + 0.03 * Math.sin(t * 23.7 + 1) + 0.02 * Math.sin(t * 47.3 + 2);

/** How bright the pumpkin burns: a flare when the question has been read, on the press, and as the mark rises. */
export const burn = (abs: number) =>
  flicker(abs / 60) + 0.35 * hitPulse(abs - CUE.flare, 3, 14) + 0.3 * hitPulse(abs - CUE.press, 2, 12) + 0.25 * hitPulse(abs - CUE.markIn, 3, 16);

export const Night: React.FC<{ abs: number }> = ({ abs }) => {
  const t = abs / 60;
  const tight = abs < CUE.drop; // the hard cut changes the framing, nothing else
  const P = tight ? PUMPKIN.tight : PUMPKIN.wide;
  // The sky creeps the whole film (log-space, linear: frame 0 already moves).
  const k = lmix(1.14, 1.0, prog(abs, 0, TOTAL, E.linear));
  // The hook is darker: the room opens on the cut.
  // The end card dims the sky again, so the moon never sits behind the mark.
  const dark = tight ? 0.62 : mix(0.4, 0.72, prog(abs, CUE.markIn - 30, CUE.markIn + 30, E.smooth));
  const b = burn(abs);
  // In the hook the camera creeps in on the pumpkin from frame 0, so the opening already moves.
  const pw = P.w * (tight ? lmix(1, 1.1, prog(abs, 0, CUE.drop, E.linear)) : 1);
  const ph = pw * (679 / 817);
  const fogX = -W * 0.25 + 28 * t;
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <Img
        src={real('sky.jpg')}
        style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', objectPosition: '50% 20%', transformOrigin: '50% 30%', transform: `scale(${k})` }}
      />
      <AbsoluteFill style={{ background: C.black, opacity: dark }} />
      {/* Fog: two real layers, screen-blended, drifting in opposite directions. */}
      <Img
        src={real('fog_tall.jpg')}
        style={{ position: 'absolute', left: 0, top: 0, width: W * 1.5, height: H * 0.55, objectFit: 'fill', mixBlendMode: 'screen', opacity: 0.22, transform: `translate(${(-W * 0.2 - 18 * t).toFixed(2)}px, ${(H * 0.55).toFixed(1)}px) scaleX(-1)` }}
      />
      {/* The device. Its brightness is the light the prizes are shown in. */}
      <Img
        src={real('pumpkin_a.png')}
        style={{ position: 'absolute', left: 0, top: 0, width: pw, height: ph, transform: `translate(${(P.x - pw / 2).toFixed(2)}px, ${(P.y - ph).toFixed(2)}px)`, filter: `brightness(${b.toFixed(3)})` }}
      />
      <Img
        src={real('fog_low.jpg')}
        style={{ position: 'absolute', left: 0, top: 0, width: W * 1.5, height: H * 0.2, objectFit: 'fill', mixBlendMode: 'screen', opacity: 0.55, transform: `translate(${fogX.toFixed(2)}px, ${(H * 0.84).toFixed(1)}px)` }}
      />
    </AbsoluteFill>
  );
};

/** A photograph on black, laid over the night with lighten so its black disappears, edges masked off. */
export const DarkPhoto: React.FC<{ src: string; w: number; h: number; pos?: string; scale?: number; light?: number }> = ({ src, w, h, pos = '50% 50%', scale = 1, light = 1 }) => {
  const mask = 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%)';
  return (
    <div style={{ width: w, height: h, overflow: 'hidden', mixBlendMode: 'lighten', WebkitMaskImage: mask, maskImage: mask }}>
      <Img src={real(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${scale})`, filter: `brightness(${light.toFixed(3)})` }} />
    </div>
  );
};

export { real };

/**
 * A band of light sweeping across a shape (foil, gold, the rose-gold mark), clipped to that shape by
 * `mask` (a CSS mask: an image's alpha, or a gradient). `p` 0..1 carries the band from left to right.
 * Screen-blended white, so it only brightens what is already there: a reflection, not a glow.
 */
export const Sheen: React.FC<{ mask: string; w: number; h: number; p: number; strength?: number; left?: number; top?: number }> = ({ mask, w, h, p, strength = 0.55, left = 0, top = 0 }) => {
  if (p <= 0 || p >= 1) return null;
  const x = mix(-25, 125, p);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: w,
        height: h,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        mixBlendMode: 'screen',
        background: `linear-gradient(105deg, transparent ${(x - 14).toFixed(2)}%, rgba(255,255,255,${(strength * 0.5).toFixed(3)}) ${(x - 4).toFixed(2)}%, rgba(255,255,255,${strength.toFixed(3)}) ${x.toFixed(2)}%, rgba(255,255,255,${(strength * 0.5).toFixed(3)}) ${(x + 4).toFixed(2)}%, transparent ${(x + 14).toFixed(2)}%)`,
        pointerEvents: 'none',
      }}
    />
  );
};
