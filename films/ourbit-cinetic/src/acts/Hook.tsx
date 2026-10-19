import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { E, lmix, mix, prog } from '../lib/anim';
import { ACT, copy, f60, H } from '../timeline';

// ACT 1 - HOOK (bar 1). Close on the jack-o'-lantern in the dark, fog moving from frame 0. One
// question rises and is read alone; once it has gone the flame flares (Night.burn), and the drop
// lands on the hard cut to the headline. The picture says "Halloween night" before any word does.

/** The question's size: src/sync.ts times its text sound with it. */
export const HOOK_SIZE = TYPE.display.size * U;

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  // The question is lit, not faded: a soft edge sweeps it in from the left while it settles from
  // 112% to size (the film's one hero-word treatment).
  const q = copy('hook.1');
  const s = prog(f + ACT.hook.from, q.in, q.in + f60(30), E.out);
  const x = mix(-20, 120, s);
  const mask = `linear-gradient(90deg, #000 ${(x - 18).toFixed(2)}%, transparent ${x.toFixed(2)}%)`;
  return (
    <AbsoluteFill style={{ WebkitMaskImage: s < 1 ? mask : undefined, maskImage: s < 1 ? mask : undefined, transformOrigin: `50% ${H * 0.36 + HOOK_SIZE * 0.55}px`, transform: `scale(${lmix(1.12, 1, s).toFixed(4)})` }}>
      <Chain chain="hook" frame={f} from={ACT.hook.from} role="display" size={HOOK_SIZE} top={H * 0.36} color={C.paper} />
    </AbsoluteFill>
  );
};
