import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { E, hitPulse, mix, prog, spr, SPR, squash, stagger } from '../lib/anim';
import { ACT, CUE, f60, TURN, turnAt } from '../timeline';
import { DarkPhoto, LENS, orbitAt, real, Sheen } from './Night';
import { PACK_H } from './Signup';

// ACT 3 - THE CAROUSEL (bars 5-9). The five prizes stand on one ring circling the pumpkin's light.
// Each turn (a beat and a half, E.smooth: the blur speed ceiling rules out a steeper whip) brings the
// next prize round to the front, the lens: biggest, lit, named, landing with a short punch. The rest
// keep circling at the sides and behind, small and dim, so the act is surrounded by them. Act 2 left
// the pack at the lens: it is item 0, the first to turn away. Bitcoin: 30% as 3 of 10 cells. Gold:
// 588 USDT. A gift box drops onto the light. Three official cards fan open.

const A = ACT.offers.from;
/** The photos' soft ellipse (DarkPhoto's mask), so a sheen stays on the coins and bars. */
const GOLD_MASK = 'radial-gradient(ellipse 46% 44% at 50% 50%, #000 40%, transparent 85%)';
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

  // THE CAROUSEL: the five prizes stand on one ring that circles the pumpkin's light. Each turn
  // brings the next prize round to the front (the lens): biggest, lit, named. The others keep
  // circling at the sides and behind, small and dim, so the whole act is surrounded by them.
  const item = (j: number, node: React.ReactNode) => {
    const theta = ((j - pos) * 2 * Math.PI) / RING.n;
    const o = orbitAt(theta, LENS.x, LENS.y - RING.ry, RING.rx, RING.ry);
    const front = (o.z + 1) / 2; // 1 at the lens, 0 at the back
    const land = j > 0 ? hitPulse(F - (turnAt(j - 1) + TURN), 2, 10) : 0;
    const k = mix(0.34, 1, front ** 2.2) * creep * (1 + 0.045 * land);
    return (
      <div
        key={j}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: Math.round(100 + 100 * o.z),
          transform: `translate(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px) perspective(1400px) rotateY(${(-Math.sin(theta) * 28).toFixed(3)}deg) scale(${k.toFixed(4)})`,
          opacity: mix(0.45, 1, front),
          filter: `brightness(${mix(0.18, 1, front ** 3).toFixed(3)})`,
        }}
      >
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
          <Sheen mask={GOLD_MASK} w={720} h={580} left={-360} top={-290} p={prog(F, turnAt(0) + TURN, turnAt(0) + TURN + f60(36), E.inOut)} strength={0.65} />
          <div style={{ position: 'absolute', left: -(10 * 44 + 9 * 14) / 2, top: 300, opacity: 1 - Math.min(1, Math.abs(1 - pos) / 0.35) }}>
            <Tally F={F} />
          </div>
        </>,
      )}
      {item(
        2,
        <>
          {centred(820, 560, <DarkPhoto src="gold.jpg" w={820} h={560} scale={1.16 - 0.04 * prog(F, turnAt(1), turnAt(2), E.linear)} />)}
          <Sheen mask={GOLD_MASK} w={820} h={560} left={-410} top={-280} p={prog(F, turnAt(1) + TURN, turnAt(1) + TURN + f60(36), E.inOut)} strength={0.7} />
        </>,
      )}
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
