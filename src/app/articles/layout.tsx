import { Metadata } from 'next';

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