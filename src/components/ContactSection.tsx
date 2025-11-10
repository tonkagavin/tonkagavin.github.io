import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> ./contact.sh --send-message
      </div>
      <div className="pl-4 space-y-6">
        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="mailto:gavinmckay2022@gmail.com"
            className="flex items-center gap-3 p-4 border border-[#2a2a2a] rounded bg-[#1a1a1a] hover:border-[#00ff00] transition-colors group"
          >
            <Mail className="w-5 h-5 text-[#00ff00]" />
            <div>
              <div className="text-[#00ff00] text-sm">Email</div>
              <div className="text-[#e0e0e0] text-xs">gavinmckay2022@gmail.com</div>
            </div>
          </a>
          
          <a 
            href="https://github.com/tonkagavin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-[#2a2a2a] rounded bg-[#1a1a1a] hover:border-[#00ff00] transition-colors group"
          >
            <Github className="w-5 h-5 text-[#00ff00]" />
            <div className="flex-1">
              <div className="text-[#00ff00] text-sm">GitHub</div>
              <div className="text-[#e0e0e0] text-xs">@tonkagavin</div>
            </div>
            <ExternalLink className="w-3 h-3 text-[#666] group-hover:text-[#00ff00]" />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/gavin-mckay-0a830b25b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-[#2a2a2a] rounded bg-[#1a1a1a] hover:border-[#00ff00] transition-colors group"
          >
            <Linkedin className="w-5 h-5 text-[#00ff00]" />
            <div className="flex-1">
              <div className="text-[#00ff00] text-sm">LinkedIn</div>
              <div className="text-[#e0e0e0] text-xs">/in/gavin-mckay</div>
            </div>
            <ExternalLink className="w-3 h-3 text-[#666] group-hover:text-[#00ff00]" />
          </a>
        </div>

        {/* Contact Form */}
        <div className="border border-[#2a2a2a] rounded p-6 bg-[#1a1a1a]">
          <h3 className="text-[#00ff00] mb-4">Send Message</h3>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-[#00ff00] mb-2">✓ Message sent successfully!</div>
              <div className="text-[#666] text-sm">I'll get back to you soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#00ff00] text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] focus:border-[#00ff00] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[#00ff00] text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] focus:border-[#00ff00] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[#00ff00] text-sm mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] focus:border-[#00ff00] focus:outline-none resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#00ff00] text-black rounded hover:bg-[#00cc00] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="text-[#666] text-sm">
          <p># Feel free to reach out for collaborations or opportunities</p>
          <p># Response time: Usually within 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}
