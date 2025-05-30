import { personalInfo, socialLinks } from '@/data/portfolio';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16 bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hi, I'm {personalInfo.name}
          </h1>
        </div>
        
        <div className="animate-fadeInUp animate-delay-100">
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-8">
            {personalInfo.title}
          </h2>
        </div>
        
        <div className="animate-fadeInUp animate-delay-200">
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
        
        <div className="animate-fadeInUp animate-delay-300 flex justify-center space-x-8">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaGithub className="w-7 h-7" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
          )}
          <a
            href={`mailto:${socialLinks.email}`}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <FaEnvelope className="w-7 h-7" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 