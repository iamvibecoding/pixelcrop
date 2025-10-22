// components/BackgroundRemoverTool.tsx
"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { UploadIcon, DownloadIcon, CloseIcon, SparklesIcon } from '@/components/icons';
import { Spinner } from '@/components/ui/Spinner';

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
        } catch (_jsonError) { 
          // If the error response isn't JSON, read it as plain text
          try {
            const errorText = await response.text();
            errorMessage = errorText || `Server error: ${response.status}`;
          } catch (_textError) { 
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
                            <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200/50 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center p-6 relative">
                                {originalImageSrc && <Image src={originalImageSrc} alt="Original" className="object-contain" fill sizes="(max-width: 768px) 100vw, 50vw" />}
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
                                    <Image src={processedImageSrc} alt="Processed" className="object-contain" fill sizes="(max-width: 768px) 100vw, 50vw" />
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

export { BackgroundRemoverTool };