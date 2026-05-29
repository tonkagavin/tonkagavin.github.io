import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
};

type ActionKind =
  | 'narutoRun'
  | 'sasukeRunChidori'
  | 'narutoRasenshuriken'
  | 'sasukeFireball'
  | 'clash';

type SpriteKind = 'naruto' | 'sasuke';

type RunnerState = {
  active: boolean;
  kind: SpriteKind;
  x: number;
  y: number;
  speed: number;
  scale: number;
  frameIndex: number;
  frameTimerMs: number;
  direction: 1 | -1;
  renderAbove: boolean;
};

type ProjectileState = {
  active: boolean;
  type: 'rasenshuriken' | 'fireball';
  x: number;
  y: number;
  vx: number;
  ageMs: number;
  renderAbove: boolean;
};

type ClashState = {
  active: boolean;
  phase: 'approach' | 'jump' | 'hold' | 'flash';
  leftX: number;
  rightX: number;
  y: number;
  leftY: number;
  rightY: number;
  speed: number;
  scale: number;
  frameTimerMs: number;
  frameIndex: number;
  jumpMs: number;
  holdMs: number;
  jumpStartLeftX: number;
  jumpStartRightX: number;
  jumpStartY: number;
  flashMs: number;
};

type AnimationCommandDetail = {
  command: 'doit' | 'special';
};

const PIXEL_COLORS: Record<string, string> = {
  h: '#f7cf5f', // naruto hair
  s: '#f5c89f', // skin
  r: '#ef4444', // sage eye makeup
  o: '#f97316', // orange outfit
  b: '#111827', // dark outfit
  w: '#e5e7eb', // highlights
  g: '#67e8f9', // rasengan/chidori glow
  c: '#e0f2fe', // energy core
  p: '#05070d', // sasuke hair (long/black)
  k: '#0a0b10', // akatsuki robe base
  q: '#b91c1c', // akatsuki cloud red
  u: '#fecaca', // cloud outline/highlight
  n: '#0b0b0f', // amaterasu black flames
};

const NARUTO_FRAMES = [
  [
    '................',
    '................',
    '.........hhh....',
    '........hhwh....',
    '.......hhsss....',
    '..ggc..hrrss....',
    '..gcc...ssss....',
    '...bbbbooooo....',
    '..bbbboooobbb...',
    '...bbboooobbb...',
    '....b..ooo..bb..',
    '...bb...o...bb..',
    '..bb........bb..',
    '...b..........b.',
    '................',
    '................',
  ],
  [
    '................',
    '................',
    '........hhhh....',
    '.......hhwsh....',
    '.......hhsss....',
    '..ggc..hrrss....',
    '..gcc...ssss....',
    '..bbbboooooo....',
    '...bbboooobbb...',
    '....bbooobbbb...',
    '...bb..ooo...b..',
    '..bb....o...bb..',
    '...bb.......bb..',
    '....b........b..',
    '................',
    '................',
  ],
  [
    '................',
    '................',
    '.........hhh....',
    '........hhwh....',
    '.......hhsss....',
    '...ggc.hrrss....',
    '..ggc....ssss...',
    '..bbbbooooooo...',
    '...bbboooobbb...',
    '....bbooobbbb...',
    '.....b.ooo..bb..',
    '...bbb..o....b..',
    '..bb........bb..',
    '.bb..........b..',
    '................',
    '................',
  ],
  [
    '................',
    '................',
    '........hhhh....',
    '.......hhwsh....',
    '......hhssss....',
    '..ggc..hrrss....',
    '..gcc....sss....',
    '...bbbbooooo....',
    '..bbbboooobbb...',
    '...bbbooobbbb...',
    '..bb...ooo...b..',
    '...bb...o...bb..',
    '....bb......bb..',
    '.....b.......b..',
    '................',
    '................',
  ],
] as const;

const SASUKE_FRAMES = [
  [
    '................',
    '................',
    '.......ppppp....',
    '......pppwppp...',
    '......ppssssp...',
    '....ggcsssspp...',
    '....gccsssspp...',
    '....kkkkkkkk....',
    '...kkqkuqqkkk...',
    '..kkkquqkqqkk...',
    '...kkqkqqkqkk...',
    '..bbb..kkk..bb..',
    '.bbb....k....bb.',
    '..bb....k....bb.',
    '...b.........b..',
    '................',
    '................',
  ],
  [
    '................',
    '................',
    '........ppppp...',
    '.......pppwppp..',
    '......ppsssspp..',
    '.....ggcsssspp..',
    '.....gccsssspp..',
    '....kkkkkkkkk...',
    '...kkqkuqqkkk...',
    '..kkkquqkqqkk...',
    '...kkqkqqkqkk...',
    '..bbb...kkk..bb.',
    '.bbb.....k...bb.',
    '..bb.....k...bb.',
    '...b.........b..',
    '................',
    '................',
  ],
  [
    '................',
    '................',
    '.......pppppp...',
    '......pppwpppp..',
    '......ppsssspp..',
    '....ggcsssspp...',
    '....gccsssspp...',
    '...kkkkkkkkkk...',
    '..kkkqkuqqkkk...',
    '...kkquqkqqkk...',
    '..kkkqkqqkqkk...',
    '.bbb....kkk..bb.',
    '..bb......k..bb.',
    '..bb......k...b.',
    '...b..........b.',
    '................',
    '................',
  ],
] as const;

const NARUTO_CLASH_JUMP_FRAMES = [
  [
    '................',
    '................',
    '.........hhh....',
    '........hhwh....',
    '.......hhsss....',
    '..ggc..hrrss....',
    '..gcc...ssss....',
    '...bbbbooooo....',
    '..bbbboooobbb...',
    '...bbboooobbb...',
    '....b..ooo..bb..',
    '...bb...o...bb..',
    '....bb.....bb...',
    '.....bb...bb....',
    '......bb.bb.....',
    '................',
  ],
  [
    '................',
    '................',
    '.........hhh....',
    '........hhwh....',
    '.......hhsss....',
    '..ggc..hrrss....',
    '..gcc...ssss....',
    '...bbbbooooo....',
    '..bbbboooobbb...',
    '...bbboooobbb...',
    '....b..ooo..bb..',
    '....bb..o..bb...',
    '.....bb...bb....',
    '......bb.bb.....',
    '.......bbb......',
    '................',
  ],
] as const;

const SASUKE_CLASH_JUMP_FRAMES = [
  [
    '................',
    '................',
    '.......ppppp....',
    '......pppwppp...',
    '......ppssssp...',
    '....ggcsssspp...',
    '....gccsssspp...',
    '....kkkkkkkk....',
    '...kkqkuqqkkk...',
    '..kkkquqkqqkk...',
    '...kkqkqqkqkk...',
    '..bbb..kkk..bb..',
    '...bb...k..bb...',
    '....bb....bb....',
    '.....bb..bb.....',
    '......bbbb......',
    '................',
  ],
  [
    '................',
    '................',
    '.......ppppp....',
    '......pppwppp...',
    '......ppssssp...',
    '....ggcsssspp...',
    '....gccsssspp...',
    '....kkkkkkkk....',
    '...kkqkuqqkkk...',
    '..kkkquqkqqkk...',
    '...kkqkqqkqkk...',
    '..bbb..kkk..bb..',
    '....bb..k..bb...',
    '.....bb...bb....',
    '......bb.bb.....',
    '.......bbb......',
    '................',
  ],
] as const;

const NARUTO_CLASH_AIR_FRAME = [
  '................',
  '................',
  '.........hhh....',
  '........hhwh....',
  '.......hhsss....',
  '...ggc.hrrss....',
  '..ggc....ssss...',
  '..bbbbooooooo...',
  '...bbboooobbb...',
  '....bbooobbbb...',
  '.....b.ooo...b..',
  '....bb..o..bb...',
  '....bb.....bb...',
  '.....bb...bb....',
  '......bb.bb.....',
  '................',
] as const;

const SASUKE_CLASH_AIR_FRAME = [
  '................',
  '................',
  '.......pppppp...',
  '......pppwpppp..',
  '......ppsssspp..',
  '....ggcsssspp...',
  '....gccsssspp...',
  '...kkkkkkkkkk...',
  '..kkkqkuqqkkk...',
  '...kkquqkqqkk...',
  '..kkkqkqqkqkk...',
  '.bbb....kkk..bb.',
  '..bb.....k..bb..',
  '...bb....k.bb...',
  '....bb....bb....',
  '.....bbbbbb.....',
  '................',
] as const;

const NARUTO_CLASH_CONTACT_FRAME = [
  '................',
  '................',
  '.........hhh....',
  '........hhwh....',
  '.......hhsss....',
  '.....ggchrrss...',
  '....ggc...ssss..',
  '...bbbbooooooo..',
  '..bbbboooobbbb..',
  '...bbboooobbbb..',
  '....b..oooo..bb.',
  '....bb..o....bb.',
  '....bb.....bb...',
  '.....bb...bb....',
  '......bb.bb.....',
  '................',
] as const;

const SASUKE_CLASH_CONTACT_FRAME = [
  '................',
  '................',
  '.......pppppp...',
  '......pppwpppp..',
  '......ppsssspp..',
  '...ggcsssspp....',
  '..ggc..sssspp...',
  '..kkkkkkkkkkk...',
  '.kkkqkuqqkkkk...',
  '..kkquqkqqkkk...',
  '.kkkqkqqkqkk....',
  '..bb..kkkk...bb.',
  '...bb..k....bb..',
  '....bb.....bb..',
  '.....bbbbbbb....',
  '................',
] as const;

const PARTICLE_COUNT = 60;
const FRAME_SWITCH_MS = 72;
const ACTION_GAP_MIN = 2800;
const ACTION_GAP_MAX = 7600;
const PROJECTILE_GAP_MIN = 9000;
const PROJECTILE_GAP_MAX = 16000;
const CLASH_GAP_MIN = 70000;
const CLASH_GAP_MAX = 130000;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(0.8, 2.3),
    speed: randomBetween(8, 38),
    alpha: randomBetween(0.1, 0.45),
  }));
}

function drawPixelSprite(
  ctx: CanvasRenderingContext2D,
  frame: readonly string[],
  baseX: number,
  baseY: number,
  pixelSize: number,
  flipX = false
) {
  const frameWidth = frame[0]?.length ?? 0;

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    for (let x = 0; x < row.length; x += 1) {
      const token = row[x];
      if (token === '.') {
        continue;
      }
      const color = PIXEL_COLORS[token];
      if (!color) {
        continue;
      }

      const drawX = flipX ? baseX + (frameWidth - 1 - x) * pixelSize : baseX + x * pixelSize;
      ctx.fillStyle = color;
      ctx.fillRect(drawX, baseY + y * pixelSize, pixelSize, pixelSize);
    }
  }
}

function findEnergyAnchor(frame: readonly string[]) {
  let totalX = 0;
  let totalY = 0;
  let count = 0;

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    for (let x = 0; x < row.length; x += 1) {
      const token = row[x];
      if (token === 'c' || token === 'g') {
        totalX += x;
        totalY += y;
        count += 1;
      }
    }
  }

  if (!count) {
    return null;
  }

  return { x: totalX / count, y: totalY / count };
}

function drawEnergyOrb(
  ctx: CanvasRenderingContext2D,
  frame: readonly string[],
  baseX: number,
  baseY: number,
  pixelSize: number,
  flipX: boolean,
  colorOuter: string,
  colorInner: string
) {
  const anchor = findEnergyAnchor(frame);
  if (!anchor) {
    return;
  }

  const frameWidth = frame[0]?.length ?? 0;
  const anchorX = flipX ? frameWidth - 1 - anchor.x : anchor.x;
  const centerX = baseX + (anchorX + 0.5) * pixelSize;
  const centerY = baseY + (anchor.y + 0.5) * pixelSize;
  const radius = Math.max(2.6, pixelSize * 1.25);

  ctx.save();
  ctx.globalAlpha = 0.46;
  ctx.fillStyle = colorOuter;
  ctx.shadowColor = colorOuter;
  ctx.shadowBlur = radius * 3.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = colorInner;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getEnergyCenter(
  frame: readonly string[],
  baseX: number,
  baseY: number,
  pixelSize: number,
  flipX: boolean
) {
  const anchor = findEnergyAnchor(frame);
  if (!anchor) {
    return null;
  }
  const frameWidth = frame[0]?.length ?? 0;
  const anchorX = flipX ? frameWidth - 1 - anchor.x : anchor.x;
  return {
    x: baseX + (anchorX + 0.5) * pixelSize,
    y: baseY + (anchor.y + 0.5) * pixelSize,
  };
}

function drawChidoriShocks(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  ageMs: number
) {
  ctx.save();
  ctx.shadowColor = '#60a5fa';
  ctx.shadowBlur = size * 0.9;
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = Math.max(1.2, size * 0.14);
  const shocks = 6;
  for (let i = 0; i < shocks; i += 1) {
    const base = ageMs * 0.015 + i * ((Math.PI * 2) / shocks);
    const length = size * (1.1 + 0.45 * Math.sin(ageMs * 0.03 + i));
    const bend = size * 0.33 * Math.cos(ageMs * 0.02 + i);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(base + 0.25) * (length * 0.45), centerY + Math.sin(base) * (length * 0.45));
    ctx.lineTo(centerX + Math.cos(base - 0.4) * length + bend * 0.15, centerY + Math.sin(base + 0.2) * length);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRasenshuriken(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  spin: number,
  size: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.shadowColor = '#7dd3fc';
  ctx.shadowBlur = size * 1.8;

  // Wind spikes
  for (let i = 0; i < 4; i += 1) {
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = 'rgba(125, 211, 252, 0.85)';
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.8);
    ctx.lineTo(size * 0.35, -size * 0.2);
    ctx.lineTo(-size * 0.35, -size * 0.2);
    ctx.closePath();
    ctx.fill();
  }

  // Core
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.82, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFireball(ctx: CanvasRenderingContext2D, x: number, y: number, ageMs: number, size: number) {
  const flicker = Math.sin(ageMs * 0.02) * size * 0.12;
  ctx.save();
  ctx.shadowColor = '#fb923c';
  ctx.shadowBlur = size * 2.2;
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(x, y, size + flicker, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.arc(x, y, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Animated flame tongues for directional/moving fire effect.
  for (let i = 0; i < 5; i += 1) {
    const angle = ageMs * 0.012 + i * 1.25;
    const reach = size * (1.1 + 0.3 * Math.sin(ageMs * 0.03 + i));
    const fx = x + Math.cos(angle) * reach;
    const fy = y + Math.sin(angle) * reach;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(251,146,60,0.85)' : 'rgba(254,215,170,0.7)';
    ctx.beginPath();
    ctx.arc(fx, fy, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawAmaterasu(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.shadowColor = '#7f1d1d';
  ctx.shadowBlur = size * 2.2;
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6;
    const fx = x + Math.cos(angle) * size * 0.7;
    const fy = y + Math.sin(angle) * size * 0.7;
    ctx.fillStyle = i % 2 === 0 ? '#000000' : '#111111';
    ctx.beginPath();
    ctx.arc(fx, fy, size * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function randomActionByWeight(): ActionKind {
  const roll = Math.random();
  if (roll < 0.34) return 'narutoRun';
  if (roll < 0.68) return 'sasukeRunChidori';
  if (roll < 0.84) return 'narutoRasenshuriken';
  return 'sasukeFireball';
}

function nextDelayFor(action: ActionKind) {
  if (action === 'clash') {
    return randomBetween(CLASH_GAP_MIN, CLASH_GAP_MAX);
  }
  if (action === 'narutoRasenshuriken' || action === 'sasukeFireball') {
    return randomBetween(PROJECTILE_GAP_MIN, PROJECTILE_GAP_MAX);
  }
  return randomBetween(ACTION_GAP_MIN, ACTION_GAP_MAX);
}

export function AnimatedBackgroundLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlayCanvas.getContext('2d');
    if (!ctx || !overlayCtx) {
      return;
    }

    let rafId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let lastTimestamp = performance.now();
    let currentAction: ActionKind | null = null;
    let actionTimeMs = 0;
    let nextSpawnInMs = randomBetween(ACTION_GAP_MIN, ACTION_GAP_MAX);
    let nextClashInMs = randomBetween(CLASH_GAP_MIN, CLASH_GAP_MAX);
    const forcedQueue: ActionKind[] = [];
    let balancedActionBag: ActionKind[] = [];

    const runner: RunnerState = {
      active: false,
      kind: 'naruto',
      x: -250,
      y: 0,
      speed: 190,
      scale: 2,
      frameIndex: 0,
      frameTimerMs: 0,
      direction: 1,
      renderAbove: false,
    };

    const projectile: ProjectileState = {
      active: false,
      type: 'rasenshuriken',
      x: 0,
      y: 0,
      vx: 0,
      ageMs: 0,
      renderAbove: false,
    };

    const clash: ClashState = {
      active: false,
      phase: 'approach',
      leftX: 0,
      rightX: 0,
      y: 0,
      leftY: 0,
      rightY: 0,
      speed: 240,
      scale: 3,
      frameTimerMs: 0,
      frameIndex: 0,
      jumpMs: 0,
      holdMs: 0,
      jumpStartLeftX: 0,
      jumpStartRightX: 0,
      jumpStartY: 0,
      flashMs: 0,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      overlayCanvas.width = Math.floor(width * ratio);
      overlayCanvas.height = Math.floor(height * ratio);
      overlayCanvas.style.width = `${width}px`;
      overlayCanvas.style.height = `${height}px`;
      overlayCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles = buildParticles(width, height);
    };

    const initRunner = (kind: SpriteKind, action: ActionKind) => {
      runner.active = true;
      runner.kind = kind;
      runner.scale = Math.round(randomBetween(2, 4));
      runner.direction = Math.random() > 0.5 ? 1 : -1;
      runner.renderAbove = Math.random() > 0.65;
      const spriteWidth = 16 * runner.scale;
      runner.x =
        runner.direction === 1
          ? -spriteWidth - randomBetween(10, 180)
          : width + randomBetween(10, 180);
      runner.y = randomBetween(height * 0.12, height * 0.86);
      runner.speed =
        action === 'narutoRasenshuriken' || action === 'sasukeFireball'
          ? randomBetween(150, 220)
          : randomBetween(120, 250);
      runner.frameIndex = 0;
      runner.frameTimerMs = 0;
      projectile.active = false;
    };

    const initClash = () => {
      clash.active = true;
      clash.scale = Math.round(randomBetween(3, 4));
      clash.leftX = -16 * clash.scale - 40;
      clash.rightX = width + 40;
      clash.y = randomBetween(height * 0.3, height * 0.68);
      clash.leftY = clash.y;
      clash.rightY = clash.y;
      clash.speed = randomBetween(260, 360);
      clash.frameTimerMs = 0;
      clash.frameIndex = 0;
      clash.jumpMs = 0;
      clash.holdMs = 0;
      clash.jumpStartLeftX = clash.leftX;
      clash.jumpStartRightX = clash.rightX;
      clash.jumpStartY = clash.y;
      clash.phase = 'approach';
      clash.flashMs = 0;
    };

    const refillActionBag = () => {
      balancedActionBag = shuffle<ActionKind>([
        'narutoRun',
        'sasukeRunChidori',
        'narutoRun',
        'sasukeRunChidori',
        'narutoRasenshuriken',
        'sasukeFireball',
      ]);
    };

    const pickBalancedAction = (): ActionKind => {
      if (!balancedActionBag.length) {
        refillActionBag();
      }
      return balancedActionBag.pop() ?? randomActionByWeight();
    };

    const startAction = (action: ActionKind) => {
      currentAction = action;
      actionTimeMs = 0;

      if (action === 'narutoRun') {
        initRunner('naruto', action);
        return;
      }
      if (action === 'sasukeRunChidori') {
        initRunner('sasuke', action);
        return;
      }
      if (action === 'narutoRasenshuriken') {
        initRunner('naruto', action);
        return;
      }
      if (action === 'sasukeFireball') {
        initRunner('sasuke', action);
        return;
      }
      initClash();
    };

    const finishAction = (action: ActionKind) => {
      currentAction = null;
      runner.active = false;
      projectile.active = false;
      clash.active = false;
      nextSpawnInMs = forcedQueue.length ? 450 : nextDelayFor(action);
      if (action === 'clash') {
        nextClashInMs = randomBetween(CLASH_GAP_MIN, CLASH_GAP_MAX);
      }
    };

    const triggerCommandAction = (command: AnimationCommandDetail['command']) => {
      if (command === 'special') {
        forcedQueue.push('clash');
        return;
      }
      forcedQueue.push(
        'narutoRun',
        'sasukeRunChidori',
        'narutoRasenshuriken',
        'sasukeFireball',
        'clash'
      );
    };

    const onAnimationCommand = (event: Event) => {
      const customEvent = event as CustomEvent<AnimationCommandDetail>;
      if (!customEvent.detail) {
        return;
      }
      triggerCommandAction(customEvent.detail.command);
      if (!currentAction) {
        nextSpawnInMs = 0;
      }
    };

    const drawParticles = (deltaSeconds: number, accent: string) => {
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.y += particle.speed * deltaSeconds;
        if (particle.y > height + particle.radius) {
          particle.y = -particle.radius;
          particle.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.fillStyle = accent;
        ctx.globalAlpha = particle.alpha;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawRunner = (deltaMs: number) => {
      if (!runner.active || !currentAction) {
        return false;
      }

      runner.x += (runner.speed * deltaMs * runner.direction) / 1000;
      runner.frameTimerMs += deltaMs;
      if (runner.frameTimerMs >= FRAME_SWITCH_MS) {
        const frameSet = runner.kind === 'naruto' ? NARUTO_FRAMES : SASUKE_FRAMES;
        runner.frameIndex = (runner.frameIndex + 1) % frameSet.length;
        runner.frameTimerMs = 0;
      }

      const frameSet = runner.kind === 'naruto' ? NARUTO_FRAMES : SASUKE_FRAMES;
      const currentFrame = frameSet[runner.frameIndex];
      const runnerCtx = runner.renderAbove ? overlayCtx : ctx;
      const flipX = runner.direction === -1;

      drawPixelSprite(runnerCtx, currentFrame, runner.x, runner.y, runner.scale, flipX);

      if (runner.kind === 'naruto') {
        drawEnergyOrb(
          runnerCtx,
          currentFrame,
          runner.x,
          runner.y,
          runner.scale,
          flipX,
          '#38bdf8',
          '#7dd3fc'
        );
      } else {
        drawEnergyOrb(
          runnerCtx,
          currentFrame,
          runner.x,
          runner.y,
          runner.scale,
          flipX,
          '#3b82f6',
          '#93c5fd'
        );
        const chidoriCenter = getEnergyCenter(
          currentFrame,
          runner.x,
          runner.y,
          runner.scale,
          flipX
        );
        if (chidoriCenter) {
          drawChidoriShocks(
            runnerCtx,
            chidoriCenter.x,
            chidoriCenter.y,
            runner.scale * 1.2,
            actionTimeMs
          );
        }
      }

      // Launch projectile after a short buildup in projectile actions.
      if (!projectile.active && actionTimeMs > 900) {
        if (currentAction === 'narutoRasenshuriken') {
          projectile.active = true;
          projectile.type = 'rasenshuriken';
          projectile.ageMs = 0;
          projectile.renderAbove = runner.renderAbove;
          projectile.vx = 380 * runner.direction;
          projectile.x = runner.x + (runner.direction === 1 ? 16 * runner.scale : 0);
          projectile.y = runner.y + 6 * runner.scale;
        } else if (currentAction === 'sasukeFireball') {
          projectile.active = true;
          projectile.type = 'fireball';
          projectile.ageMs = 0;
          projectile.renderAbove = runner.renderAbove;
          projectile.vx = 340 * runner.direction;
          projectile.x = runner.x + (runner.direction === 1 ? 15 * runner.scale : 1 * runner.scale);
          projectile.y = runner.y + 6 * runner.scale;
        }
      }

      const outOfBounds =
        (runner.direction === 1 && runner.x > width + 16 * runner.scale + 160) ||
        (runner.direction === -1 && runner.x < -16 * runner.scale - 160);
      return outOfBounds;
    };

    const drawProjectile = (deltaMs: number, timestamp: number) => {
      if (!projectile.active) {
        return false;
      }

      projectile.x += (projectile.vx * deltaMs) / 1000;
      projectile.ageMs += deltaMs;

      const pCtx = projectile.renderAbove ? overlayCtx : ctx;
      if (projectile.type === 'rasenshuriken') {
        drawRasenshuriken(pCtx, projectile.x, projectile.y, timestamp * 0.022, 8);
      } else {
        drawFireball(pCtx, projectile.x, projectile.y, projectile.ageMs, 9);
      }

      if (projectile.x < -120 || projectile.x > width + 120) {
        projectile.active = false;
        return true;
      }
      return false;
    };

    const drawClash = (deltaMs: number) => {
      if (!clash.active) {
        return false;
      }

      const cCtx = overlayCtx;
      clash.frameTimerMs += deltaMs;
      if (clash.frameTimerMs >= FRAME_SWITCH_MS) {
        clash.frameIndex = (clash.frameIndex + 1) % Math.min(NARUTO_FRAMES.length, SASUKE_FRAMES.length);
        clash.frameTimerMs = 0;
      }

      const leftMeetX = width * 0.5 - 14 * clash.scale;
      const rightMeetX = width * 0.5 + 2 * clash.scale;
      const jumpDurationMs = 320;
      const holdDurationMs = 220;
      const jumpHeight = 34 * clash.scale;
      let jumpProgress = 0;

      if (clash.phase === 'approach') {
        clash.leftX += (clash.speed * deltaMs) / 1000;
        clash.rightX -= (clash.speed * deltaMs) / 1000;
        clash.leftY = clash.y;
        clash.rightY = clash.y;
        if (clash.rightX - clash.leftX <= 120) {
          clash.phase = 'jump';
          clash.jumpMs = 0;
          clash.jumpStartLeftX = clash.leftX;
          clash.jumpStartRightX = clash.rightX;
          clash.jumpStartY = clash.y;
        }
      } else if (clash.phase === 'jump') {
        clash.jumpMs += deltaMs;
        const t = Math.min(1, clash.jumpMs / jumpDurationMs);
        jumpProgress = t;
        clash.leftX = clash.jumpStartLeftX + (leftMeetX - clash.jumpStartLeftX) * t;
        clash.rightX = clash.jumpStartRightX + (rightMeetX - clash.jumpStartRightX) * t;
        const arc = Math.sin(Math.PI * t) * jumpHeight;
        clash.leftY = clash.jumpStartY - arc;
        clash.rightY = clash.jumpStartY - arc;
        if (t >= 1) {
          clash.phase = 'hold';
          clash.holdMs = holdDurationMs;
          clash.leftY = clash.y;
          clash.rightY = clash.y;
        }
      } else if (clash.phase === 'hold') {
        clash.leftX = leftMeetX;
        clash.rightX = rightMeetX;
        clash.leftY = clash.y;
        clash.rightY = clash.y;
        clash.holdMs -= deltaMs;
        if (clash.holdMs <= 0) {
          clash.phase = 'flash';
          clash.flashMs = 420;
        }
      }

      let narutoFrame: readonly string[];
      let sasukeFrame: readonly string[];
      if (clash.phase === 'jump') {
        if (jumpProgress > 0.72) {
          narutoFrame = NARUTO_CLASH_AIR_FRAME;
          sasukeFrame = SASUKE_CLASH_AIR_FRAME;
        } else {
          const jumpFrameIndex = jumpProgress < 0.5 ? 0 : 1;
          narutoFrame = NARUTO_CLASH_JUMP_FRAMES[jumpFrameIndex];
          sasukeFrame = SASUKE_CLASH_JUMP_FRAMES[jumpFrameIndex];
        }
      } else if (clash.phase === 'hold' || clash.phase === 'flash') {
        narutoFrame = NARUTO_CLASH_CONTACT_FRAME;
        sasukeFrame = SASUKE_CLASH_CONTACT_FRAME;
      } else {
        narutoFrame = NARUTO_FRAMES[clash.frameIndex];
        sasukeFrame = SASUKE_FRAMES[clash.frameIndex % SASUKE_FRAMES.length];
      }
      drawPixelSprite(cCtx, narutoFrame, clash.leftX, clash.leftY, clash.scale, false);
      drawPixelSprite(cCtx, sasukeFrame, clash.rightX, clash.rightY, clash.scale, true);
      drawEnergyOrb(cCtx, narutoFrame, clash.leftX, clash.leftY, clash.scale, false, '#38bdf8', '#7dd3fc');
      drawEnergyOrb(cCtx, sasukeFrame, clash.rightX, clash.rightY, clash.scale, true, '#3b82f6', '#93c5fd');
      const clashChidoriCenter = getEnergyCenter(
        sasukeFrame,
        clash.rightX,
        clash.rightY,
        clash.scale,
        true
      );
      if (clashChidoriCenter) {
        drawChidoriShocks(
          cCtx,
          clashChidoriCenter.x,
          clashChidoriCenter.y,
          clash.scale * 1.2,
          actionTimeMs
        );
      }

      // const leftOrbX = clash.leftX + 10 * clash.scale;
      const orbY = clash.leftY + 6 * clash.scale;
      const rightOrbX = clash.rightX + 6 * clash.scale;
      drawAmaterasu(cCtx, rightOrbX, orbY, clash.scale * 0.7);

      if (clash.phase === 'flash' && clash.flashMs > 0) {
        clash.flashMs -= deltaMs;
        overlayCtx.save();
        overlayCtx.globalAlpha = 1;
        overlayCtx.fillStyle = '#ffffff';
        overlayCtx.fillRect(0, 0, width, height);
        overlayCtx.restore();
        if (clash.flashMs <= 0) {
          return true;
        }
      }

      if (clash.leftX > width + 120) {
        return true;
      }
      return false;
    };

    const frame = (timestamp: number) => {
      const deltaMs = Math.min(48, timestamp - lastTimestamp);
      const deltaSeconds = deltaMs / 1000;
      lastTimestamp = timestamp;
      actionTimeMs += deltaMs;

      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue('--theme-accent').trim() || '#00ff00';
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const particleColor =
        activeTheme === 'hackerman'
          ? accent
          : styles.getPropertyValue('--theme-secondary').trim() || accent;
      const dim = styles.getPropertyValue('--theme-text-dim').trim() || '#6b7280';

      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, width, height);
      overlayCtx.clearRect(0, 0, width, height);

      ctx.strokeStyle = dim;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y + ((timestamp * 0.004) % 18));
        ctx.lineTo(width, y + ((timestamp * 0.004) % 18));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      drawParticles(deltaSeconds, particleColor);

      if (!currentAction) {
        nextClashInMs -= deltaMs;
        nextSpawnInMs -= deltaMs;

        if (nextClashInMs <= 0 && forcedQueue.length === 0) {
          startAction('clash');
        } else if (nextSpawnInMs <= 0) {
          const forced = forcedQueue.shift();
          startAction(forced ?? pickBalancedAction());
        }
      } else if (currentAction === 'clash') {
        if (drawClash(deltaMs)) {
          finishAction('clash');
        }
      } else {
        const runnerFinished = drawRunner(deltaMs);
        const projectileFinished = drawProjectile(deltaMs, timestamp);

        if (runnerFinished || (projectileFinished && actionTimeMs > 1300)) {
          finishAction(currentAction);
        }
      }

      rafId = window.requestAnimationFrame(frame);
    };

    resize();
    rafId = window.requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('bg-animation-command', onAnimationCommand as EventListener);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('bg-animation-command', onAnimationCommand as EventListener);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
      <canvas
        ref={overlayCanvasRef}
        className="fixed inset-0 z-30 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
