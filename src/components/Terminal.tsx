import { useState } from 'react';

interface TerminalProps {
  children: React.ReactNode;
}

export function Terminal({ children }: TerminalProps) {
  const [isMaximized, setIsMaximized] = useState(true);

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 flex items-center justify-center">
      <div
        className={`w-full bg-[var(--theme-shell-bg)] rounded-lg shadow-2xl border border-[var(--theme-shell-border)] shell-spring ${
          isMaximized ? 'max-w-[1280px]' : 'max-w-[896px] scale-[0.992]'
        }`}
        style={{ backdropFilter: 'blur(2px)' }}
      >
        {/* Terminal Header */}
        <div className="bg-[var(--theme-shell-header)] rounded-t-lg px-4 py-2.5 flex items-center justify-between border-b border-[var(--theme-shell-border)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button
                className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--theme-close)' }}
                aria-label="Close"
              />
              <button
                className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--theme-minimize)' }}
                aria-label="Minimize"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--theme-maximize)' }}
                aria-label="Maximize"
              />
            </div>
            <span className="ml-4 text-[var(--theme-accent)] text-sm font-mono">
              portfolio@swe:~$ [{isMaximized ? 'max' : 'float'}]
            </span>
          </div>
          <div className="text-[var(--theme-text-dim)] text-sm font-mono">
            zsh
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
