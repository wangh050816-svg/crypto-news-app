import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { arrive, blurIn, E, lmix, mix, prog } from '../lib/anim';
import { ACT, CUE, f60, TOTAL } from '../timeline';
import { LENS, real } from './Night';

// ACT 4 - LOCKUP (bars 10-11 + tail). The light hands over: the B mark rises out of it to the lens
// (its own beat: it has not been seen yet), rests, then slides up (9:16 stack variant) while the
// OURBIT wordmark rises in under it, resolving on CUE.lockup: the one hit. Then the action and the
// dates, as one build line, under a slow push to the end.

const A = ACT.lockup.from;
/** The CTA line's size: src/sync.ts times its text sounds with it. */
export const CTA_SIZE = TYPE.line.size * U * 0.9;
const MARK_H = 300;
const NAME_H = 92;
/** The mark's slide up into the lockup (absolute frames). */
export const SLIDE = { from: CUE.slide, to: CUE.slide + f60(36), ease: E.smooth };
/** The name's rise: it starts at 55% of the slide and resolves on CUE.lockup. */
export const NAME = { from: CUE.lockup - f60(14), to: CUE.lockup };

export const Lockup: React.FC = () => {
  const f = useCurrentFrame();
  const F = f + A;
  const up = prog(F, CUE.markIn, CUE.markRest, E.out);
  const sl = prog(F, SLIDE.from, SLIDE.to, SLIDE.ease);
  const markY = mix(LENS.y + 160, LENS.y, up) - 200 * sl;
  const markK = lmix(0.6, 1, up) * lmix(1, 0.82, sl);
  const n = prog(F, NAME.from, NAME.to, E.out);
  const nameY = LENS.y + 10 + (1 - arrive(n)) * 30;
  const push = lmix(1, 1.04, prog(F, CUE.push, TOTAL, E.dolly));
  const markW = (MARK_H * 436) / 516;
  const nameW = (NAME_H * 664) / 164;
  return (
    <AbsoluteFill style={{ transformOrigin: `50% ${LENS.y}px`, transform: `scale(${push.toFixed(5)})` }}>
      <Img
        src={real('brandmark.png')}
        style={{ position: 'absolute', left: 0, top: 0, height: MARK_H, transformOrigin: '50% 50%', transform: `translate(${(540 - markW / 2).toFixed(2)}px, ${(markY - MARK_H / 2).toFixed(2)}px) scale(${markK.toFixed(4)})`, opacity: prog(F, CUE.markIn, CUE.markIn + f60(12), E.smooth) }}
      />
      {F >= NAME.from && (
        <Img
          src={real('logo.png')}
          style={{ position: 'absolute', left: 0, top: 0, height: NAME_H, transform: `translate(${(540 - nameW / 2).toFixed(2)}px, ${nameY.toFixed(2)}px)`, opacity: prog(F, NAME.from, NAME.to, E.smooth), filter: n < 0.6 ? `blur(${blurIn(n, 10).toFixed(2)}px)` : undefined }}
        />
      )}
      <Chain chain="cta" frame={f} from={A} role="line" size={CTA_SIZE} top={LENS.y + 200} color={C.paper} />
    </AbsoluteFill>
  );
};
