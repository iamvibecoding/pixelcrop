"use client";

import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import Image from 'next/image'; // <-- Added this import

// --- SVG Icons (Memoized for performance) ---
const UploadIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
));
UploadIcon.displayName = 'UploadIcon';

const DownloadIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
));
DownloadIcon.displayName = 'DownloadIcon';

const CloseIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const MenuIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
));
MenuIcon.displayName = 'MenuIcon';

const ZapIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
));
ZapIcon.displayName = 'ZapIcon';

const TargetIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
    </svg>
));
TargetIcon.displayName = 'TargetIcon';

const ShieldIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

const GithubIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
));
GithubIcon.displayName = 'GithubIcon';

const SparklesIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"></path>
        <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"></path>
    </svg>
));
SparklesIcon.displayName = 'SparklesIcon';

// --- Updated Logo Component ---
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

const Spinner = memo(() => (
    <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-[#F25912] border-r-[#F25912] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-b-[#F25912] border-l-[#F25912] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
    </div>
));
Spinner.displayName = 'Spinner';

// --- Header Component (Uses new Logo) ---
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
                        <a href="https://github.com/iamvibecoding" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-[#1D1616] text-[#EEEEEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F25912] transition-colors shadow-md hover:shadow-lg">
                            <GithubIcon />
                            Follow
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

// --- The Main Tool Component (WITH UPDATED ERROR HANDLING) ---
const BackgroundRemoverTool = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setImageFile(null);
    setOriginalImageSrc(null);
    setProcessedImageSrc(null);
    setIsLoading(false);
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (!file) return;

    // Reset error on new selection
    setError(null);

    // File Type Check
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError('Invalid file type. Please select a PNG, JPEG, or WEBP image.'); 
      return;
    }

    // File Size Check (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Please select an image under 10MB.'); 
      return;
    }

    resetState(); // Reset states *after* validation passes
    setImageFile(file);
    setOriginalImageSrc(URL.createObjectURL(file));
  }, [resetState]); // resetState is a dependency

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleRemoveBackground = useCallback(async () => {
    if (!imageFile) { 
        setError('No image file found. Please select an image first.'); 
        return; 
    }
    
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      // --- Robust Error Handling ---
      if (!response.ok) {
        let errorMessage: string;
        try {
          // Try to parse a JSON error response from the server
          const errorData = await response.json();
          errorMessage = errorData.error || `Server error: ${response.status}`;
        } catch (jsonError) {
          // If the error response isn't JSON, read it as plain text
          try {
            const errorText = await response.text();
            errorMessage = errorText || `Server error: ${response.status}`;
          } catch (textError) {
            // Fallback if reading the error text also fails
            errorMessage = `Server error: ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }
      // --- End of Error Handling ---

      const resultBlob = await response.blob();
      
      // Check for empty blob, which might mean server-side processing failed silently
      if (resultBlob.size === 0) {
        throw new Error("Processing failed: The server returned an empty result.");
      }

      setProcessedImageSrc(URL.createObjectURL(resultBlob));

    } catch (err: unknown) { // Use 'unknown' for better type safety
      // --- Friendly Error Messaging ---
      let friendlyMessage: string;
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          friendlyMessage = "Network error. Please check your connection and try again.";
        } else {
          // Use the error message from the server or fetch process
          friendlyMessage = err.message;
        }
      } else if (typeof err === 'string') {
        friendlyMessage = err;
      } else {
        // Fallback for unexpected error types
        friendlyMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(friendlyMessage);
      // --- End of Friendly Messaging ---
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]); // imageFile is the only dependency needed here

  const handleDownload = useCallback(() => {
    if (!processedImageSrc) return;
    const link = document.createElement('a');
    link.href = processedImageSrc;
    const originalName = imageFile?.name.split('.').slice(0, -1).join('.') || 'image';
    link.download = `${originalName}-no-bg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImageSrc, imageFile]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);
  
  return (
    <main className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 border border-gray-200/50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10">
            {error && (
                <div className="bg-orange-100 border border-orange-400 text-orange-700 px-5 py-4 rounded-2xl relative mb-6 flex items-center gap-3 animate-slideDown shadow-lg shadow-orange-100/50" role="alert">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                    <div>
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                    <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:bg-orange-200/50 rounded-r-2xl transition-colors">
                        <CloseIcon className="w-5 h-5"/>
                    </button>
                </div>
            )}
            
            {!originalImageSrc ? (
                <div 
                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-16 border-2 border-dashed rounded-3xl transition-all duration-300 relative overflow-hidden ${isDragging ? 'border-[#F25912] bg-orange-50 scale-105' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'}`}
                >
                    <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : 'scale-100'}`}>
                        <div className="w-20 h-20 bg-gradient-to-br from-[#F25912] to-[#F25912] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#F25912]/30">
                            <UploadIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#1D1616] to-[#F25912] bg-clip-text text-transparent">Drag & Drop Image Here</h2>
                    <p className="text-gray-500 mb-8 text-center">Supports PNG, JPEG, WebP (max 10MB)</p>
                    <input ref={fileInputRef} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="group relative bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#F25912] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#F25912]/50 shadow-xl shadow-[#F25912]/30">
                        <span className="relative z-10">Select Image</span>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center group">
                            <h3 className="text-lg font-semibold text-[#1D1616] mb-4">Original</h3>
                            <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200/50 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center p-6">
                                <img src={originalImageSrc} alt="Original" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center group">
                           <h3 className="text-lg font-semibold text-[#1D1616] mb-4">Result</h3>
                            <div className="w-full aspect-square rounded-3xl overflow-hidden flex items-center justify-center relative border border-gray-200/50 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-300 group-hover:scale-[1.02] p-6" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' x='0' y='0' fill='%23f3f4f6'/%3E%3Crect width='10' height='10' x='10' y='10' fill='%23f3f4f6'/%3E%3Crect width='10' height='10' x='0' y='10' fill='white'/%3E%3Crect width='10' height='10' x='10' y='0' fill='white'/%3E%3C/svg%3E")`}}>
                                {isLoading && (
                                    <div className="absolute inset-0 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center z-20">
                                        <Spinner />
                                        <p className="mt-6 text-lg font-semibold bg-gradient-to-r from-[#F25912] to-[#F25912] bg-clip-text text-transparent animate-pulse">Processing Magic...</p>
                                    </div>
                                )}
                                {processedImageSrc && !isLoading && (
                                    <img src={processedImageSrc} alt="Processed" className="max-w-full max-h-full object-contain" />
                                )}
                                {!processedImageSrc && !isLoading && (
                                    <div className="text-center text-gray-400 p-4 flex flex-col items-center gap-3">
                                        <SparklesIcon className="w-12 h-12 text-gray-300" />
                                        <p className="font-medium">Ready for transformation</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                        <button onClick={handleRemoveBackground} disabled={isLoading || processedImageSrc !== null} className="group relative bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#F25912] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 hover:shadow-2xl hover:shadow-[#F25912]/50 shadow-xl shadow-[#F25912]/30 disabled:hover:shadow-xl">
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? 'Processing...' : <><SparklesIcon /> Remove Background</>}
                            </span>
                        </button>
                        <button onClick={handleDownload} disabled={!processedImageSrc || isLoading} className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-[#F25912] hover:bg-white text-[#1D1616] font-bold py-4 px-10 rounded-2xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50">
                            <DownloadIcon className="w-5 h-5 group-hover:animate-bounce"/> Download
                        </button>
                         <button onClick={resetState} className="bg-transparent text-gray-500 hover:text-gray-800 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 hover:bg-gray-200/50">
                            Upload New
                        </button>
                    </div>
                </div>
            )}
        </div>
    </main>
  );
};

// --- Landing Page Sections (Unchanged) ---
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

// --- Updated Footer ---
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

// --- The Main Page Component (Unchanged) ---
export default function LandingPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { 
    setHasMounted(true); 
  }, []);

  if (!hasMounted) {
    return (
      <div className="bg-[#EEEEEE] min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        body, html {
          font-family: 'Poppins', sans-serif;
        }
        .bg-size-200 { background-size: 200% auto; }
        .bg-pos-0 { background-position: 0% center; }
        .bg-pos-100 { background-position: 100% center; }

        /* --- Add this new class --- */
        .eng-grid-bg {
          background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      <div className="min-h-screen font-sans relative overflow-x-hidden bg-[#EEEEEE] eng-grid-bg">
        
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob"></div>
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
            
            <Features />
            <HowItWorks />
            <Footer />
        </div>
      </div>
    </>
  );
}