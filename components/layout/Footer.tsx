// components/layout/Footer.tsx
import Image from 'next/image';
import { GithubIcon } from '@/components/icons';

const Footer = () => (
    <footer className="bg-[#1D1616]">
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="flex flex-col items-center gap-8">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <Image
                        src="/pixelcrop-logo.jpg"
                        alt="Pixelcrop Logo"
                        width={40}
                        height={40}
                        className="rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                    />
                    <span className="text-xl font-bold text-[#EEEEEE]">Pixelcrop</span>
                </div>
                <p className="text-gray-300 text-xl max-w-md leading-relaxed">
                    The simplest way to remove backgrounds, built with cutting-edge AI.
                </p>
                <a 
                  href="https://github.com/iamvibecoding" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#F25912] bg-size-200 bg-pos-0 hover:bg-pos-100 text-[#EEEEEE] font-bold py-4 px-8 rounded-2xl inline-flex items-center gap-3 transition-all shadow-2xl shadow-[#F25912]/30 hover:shadow-3xl hover:shadow-[#F25912]/50 hover:scale-105 duration-500"
                >
                    <GithubIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    Follow Me on GitHub
                </a>
            </div>
            <div className="mt-20 border-t border-gray-700 pt-10 text-base text-gray-400 space-y-2">
                <p>&copy; {new Date().getFullYear()} Pixelcrop. All Rights Reserved.</p>
                <p className="flex items-center justify-center gap-2">Made with <span className="text-[#F25912] animate-pulse">❤️</span> in Goa</p>
            </div>
        </div>
    </footer>
);

export { Footer };