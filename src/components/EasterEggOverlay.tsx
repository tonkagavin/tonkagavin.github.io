import { useEasterEgg } from '../context/EasterEggContext';
import { MatrixRain } from './MatrixRain';

export function EasterEggOverlay() {
  const { activeEgg, exitEgg } = useEasterEgg();

  if (!activeEgg) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {activeEgg === 'matrix' && <MatrixRain />}

      {activeEgg === 'dino' && (
        <div className="fixed inset-0 z-40 bg-black flex items-center justify-center font-mono text-[#00ff00]">
          dino mode coming soon...
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 font-mono">
        <button
          type="button"
          onClick={exitEgg}
          className="px-3 py-2 rounded border bg-black/70 transition-colors"
          style={{
            borderColor: 'var(--theme-accent)',
            color: 'var(--theme-accent)',
          }}
        >
          [ESC] Exit
        </button>
        <p
          className="text-xs bg-black/70 px-2 py-1 rounded border"
          style={{
            borderColor: 'var(--theme-shell-border)',
            color: 'var(--theme-highlight)',
          }}
        >
          Press Escape, Ctrl+C, or type 'exit' to return
        </p>
      </div>
    </div>
  );
}
