import { createContext, useContext, useMemo, useState } from 'react';

export type EasterEggType = 'matrix' | 'dino' | null;

interface EasterEggContextType {
  activeEgg: EasterEggType;
  activateEgg: (egg: EasterEggType) => void;
  exitEgg: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

interface EasterEggProviderProps {
  children: React.ReactNode;
}

export function EasterEggProvider({ children }: EasterEggProviderProps) {
  const [activeEgg, setActiveEgg] = useState<EasterEggType>(null);

  const value = useMemo<EasterEggContextType>(
    () => ({
      activeEgg,
      activateEgg: (egg) => setActiveEgg(egg),
      exitEgg: () => setActiveEgg(null),
    }),
    [activeEgg]
  );

  return <EasterEggContext.Provider value={value}>{children}</EasterEggContext.Provider>;
}

export function useEasterEgg() {
  const context = useContext(EasterEggContext);

  if (!context) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }

  return context;
}
