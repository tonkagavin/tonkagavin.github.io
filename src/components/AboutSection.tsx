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
          <span className="text-[#00ff00]">Role:</span> Software Engineer
        </p>
        <p>
          <span className="text-[#00ff00]">Location:</span> NC State University | Fayetteville, NC (user's commute location)
        </p>
        <p>
          <span className="text-[#00ff00]">Idols:</span> My [grand]parents, LeBron, Napoleon, Linus Torvalds
        </p>
        <p className="mt-4">
          Hello! I'm a passionate software engineer currently studying Computer Science at NC State University. 
          I specialize in building scalable applications and solving complex problems through code. 
          My interests include AI, ML, and software development.
        </p>
        <p>
          When I'm not coding, you can find me learning new technologies, tinkering with my custom-built PC,
          playing basketball, reading, watching movies, or practicing MMA!
        </p>
      </div>
      <div className="text-[#666] pt-2">
        <span className="text-[#00ff00]">Skills:</span> Git/GitHub, Docker, Oracle DB, MySQL, JavaScript, TypeScript, React Native, Node.js, Python, Java, C, C#, 
        Linux (Ubuntu, Arch, Kali, Debian, CentOS & Fedora (Red hat distro)), Django, FastAPI, .NET, Flask, HTML, CSS, Tailwind CSS
      </div>
    </div>
  );
}
