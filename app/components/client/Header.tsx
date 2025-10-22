"use client";

import { useEffect, useState, memo } from "react";
import Link from "next/link";
import { GithubIcon, CloseIcon, MenuIcon, Logo} from "../icons/Icons";

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#EEEEEE]/70 backdrop-blur-xl border-b border-gray-300/50 shadow-lg shadow-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-800 hover:text-[#F25912] transition-colors duration-200 font-medium relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F25912] to-[#F25912] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-gray-800 hover:text-[#F25912] transition-colors duration-200 font-medium relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F25912] to-[#F25912] group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            <Link
              href="https://github.com/iamvibecoding/pixelcrop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star iamvibecoding/pixelcrop on GitHub"
              className="hidden sm:flex items-center gap-2 bg-[#1D1616] text-[#EEEEEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F25912] transition-colors shadow-md hover:shadow-lg"
            >
              <GithubIcon />
              GitHub
            </Link>

            <button
              className="md:hidden text-[#1D1616] hover:text-[#F25912] transition-colors"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#EEEEEE]/90 backdrop-blur-xl pb-4 px-4 space-y-4 border-b border-gray-300/50 animate-fadeIn"
        >
          <a
            href="#features"
            className="block text-[#1D1616] hover:text-[#F25912] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block text-[#1D1616] hover:text-[#F25912] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <Link
            href="https://github.com/iamvibecoding"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center justify-center gap-2 bg-[#1D1616] text-[#EEEEEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F25912] transition-colors shadow-md hover:shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <GithubIcon />
            Follow on GitHub
          </Link>
        </div>
      )}
    </header>
  );
});

export default Header;
