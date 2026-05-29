import { useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=<>!?ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘ';
const FONT_SIZE = 16;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let frameId = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const getAccentColor = () => {
      const root = getComputedStyle(document.documentElement);
      return root.getPropertyValue('--theme-accent').trim() || '#00ff00';
    };

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.max(1, Math.floor(width / FONT_SIZE));
      drops = Array.from({ length: columns }, () => Math.random() * -30);
    };

    const drawFrame = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.08)';
      context.fillRect(0, 0, width, height);
      context.font = `${FONT_SIZE}px monospace`;
      context.fillStyle = getAccentColor();

      for (let i = 0; i < columns; i += 1) {
        const text = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        if (y > -FONT_SIZE) {
          context.fillText(text, x, y);
        }

        const resetThreshold = height / FONT_SIZE;
        const resetChance = Math.random();
        if (drops[i] > resetThreshold && resetChance > 0.975) {
          drops[i] = Math.random() * -20;
        } else {
          drops[i] += 0.75 + Math.random() * 0.6;
        }
      }

      frameId = window.requestAnimationFrame(drawFrame);
    };

    setCanvasSize();
    frameId = window.requestAnimationFrame(drawFrame);
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none bg-black"
      aria-hidden="true"
    />
  );
}
