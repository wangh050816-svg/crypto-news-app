import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { C, TYPE, U, typeStyle } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { Cursor, cursorArc, pressAt } from '../fx/Cursor';
import { arrive, arriveK, blurIn, blurOut, clamp, E, lmix, mix, pace, prog } from '../lib/anim';
import { mixColor } from '../lib/color';
import { measureTracked } from '../lib/measure';
import { ACT, copy, CUE, f60, W } from '../timeline';
import { LENS, real } from './Night';

// ACT 2 - SIGN-UP (bars 2-4). The headline 「註冊　就送」 lands on the cut. A caret appears in its
// gap, thickens to a capsule and widens into OURBIT's sign-up bar, shoving the two words off the
// sides. The bar fills container-first; the button fills last. A cursor arrives and presses 註冊:
// the bar drops away and the prize rises out of the pumpkin's light to the lens, where it is named.

const A = ACT.signup.from;

/** The headline's size, and the pack's line size: src/sync.ts times their text sounds with them. */
export const HEAD_SIZE = TYPE.display.size * U;
export const PACK_LINE = TYPE.line.size * U;

/** The bar: its centre line and its final size. */
export const BAR = { y: 760, h: 132, w: Math.round(W * 0.92) };
/** The button inside the bar (centre, size), where the cursor presses. */
export const BUTTON = { x: W / 2 + BAR.w / 2 - 20 - 110, y: BAR.y, w: 220, h: 100 };
/** The pack: its height at the lens. Act 3 opens on exactly this pose. */
export const PACK_H = 620;
/** The pack's rise out of the light (absolute frames) and its curve, for src/sync.ts. */
export const RISE = { from: CUE.press, to: CUE.packIn, ease: E.rest };
/** The bar's widening (absolute frames) and its curve, for src/sync.ts. */
export const WIDEN = { from: CUE.widen, to: CUE.widen + f60(60), ease: E.rest };

export const Signup: React.FC = () => {
  const f = useCurrentFrame();
  const F = f + A;
  const head = copy('headline.1');
  const [wl, wr] = head.text.split(/\s+/);
  const st = typeStyle('display', HEAD_SIZE);
  const ww = measureTracked(wl, HEAD_SIZE, TYPE.display.weight, TYPE.display.track) - TYPE.display.track * HEAD_SIZE;

  // The slot between the words: caret (6 f) -> hold -> capsule (14 f) -> bar (60 f on E.rest).
  const caretH = prog(F, CUE.caret, CUE.caret + f60(6), E.out) * BAR.h;
  const capW = mix(4, 36, prog(F, CUE.capsule, CUE.capsule + f60(14), E.out));
  const wide = prog(F, WIDEN.from, WIDEN.to, WIDEN.ease);
  const slotW = F < CUE.caret ? 0.32 * HEAD_SIZE : mix(capW, BAR.w, wide);
  const slotH = F < CUE.caret ? 0 : mix(caretH, BAR.h, wide);
  const gap = 0.2 * HEAD_SIZE;
  const fill = mixColor(C.accent, C.ink2, prog(F, WIDEN.from, WIDEN.from + f60(20), E.smooth));

  // The words ride the slot's edges; once they travel fast they fade and blur away.
  const leave = prog(F, WIDEN.from + f60(8), WIDEN.from + f60(30), E.smooth);
  const word = (text: string, i: number, x: number) => {
    const s = head.in + f60(i * pace.stagger);
    const p = prog(F, s, s + f60(pace.wordDur), E.out);
    const y = (1 - arrive(p, arriveK(pace.rise * HEAD_SIZE, f60(pace.wordDur), E.out))) * pace.rise * HEAD_SIZE;
    const b = blurIn(p, pace.blur) + blurOut(leave, 10);
    return (
      <span
        data-text={head.id}
        style={{ ...st, color: C.paper, position: 'absolute', left: 0, top: 0, transform: `translate(${x.toFixed(2)}px, ${(BAR.y - HEAD_SIZE * 0.58 + y).toFixed(2)}px)`, opacity: p * (1 - leave), filter: b > 0.05 ? `blur(${b.toFixed(2)}px)` : undefined }}
      >
        {text}
      </span>
    );
  };

  // The bar's contents, container-first: the OURBIT name above it, the placeholder, then the button.
  const item = (k: number) => {
    const s = WIDEN.from + f60(40) + f60(4 * k);
    return prog(F, s, s + f60(12), E.out);
  };
  const btnFill = prog(F, WIDEN.from + f60(52), WIDEN.from + f60(68), E.linear);
  const gone = prog(F, CUE.press + f60(6), CUE.press + f60(30), E.exit); // the bar drops away after the press

  // The cursor: snappy, from the lower right to the button (24 f, E.out), presses on CUE.press.
  const cur = cursorArc({ x: W * 0.9, y: 1500 }, { x: BUTTON.x + 10, y: BUTTON.y + 6 }, prog(F, CUE.cursor, CUE.cursor + f60(24), E.out), -0.15);
  const press = pressAt(F, CUE.press);
  const hover = prog(F, CUE.cursor + f60(28), CUE.cursor + f60(32), E.smooth);
  const curO = prog(F, CUE.cursor, CUE.cursor + f60(4), E.smooth) * (1 - prog(F, CUE.press + f60(14), CUE.press + f60(24), E.smooth));

  // The prize: out of the pumpkin's light to the lens, at rest on CUE.packIn, then a slow creep.
  const r = prog(F, RISE.from, RISE.to, RISE.ease);
  const packY = mix(1560, LENS.y, r);
  const packK = lmix(0.3, 1, r) * lmix(1, 1.035, prog(F, RISE.to, A + ACT.signup.dur, E.linear));

  const ui = typeStyle('ui');
  return (
    <AbsoluteFill>
      {F < WIDEN.from + f60(40) && word(wl, 0, W / 2 - slotW / 2 - gap - ww)}
      {F < WIDEN.from + f60(40) && word(wr, 1, W / 2 + slotW / 2 + gap)}
      {slotH > 0 && gone < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: slotW,
            height: slotH,
            borderRadius: slotH / 2,
            background: fill,
            boxShadow: wide > 0.5 ? '0 30px 90px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.1)' : undefined,
            opacity: 1 - gone,
            transform: `translate(${(W / 2 - slotW / 2).toFixed(2)}px, ${(BAR.y - slotH / 2 + 60 * gone).toFixed(2)}px)`,
          }}
        />
      )}
      {wide > 0 && gone < 1 && (
        <>
          <Img src={real('logo.png')} style={{ position: 'absolute', left: 0, top: 0, height: 64, transform: `translate(${(W / 2 - 128).toFixed(1)}px, ${(BAR.y - BAR.h / 2 - 120 + (1 - arrive(item(0))) * 6 + 60 * gone).toFixed(2)}px)`, opacity: item(0) * (1 - gone) }} />
          <span data-ui="ui.email" style={{ ...ui, color: C.mute, position: 'absolute', left: 0, top: 0, transform: `translate(${(W / 2 - BAR.w / 2 + 56).toFixed(1)}px, ${(BAR.y - 27 + (1 - arrive(item(1))) * 6 + 60 * gone).toFixed(2)}px)`, opacity: item(1) * (1 - gone) }}>
            {copy('ui.email').text}
          </span>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: BUTTON.w,
              height: BUTTON.h,
              borderRadius: BUTTON.h / 2,
              background: mixColor(C.ink2, C.accent, btnFill),
              opacity: item(2) * (1 - gone),
              transform: `translate(${(BUTTON.x - BUTTON.w / 2).toFixed(1)}px, ${(BUTTON.y - BUTTON.h / 2 + 60 * gone).toFixed(2)}px) scale(${(1 - 0.05 * press + 0.02 * hover * (1 - press)).toFixed(4)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span data-ui="ui.button" style={{ ...ui, fontWeight: TYPE.display.weight, color: mixColor(C.mute, C.ink, btnFill) }}>
              {copy('ui.button').text}
            </span>
          </div>
        </>
      )}
      {F >= CUE.cursor && curO > 0 && <Cursor x={cur.x} y={cur.y} scale={2.6} press={press} opacity={curO} />}
      {F >= RISE.from && (
        <Img
          src={real('pack.png')}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: PACK_H,
            transformOrigin: '50% 50%',
            transform: `translate(${(LENS.x - (PACK_H * 847) / 1706 / 2).toFixed(2)}px, ${(packY - PACK_H / 2).toFixed(2)}px) scale(${packK.toFixed(4)}) rotate(${mix(-8, -3, r).toFixed(3)}deg)`,
            opacity: clamp((F - RISE.from) / f60(8)),
            filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.55))',
          }}
        />
      )}
      <Chain chain="pack" frame={f} from={A} role="line" size={PACK_LINE} top={LENS.y + PACK_H / 2 + 70} color={C.paper} />
    </AbsoluteFill>
  );
};
