import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import Link from 'next/link';

interface ArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
}

export default function ArticlesModal({ isOpen, onClose, articles }: ArticlesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Get unique categories
  const categories = Array.from(new Set(articles.map(article => article.category))).sort();

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl animate-fadeInUp">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Articles</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !selectedCategory 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)] p-6">
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  onClick={onClose}
                  className="block group"
                >
                  <article className="p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 space-x-3">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {article.description}
                    </p>
                  </article>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No articles found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 