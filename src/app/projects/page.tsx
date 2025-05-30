import { projects } from '@/data/portfolio';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 animate-fadeInUp">
          Projects
        </h1>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-sm text-gray-400"
                  >
                    {tech}{idx < project.technologies.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <FaGithub className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span>View source</span>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <FaExternalLinkAlt className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Visit site</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 