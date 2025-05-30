import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleContent from '@/components/ArticleContent';

interface ArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ArticleFrontmatter {
  title: string;
  date: string;
  readTime: string;
  description: string;
}

async function getArticleData(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/articles', `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as ArticleFrontmatter;
    
    return {
      frontmatter,
      content,
    };
  } catch {
    throw new Error(`Article not found: ${slug}`);
  }
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const article = await getArticleData(resolvedParams.slug);
    return {
      title: `${article.frontmatter.title} | Victor Jonah`,
      description: article.frontmatter.description,
    };
  } catch {
    return {
      title: 'Article Not Found | Victor Jonah',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function Article({ params }: ArticleProps) {
  try {
    const resolvedParams = await params;
    const { frontmatter, content } = await getArticleData(resolvedParams.slug);

    return (
      <main className="min-h-screen bg-black px-6 py-24 md:py-32">
        <ArticleContent content={content} frontmatter={frontmatter} />
      </main>
    );
  } catch {
    notFound();
  }
} 