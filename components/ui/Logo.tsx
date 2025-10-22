// components/ui/Logo.tsx
import { memo } from 'react';
import Image from 'next/image';

const Logo = memo(() => (
    <div className="flex items-center gap-3 group cursor-pointer">
        <Image
            src="/pixelcrop-logo.jpg" // Assumes logo is in /public/pixelcrop-logo.jpg
            alt="Pixelcrop Logo"
            width={40}  // w-10
            height={40} // h-10
            className="rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
        />
        <span className="text-xl font-bold text-[#1D1616]">Pixelcrop</span>
    </div>
));
Logo.displayName = 'Logo';

export { Logo };