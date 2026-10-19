import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { E, hitPulse, pace, prog, stagger } from '../lib/anim';
import { ACT, CUE, f60, TURN, turnAt } from '../timeline';
import { LENS } from './Night';


// ACT 3 - THE CAROUSEL (bars 5-9). The five prizes stand on one ring circling the pumpkin's light.
// Each turn (a beat and a half, E.smooth: the blur speed ceiling rules out a steeper whip) brings the
// next prize round to the front, the lens: biggest, lit, named, landing with a short punch. The rest
// keep circling at the sides and behind, small and dim, so the act is surrounded by them. Act 2 left
// the pack at the lens: it is item 0, the first to turn away. Bitcoin: 30% as 3 of 10 cells. Gold:
// 588 USDT. A gift box drops onto the light. Three official cards fan open.

const A = ACT.offers.from;
const OFFER_PACE = { ...pace, blur: 0 };
/** The carousel ring around the light: five prizes, its half-width and its (foreshortened) half-depth. */
export const RING = { n: 5, rx: 420, ry: 130 };
/** The offer lines' size: src/sync.ts times their text sounds with it. */
export const OFFER_SIZE = TYPE.line.size * U;
/** The wheel's turns (absolute frames) and their curve, for src/sync.ts. */
export const TURNS = [0, 1, 2, 3].map((i) => ({ from: turnAt(i), to: turnAt(i) + TURN, ease: E.smooth })); // E.smooth, not E.inOut: its peak (2.9x the mean) keeps a turn near 36 px/f; E.inOut peaks at 7.7x
/** The gift's fall onto the light: contact on CUE.gift. */
export const FALL = { from: CUE.gift - f60(26), to: CUE.gift, ease: E.contact };

const Tally: React.FC<{ F: number }> = ({ F }) => {
  const n = 10;
  const on = 3;
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {Array.from({ length: n }).map((_, i) => {
        const s = CUE.tally + stagger(i, on, f60(30), E.out);
        const p = i < on ? prog(F, s, s + f60(8), E.smooth) : 0;
        const pulse = i === on - 1 ? hitPulse(F - (s + f60(8)), 2, 8) : 0;
        return <div key={i} style={{ width: 44, height: 44, borderRadius: 10, background: i < on && p > 0 ? C.accent : C.line, opacity: i < on ? 0.35 + 0.65 * p : 1, transform: `scale(${(1 + 0.15 * pulse).toFixed(4)})` }} />;
      })}
    </div>
  );
};


export const Offers: React.FC = () => {
  const f = useCurrentFrame();
  const F = f + A;
  const pos = TURNS.reduce((s, t) => s + prog(F, t.from, t.to, t.ease), 0);

  return (
    <AbsoluteFill>
      {/* The 30% tally sits under the coins while they are at the front. */}
      <div style={{ position: 'absolute', left: LENS.x - (10 * 44 + 9 * 14) / 2, top: LENS.y + 300, opacity: 1 - Math.min(1, Math.abs(1 - pos) / 0.35) }}>
        <Tally F={F} />
      </div>
      {/* No entry blur on the offer lines: over the busy carousel a stepped blur reads as a one-frame flash. */}
      <Chain chain="offers" frame={f} from={A} role="line" size={OFFER_SIZE} top={LENS.y + 370} color={C.paper} pace={OFFER_PACE} />
    </AbsoluteFill>
  );
};
