import { skills } from '@/data/portfolio';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                {skillCategory.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 