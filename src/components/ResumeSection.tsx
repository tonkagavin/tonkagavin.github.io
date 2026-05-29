import { Download, FileText } from 'lucide-react';

export function ResumeSection() {
  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> ./download-resume.sh
      </div>
      <div className="pl-4 space-y-6">
        <div className="border border-[#2a2a2a] rounded p-6 bg-[#1a1a1a] text-center">
          <FileText className="w-16 h-16 text-[#00ff00] mx-auto mb-4" />
          <h3 className="text-[#00ff00] mb-2">Resume</h3>
          <p className="text-[#e0e0e0] mb-4">
            Download my resume to learn more about my experience and qualifications.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/McKay_Gavin_Resume.pdf" download target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff00] text-black rounded hover:bg-[#00cc00] transition-colors">
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </button>
            </a>
            <a href="/McKay_Gavin_Resume.docx" download target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#00ff00] text-[#00ff00] rounded hover:bg-[#002b00] transition-colors">
                <Download className="w-4 h-4" />
                Download Resume (DOCX)
              </button>
            </a>
            <a href="/McKay_Gavin_Resume.txt" download target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-[#a6e3a1] rounded border border-[#2a2a2a] hover:bg-[#121212] transition-colors">
                <Download className="w-4 h-4" />
                Download Resume (TXT)
              </button>
            </a>
          </div>
        </div>

        <div className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a]">
          <h3 className="text-[#00ff00] mb-3">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-[#0a0a0a] rounded">
              <div className="text-2xl text-[#00ff00]">2</div>
              <div className="text-sm text-[#666]">Hackathon Awards</div>
            </div>
            <div className="text-center p-3 bg-[#0a0a0a] rounded">
              <div className="text-2xl text-[#00ff00]">1</div>
              <div className="text-sm text-[#666]">AI Internship</div>
            </div>
            <div className="text-center p-3 bg-[#0a0a0a] rounded">
              <div className="text-2xl text-[#00ff00]">20+</div>
              <div className="text-sm text-[#666]">Tools & Frameworks</div>
            </div>
          </div>
        </div>

        <div className="text-[#666] text-sm">
          <p># Last updated: May 2026</p>
          <p># Formats: PDF, DOCX, and TXT</p>
        </div>
      </div>
    </div>
  );
}
