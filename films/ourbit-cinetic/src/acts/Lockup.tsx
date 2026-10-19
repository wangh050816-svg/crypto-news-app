import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { E, hitPulse, lmix, mix, prog } from '../lib/anim';
import { ACT, CUE, f60, TOTAL } from '../timeline';
import { LENS, real, Sheen } from './Night';

// ACT 4 - LOCKUP (bars 10-11 + tail). The light hands over: the B mark rises out of it to the lens
// (its own beat: it has not been seen yet), rests, then slides up (9:16 stack variant) while the
// OURBIT wordmark rises in under it, resolving on CUE.lockup: the one hit. Then the action and the
// dates, as one build line, under a slow push to the end.

const A = ACT.lockup.from;
/** The CTA line's size: src/sync.ts times its text sounds with it. */
export const CTA_SIZE = TYPE.line.size * U * 0.9;
const MARK_H = 420;
const NAME_H = 118;
/** The mark's slide up into the lockup (absolute frames). */
export const SLIDE = { from: CUE.slide, to: CUE.slide + f60(36), ease: E.smooth };
/** The name's rise: it starts at 55% of the slide and resolves on CUE.lockup. */
export const NAME = { from: CUE.lockup - f60(20), to: CUE.lockup }; // wiped on left to right

export const Lockup: React.FC = () => {
  const f = useCurrentFrame();
  const F = f + A;
  const up = prog(F, CUE.markIn, CUE.markRest, E.out);
  const sl = prog(F, SLIDE.from, SLIDE.to, SLIDE.ease);
  const markY = mix(LENS.y + 160, LENS.y, up) - 230 * sl;
  const markK = lmix(0.6, 1, up) * lmix(1, 0.82, sl) * (1 + 0.03 * hitPulse(F - CUE.lockup, 2, 8));
  const n = prog(F, NAME.from, NAME.to, E.out);
  const nameY = LENS.y + 20;
  // The mark turns face-on like a coin as it rises (E.out: past edge-on within a few frames).
  const flip = mix(180, 0, prog(F, CUE.markIn, CUE.markRest + f60(6), E.outSoft));
  // The end card keeps building: a slow push from the lockup to the last frame (<= 6%).
  const push = lmix(1, 1.05, prog(F, CUE.lockup, TOTAL, E.dolly));
  const markW = (MARK_H * 436) / 516;
  const nameW = (NAME_H * 664) / 164;
  return (
    <AbsoluteFill style={{ transformOrigin: `50% ${LENS.y}px`, transform: `scale(${push.toFixed(5)})` }}>
      <div
        style={{ position: 'absolute', left: 0, top: 0, width: markW, height: MARK_H, transformOrigin: '50% 50%', transform: `translate(${(540 - markW / 2).toFixed(2)}px, ${(markY - MARK_H / 2).toFixed(2)}px) perspective(1600px) rotateY(${flip.toFixed(3)}deg) scale(${markK.toFixed(4)})`, opacity: prog(F, CUE.markIn, CUE.markIn + f60(12), E.smooth) }}
      >
        <Img src={real('brandmark.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <Sheen mask={`url(${real('brandmark.png')})`} w={markW} h={MARK_H} p={prog(F, CUE.lockup - f60(4), CUE.lockup + f60(34), E.inOut)} strength={0.95} />
      </div>
      {F >= NAME.from && (
        <Img
          src={real('logo.png')}
          style={{ position: 'absolute', left: 0, top: 0, height: NAME_H, transform: `translate(${(540 - nameW / 2).toFixed(2)}px, ${nameY.toFixed(2)}px)`, clipPath: `inset(0 ${((1 - n) * 100).toFixed(2)}% 0 0)` }}
        />
      )}
      <Chain chain="cta" frame={f} from={A} role="line" size={CTA_SIZE} top={LENS.y + 230} color={C.paper} />
    </AbsoluteFill>
  );
};
