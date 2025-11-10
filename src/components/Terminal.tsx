import { useState } from 'react';

interface TerminalProps {
  children: React.ReactNode;
}

export function Terminal({ children }: TerminalProps) {
  const [isMaximized, setIsMaximized] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 flex items-center justify-center">
      <div 
        className={`bg-[#1a1a1a] rounded-lg shadow-2xl border border-[#2a2a2a] transition-all duration-300 ${
          isMaximized ? 'w-full max-w-7xl' : 'w-full max-w-4xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="bg-[#252525] rounded-t-lg px-4 py-2.5 flex items-center justify-between border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button 
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
                aria-label="Close"
              />
              <button 
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"
                aria-label="Minimize"
              />
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"
                aria-label="Maximize"
              />
            </div>
            <span className="ml-4 text-[#00ff00] text-sm font-mono">
              portfolio@swe:~$
            </span>
          </div>
          <div className="text-[#666] text-sm font-mono">
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
