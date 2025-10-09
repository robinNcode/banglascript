import { Github, Linkedin, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700/50">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left Section: Social Links */}
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/robinNcode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group relative p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Github size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/robinncode/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group relative p-2.5 rounded-lg bg-gray-800/50 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Linkedin size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Center Section: Copyright */}
          <div className="text-center order-last md:order-none">
            <div className="flex flex-col items-center gap-2">
              <a
                href="https://github.com/robinNcode/banglascript"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BanglaScript
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <p className="text-xs text-gray-500">
                &copy; {currentYear} সর্বস্বত্ব সংরক্ষিত
              </p>
            </div>
          </div>

          {/* Right Section: Developer Credit */}
          <div className="flex justify-center md:justify-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <span className="text-xs text-gray-400">Crafted with</span>
              <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
              <span className="text-xs text-gray-400">by</span>
              <a
                href="https://www.linkedin.com/in/robinncode/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
              >
                MsM Robin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}