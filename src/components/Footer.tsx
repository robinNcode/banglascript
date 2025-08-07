import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section: Social Links */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a
            href="https://github.com/robinNcode"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/robinncode/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Linkedin size={24} />
          </a>
        </div>

        {/* Center Section: Copyright */}
        <div className="text-sm text-center mb-4 md:mb-0">
          <p>
            &copy; {currentYear}{' '}
            <a
              href="https://github.com/robinNcode/banglascript"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              BanglaScript
            </a>{' '}
            | সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>

        {/* Right Section: Developed By */}
        <div className="text-sm text-center md:text-right">
          <p>
            Developed with ❤️ by{' '}
            <a
              href="https://www.linkedin.com/in/robinncode/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              MsM Robin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}