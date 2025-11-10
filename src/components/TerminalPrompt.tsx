import { useEffect, useState } from 'react';

interface TerminalPromptProps {
  command: string;
  delay?: number;
}

export function TerminalPrompt({ command, delay = 0 }: TerminalPromptProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (delay > 0) {
      timeout = setTimeout(() => {
        setDisplayText(command);
      }, delay);
    } else {
      setDisplayText(command);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [command, delay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm md:text-base mb-6">
      <span className="text-[#00ff00]">gavin@portfolio</span>
      <span className="text-[#0099ff]">:</span>
      <span className="text-[#9d7cd8]">~</span>
      <span className="text-white">$ </span>
      <span className="text-[#a6e3a1]">{displayText}</span>
      {showCursor && <span className="text-white bg-white/80 ml-0.5">▋</span>}
    </div>
  );
}
