'use client';

import { personalInfo, socialLinks } from '@/data/portfolio';
import { articles } from '@/data/articles';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ArticlesModal from '@/components/ArticlesModal';

export default function Home() {
  const [pressedKey, setPressedKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetKey = 'Enter';

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setPressedKey(event.key);
      if (event.key === targetKey) {
        setIsModalOpen(true);
      }
      // Reset after 1 second
      setTimeout(() => setPressedKey(''), 1000);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <main className="flex flex-col justify-between min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-20 right-4 md:top-12 md:right-12 z-50">
        <a
          href="https://docs.google.com/document/d/1BnIUSXU00IDBfDOg1g8ChNXKKPu218PdbDeohC0wLAs/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-all p-2 block relative group"
          aria-label="View Resume"
        >
          <div className="animate-bounce-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-50 rounded-full"></div>
              <FaFileAlt className="w-7 h-7 relative z-10" />
            </div>
          </div>
          <span className="absolute -bottom-2 right-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Resume
          </span>
        </a>
      </div>

      {/* Simple animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96">
          <div className="absolute right-20 top-20 w-40 h-40 bg-blue-500/20 rounded-full animate-bounce-slow blur-2xl"></div>
          <div className="absolute right-40 top-40 w-60 h-60 bg-purple-500/20 rounded-full animate-pulse-slow blur-2xl"></div>
        </div>
      </div>

      <div className="flex items-center flex-1 relative z-10">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
          <div className="animate-fadeInUp space-y-3">
            <h1 className="text-2xl md:text-3xl text-white font-bold transition-all duration-300 hover:[text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
              {personalInfo.name}
            </h1>
            <h2 className="text-lg md:text-xl text-gray-400 transition-all duration-300 hover:[text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
              {personalInfo.title}
            </h2>
            <p className="text-base text-gray-500 italic max-w-lg mb-4">
              {personalInfo.idiom}
            </p>

            {/* Interactive Keyboard Section */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <span>Press</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
              <span>to explore articles</span>
              <div className={`transition-all duration-300 ml-2 ${pressedKey === targetKey ? 'scale-110 opacity-100' : 'opacity-70'}`}>
                <div className={`h-8 w-8 rounded-lg border-2 ${
                  pressedKey === targetKey 
                    ? 'border-green-500 bg-green-500/10 text-green-500' 
                    : 'border-gray-500 bg-gray-500/10 text-gray-400'
                } flex items-center justify-center transition-all duration-300`}>
                  {pressedKey === targetKey ? '✓' : '↵'}
                </div>
              </div>
              {pressedKey === targetKey && (
                <span className="text-green-500 animate-fadeInUp text-sm">
                  Opening articles...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full max-w-3xl mx-auto px-6 md:px-8 py-8 relative z-10">
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

      <ArticlesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        articles={articles}
      />
    </main>
  );
}
