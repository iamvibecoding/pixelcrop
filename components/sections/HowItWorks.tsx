// components/sections/HowItWorks.tsx
import React from 'react';

const HowItWorks = () => (
    <section id="how-it-works" className="container mx-auto px-4 pb-24 relative">
        <div className="relative z-10">
            <h2 className="text-5xl font-bold text-[#1D1616] text-center mb-20">Simple and Secure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">01</div>
                    <div className="pt-4 text-left">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Upload Your Image</h3>
                        <p className="text-gray-600 leading-relaxed">Drag and drop a file or click to select an image from your device.</p>
                    </div>
                </div>
                <div className="group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{transitionDelay: '100ms'}}>02</div>
                    <div className="pt-4 text-left">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Does The Work</h3>
                        <p className="text-gray-600 leading-relaxed">Our intelligent algorithm accurately identifies and removes the background.</p>
                    </div>
                </div>
                <div className="group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{transitionDelay: '200ms'}}>03</div>
                    <div className="pt-4 text-left">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Download Result</h3>
                        <p className="text-gray-600 leading-relaxed">Get a high-resolution PNG with a transparent background.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export { HowItWorks };