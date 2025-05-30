import { socialLinks } from '@/data/portfolio';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="animate-fadeInUp">
          <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations.
          </p>
        </div>
        
        <div className="animate-fadeInUp animate-delay-100 flex justify-center space-x-12">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-gray-500 hover:text-white transition-colors group"
            >
              <FaGithub className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm uppercase tracking-wide">GitHub</span>
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-gray-500 hover:text-white transition-colors group"
            >
              <FaLinkedin className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm uppercase tracking-wide">LinkedIn</span>
            </a>
          )}
          <a
            href={`mailto:${socialLinks.email}`}
            className="flex flex-col items-center text-gray-500 hover:text-white transition-colors group"
          >
            <FaEnvelope className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-sm uppercase tracking-wide">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 