import { projects } from '@/data/portfolio';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center animate-fadeInUp">
          Projects
        </h2>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors animate-fadeInUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center w-fit group"
                >
                  <FaGithub className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>View Code</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 