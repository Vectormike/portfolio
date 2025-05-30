'use client';

import { useState, useMemo } from 'react';
import { articles } from '@/data/articles';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(articles.map(article => article.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-black px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-white mb-4">
            Articles
          </h1>
          <p className="text-gray-400">
            Articles on Software Engineering and tools written by Victor Jonah
          </p>
        </div>

        <div className="mb-12 space-y-6 animate-fadeInUp">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
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
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
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
        
        <div className="space-y-12">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard 
                key={article.slug} 
                article={article} 
                index={index} 
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 