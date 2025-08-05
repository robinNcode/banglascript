import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'হোম', path: '/' },
    { name: 'ডকুমেন্টেশন', path: '/docs' },
    { name: 'প্রয়োগ করুন', path: '/editor' },
    { name: 'ফিডব্যাক', path: '/feedback' },
    { name: 'অবদান', path: 'https://github.com/your-repo', external: true },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">BanglaScript</h1>
        <div className="flex gap-6 text-sm">
          {navItems.map((item, idx) =>
            item.external ? (
              <a
                key={idx}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={idx}
                to={item.path}
                className={`hover:text-yellow-400 transition ${
                  pathname === item.path ? 'text-yellow-400 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
