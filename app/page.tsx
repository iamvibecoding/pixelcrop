
import Image from 'next/image';
import Header from './components/client/Header';
import BackgroundRemoverTool from './components/client/BackgroundRemoverTool';
import { GithubIcon, TargetIcon, ZapIcon, ShieldIcon } from './components/icons/Icons';
import FAQ from './components/FAQ';
import SingleResultCard from './components/ShowCase';   

// --- Landing Page Sections (server-safe) ---
const Features = () => (
  <section id="features" className="container mx-auto  py-24 text-center relative">
    <div className="relative z-10">
      <h2 className="text-5xl font-bold text-[#1D1616] mb-4">Unmatched Precision and Speed</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
        Our AI is trained to handle challenging details—from wisps of hair to complex edges—giving you a perfect cutout every time.
      </p>
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
            <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
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

const HowItWorks = () => (
  <section id="how-it-works" className="container mx-auto px-4 pb-24 relative">
    <div className="relative z-10">
      <h2 className="text-5xl font-bold text-[#1D1616] text-center mb-20">Simple and Secure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="border-2 border-grey-200 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">01</div>
          <div className="pt-4 text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Upload Your Image</h3>
            <p className="text-gray-600 leading-relaxed">Drag and drop a file or click to select an image from your device.</p>
          </div>
        </div>
        <div className="border-2 border-grey-200 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>02</div>
          <div className="pt-4 text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Does The Work</h3>
            <p className="text-gray-600 leading-relaxed">Our intelligent algorithm accurately identifies and removes the background.</p>
          </div>
        </div>
        <div className="border-2 border-grey-200 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
          <div className="text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>03</div>
          <div className="pt-4 text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Download Result</h3>
            <p className="text-gray-600 leading-relaxed">Get a high-resolution PNG with a transparent background.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer (server-safe) ---
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
        <p className="flex items-center justify-center gap-2">
          Made with <span className="text-[#F25912] animate-pulse">❤️</span> in Goa
        </p>
      </div>
    </div>
  </footer>
);

// --- Page (Server Component) ---
export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        body, html { font-family: 'Poppins', sans-serif; }
        .bg-size-200 { background-size: 200% auto; }
        .bg-pos-0 { background-position: 0% center; }
        .bg-pos-100 { background-position: 100% center; }
        .eng-grid-bg {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      <div className="min-h-screen font-sans relative overflow-x-hidden bg-[#EEEEEE] eng-grid-bg">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F2s912]/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          <Header />

          <section className="relative pt-32 pb-20">
            <div className="w-full max-w-6xl mx-auto relative z-10 px-4">
              <header className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#1D1616] mb-4">
                  Remove Image Backgrounds
                </h1>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#1D1616] bg-clip-text text-transparent mb-6">
                  100% Automatically.
                </h2>
                <p className="text-gray-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
                  Instantly remove the background from any image with a single click, powered by cutting-edge AI.
                </p>
              </header>
              <BackgroundRemoverTool />
            </div>
          </section>
          <SingleResultCard
              src="/images/results.png"
              caption="Background removed, transparent PNG for instant compositing."
            />
          <Features />
          <HowItWorks />
          <FAQ />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What image formats and sizes are supported?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pixelcrop supports PNG, JPEG, and WebP with a 10 MB per-file limit for fast, reliable background removal."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is my image data handled?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Images are processed securely and deleted automatically after background removal for privacy-first handling."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How fast is the AI background removal?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Backgrounds are removed in seconds to keep your workflow moving quickly."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What powers the background removal engine?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pixelcrop uses the imglybackground-removal-node engine (v1.4.5) for high-fidelity cutouts with sharp, clean edges."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use this in a proprietary product?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For closed-source or proprietary apps, obtain a commercial IMG.LY license to use the background-removal library."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the project license and what are my obligations?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Pixelcrop is licensed AGPL-3.0-or-later; if you run a modified version as a network service, you must make the complete source code available to all users."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does the app support drag-and-drop and file validation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, there’s a modern drag-and-drop uploader with client-side type and size validation for PNG, JPEG, and WebP under 10 MB."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I run Pixelcrop locally?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Clone the repo, install dependencies, and start the dev server with: git clone, npm install, and npm run dev; then open http://localhost:3000."
                    }
                  }
                ]
              }).replace(/</g, '\\u003c'),
            }}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}
