// components/layout/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';
import { CloseIcon, MenuIcon, GithubIcon } from '@/components/icons';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#EEEEEE]/70 backdrop-blur-xl border-b border-gray-300/50 shadow-lg shadow-gray-200/20' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-800 hover:text-[#F25912] transition-colors duration-200 font-medium relative group">
                                Features
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F25912] to-[#F25912] group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#how-it-works" className="text-gray-800 hover:text-[#F25912] transition-colors duration-200 font-medium relative group">
                                How It Works
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F25912] to-[#F25912] group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </nav>
                        <a 
                            href="https://github.com/iamvibecoding/pixelcrop" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hidden sm:flex items-center gap-2 bg-[#1D1616] text-[#EEEEEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F25912] transition-colors shadow-md hover:shadow-lg"
                            aria-label="Star iamvibecoding/pixelcrop on GitHub"
                        >
                            <GithubIcon />GitHub
                        </a>

                        <button className="md:hidden text-[#1D1616] hover:text-[#F25912] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-[#EEEEEE]/90 backdrop-blur-xl pb-4 px-4 space-y-4 border-b border-gray-300/50 animate-fadeIn">
                    <a href="#features" className="block text-[#1D1616] hover:text-[#F25912] transition-colors">Features</a>
                    <a href="#how-it-works" className="block text-[#1D1616] hover:text-[#F25912] transition-colors">How It Works</a>
                     <a href="https://github.com/iamvibecoding" target="_blank" rel="noopener noreferrer" className="sm:hidden flex items-center justify-center gap-2 bg-[#1D1616] text-[#EEEEEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F25912] transition-colors shadow-md hover:shadow-lg">
                        <GithubIcon />
                        Follow on GitHub
                    </a>
                </div>
            )}
        </header>
    );
};

export { Header };