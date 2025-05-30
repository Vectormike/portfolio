'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import type { Components } from 'react-markdown';

interface ArticleContentProps {
  content: string;
  frontmatter: {
    title: string;
    date: string;
    readTime: string;
  };
}

export default function ArticleContent({ content, frontmatter }: ArticleContentProps) {
  const components: Components = {
    // Style code blocks
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;
      return isInline ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <div className="relative">
          <div className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
            {match[1]}
          </div>
          <pre className={className}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    // Style links
    a({ children, ...props }) {
      return (
        <a
          className="text-blue-400 hover:text-blue-300 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Style headings
    h2({ children, ...props }) {
      return (
        <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
          {children}
        </h2>
      );
    },
    h3({ children, ...props }) {
      return (
        <h3 className="text-xl font-semibold mt-6 mb-3" {...props}>
          {children}
        </h3>
      );
    },
    // Style paragraphs
    p({ children, ...props }) {
      return (
        <p className="mb-4 leading-relaxed" {...props}>
          {children}
        </p>
      );
    },
    // Style lists
    ul({ children, ...props }) {
      return (
        <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }) {
      return (
        <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
          {children}
        </ol>
      );
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12 animate-fadeInUp">
        <h1 className="text-4xl font-bold text-white mb-4">
          {frontmatter.title}
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{frontmatter.date}</span>
          <span>•</span>
          <span>{frontmatter.readTime}</span>
        </div>
      </header>
      
      <div className="prose prose-invert prose-lg max-w-none animate-fadeInUp">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
} 