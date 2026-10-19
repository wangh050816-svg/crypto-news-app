import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { M } from '../brand/tokens';
import { burn, LENS } from '../acts/Night';
import { E, hitPulse, lmix, mix, prog, spr, SPR, squash } from '../lib/anim';
import { ACT, CUE, f60, H, W } from '../timeline';
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

/** A room to reflect: gives gold and foil their highlights. */
const Room: React.FC = () => {
  const { gl, scene } = useThree();
  // Built during render, not in an effect: every frame is rendered once, so an environment set
  // after the first paint would miss the captured frame (the gold rendered black).
  const env = useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const t = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    return t;
  }, [gl]);
  scene.environment = env;
  scene.environmentIntensity = 1.2;
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

/** The pack: a gently bent foil sheet, printed both sides. */
const packGeometry = (w: number, h: number) => {
  const g = new THREE.PlaneGeometry(w, h, 24, 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) / (w / 2);
    p.setZ(i, -0.09 * x * x); // pillow bend across its width
  }
  g.computeVertexNormals();
  return g;
};

const Pack: React.FC<{ tex: THREE.Texture; k?: number }> = ({ tex, k = 1 }) => {
  const w = 1.13 * k;
  const h = 2.28 * k;
  const geo = useMemo(() => packGeometry(w, h), [w, h]);
  return (
    <group>
      <mesh geometry={geo}>
        <meshPhysicalMaterial map={tex} alphaTest={0.5} metalness={0.45} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.4} side={THREE.FrontSide} />
      </mesh>
      <mesh geometry={geo} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial map={tex} alphaTest={0.5} color={M.packBack} metalness={0.6} roughness={0.35} envMapIntensity={1.2} side={THREE.FrontSide} />
      </mesh>
    </group>
  );
};

const Card: React.FC<{ tex: THREE.Texture; back: THREE.Texture; w?: number }> = ({ tex, back, w = 0.62 }) => (
  <group>
    <mesh>
      <planeGeometry args={[w, w * 1.396]} />
      <meshPhysicalMaterial map={tex} roughness={0.25} metalness={0.2} clearcoat={1} clearcoatRoughness={0.1} iridescence={0.6} envMapIntensity={1.2} side={THREE.FrontSide} />
    </mesh>
    <mesh rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[w, w * 1.396]} />
      <meshPhysicalMaterial map={back} roughness={0.3} metalness={0.15} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.1} />
    </mesh>
  </group>
);

const CoinStack: React.FC<{ face: THREE.Texture; spin: number }> = ({ face, spin }) => {
  const side = <meshStandardMaterial attach="material-0" color={GOLD} metalness={1} roughness={0.32} />;
  const cap = (n: number) => <meshStandardMaterial attach={`material-${n}`} map={face} metalness={1} roughness={0.28} />;
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
  const mat = <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} envMapIntensity={1.5} />;
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

const Gift: React.FC<{ spin: number; drop: number; sq: { along: number; across: number } }> = ({ spin, drop, sq }) => {
  const red = <meshPhysicalMaterial color={M.ribbon} roughness={0.38} metalness={0.05} clearcoat={0.6} envMapIntensity={0.7} />;
  return (
    <group position={[0, (1 - drop) * 0.6, 0]} scale={[sq.across, sq.along, sq.across]} rotation={[0.08, spin + (1 - drop) * 0.6, 0]}>
      <mesh>
        <boxGeometry args={[0.95, 0.75, 0.95]} />
        <meshStandardMaterial color={M.giftBox} roughness={0.7} envMapIntensity={0.6} />
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
  const packSq = squash(F - RISE.to);
  const punch = 1 + 0.05 * hitPulse(F - RISE.to, 2, 10);
  const orbitR = prog(F, RISE.from, RISE.to + f60(20), E.out);

  // --- the carousel (offers act)
  const pos = TURNS.reduce((s, t) => s + prog(F, t.from, t.to, t.ease), 0);
  const ringIn = prog(F, signupEnd - f60(30), signupEnd, E.smooth); // the ring forms as the act changes
  const R = 2.2;
  const fall = prog(F, FALL.from, FALL.to, FALL.ease);
  const giftSq = squash(F - CUE.gift);
  const fan = spr(F, CUE.fan - f60(6), SPR.soft);
  const life = F / 60; // slow self-rotation of every prize

  // --- the lockup: the ring rises behind the brand
  const up = prog(F, CUE.markIn - f60(20), CUE.markIn + f60(50), E.inOut);

  // --- camera: circles the pack as it lands; drifts round the ring; settles for the lockup
  const yaw =
    F < signupEnd
      ? mix(-0.55, 0.35, prog(F, RISE.from, signupEnd, E.inOut))
      : mix(0.35, 0, prog(F, signupEnd, signupEnd + f60(60), E.inOut)) + 0.1 * Math.sin((F - signupEnd) / 90);
  const camH = F < signupEnd ? mix(-0.6, 0.9, prog(F, RISE.from, RISE.to, E.out)) : mix(0.9, 0.55, prog(F, signupEnd, signupEnd + f60(40), E.smooth));
  const lit = burn(F);

  const showPackAlone = F >= RISE.from && F < signupEnd;
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
      <group key={j} position={[x, y, z]} scale={k * mix(0.6, 1, ringIn)}>
        {node}
      </group>
    );
  };

  return (
    <>
      <Camera yaw={yaw} h={camH} target={[0, LENS_Y, 0]} dist={DIST} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-3, 5, 6]} intensity={2.2} color={M.keyLight} />
      <directionalLight position={[3, 2, -4]} intensity={1.4} color={M.rimLight} />
      {/* The pumpkin's light, from below and in front: warm, flickering with the flame. */}
      <pointLight position={[0, PUMPKIN_Y, 2.2]} intensity={14 * lit} distance={9} decay={1.6} color={M.pumpkin} />

      {showPackAlone && (
        <group position={[0, mix(PUMPKIN_Y, LENS_Y, r), 0]} rotation={[0, packTurn, mix(-0.14, -0.05, r)]} scale={[lmix(0.45, 1, r) * packSq.across * punch, lmix(0.45, 1, r) * packSq.along * punch, 1]}>
          <Pack tex={tex['pack.png']} />
        </group>
      )}
      {showPackAlone &&
        cards.map((t, i) => {
          const th = ((F - RISE.from) * 2 * Math.PI) / f60(150) + (i * 2 * Math.PI) / 3;
          const fold = 1 - prog(F, signupEnd - f60(40), signupEnd - f60(4), E.in);
          const rr = 1.15 * orbitR * fold;
          return (
            <group key={i} position={[Math.sin(th) * rr, mix(PUMPKIN_Y, LENS_Y, r) - 0.3 + Math.sin(th * 2) * 0.15, Math.cos(th) * rr]} rotation={[0, th + Math.PI / 2, 0.15]} scale={mix(0.3, 1, orbitR) * fold}>
              <Card tex={t} back={tex['card_back.png']} />
            </group>
          );
        })}

      {showRing && (
        <>
          {/* every prize sized to about the pack's height, so the front one always reads as the hero */}
          {ringItem(0, <group rotation={[0, Math.sin(life) * 0.25, -0.05]} scale={0.72}><Pack tex={tex['pack.png']} /></group>)}
          {ringItem(1, <group scale={1.3}><CoinStack face={face} spin={life * 0.6} /></group>)}
          {ringItem(2, <group scale={1.15}><GoldBars spin={-0.3 + life * 0.5} /></group>)}
          {ringItem(3, <group scale={1.05}><Gift spin={0.5 + life * 0.4} drop={F < FALL.from ? 0 : fall} sq={giftSq} /></group>)}
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
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Room />
      <Scene F={abs} tex={tex} face={face} />
    </ThreeCanvas>
  );
};

