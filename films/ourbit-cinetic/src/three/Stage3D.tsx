import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import * as THREE from 'three';
import { C, M } from '../brand/tokens';
import { burn, LENS } from '../acts/Night';
import { E, hitPulse, lmix, mix, prog, spr, SPR, squash } from '../lib/anim';
import { ACT, CUE, f60, H, turnAt, W } from '../timeline';
import { FALL, TURNS } from '../acts/Offers';
import { RISE } from '../acts/Signup';

// THE 3D STAGE: the prizes as real objects, lit by the pumpkin from below and reflecting a room, on
// one transparent WebGL canvas over the night and under the type. Driven by the ABSOLUTE frame.
//   sign-up  the pack spirals up out of the light, turning in real 3D, and three of its cards orbit
//            it while the camera circles round
//   offers   the five prizes stand on a ring round the light: each turn brings the next one to the
//            front, the camera drifting round the ring
//   lockup   the ring rises behind the brand and keeps circling, far and dim
// World units: the camera sees 6.3 units of height at distance 10 (fov 35), so 1 unit is about 305 px.

const FOV = 35;
const DIST = 10;
const UNIT = H / (2 * DIST * Math.tan(((FOV / 2) * Math.PI) / 180)); // px per world unit at the origin
// The lens (where prizes are presented) is the world origin; the camera's view is offset so the
// origin lands on LENS.y on screen. The pumpkin sits below it.
const LENS_Y = 0;
const PUMPKIN_Y = (LENS.y - 1560) / UNIT;
/** Where the pack starts its rise: the top of the pumpkin, so it meets the lens at about 50 px/f. */
const RISE_Y = (LENS.y - 1380) / UNIT;

const GOLD = M.gold;
const real = (f: string) => staticFile(`real/${f}`);

/** Load textures once, holding the render until they are decoded. */
const useTextures = (files: string[]) => {
  const [handle] = useState(() => delayRender('Stage3D textures'));
  const [tex, setTex] = useState<Record<string, THREE.Texture> | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    Promise.all(files.map((f) => loader.loadAsync(real(f)).then((t) => ((t.colorSpace = THREE.SRGBColorSpace), (t.anisotropy = 8), [f, t] as const))))
      .then((list) => {
        setTex(Object.fromEntries(list));
        continueRender(handle);
      })
      .catch((e) => {
        throw e;
      });
  }, [files, handle]);
  return tex;
};

/**
 * A dark studio to reflect: black walls with a few softboxes (a big cool key above left, a strip on
 * the right, a dim back fill) and the pumpkin's warm bounce from below. Gold then shows real
 * highlights and dark falloff instead of the flat yellow a uniform grey room gives it.
 */
const studio = () => {
  const s = new THREE.Scene();
  s.background = new THREE.Color(C.black);
  const panel = (w: number, h: number, color: string, power: number, pos: [number, number, number]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide }));
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  panel(6, 4, M.keyLight, 5, [-5, 6, 5]); // key softbox
  panel(1.2, 7, M.rimLight, 4, [7, 1, -1]); // strip on the right
  panel(5, 3, M.keyLight, 0.6, [0, 2, -8]); // dim back fill
  panel(8, 8, M.keyLight, 2.2, [0, 9, 0]); // overhead: the tops of bars and coins catch it
  panel(9, 5, M.keyLight, 3.2, [0, 0, 10]); // front fill behind the camera: faces turned to us read gold, not black
  panel(6, 2, M.pumpkin, 1.2, [0, -6, 4]); // the pumpkin's warm bounce
  return s;
};

/** The studio as the scene's environment: gives gold and foil their highlights. */
const Room: React.FC = () => {
  const { gl, scene } = useThree();
  // Built during render, not in an effect: every frame is rendered once, so an environment set
  // after the first paint would miss the captured frame (the gold rendered black).
  const env = useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const t = pm.fromScene(studio(), 0.02).texture;
    pm.dispose();
    return t;
  }, [gl]);
  scene.environment = env;
  scene.environmentIntensity = 1;
  return null;
};

/** The camera, placed each frame: an orbit round `target` at `yaw` (rad) and height `h`. */
const Camera: React.FC<{ yaw: number; h: number; target: [number, number, number]; dist: number }> = ({ yaw, h, target, dist }) => {
  const { camera } = useThree();
  camera.position.set(target[0] + dist * Math.sin(yaw), target[1] + h, target[2] + dist * Math.cos(yaw));
  camera.lookAt(target[0], target[1], target[2]);
  (camera as THREE.PerspectiveCamera).setViewOffset(W, H, 0, H / 2 - LENS.y, W, H); // the target lands on the lens
  camera.updateProjectionMatrix();
  return null;
};

/** ₿ coin face, drawn once. */
const coinFace = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(200, 180, 40, 256, 256, 256);
  grd.addColorStop(0, M.goldHi);
  grd.addColorStop(0.6, M.gold);
  grd.addColorStop(1, M.goldLo);
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = M.goldRing;
  g.lineWidth = 22;
  g.beginPath();
  g.arc(256, 256, 214, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = M.goldMark;
  g.font = '900 290px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('B', 262, 268);
  // the two strokes through the B that make it the bitcoin sign (the face's font has no U+20BF)
  for (const x of [222, 282]) {
    g.fillRect(x, 92, 26, 60);
    g.fillRect(x, 384, 26, 60);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

/** Gold bar: a bevelled trapezoid, extruded. */
const barGeometry = () => {
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0);
  s.lineTo(0.5, 0);
  s.lineTo(0.4, 0.28);
  s.lineTo(-0.4, 0.28);
  s.lineTo(-0.5, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.42, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 });
  g.center();
  return g;
};

/** Where the pack's top seal tears off (fraction of its height from the bottom). */
const TEAR_V = 0.885;

/**
 * One band of the foil pack, v0..v1 of its height (0 = bottom), in the whole pack's coordinates and
 * UVs, gently bent across its width. The tear line zigzags, so the seal comes off along a ragged edge.
 */
const packBand = (w: number, h: number, v0: number, v1: number) => {
  const cols = 24;
  const g = new THREE.PlaneGeometry(w, h * (v1 - v0), cols, 4);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    let v = v0 + (p.getY(i) / (h * (v1 - v0)) + 0.5) * (v1 - v0);
    if (Math.abs(v - TEAR_V) < 1e-6) v += (Math.round((x / w + 0.5) * cols) % 2 ? 1 : -1) * 0.006; // ragged tear
    p.setY(i, (v - 0.5) * h);
    p.setZ(i, -0.09 * (x / (w / 2)) ** 2); // pillow bend across its width
    uv.setXY(i, x / w + 0.5, v);
  }
  g.computeVertexNormals();
  return g;
};

/**
 * The pack, printed both sides. `tear` 0..1 opens it: the top seal peels from its left end (the
 * first third), then flies off up and to the left and fades; at 1 it is gone and the pack stays open.
 */
const Pack: React.FC<{ tex: THREE.Texture; tear?: number }> = ({ tex, tear = 0 }) => {
  const w = 1.13;
  const h = 2.28;
  const body = useMemo(() => packBand(w, h, 0, TEAR_V), []);
  const seal = useMemo(() => packBand(w, h, TEAR_V, 1), []);
  const face = (geo: THREE.BufferGeometry, opacity = 1) => (
    <>
      <mesh geometry={geo}>
        <meshStandardMaterial map={tex} emissiveMap={tex} color={M.printLit} emissive={M.printGlow} roughness={0.5} metalness={0} envMapIntensity={0.15} alphaTest={0.5} side={THREE.FrontSide} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <mesh geometry={geo} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial map={tex} alphaTest={0.5} color={M.packBack} metalness={0.3} roughness={0.45} envMapIntensity={0.5} side={THREE.FrontSide} transparent={opacity < 1} opacity={opacity} />
      </mesh>
    </>
  );
  const peel = Math.min(1, tear / 0.35);
  const fly = Math.max(0, (tear - 0.25) / 0.75);
  const hinge: [number, number, number] = [-w / 2, (TEAR_V - 0.5) * h, 0];
  return (
    <group>
      {face(body)}
      {tear < 1 && (
        <group position={[hinge[0] + fly * -0.7, hinge[1] + fly * 1.3, fly * 0.5]} rotation={[fly * 0.6, fly * 0.9, peel * 0.35 + fly * 1.1]}>
          <group position={[-hinge[0], -hinge[1], 0]}>{face(seal, 1 - fly * fly)}</group>
        </group>
      )}
    </group>
  );
};

const Card: React.FC<{ tex: THREE.Texture; back: THREE.Texture; w?: number }> = ({ tex, back, w = 0.62 }) => (
  <group>
    <mesh>
      <planeGeometry args={[w, w * 1.396]} />
      <meshStandardMaterial map={tex} emissiveMap={tex} color={M.printLit} emissive={M.printGlow} roughness={0.5} metalness={0} envMapIntensity={0.15} side={THREE.FrontSide} />
    </mesh>
    <mesh rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[w, w * 1.396]} />
      <meshStandardMaterial map={back} emissiveMap={back} color={M.printLit} emissive={M.printGlow} roughness={0.5} metalness={0} envMapIntensity={0.15} />
    </mesh>
  </group>
);

const CoinStack: React.FC<{ face: THREE.Texture; spin: number }> = ({ face, spin }) => {
  const side = <meshStandardMaterial attach="material-0" color={GOLD} metalness={1} roughness={0.2} />;
  const cap = (n: number) => <meshStandardMaterial attach={`material-${n}`} map={face} metalness={1} roughness={0.24} />;
  const coin = (key: string, pos: [number, number, number], rot: [number, number, number]) => (
    <mesh key={key} position={pos} rotation={rot}>
      <cylinderGeometry args={[0.36, 0.36, 0.065, 72]} />
      {side}
      {cap(1)}
      {cap(2)}
    </mesh>
  );
  return (
    <group rotation={[0, spin, 0]}>
      {Array.from({ length: 7 }).map((_, i) => coin(`s${i}`, [-0.28, -0.42 + i * 0.07, 0], [0, i * 0.4, 0]))}
      {coin('a', [0.42, -0.05, 0.1], [Math.PI / 2 - 0.25, 0, 0.1])}
      {coin('b', [0.15, -0.44, 0.45], [0.05, 0, 0.05])}
    </group>
  );
};

const GoldBars: React.FC<{ spin: number }> = ({ spin }) => {
  const geo = useMemo(barGeometry, []);
  const mat = <meshStandardMaterial color={GOLD} metalness={1} roughness={0.16} />;
  const bars: [number, number, number, number][] = [
    [-0.52, -0.3, 0.1, 0.1],
    [0.52, -0.3, 0.05, -0.12],
    [0, -0.3, -0.42, 0.05],
    [0, 0.0, -0.05, 0.2],
  ];
  return (
    <group rotation={[0.1, spin, 0]} scale={0.95}>
      {bars.map(([x, y, z, r], i) => (
        <mesh key={i} geometry={geo} position={[x, y, z]} rotation={[0, r, 0]}>
          {mat}
        </mesh>
      ))}
    </group>
  );
};

const Gift: React.FC<{ spin: number; drop: number; sq: { along: number; across: number }; shake: number; hop: number }> = ({ spin, drop, sq, shake, hop }) => {
  const red = <meshPhysicalMaterial color={M.ribbon} roughness={0.38} metalness={0.05} clearcoat={0.6} envMapIntensity={0.7} />;
  return (
    <group position={[0, (1 - drop) * 0.6 + hop, 0]} scale={[sq.across, sq.along, sq.across]} rotation={[0.08, spin + (1 - drop) * 0.6, shake]}>
      <mesh>
        <boxGeometry args={[0.95, 0.75, 0.95]} />
        <meshStandardMaterial color={M.giftBox} roughness={0.55} envMapIntensity={0.5} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.97, 0.77, 0.16]} />
        {red}
      </mesh>
      <mesh>
        <boxGeometry args={[0.16, 0.77, 0.97]} />
        {red}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.17, 0.46, 0]} rotation={[Math.PI / 2, 0, s * 0.5]} scale={[1, 0.55, 1]}>
          <torusGeometry args={[0.17, 0.05, 16, 40]} />
          {red}
        </mesh>
      ))}
    </group>
  );
};

const CardFan: React.FC<{ tex: THREE.Texture[]; back: THREE.Texture; open: number }> = ({ tex, back, open }) => (
  <group position={[0, -0.1, 0]}>
    {tex.map((t, i) => (
      <group key={i} position={[(i - 1) * 0.42 * open, 0.12 * open * (i === 1 ? 1 : 0), (i === 1 ? 0.05 : 0) - Math.abs(i - 1) * 0.02]} rotation={[0, (i - 1) * -0.25 * open, (i - 1) * -0.22 * open]}>
        <Card tex={t} back={back} w={0.72} />
      </group>
    ))}
  </group>
);

const Scene: React.FC<{ F: number; tex: Record<string, THREE.Texture>; face: THREE.Texture }> = ({ F, tex, face }) => {
  const cards = [tex['card_gengar.png'], tex['card_pikachu.png'], tex['card_arceus.png']];
  const signupEnd = ACT.signup.from + ACT.signup.dur;

  // --- the pack's rise (sign-up act): spiral up out of the light, one full turn in real 3D
  const r = prog(F, RISE.from, RISE.to, RISE.ease);
  const packTurn = mix(-2 * Math.PI, 0, prog(F, RISE.from, RISE.to - f60(4), E.outSoft)); // one full turn: more breaks the blur speed ceiling
  // It grows on its own, earlier curve, so it is full size before the contact (growing into the
  // landing doubled the edge speed past the blur ceiling).
  const grow = prog(F, RISE.from, RISE.to - f60(14), E.out);
  const packSq = squash(F - RISE.to);
  const punch = 1 + 0.05 * hitPulse(F - RISE.to, 2, 10);
  // The pack tears open once it has landed: the seal peels and flies off, then the three cards slide
  // up out of the opening and spread into an orbit round it.
  const tear = prog(F, CUE.tear, CUE.tear + f60(40), E.inOut);
  const cardsOut = prog(F, CUE.tear + f60(12), CUE.tear + f60(48), E.out);
  const packTop = mix(RISE_Y, LENS_Y, r) + 1.0;

  // --- the carousel (offers act)
  const pos = TURNS.reduce((s, t) => s + prog(F, t.from, t.to, t.ease), 0);
  const ringIn = prog(F, signupEnd - f60(30), signupEnd, E.smooth); // the ring forms as the act changes
  const R = 2.2;
  const fall = prog(F, FALL.from, FALL.to, FALL.ease);
  const giftSq = squash(F - CUE.gift);
  // The gift rests on the ring like the others; only as its turn comes round does it lift, then drop onto the light.
  const giftDrop = 1 - prog(F, turnAt(2), turnAt(2) + f60(30), E.smooth) * (1 - fall);
  // Two shakes after it lands (a decaying wobble with small hops), as if something inside wants out.
  const rattle = (t: number) => (t > 0 && t < f60(50) ? Math.sin((t / f60(9)) * Math.PI * 2) * Math.exp(-t / f60(16)) : 0);
  const shakeAt = [CUE.gift + f60(24), CUE.gift + f60(78)];
  const giftShake = shakeAt.reduce((a, s) => a + 0.16 * rattle(F - s), 0);
  const giftHop = shakeAt.reduce((a, s) => a + 0.06 * Math.abs(rattle(F - s)), 0);
  const fan = spr(F, CUE.fan - f60(6), SPR.soft);
  const life = F / 60; // slow self-rotation of every prize

  // --- the lockup: the ring rises behind the brand
  const up = prog(F, CUE.markIn - f60(20), CUE.markIn + f60(50), E.inOut);

  // --- camera: circles the pack as it lands; drifts round the ring; settles for the lockup
  const yaw =
    F < signupEnd
      ? mix(-0.55, 0.35, prog(F, RISE.from, signupEnd, E.inOut))
      : mix(0.35, 0, prog(F, signupEnd, signupEnd + f60(60), E.inOut)) + 0.1 * Math.sin((F - signupEnd) / 90);
  // Low enough that the back of the ring hides behind the front prize instead of peeking over it.
  const camH = F < signupEnd ? mix(-0.6, 0.45, prog(F, RISE.from, RISE.to, E.out)) : mix(0.45, 0.2, prog(F, signupEnd, signupEnd + f60(40), E.smooth));
  const lit = burn(F);

  const showPackAlone = F >= RISE.from && F < signupEnd;
  // The hand-off to the carousel: over the act's last 40 f the lone pack eases into the exact pose of
  // the ring's first prize (scale 0.72, its sway), so the ring can take it over with no jump and
  // there is never a second pack on screen.
  const toRing = prog(F, signupEnd - f60(40), signupEnd, E.inOut);
  const ringSway = (t: number) => Math.sin(t / 60) * 0.25;
  const showRing = F >= signupEnd - f60(30);

  // A prize on the ring: index j, its node; the ring turns so prize `pos` faces the camera.
  const ringItem = (j: number, node: React.ReactNode) => {
    const th = ((j - pos) * 2 * Math.PI) / 5;
    const lockR = lmix(1, 1.25, up);
    const x = Math.sin(th) * R * lockR;
    const z = Math.cos(th) * R * lockR - R * lockR; // the front prize sits at z = 0, on the lens
    const y = LENS_Y + up * 1.75;
    const k = mix(1, 0.38, up);
    return (
      <group key={j} position={[x, y, z]} scale={k * (j === 0 ? 1 : ringIn)}>
        {node}
      </group>
    );
  };

  return (
    <>
      <Camera yaw={yaw} h={camH} target={[0, LENS_Y, 0]} dist={DIST} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-3, 5, 6]} intensity={1.5} color={M.keyLight} />
      <directionalLight position={[3, 2, -4]} intensity={1.0} color={M.rimLight} />
      {/* The pumpkin's light, from below and in front: warm, flickering with the flame. */}
      <pointLight position={[0, PUMPKIN_Y, 2.2]} intensity={8 * lit} distance={9} decay={1.6} color={M.pumpkin} />

      {showPackAlone && (
        <group position={[0, mix(RISE_Y, LENS_Y, r), 0]} rotation={[0, packTurn + toRing * ringSway(signupEnd), mix(-0.14, -0.05, r)]} scale={[lmix(0.45, 1, grow) * packSq.across * punch * mix(1, 0.72, toRing), lmix(0.45, 1, grow) * packSq.along * punch * mix(1, 0.72, toRing), mix(1, 0.72, toRing)]}>
          <Pack tex={tex['pack.png']} tear={tear} />
        </group>
      )}
      {showPackAlone &&
        cards.map((t, i) => {
          const th = ((F - RISE.from) * 2 * Math.PI) / f60(150) + (i * 2 * Math.PI) / 3;
          const fold = 1 - prog(F, signupEnd - f60(40), signupEnd - f60(4), E.in);
          const rr = 1.15 * cardsOut * fold;
          return (
            <group key={i} position={[Math.sin(th) * rr, mix(packTop - 0.25, mix(RISE_Y, LENS_Y, r) - 0.3 + Math.sin(th * 2) * 0.15, cardsOut), Math.cos(th) * rr - 0.06 * (1 - cardsOut)]} rotation={[0, (th + Math.PI / 2) * cardsOut, 0.15 * cardsOut]} scale={mix(0.55, 1, cardsOut) * Math.min(1, cardsOut * 6) * fold}>
              <Card tex={t} back={tex['card_back.png']} />
            </group>
          );
        })}

      {showRing && (
        <>
          {/* every prize sized to about the pack's height, so the front one always reads as the hero */}
          {F >= signupEnd && ringItem(0, <group rotation={[0, ringSway(F), -0.05]} scale={0.72}><Pack tex={tex['pack.png']} tear={1} /></group>)}
          {ringItem(1, <group scale={1.3}><CoinStack face={face} spin={life * 0.6} /></group>)}
          {ringItem(2, <group scale={1.15}><GoldBars spin={-0.3 + life * 0.5} /></group>)}
          {ringItem(3, <group scale={1.05}><Gift spin={0.5 + life * 0.4} drop={giftDrop} sq={giftSq} shake={giftShake} hop={giftHop} /></group>)}
          {ringItem(4, <group rotation={[0, Math.sin(life * 0.8) * 0.3, 0]} scale={1.2}><CardFan tex={cards} back={tex['card_back.png']} open={fan} /></group>)}
        </>
      )}
    </>
  );
};

const FILES = ['pack.png', 'card_gengar.png', 'card_pikachu.png', 'card_arceus.png', 'card_back.png'];

export const Stage3D: React.FC<{ abs: number }> = ({ abs }) => {
  const tex = useTextures(FILES);
  const face = useMemo(coinFace, []);
  if (!tex || abs < RISE.from) return null;
  return (
    <ThreeCanvas
      width={W}
      height={H}
      style={{ position: 'absolute', left: 0, top: 0 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      camera={{ fov: FOV, near: 0.1, far: 100, position: [0, 0, DIST] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping; // a filmic curve greyed the printed pack and cards
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Room />
      <Scene F={abs} tex={tex} face={face} />
    </ThreeCanvas>
  );
};

