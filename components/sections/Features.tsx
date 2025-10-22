// components/sections/Features.tsx
import { TargetIcon, ZapIcon, ShieldIcon } from '@/components/icons';

const Features = () => (
    <section id="features" className="container mx-auto px-4 py-24 text-center relative">
        <div className="relative z-10">
            <h2 className="text-5xl font-bold text-[#1D1616] mb-4">Unmatched Precision and Speed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">Our AI is trained to handle challenging details—from wisps of hair to complex edges—giving you a perfect cutout every time.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
                            <TargetIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1D1616] mb-3">High-Fidelity Cutouts</h3>
                        <p className="text-gray-600 leading-relaxed">Get sharp, clean, and smooth edges on any subject.</p>
                    </div>
                </div>
                <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
                            <ZapIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1D1616] mb-3">Blazing Fast</h3>
                        <p className="text-gray-600 leading-relaxed">Remove backgrounds in 5 seconds or less. No waiting around.</p>
                    </div>
                </div>
                <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/3AF25912po-hover:rotate-12 transition-transform duration-300">
                            <ShieldIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1D1616] mb-3">Privacy First</h3>
                        <p className="text-gray-600 leading-relaxed">Your images are processed securely and deleted automatically.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export { Features };