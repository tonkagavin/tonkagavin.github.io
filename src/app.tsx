import { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WorkSection } from './components/WorkSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { TerminalCli } from './components/TerminalCli';
import { EasterEggOverlay } from './components/EasterEggOverlay';
import { AnimatedBackgroundLayer } from './components/AnimatedBackgroundLayer';
import { EasterEggProvider } from './context/EasterEggContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useEscapeListener } from './hooks/useEscapeListener';

function AppContent() {
  useEscapeListener();
  const { theme } = useTheme();

  const tabs = [
    { id: 'about', label: 'about.txt', command: 'cat about.txt' },
    { id: 'education', label: 'education/', command: 'ls education/' },
    { id: 'projects', label: 'projects/', command: 'ls projects/' },
    { id: 'work', label: 'work.log', command: 'cat work.log' },
    { id: 'resume', label: 'resume.pdf', command: 'open resume.pdf' },
    { id: 'contact', label: 'contact.sh', command: './contact.sh' }
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && tabs.some(t => t.id == savedTab))
      return savedTab;
    return 'about';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'education':
        return <EducationSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'work':
        return <WorkSection />;
      case 'resume':
        return <ResumeSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <Terminal>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="font-mono">
          <div className="text-[var(--theme-accent)] mb-2">
            Welcome to my Portfolio!
          </div>
          <div className="text-[var(--theme-text-dim)] text-sm">
            Type or click on the tabs below to navigate. Active theme: {theme}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--theme-accent)] text-black'
                  : 'bg-[var(--theme-shell-border)] text-[var(--theme-accent)] hover:opacity-90 border border-[var(--theme-shell-border)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TerminalCli activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        {/* Content Area */}
        <div className="min-h-[400px] pb-8">
          <div key={activeTab} className="shell-content-spring">
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--theme-shell-border)] pt-4 mt-8">
          <div className="text-[var(--theme-text-dim)] text-sm font-mono text-center">
            Built with React + TypeScript + Tailwind CSS | © 2026 | Gavin McKay
          </div>
        </div>
      </div>
    </Terminal>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <EasterEggProvider>
        <AnimatedBackgroundLayer />
        <EasterEggOverlay />
        <div className="relative z-10">
          <AppContent />
        </div>
      </EasterEggProvider>
    </ThemeProvider>
  );
}
