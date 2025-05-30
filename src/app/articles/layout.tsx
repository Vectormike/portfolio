import { Metadata } from 'next';
import 'highlight.js/styles/github-dark.css';

export const metadata: Metadata = {
  title: 'Articles | Victor Jonah',
  description: 'Articles on Software Engineering and tools written by Victor Jonah',
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 