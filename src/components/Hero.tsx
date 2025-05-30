import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-4xl mx-auto text-center">
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
    </section>
  );
} 