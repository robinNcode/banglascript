import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookText,
  Code2,
  MessageSquare,
  Handshake,
  Menu,
  X,
} from 'lucide-react';

// images
import logo from '../assets/images/bs_icon.png';

const navItems = [
  { name: 'হোম', path: '/', icon: Home },
  { name: 'কোড', path: '/editor', icon: Code2 },
  { name: 'ডকুমেন্টেশন', path: '/docs', icon: BookText },
  { name: 'ফিডব্যাক', path: '/feedback', icon: MessageSquare },
  {
    name: 'অবদান রাখুন',
    path: 'https://github.com/robinNcode/banglascript/blob/master/CONTRIBUTE.md',
    icon: Handshake,
    external: true,
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" alt="logo" />
                    <span className="text-lg font-semibold hidden md:block">
            BanglaScript
            <sup className="text-xs bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded-full ml-1">
              BETA
            </sup>
          </span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm">
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
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {navItems.map(({ name, path, icon: Icon, external }) =>
            external ? (
              <a
                key={path}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 hover:text-yellow-400 transition"
              >
                <Icon className="w-5 h-5" />
                {name}
              </a>
            ) : (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 py-2 hover:text-yellow-400 transition ${
                  pathname === path ? 'text-yellow-400 font-semibold' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
