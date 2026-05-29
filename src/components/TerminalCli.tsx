import { useEffect, useMemo, useRef, useState } from 'react';
import { useEasterEgg } from '../context/EasterEggContext';
import { THEMES, type ThemeName, useTheme } from '../context/ThemeContext';

type TabEntry = {
  id: string;
  label: string;
  command: string;
};

type CliLineKind = 'input' | 'output' | 'error' | 'system';

type CliLine = {
  id: number;
  kind: CliLineKind;
  prompt?: string;
  text: string;
};

interface TerminalCliProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  tabs: TabEntry[];
}

const URL_PATTERN = /(https?:\/\/[^\s]+|\/[A-Za-z0-9._/-]+\.(?:pdf|docx|txt))/g;

const SECTION_DIRS = ['about', 'education', 'projects', 'work', 'resume', 'contact'] as const;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tokenize(text: string) {
  return text.match(/\S+\s*/g) ?? [text];
}

function resolvePath(rawPath: string) {
  if (rawPath === '~') {
    return '~';
  }
  return rawPath.startsWith('~/') ? rawPath : `~/${rawPath}`;
}

function pathToEntries(path: string, homeEntries: string[]) {
  if (path === '~') {
    return homeEntries;
  }

  const section = path.replace(/^~\//, '');
  if (SECTION_DIRS.includes(section as (typeof SECTION_DIRS)[number])) {
    return ['README.md'];
  }

  return [];
}

function LinkifiedText({ text }: { text: string }) {
  const segments = text.split(URL_PATTERN);

  return (
    <>
      {segments.map((segment, index) => {
        const isUrl = /^https?:\/\//.test(segment);
        const isResumePath = /^\/[A-Za-z0-9._/-]+\.(pdf|docx|txt)$/.test(segment);

        if (!isUrl && !isResumePath) {
          return <span key={`txt-${index}`}>{segment}</span>;
        }

        return (
          <a
            key={`url-${index}`}
            href={segment}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 text-[var(--theme-secondary)] hover:text-[var(--theme-accent)]"
          >
            {segment}
          </a>
        );
      })}
    </>
  );
}

export function TerminalCli({ activeTab, setActiveTab, tabs }: TerminalCliProps) {
  const { activeEgg, activateEgg, exitEgg } = useEasterEgg();
  const { theme, setTheme } = useTheme();

  const [currentPath, setCurrentPath] = useState('~');
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<CliLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const lineIdRef = useRef(0);
  const interruptRef = useRef(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const promptPrefix = useMemo(
    () => `gavin@portfolio:${currentPath.replace('~', '~')}$`,
    [currentPath]
  );
  const homeEntries = useMemo(() => tabs.map((tab) => tab.label), [tabs]);
  const fileToTab = useMemo(
    () =>
      tabs.reduce<Record<string, string>>((acc, tab) => {
        acc[tab.label] = tab.id;
        return acc;
      }, {}),
    [tabs]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (activeTab === 'about') {
      setCurrentPath('~');
      return;
    }

    if (SECTION_DIRS.includes(activeTab as (typeof SECTION_DIRS)[number])) {
      setCurrentPath(`~/${activeTab}`);
    }
  }, [activeTab]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, [lines, isStreaming]);

  const prediction = useMemo(() => {
    if (!input) {
      return null;
    }

    for (let index = commandHistory.length - 1; index >= 0; index -= 1) {
      const candidate = commandHistory[index];
      if (candidate.startsWith(input) && candidate !== input) {
        return candidate;
      }
    }

    return null;
  }, [commandHistory, input]);

  const predictionRemainder = prediction ? prediction.slice(input.length) : '';

  const createLine = (kind: CliLineKind, text: string, prompt?: string) => {
    lineIdRef.current += 1;
    const line: CliLine = {
      id: lineIdRef.current,
      kind,
      text,
      prompt,
    };
    setLines((prev) => [...prev, line]);
    return line.id;
  };

  const appendToLine = (lineId: number, token: string) => {
    setLines((prev) =>
      prev.map((line) => (line.id === lineId ? { ...line, text: `${line.text}${token}` } : line))
    );
  };

  const streamLine = async (text: string, kind: CliLineKind = 'output') => {
    const lineId = createLine(kind, '');
    setIsStreaming(true);
    const tokens = tokenize(text);

    for (const token of tokens) {
      if (interruptRef.current) {
        setIsStreaming(false);
        return false;
      }
      appendToLine(lineId, token);
      await sleep(16 + Math.random() * 28);
    }

    setIsStreaming(false);
    return true;
  };

  const streamLines = async (texts: string[], kind: CliLineKind = 'output') => {
    for (const text of texts) {
      const completed = await streamLine(text, kind);
      if (!completed) {
        return false;
      }
    }
    return true;
  };

  const handleCd = async (target?: string) => {
    if (!target || target === '~') {
      setCurrentPath('~');
      await streamLine('Moved to home directory: ~');
      return;
    }

    if (target === '..') {
      setCurrentPath('~');
      await streamLine('Moved up to: ~');
      return;
    }

    const normalized = target.replace(/^~\//, '').replace(/\/$/, '');
    if (SECTION_DIRS.includes(normalized as (typeof SECTION_DIRS)[number])) {
      setCurrentPath(resolvePath(normalized));
      setActiveTab(normalized);
      await streamLine(`Entered directory: ~/${normalized} (tab switched)`);
      return;
    }

    await streamLine(`cd: no such file or directory: ${target}`, 'error');
  };

  const handleFileOpen = async (fileArg?: string) => {
    if (!fileArg) {
      await streamLine('open: missing file operand', 'error');
      return;
    }

    const tab = fileToTab[fileArg];
    if (!tab) {
      await streamLine(`open: cannot open '${fileArg}'`, 'error');
      return;
    }

    setActiveTab(tab);
    if (tab !== 'about') {
      setCurrentPath(`~/${tab}`);
    }
    await streamLine(`Opened ${fileArg} -> switched to ${tab} tab.`);
  };

  const executeCommand = async (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      return;
    }

    interruptRef.current = false;
    createLine('input', trimmed, promptPrefix);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);

    const [command, ...args] = trimmed.split(/\s+/);
    const lowerCommand = command.toLowerCase();
    const argString = args.join(' ');

    const triggerBackgroundAnimation = (animationCommand: 'doit' | 'special') => {
      window.dispatchEvent(
        new CustomEvent('bg-animation-command', {
          detail: { command: animationCommand },
        })
      );
    };

    if (lowerCommand === 'help') {
      await streamLines([
        'Commands: help, ls, pwd, cd <dir>, open <file>, cat <file>, theme <name>, themes, matrix, dino, doit, special, clear, exit',
        'Examples: cd projects, open resume.pdf, theme nord, doit',
        'Links: https://github.com/tonkagavin | https://ncsuneurotech.org | /McKay_Gavin_Resume.pdf',
      ]);
      return;
    }

    if (lowerCommand === 'pwd') {
      await streamLine(currentPath);
      return;
    }

    if (lowerCommand === 'ls') {
      const entries = pathToEntries(currentPath, homeEntries);
      if (!entries.length) {
        await streamLine('(empty)');
      } else {
        await streamLine(entries.join('  '));
      }
      return;
    }

    if (lowerCommand === 'cd') {
      await handleCd(args[0]);
      return;
    }

    if (lowerCommand === 'open' || lowerCommand === 'cat') {
      await handleFileOpen(args[0]);
      return;
    }

    if (lowerCommand === 'themes') {
      await streamLine(`Available themes: ${THEMES.join(', ')}`);
      return;
    }

    if (lowerCommand === 'theme') {
      const requested = argString.trim().toLowerCase();
      if (!requested) {
        await streamLine(`Current theme: ${theme}. Available: ${THEMES.join(', ')}`);
        return;
      }

      if (THEMES.includes(requested as ThemeName)) {
        setTheme(requested as ThemeName);
        await streamLine(`Theme switched to ${requested}.`);
      } else {
        await streamLine(
          `Unknown theme: ${requested}. Try one of: ${THEMES.join(', ')}`,
          'error'
        );
      }
      return;
    }

    if (lowerCommand === 'matrix') {
      activateEgg('matrix');
      await streamLine('Launching matrix rain. Press Escape, Ctrl+C, or type exit to return.');
      return;
    }

    if (lowerCommand === 'dino') {
      activateEgg('dino');
      await streamLine('Launching dino mode. Press Escape, Ctrl+C, or type exit to return.');
      return;
    }

    if (lowerCommand === 'doit') {
      triggerBackgroundAnimation('doit');
      await streamLine(
        'Running full animation showcase sequence (Naruto, Sasuke, projectiles, and clash).'
      );
      return;
    }

    if (lowerCommand === 'special') {
      triggerBackgroundAnimation('special');
      await streamLine(
        'Triggering special clash animation (very rare event): Rasengan vs Chidori with Amaterasu.'
      );
      return;
    }

    if (lowerCommand === 'exit') {
      if (activeEgg) {
        exitEgg();
        await streamLine('Exited easter egg mode.');
      } else {
        await streamLine('No active easter egg process.');
      }
      return;
    }

    if (lowerCommand === 'clear') {
      setLines([]);
      return;
    }

    await streamLine(`Command not found: ${trimmed}`, 'error');
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (isStreaming) {
      return;
    }

    const commandToRun = input;
    setInput('');
    await executeCommand(commandToRun);
  };

  const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const hasSuggestion = Boolean(prediction);
    const cursorAtEnd =
      event.currentTarget.selectionStart === event.currentTarget.value.length &&
      event.currentTarget.selectionEnd === event.currentTarget.value.length;

    if (hasSuggestion && cursorAtEnd && (event.key === 'Tab' || event.key === 'ArrowRight')) {
      event.preventDefault();
      setInput(prediction as string);
      setHistoryIndex(null);
      requestAnimationFrame(() => {
        if (inputRef.current) {
          const end = (prediction as string).length;
          inputRef.current.setSelectionRange(end, end);
        }
      });
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      interruptRef.current = true;
      if (activeEgg) {
        exitEgg();
      }
      setIsStreaming(false);
      createLine('system', '^C');
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) {
        return;
      }

      const nextIndex =
        historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commandHistory.length || historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="space-y-3 font-mono border border-[var(--theme-shell-border)] rounded p-3 bg-black/20">
      <div
        ref={scrollerRef}
        className="max-h-52 overflow-y-auto pr-2 space-y-1 text-sm"
        aria-live="polite"
      >
        {lines.length === 0 && (
          <p className="text-[var(--theme-text-dim)]">
            Run <span className="text-[var(--theme-highlight)]">help</span> to see commands.
          </p>
        )}

        {lines.map((line) => {
          const colorClass =
            line.kind === 'error'
              ? 'text-[var(--theme-danger)]'
              : line.kind === 'system'
                ? 'text-[var(--theme-tertiary)]'
                : 'text-[var(--theme-highlight)]';

          return (
            <div key={line.id} className="leading-relaxed break-words">
              {line.kind === 'input' && line.prompt && (
                <span className="text-[var(--theme-accent)] mr-2">{line.prompt}</span>
              )}
              <span className={colorClass}>
                <LinkifiedText text={line.text} />
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 text-sm md:text-base">
        <span className="text-[var(--theme-accent)]">gavin@portfolio</span>
        <span className="text-[var(--theme-secondary)]">:</span>
        <span className="text-[var(--theme-tertiary)]">{currentPath}</span>
        <span className="text-white">$</span>
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-0 whitespace-pre text-[var(--theme-highlight)]">
            <span className="invisible">{input}</span>
            {predictionRemainder && (
              <span className="opacity-[0.35] text-[var(--theme-text-dim)]">{predictionRemainder}</span>
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKeyDown}
            className="relative z-10 w-full bg-transparent text-[var(--theme-highlight)] outline-none border-none"
            placeholder={
              isStreaming
                ? 'streaming output... press Ctrl+C to interrupt'
                : 'type a command (help)'
            }
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
          />
        </div>
      </form>
    </div>
  );
}
