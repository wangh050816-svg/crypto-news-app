import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { E, hitPulse, mix, prog, spr, SPR, squash, stagger } from '../lib/anim';
import { ACT, CUE, f60, TURN, turnAt } from '../timeline';
import { DarkPhoto, LENS, real } from './Night';
import { PACK_H } from './Signup';

// ACT 3 - THE WHEEL (bars 5-9). The prizes stand in a vertical wheel whose focus is the lens, the
// pumpkin's light. Each turn (a beat and a half) lifts the last prize away and brings the next one
// up out of the light (E.smooth: the blur speed ceiling rules out a steeper whip); size and brightness fall off with the distance from the lens, so only the
// prize in the light is lit. Act 2 left the pack at the lens: it is item 0, the first to leave.
// Bitcoin: 30% as 3 of 10 cells. Gold: 588 USDT. A gift box drops onto the light. Three official
// cards fan open.

const A = ACT.offers.from;
/** Distance between prizes on the wheel (px). A turn peaks near 50 px/f: motion-blurred in the master. */
export const SLOT = 560;
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

const CardFan: React.FC<{ open: number }> = ({ open }) => {
  const cards = ['card_gengar.png', 'card_pikachu.png', 'card_arceus.png'];
  const w = 300;
  return (
    <div style={{ position: 'relative', width: 0, height: 0 }}>
      {cards.map((c, i) => (
        <Img
          key={c}
          src={real(c)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: w,
            borderRadius: w * 0.045,
            transformOrigin: '50% 110%',
            transform: `translate(${(-w / 2 + (i - 1) * w * 0.62 * open).toFixed(2)}px, ${(-w * 0.7 + Math.abs(i - 1) * 18 * open).toFixed(2)}px) rotate(${((i - 1) * 14 * open).toFixed(3)}deg)`,
            boxShadow: '0 24px 50px rgba(0,0,0,.6)',
            zIndex: i === 1 ? 2 : 1,
          }}
        />
      ))}
    </div>
  );
};

export const Offers: React.FC = () => {
  const f = useCurrentFrame();
  const F = f + A;
  const pos = TURNS.reduce((s, t) => s + prog(F, t.from, t.to, t.ease), 0);
  const fall = prog(F, FALL.from, FALL.to, FALL.ease);
  const sq = squash(F - CUE.gift);
  const fan = spr(F, CUE.fan - f60(6), SPR.soft);
  const creep = 1 + 0.02 * ((F - A) / ACT.offers.dur);

  const item = (j: number, node: React.ReactNode) => {
    const d = j - pos;
    const a = Math.min(Math.abs(d), 1.4);
    const k = (1 - 0.3 * Math.min(a, 1)) * creep;
    const light = mix(1, 0.28, Math.min(a, 1));
    // Only the prize in the light reads. The fades run on time across the whole turn (not on distance:
    // E.inOut crosses the middle in a few frames, which would collapse a distance fade into a pop).
    const leave = j < TURNS.length ? prog(F, turnAt(j) - f60(4), turnAt(j) + TURN + f60(10), E.smooth) : 0;
    const enter = j > 0 ? prog(F, turnAt(j - 1) - f60(2), turnAt(j - 1) + TURN + f60(4), E.smooth) : 1;
    const o = enter * (1 - leave);
    if (o <= 0) return null;
    return (
      <div key={j} style={{ position: 'absolute', left: 0, top: 0, transform: `translate(${LENS.x}px, ${(LENS.y + d * SLOT).toFixed(2)}px) scale(${k.toFixed(4)})`, opacity: o, filter: `brightness(${light.toFixed(3)})` }}>
        {node}
      </div>
    );
  };
  const centred = (w: number, h: number, node: React.ReactNode) => <div style={{ position: 'absolute', left: -w / 2, top: -h / 2, width: w, height: h }}>{node}</div>;
  const packW = (PACK_H * 847) / 1706;

  return (
    <AbsoluteFill>
      {item(0, <Img src={real('pack.png')} style={{ position: 'absolute', left: -packW / 2, top: -PACK_H / 2, height: PACK_H, transform: 'scale(1.035) rotate(-3deg)', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.55))' }} />)}
      {item(
        1,
        <>
          {centred(720, 580, <DarkPhoto src="btc.jpg" w={720} h={580} pos="50% 64%" scale={1.12 - 0.04 * prog(F, turnAt(0), turnAt(1), E.linear)} />)}
          <div style={{ position: 'absolute', left: -(10 * 44 + 9 * 14) / 2, top: 300 }}>
            <Tally F={F} />
          </div>
        </>,
      )}
      {item(2, centred(820, 560, <DarkPhoto src="gold.jpg" w={820} h={560} scale={1.16 - 0.04 * prog(F, turnAt(1), turnAt(2), E.linear)} />))}
      {item(
        3,
        // The gift turns in with the wheel, hanging above its place, then drops onto the light.
        <Img
          src={real('gift.png')}
          style={{ position: 'absolute', left: -200, top: -173, width: 400, transformOrigin: '50% 100%', transform: `translateY(${(-(1 - fall) * 140).toFixed(2)}px) scale(${sq.across.toFixed(4)}, ${sq.along.toFixed(4)}) rotate(${mix(-12, 4, fall).toFixed(3)}deg)`, filter: 'drop-shadow(0 26px 30px rgba(0,0,0,.6))' }}
        />,
      )}
      {item(4, <div style={{ position: 'absolute', left: 0, top: 40 }}><CardFan open={fan} /></div>)}
      <Chain chain="offers" frame={f} from={A} role="line" size={OFFER_SIZE} top={LENS.y + 370} color={C.paper} />
    </AbsoluteFill>
  );
};
