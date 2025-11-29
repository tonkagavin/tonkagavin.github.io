export function EducationSection() {
  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> ls -la education/
      </div>
      <div className="pl-4 space-y-6">
        <div className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a]">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
            <h3 className="text-[#00ff00]">North Carolina State University</h3>
            <span className="text-[#0099ff]">Expected Graduation Winter 2026 loading...</span>
          </div>
          <p className="text-[#a6e3a1]">Bachelor of Science in Computer Science | Minor in Philosophy & Economics</p>
          <div className="mt-3">
            <p className="text-[#666]">Relevant Coursework:</p>
            <ul className="list-disc list-inside text-[#e0e0e0] mt-1 space-y-1">
              <li>Data Structures & Algorithms</li>
              <li>C & Software Tools</li>
              <li>Software Fundamentals & Lab</li>
              <li>Discrete Math</li>
              <li>Automata, Grammars, and Computability</li>
              <li> Calculus 1, 2, & 3</li>
              <li> Physics 1 & 2</li>
              <li> Probabilities and Statistics for Engineers </li>
            </ul>
          </div>
        </div>

        <div className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a]">
          <h3 className="text-[#00ff00] mb-2">Certifications & Awards</h3>
          <ul className="space-y-2 text-[#e0e0e0]">
            <li className="flex items-center gap-2">
              <span className="text-[#00ff00]">✓</span>
              North Carolina Academic Scholar
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00ff00]">✓</span>
              Microsoft Technology Associate: Introduction to Programming Using Python 
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00ff00]">✓</span>
              NAFTRACK Computer Systems & Networking certified
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00ff00]">✓</span>
              SoloLearn Certificate of Completion: HTML Fundamentals Course
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00ff00]">✓</span>
              Completed Oracle Cloud Infrastructure Foundations Course
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
