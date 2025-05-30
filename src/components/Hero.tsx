import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hi, I&apos;m {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-8">
            {personalInfo.title}
          </h2>
          <p className="text-xl text-gray-500 italic">
            {personalInfo.idiom}
          </p>
        </div>
      </div>

      {/* Animated geometric pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none select-none">
        {/* Floating orbs with higher opacity */}
        <div className="absolute top-1/4 right-16 w-32 h-32 bg-blue-500/30 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-1/3 right-32 w-40 h-40 bg-purple-500/30 rounded-full animate-float-delayed blur-2xl"></div>
        <div className="absolute top-1/2 right-24 w-48 h-48 bg-cyan-500/30 rounded-full animate-float-slow blur-2xl"></div>
        <div className="absolute top-2/3 right-16 w-36 h-36 bg-indigo-500/30 rounded-full animate-float-slower blur-2xl"></div>
        
        {/* Grid pattern with higher opacity */}
        <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-40">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="w-full h-full bg-gradient-to-br from-transparent to-white/20 rounded-full transform scale-0 animate-grid-appear"
              style={{ 
                animationDelay: `${i * 50}ms`,
                animationFillMode: 'forwards'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 