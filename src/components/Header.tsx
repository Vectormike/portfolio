'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'about', href: '/about' },
    { label: 'projects', href: '/projects' },
    { label: 'articles', href: '/articles' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <nav className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-lg font-medium transition-colors ${
            pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          V
        </Link>
        
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm tracking-wider transition-colors ${
                  pathname === item.href 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`${
                  pathname === item.href 
                    ? 'w-3/4 mx-auto border-b-2 border-white pb-1' 
                    : ''
                }`}>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 