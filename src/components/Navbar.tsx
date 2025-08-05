import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookText,
  Code2,
  MessageSquare,
  Handshake,
} from 'lucide-react';

const navItems = [
  { name: 'হোম', path: '/', icon: Home },
  { name: 'কোড', path: '/editor', icon: Code2 },
  { name: 'ডকুমেন্টেশন', path: '/docs', icon: BookText },
  { name: 'ফিডব্যাক', path: '/feedback', icon: MessageSquare },
  {
    name: 'অবদান রাখুন',
    path: 'https://github.com/robinNcode/banglascript/blob/master/contribute.md',
    icon: Handshake,
    external: true,
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">BanglaScript</h1>
        <div className="flex gap-6 text-sm">
          {navItems.map(({ name, path, icon: Icon, external }) =>
            external ? (
              <a
                key={path}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-yellow-400 transition"
              >
                <Icon className="w-4 h-4" />
                {name}
              </a>
            ) : (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 hover:text-yellow-400 transition ${
                  pathname === path ? 'text-yellow-400 font-semibold' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
