export default function FAQ() {
  return (
    // Keep the main container centered, adjust padding
    <section id="faq" className="container mx-auto px-4 py-24 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold text-[#1D1616] text-center mb-12 md:mb-16">
        Frequently Asked Questions
      </h2>

      {/* Make the FAQ list wider on larger screens */}
      <div className="max-w-4xl mx-auto space-y-6 text-left"> {/* Increased max-w-3xl to max-w-4xl */}

        {/* Apply glassmorphism styles and subtle transitions */}
        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            What image formats and sizes are supported?
            {/* Add a subtle rotation animation for the open/close indicator */}
            <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              {/* Simple + icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          {/* Add padding and subtle fade-in */}
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Pixelcrop supports PNG, JPEG, and WebP with a 10 MB per‑file limit for fast, reliable background removal.
            </p>
          </div>
        </details>

        {/* --- Repeat styling for other details elements --- */}

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            How is my image data handled?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Images are processed securely and deleted automatically after background removal for privacy‑first handling.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            How fast is the AI background removal?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Backgrounds are removed in seconds to keep your workflow moving quickly.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            What powers the background removal engine?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Pixelcrop uses the imglybackground-removal-node engine (v1.4.5) for high‑fidelity cutouts with sharp, clean edges.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            Can I use this in a proprietary product?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              For closed‑source or proprietary apps, obtain a commercial IMG.LY license to use the background‑removal library.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            What is the project license and what are my obligations?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Pixelcrop is licensed AGPL‑3.0‑or‑later; if you run a modified version as a network service, you must make the complete source code available to all users.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            Does the app support drag‑and‑drop and file validation?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>
              Yes, there’s a modern drag‑and‑drop uploader with client‑side type and size validation for PNG, JPEG, and WebP under 10 MB.
            </p>
          </div>
        </details>

        <details className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-gray-300/20 p-6 transition-all duration-300 ease-in-out hover:bg-white/70">
          <summary className="cursor-pointer text-lg font-semibold text-[#1D1616] flex justify-between items-center list-none">
            How do I run Pixelcrop locally?
             <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-gray-700 opacity-0 group-open:opacity-100 transition-opacity duration-300">
            <p>Clone the repo, install dependencies, and start the dev server:</p>
            <pre className="mt-3 bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`git clone https://github.com/iamvibecoding/pixelcrop.git
cd pixelcrop
npm install
npm run dev
# open http://localhost:3000`}
            </pre>
             <p className="mt-3">
              These steps reproduce the full landing experience with the background‑removal workflow.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}