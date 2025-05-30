import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ArticleProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  try {
    const article = await getArticleData(params.slug);
    return {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    };
  } catch {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

async function getArticleData(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/articles', `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    return {
      frontmatter,
      content,
    };
  } catch (error) {
    throw new Error(`Article not found: ${slug}`);
  }
}

export default async function Article({ params }: ArticleProps) {
  try {
    const { frontmatter, content } = await getArticleData(params.slug);

    return (
      <main className="min-h-screen bg-black px-6 py-24 md:py-32">
        <article className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fadeInUp">
            {frontmatter.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-12 space-x-4 animate-fadeInUp">
            <span>{frontmatter.date}</span>
            <span>•</span>
            <span>{frontmatter.readTime}</span>
          </div>
          
          <div className="text-gray-300 leading-relaxed animate-fadeInUp">
            {content}
          </div>
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 