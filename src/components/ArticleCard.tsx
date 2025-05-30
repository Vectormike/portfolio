import Link from 'next/link';
import type { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <article 
      className="group animate-fadeInUp border-b border-gray-800 pb-12 last:border-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link 
        href={`/articles/${article.slug}`}
        className="block group"
      >
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-sm px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <h2 className="text-xl text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        
        <p className="text-gray-400 leading-relaxed">
          {article.description}
        </p>
      </Link>
    </article>
  );
} 