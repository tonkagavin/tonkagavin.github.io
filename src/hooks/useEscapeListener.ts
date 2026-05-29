import { useEffect } from 'react';
import { useEasterEgg } from '../context/EasterEggContext';

export function useEscapeListener() {
  const { activeEgg, exitEgg } = useEasterEgg();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeEgg) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        exitEgg();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        exitEgg();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEgg, exitEgg]);
}
