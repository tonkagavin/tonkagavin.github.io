import { useState } from 'react';
import { Terminal } from './components/Terminal';
import { TerminalPrompt } from './components/TerminalPrompt';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WorkSection } from './components/WorkSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const tabs = [
    { id: 'about', label: 'about.txt', command: 'cat about.txt' },
    { id: 'education', label: 'education/', command: 'ls education/' },
    { id: 'projects', label: 'projects/', command: 'ls projects/' },
    { id: 'work', label: 'work.log', command: 'cat work.log' },
    { id: 'resume', label: 'resume.pdf', command: 'open resume.pdf' },
    { id: 'contact', label: 'contact.sh', command: './contact.sh' }
  ];

  const [activeTab, setActiveTab] = useState('about');

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
          <div className="text-[#00ff00] mb-2">
            Welcome to my Portfolio!
          </div>
          <div className="text-[#666] text-sm">
            Type or click on the tabs below to navigate.
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
                  ? 'bg-[#00ff00] text-black'
                  : 'bg-[#2a2a2a] text-[#00ff00] hover:bg-[#3a3a3a] border border-[#3a3a3a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Terminal Prompt */}
        <TerminalPrompt 
          command={tabs.find(t => t.id === activeTab)?.command || ''} 
        />

        {/* Content Area */}
        <div className="min-h-[400px] pb-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-[#2a2a2a] pt-4 mt-8">
          <div className="text-[#666] text-sm font-mono text-center">
            Built with React + TypeScript + Tailwind CSS | © 2025 | Gavin McKay
          </div>
        </div>
      </div>
    </Terminal>
  );
}
