// app/page.tsx
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Header from './components/client/Header';
import BackgroundRemoverTool from './components/client/BackgroundRemoverTool';
import { GithubIcon, TargetIcon, ZapIcon, ShieldIcon } from './components/icons/Icons';
import FAQ from './components/FAQ';
import SingleResultCard from './components/ShowCase';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// --- Reusable Server Component Sections ---

const Features = () => (
  <section id="features" className="container mx-auto px-4 py-24 text-center relative">
    <div className="relative z-10">
  
      <h2 className="text-4xl md:text-5xl font-bold text-[#1D1616] mb-4">Unmatched Precision and Speed</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-base md:text-lg">
        Our AI is trained to handle challenging details—from wisps of hair to complex edges—giving you a perfect cutout every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-300/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
              <TargetIcon />
            </div>
    
            <h3 className="text-xl md:text-2xl font-bold text-[#1D1616] mb-3">High-Fidelity Cutouts</h3>
            <p className="text-gray-600 leading-relaxed">Get sharp, clean, and smooth edges on any subject.</p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-300/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
              <ZapIcon />
            </div>
    
            <h3 className="text-xl md:text-2xl font-bold text-[#1D1616] mb-3">Blazing Fast</h3>
            <p className="text-gray-600 leading-relaxed">Remove backgrounds in 5 seconds or less. No waiting around.</p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="group bg-white backdrop-blur-xl p-10 rounded-3xl border border-gray-300/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#F25912]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F25912]/10 to-[#F25912]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-[#F25912] to-[#F25912] text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F25912]/30 group-hover:rotate-12 transition-transform duration-300">
              <ShieldIcon />
            </div>
    
            <h3 className="text-xl md:text-2xl font-bold text-[#1D1616] mb-3">Privacy First</h3>
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
  
      <h2 className="text-4xl md:text-5xl font-bold text-[#1D1616] text-center mb-20">Simple and Secure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
     
        <div className="border-2 border-gray-300 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
  
          <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">01</div>
          <div className="pt-4 text-left">
    
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Upload Your Image</h3>
            <p className="text-gray-600 leading-relaxed">Drag and drop a file or click to select an image from your device.</p>
          </div>
        </div>
       
        <div className="border-2 border-gray-300 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
  
          <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>02</div>
          <div className="pt-4 text-left">
    
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">AI Does The Work</h3>
            <p className="text-gray-600 leading-relaxed">Our intelligent algorithm accurately identifies and removes the background.</p>
          </div>
        </div>

        <div className="border-2 border-gray-300 group flex items-start gap-6 p-8 rounded-3xl hover:bg-white/40 hover:backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50">
  
          <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-[#F25912] to-[#F25912] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>03</div>
          <div className="pt-4 text-left">
    
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Download Result</h3>
            <p className="text-gray-600 leading-relaxed">Get a high-resolution PNG with a transparent background.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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

        <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed">
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

// --- FAQ Schema Data ---
const faqSchema = { /* ... (Keep schema definition as before) ... */ };

// --- Page Component (Server Component) ---
export default function LandingPage() {
  return (
    <div className={`${poppins.variable} font-sans min-h-screen relative overflow-x-hidden bg-[#EEEEEE] eng-grid-bg`}>
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        <Header />
        <main>
          <section className="relative pt-32 pb-20">
            <div className="w-full max-w-6xl mx-auto relative z-10 px-4">
              <header className="text-center mb-12">
                {/* NOTE: These classes were already responsive, which is great. */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#1D1616] mb-4">
                  Remove Image Backgrounds
                </h1>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#1D1616] bg-clip-text text-transparent mb-6">
                  100% Automatically.
                </h2>
        
                <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
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
          <Features />    {/* Call the restored Features component */}
          <HowItWorks />  {/* Call the restored HowItWorks component */}
          <FAQ />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
          }}
          key="faq-jsonld"
        />
        <Footer />      {/* Call the restored Footer component */}
      </div>
    </div>
  );
}