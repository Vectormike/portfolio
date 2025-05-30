import { personalInfo, socialLinks } from '@/data/portfolio';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen bg-black relative">
      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <a
          href="https://docs.google.com/document/d/1BnIUSXU00IDBfDOg1g8ChNXKKPu218PdbDeohC0wLAs/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-all p-2 block relative group"
          aria-label="View Resume"
        >
          <div className="animate-float">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-scale bg-blue-400 blur-lg opacity-50 rounded-full"></div>
              <FaFileAlt className="w-7 h-7 relative z-10 animate-pulse-scale" />
            </div>
          </div>
          <span className="absolute -bottom-2 right-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Resume
          </span>
        </a>
      </div>

      <div className="flex items-center flex-1">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
          <div className="animate-fadeInUp space-y-3">
            <h1 className="text-2xl md:text-3xl text-white font-bold transition-all duration-300 hover:[text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
              {personalInfo.name}
            </h1>
            <h2 className="text-lg md:text-xl text-gray-400 transition-all duration-300 hover:[text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
              {personalInfo.title}
            </h2>
            <p className="text-base text-gray-500 italic max-w-lg">
              {personalInfo.idiom}
            </p>
          </div>
        </div>
      </div>
      
      <footer className="w-full max-w-3xl mx-auto px-6 md:px-8 py-8">
        <div className="flex justify-between items-center">
          <a
            href={`mailto:${socialLinks.email}`}
            className="hover:text-white transition-colors p-2"
            aria-label="Email"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </footer>
    </main>
  );
}
