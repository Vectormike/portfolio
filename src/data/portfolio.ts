import { Experience, Project, Skill, SocialLinks } from '@/types';

export const personalInfo = {
  name: 'Victor Jonah',
  title: 'Backend Engineer',
  idiom: 'building scalable systems, one line at a time.'
};

export const experiences: Experience[] = [
  {
    title: 'Senior Backend Engineer',
    company: 'Tech Company',
    location: 'City, Country',
    period: '2021 - Present',
    description: [
      'Designed and implemented RESTful APIs serving 1M+ daily requests',
      'Optimized database queries reducing response time by 60%',
      'Built microservices architecture using Node.js and Docker',
      'Implemented caching strategies with Redis improving system performance',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Jobby - AI-Powered Job Application Assistant',
    description: 'Chrome extension that uses AI (ChatGPT/DeepSeek) to automate job applications. Features include automatic form filling, AI-powered response generation, and secure API key management.',
    technologies: ['TypeScript', 'Chrome Extension', 'OpenAI', 'DeepSeek', 'Webpack'],
    link: 'https://github.com/Vectormike/jobby'
  },
  {
    title: 'Bank Statement Analyzer',
    description: 'AI-powered tool for analyzing bank statements, extracting transaction patterns, and providing financial insights. Built with TypeScript and modern AI technologies for automated financial document processing.',
    technologies: ['TypeScript', 'Node.js', 'AI', 'Financial Analysis'],
    link: 'https://github.com/Vectormike/bank-statement-analyzer'
  },
  {
    title: 'WhispAI',
    description: 'A Python-based backend API that integrates WhatsApp with AI capabilities.',
    technologies: ['Python', 'Twilio API', 'LLaMA', 'Langchain', 'FastAPI'],
    link: 'https://github.com/Vectormike/WhispAI'
  },
  {
    title: 'Smart Research Assistant',
    description: 'A Python-based research assistant powered by RAG (Retrieval-Augmented Generation) for managing and querying research notes. Features include vector embeddings, efficient data storage, and intelligent note retrieval.',
    technologies: ['Python', 'RAG', 'OpenAI', 'Vector Embeddings', 'Data Management'],
    link: 'https://github.com/Vectormike/smart-research-assistant'
  },
  {
    title: 'Mietz - Property Management Platform',
    description: 'Developed an OCR solution for tenant verification and a scheduling system for apartment viewings. Built with AWS Lambda and serverless architecture, reducing verification time from days to seconds.',
    technologies: ['Node.js', 'AWS Lambda', 'TypeScript', 'OCR', 'Serverless'],
    link: 'https://mietz.app'
  },
  {
    title: 'Edvise.ai - AI Learning Platform',
    description: 'Implemented supervised learning frameworks with Cloudflare Workers and enhanced backend performance through KV caching. Improved task accuracy by 25% and reduced API response time by 30%.',
    technologies: ['Node.js', 'Cloudflare Workers', 'KV Storage', 'Machine Learning', 'Jest'],
    link: 'https://edvise.ai'
  },
  {
    title: 'Paza - Social Shopping Platform',
    description: 'Built collaborative shopping features enabling real-time interaction between shoppers. Implemented WebSocket-based chat system and product sharing functionality.',
    technologies: ['Node.js', 'WebSocket', 'Redis', 'PostgreSQL', 'Express.js'],
    link: 'https://www.paza.io'
  },
  {
    title: 'PointingFish - Document Processing Platform',
    description: 'Developed AI-powered document understanding platform with OCR capabilities. Implemented machine learning algorithms for automated document classification and tagging.',
    technologies: ['Node.js', 'Machine Learning', 'OCR', 'AWS', 'NLP'],
    link: 'https://pointingfish.ai'
  },
  {
    title: 'MeekFi - Cardless ATM Withdrawal',
    description: 'Built secure cardless ATM withdrawal system with temporary PIN generation. Implemented ISO 27001 certified security protocols for mobile wallet integration.',
    technologies: ['Node.js', 'Security Protocols', 'API Integration', 'PostgreSQL'],
    link: 'https://www.meekfi.com'
  },
  {
    title: 'Semicolon Africa - Education Platform',
    description: 'Contributed to building the technical education platform infrastructure. Implemented student management system and learning resource delivery.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'AWS'],
    link: 'https://semicolon.africa'
  }
];

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['Node.js', 'Python', 'Go', 'SQL'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
];

export const socialLinks: SocialLinks = {
  github: 'https://github.com/Vectormike',
  linkedin: 'https://linkedin.com/in/victor-jonah',
  twitter: 'https://twitter.com/Vectormike_',
  email: 'victorjonah199@gmail.com'
}; 