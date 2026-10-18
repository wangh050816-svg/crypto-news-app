import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, TYPE, U } from '../brand/tokens';
import { Chain } from '../fx/Chain';
import { ACT, H } from '../timeline';

// ACT 1 - HOOK (bar 1). Close on the jack-o'-lantern in the dark, fog moving from frame 0. One
// question rises and is read alone; once it has gone the flame flares (Night.burn), and the drop
// lands on the hard cut to the headline. The picture says "Halloween night" before any word does.

/** The question's size: src/sync.ts times its text sound with it. */
export const HOOK_SIZE = TYPE.display.size * U;

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Chain chain="hook" frame={f} from={ACT.hook.from} role="display" size={HOOK_SIZE} top={H * 0.36} color={C.paper} />
    </AbsoluteFill>
  );
};
