const ArchLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="#1793d1" // Arch Blue
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1.5-12.5l-3 6h1.5l1-2h3l1 2h1.5l-3-6h-1.5zm.5 4l1-2 1 2h-2z" />
  </svg>
);

export function AboutSection() {
  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> cat about.txt
      </div>
      <div className="pl-4 text-[#e0e0e0] space-y-3 leading-relaxed">
        <p>
          <span className="text-[#00ff00]">Name:</span> Gavin McKay
        </p>
        <p>
          <span className="text-[#00ff00]">Role:</span> AI Intern @ Vantaca
        </p>
        <p>
          <span className="text-[#00ff00]">Location:</span> Wimington, NC
        </p>
        <p>
          <span className="text-[#00ff00]">Idols:</span> LeBron James, Napoleon Bonaparte, Linus Torvalds, Georg Wilhelm Friedrich Hegel
        </p>
        <p className="mt-4">
          I&apos;m a Computer Science student at NC State building production software and applied AI systems. Currently, I am interning as an AI Engineer at Vantaca and contributing to migration tooling for a live SaaS platform.
        </p>
        <p>
          I also lead software engineering for NC State Neurotech, where I build brain-computer interface applications and assistive tech systems that translate EEG signals into real-time, human-centered interactions.
        </p>
        <p>
          Recent highlights include 3rd place (plus highest concept grade) at the br41n.io BCI Hackathon and Most Sustainable Product at cofoundr for a health-tech MVP.
        </p>
        <p>
          When I&apos;m not coding, you can find me tinkering with my custom-built PC (I use Arch btw <ArchLogo className="inline-block w-5 h-5 align-text-bottom" />),
          playing basketball, watching anime, reading philosophy, or practicing MMA.
        </p>
      </div>

      <div className="text-[#00ff00] pt-4">
        <span className="text-[#0099ff]">$</span> ls -R skills/
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 text-sm">
        <div>
          <span className="text-[#00ff00]">languages/</span>
          <p className="text-[#e0e0e0]">Python, Java, C, C++, C#, JavaScript, TypeScript, SQL, Bash, Assembly, HTML5/CSS3</p>
        </div>
        <div>
          <span className="text-[#00ff00]">ai_and_ml/</span>
          <p className="text-[#e0e0e0]">TensorFlow, PyTorch, OpenCV, Ollama, ML Algorithms, Data Modeling & Visualization</p>
        </div>
        <div>
          <span className="text-[#00ff00]">frameworks_web/</span>
          <p className="text-[#e0e0e0]">Angular, React Native, Node.js, Django, FastAPI, Flask, .NET, REST APIs, Tailwind CSS</p>
        </div>
        <div>
          <span className="text-[#00ff00]">devops_infra/</span>
          <p className="text-[#e0e0e0]">Docker, Kubernetes, Azure, CI/CD, Linux (Arch, Debian, Fedora), Git/GitHub, Oracle DB, MySQL</p>
        </div>
        <div>
          <span className="text-[#00ff00]">technical_engineering/</span>
          <p className="text-[#e0e0e0]">Agile Methodologies, Plan-Driven Development, Software Architecture, OOP, SDLC, Linux System Admin, Testing & QA, Database Design, Command Line Operations</p>
        </div>
      </div>
    </div>
  );
}