import { experiences } from '@/data/portfolio';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <div className="text-gray-500 mt-2 md:mt-0">
                  <p>{exp.location}</p>
                  <p>{exp.period}</p>
                </div>
              </div>
              
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 