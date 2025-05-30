'use client';

import { useState } from 'react';

export default function About() {
  const [copied, setCopied] = useState(false);

  const bioText = `Experienced Backend Software Engineer with 5 years of expertise in building scalable, high-performance systems. Skilled in JavaScript, TypeScript, Node.js (Express, Nest.js, Adonis.js), and cloud technologies (AWS, Serverless). Proficient in designing RESTful APIs, microservices, CI/CD, and leveraging tools like RabbitMQ, gRPC, and Docker. Passionate about clean code, system design, and creating efficient, scalable architectures.`;

  const handleCopyBio = () => {
    navigator.clipboard.writeText(bioText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-white mb-8 animate-fadeInUp">
          Build. Scale. Optimize.
        </h1>

        <div className="space-y-6 text-gray-400 animate-fadeInUp">
          <p className="text-xl">
            <strong className="text-white">Hey, I&apos;m Victor Jonah</strong>
            {" "}I&apos;m a Backend Engineer with 5 years of experience in building scalable systems.
          </p>

          <p>
            I specialize in <strong className="text-white">cloud infrastructure</strong> and 
            <strong className="text-white"> distributed systems</strong>. Currently focused on creating 
            high-performance backend solutions using Node.js, TypeScript, and AWS.
          </p>

          <p>
            I&apos;m passionate about <strong className="text-white">system design</strong>, microservices architecture, 
            and optimizing for scale. When I&apos;m not coding, I enjoy contributing to open source and sharing knowledge.
          </p>
        </div>

        <h2 className="text-2xl text-white mt-16 mb-8 animate-fadeInUp">Career</h2>
        
        <div className="space-y-12 animate-fadeInUp">
          <div className="group">
            <h3 className="text-white text-lg mb-1">Backend Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://mietz.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mietz</a> • Germany
            </p>
            <p className="text-gray-500 text-sm mb-4">Aug 2023 – January 2025 • Remote</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Developed an OCR solution on AWS Lambda, reducing tenant verification from days to 10 seconds max</li>
              <li>Created a scheduling system for tenant-landlord apartment viewings, boosting booking efficiency by 25%</li>
              <li>Designed a shortlisting service for property owners, streamlining tenant approvals by 30%</li>
            </ul>
          </div>

          <div className="group">
            <h3 className="text-white text-lg mb-1">Backend Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://edvise.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Edvise.ai</a> • USA
            </p>
            <p className="text-gray-500 text-sm mb-4">Feb 2023 – Aug 2023 • Remote Contract</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Orchestrated supervised learning frameworks with Cloudflare Workers, improving task accuracy by 25%</li>
              <li>Enhanced backend performance through Cloudflare KV caching, reducing API response time by 30%</li>
              <li>Automated testing environments using Docker Compose and Jest, improving code reliability by 40%</li>
            </ul>
          </div>

          <div className="group">
            <h3 className="text-white text-lg mb-1">Lead Backend Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://africweddings.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AfricWeddings</a> • UK/Nigeria
            </p>
            <p className="text-gray-500 text-sm mb-4">Apr 2022 – Feb 2023 • Remote</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Directed API development for a dashboard serving 20,000+ users using Express.js and PostgreSQL</li>
              <li>Reduced deployment time by 50% through GitHub Actions automation</li>
              <li>Managed logistics and media projects with 100% agile methodologies</li>
            </ul>
          </div>

          <div className="group">
            <h3 className="text-white text-lg mb-1">Backend Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://crenet.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Crenet</a> • Nigeria
            </p>
            <p className="text-gray-500 text-sm mb-4">Aug 2020 – Apr 2022 • Remote</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Delivered APIs for an Expense and Requisition Management System, improving workflows by 40%</li>
              <li>Enhanced data management for a Hospital Management System with robust endpoints, reducing workload in the Hospital by 90%</li>
              <li>Established microservices for a Protocol Management System with RabbitMQ, boosting efficiency by 30%</li>
            </ul>
          </div>

          <div className="group">
            <h3 className="text-white text-lg mb-1">Fullstack Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://cyberspace.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cyberspace</a> • Nigeria
            </p>
            <p className="text-gray-500 text-sm mb-4">Sep 2018 – Aug 2020 • On-site</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Designed backend solutions with Node.js, C#, and Docker, improving reliability by 20%</li>
              <li>Developed a payment wrapper for the in-house payment engine in Node.js</li>
            </ul>
          </div>

          <div className="group">
            <h3 className="text-white text-lg mb-1">Fullstack Engineer</h3>
            <p className="text-gray-500 text-sm mb-2">
              <a href="https://hotels.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Hotels.ng</a> • Nigeria
            </p>
            <p className="text-gray-500 text-sm mb-4">Aug 2017 – Sep 2018 • Remote</p>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Initiated a file-sharing application (XShare) using Node.js and PostgreSQL, supporting 1,000+ daily transactions</li>
              <li>Implemented secure payment gateways that streamlined user transactions, resulting in a 40% reduction in transaction-related customer inquiries</li>
              <li>Improved file upload services, boosting performance and user satisfaction by 30%</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 animate-fadeInUp">
          <h2 className="text-2xl text-white mb-6">Skills</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            JavaScript • TypeScript • Node.js • Express • Nest.js • MongoDB • PostgreSQL • MySQL • 
            AWS Lambda • Cloudflare Workers • Docker • Jest • Mocha • Kubernetes • GitHub Actions • 
            Grafana • Prometheus
          </p>
        </div>

        <div className="mt-16 animate-fadeInUp">
          <h2 className="text-2xl text-white mb-6">Notable Achievements</h2>
          <ul className="text-gray-400 space-y-3 list-disc list-inside">
            <li>Cut tenant verification times by 80% through an OCR service built on AWS Lambda</li>
            <li>Improved API response times by 30% with caching optimizations using Cloudflare KV</li>
            <li>Scaled messaging systems to handle 40,000+ streams with low latency and high reliability</li>
          </ul>
        </div>

        <div className="mt-16 animate-fadeInUp">
          <h2 className="text-2xl text-white mb-6">Bio</h2>
          <p className="text-gray-400 mb-8">
            {bioText}
          </p>
          <button 
            onClick={handleCopyBio}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2"
          >
            <span>{copied ? 'Copied!' : 'Copy Bio'}</span>
            {copied && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
} 