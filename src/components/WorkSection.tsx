export function WorkSection() {
  const experience = [
    {
      role: 'AI Engineer Intern',
      organization: 'Vantaca',
      location: 'Wilmington, NC',
      period: 'May 2026 - Jul 2026',
      highlights: [
        'Contributed to VantacaCore, a production SaaS platform used by HOA communities nationwide',
        'Built features for a multi-owner migration platform (ASP.NET Core, Azure Functions, React/Vite, PostgreSQL) to convert legacy single-owner records using AI-assisted name resolution and transactional push pipelines',
        'Triaged and resolved production issues in legacy .NET services and improved code health by working through full Azure DevOps + SonarQube PR review cycles'
      ],
      techStack: ['ASP.NET Core', 'Azure Functions', 'React', 'Vite', 'PostgreSQL', '.NET Framework', 'Azure DevOps', 'SonarQube', 'Agile Development']
    },
    {
      role: 'Lead Software Engineer',
      organization: 'Neurotech at NCSU',
      location: 'Raleigh, NC',
      period: 'Sep 2025 - Present',
      highlights: [
        'Lead the software roadmap for BCI projects, coordinating engineers across neurotech applications',
        'Design machine learning and signal-processing pipelines to denoise EEG input and classify actionable wave patterns',
        'Drive development of a switch-accessible AAC application with eye-tracking support for users with severe motor impairments',
        'Coordinate with industry partners on high-fidelity EEG integrations for robotics and neuro-feedback projects'
      ],
      techStack: ['Python', 'PyTorch', 'OpenCV', 'Signal Processing', 'EEG', 'ML Classification', 'Plan-Driven Development']
    }
  ];

  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> cat work.log
      </div>
      <div className="pl-4 space-y-6">
        {experience.map((entry, index) => (
          <div
            key={index}
            className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a]"
          >
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <div>
                <h3 className="text-[#00ff00]">{entry.role}</h3>
                <p className="text-[#a6e3a1]">
                  {entry.organization} | {entry.location}
                </p>
              </div>
              <span className="text-[#0099ff]">{entry.period}</span>
            </div>
            <ul className="mt-3 space-y-2 text-[#e0e0e0]">
              {entry.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex} className="flex items-start gap-2">
                  <span className="text-[#00ff00] mt-1">-</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {entry.techStack.map((tech, techIndex) => (
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
        <div className="text-[#666] text-sm">
          <p># notable: br41n.io BCI Hackathon (3rd Place + highest concept grade)</p>
          <p># notable: cofoundr Hackathon (Most Sustainable Product)</p>
        </div>
      </div>
    </div>
  );
}