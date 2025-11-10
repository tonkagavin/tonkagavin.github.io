import { ExternalLink, Github } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      name: 'cageintel',
      description: 'An AI-powered UFC analysis platform used to predict fight outcomes and analyze fighter performance',
      tech: ['PyTorch', 'BeautifulSoup', 'Requests', 'Pandas', 'Flask'],
      github: null,
      demo: 'https://youtu.be/poRiRbA5QB0'
    },
    {
      name: 'space-invaders-game',
      description: 'Simple top-down space invaders game built with pygame',
      tech: ['Python', 'pygame'],
      github: 'https://github.com/tonkagavin/space-invaders',
      demo: null
    },
    {
      name: 'password-manager',
      description: 'Password manager built with SQL database and Python tech stack (which I am currently trying to recover 😓)',
      tech: ['Python', 'MySQL', 'Tkinter'],
      github: null,
      demo: null
    },
    {
      name: 'email-spam-classifier',
      description: 'A personal project designed for a former employer to classify emails as spam or not spam.',
      tech: ['Python', 'Requests', 'Tkinter'],
      github: null,
      demo: null
    }
  ];

  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> ls -la projects/
      </div>
      <div className="pl-4 space-y-4">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a] hover:border-[#00ff00] transition-colors"
          >
            <div className="flex items-start justify-between flex-wrap gap-2">
              <h3 className="text-[#00ff00]">{project.name}/</h3>
              <div className="flex gap-2">
                {project.github && (
                  <a 
                    href={project.github}
                    target = "_blank"
                    rel = "noopener noreferrer"
                    className="text-[#0099ff] hover:text-[#00ff00] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target = "_blank"
                    rel = "noopener noreferrer"
                    className="text-[#0099ff] hover:text-[#00ff00] transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-[#e0e0e0] mt-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="text-xs px-2 py-1 bg-[#2a2a2a] text-[#a6e3a1] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
