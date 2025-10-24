// app/components/client/BackgroundRemoverTool.tsx

"use client";
import { useState, useCallback, useRef, memo } from "react";
import Image from "next/image";

/* ========== UI ICONS ========== */
const Spinner = memo(() => (
  // CHANGED: Made spinner smaller on mobile
  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
    <div className="absolute inset-0 border-4 border-transparent border-t-[#F25912] border-r-[#F25912] rounded-full animate-spin"></div>
    <div
      className="absolute inset-2 border-4 border-transparent border-b-[#F25912] border-l-[#F25912] rounded-full animate-spin"
      style={{ animationDirection: "reverse", animationDuration: "1s" }}
    />
  </div>
));
Spinner.displayName = "Spinner";

const UploadIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
));
UploadIcon.displayName = "UploadIcon";

const DownloadIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
));
DownloadIcon.displayName = "DownloadIcon";

const CloseIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const SparklesIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" />
    <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" />
  </svg>
));
SparklesIcon.displayName = "SparklesIcon";

/* ========== MAIN COMPONENT ========== */
export default function BackgroundRemoverTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- helpers ---------- */
  const resetState = useCallback(() => {
    setImageFile(null);
    setOriginalImageSrc(null);
    setProcessedImageSrc(null);
    setIsLoading(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file) return;
      setError(null);
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setError("Invalid file type. Please select a PNG, JPEG, or WEBP image.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File is too large. Please select an image under 10MB.");
        return;
      }
      resetState();
      setImageFile(file);
      setOriginalImageSrc(URL.createObjectURL(file));
    },
    [resetState]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleRemoveBackground = useCallback(async () => {
    if (!imageFile) {
      setError("No image file found. Please select an image first.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      setError("Client API Key is not configured. Please contact support.");
      console.error("Error: NEXT_PUBLIC_API_KEY is not set in .env.local");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/remove-background", {
        method: "POST",
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        let message: string;
        try {
          const json = await response.json();
          if (response.status === 401) {
            message = "Authentication failed. Please check your API Key.";
          } else {
            message = json.error || `Server error: ${response.status}`;
          }
        } catch {
          try {
            const text = await response.text();
            message = text || `Server error: ${response.status}`;
          } catch {
            message = `Server error: ${response.status}`;
          }
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      if (blob.size === 0) throw new Error("Processing failed: The server returned an empty result.");
      setProcessedImageSrc(URL.createObjectURL(blob));
    } catch (err: unknown) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message.includes("Failed to fetch")
          ? "Network error. Please check your connection and try again."
          : err.message;
      } else if (typeof err === "string") msg = err;
      else msg = "An unexpected error occurred. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  const handleDownload = useCallback(() => {
    if (!processedImageSrc) return;
    const a = document.createElement("a");
    a.href = processedImageSrc;
    const originalName = imageFile?.name.split(".").slice(0, -1).join(".") || "image";
    a.download = `${originalName}-no-bg.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [processedImageSrc, imageFile]);

  /* ----- robust DnD ----- */
  const cancel = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  /* ---------- layout ---------- */
  return (
    <div className="w-full flex items-center justify-center px-4">
      
      {/* --- CHANGE 1: Removed md:scale-100 --- */}
      <div className="w-full origin-center scale-95">
        <main
          className="
            /* --- CHANGE 2: Reduced max-width values --- */
            w-full max-w-full sm:max-w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl
            mx-auto
            bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50
            p-5 sm:p-6 md:p-9
            border border-gray-200/50
            relative overflow-hidden
          "
        >
          {/* ambient blobs (non-interactive) */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob pointer-events-none" />
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-[#F25912]/20 to-[#F25912]/20 rounded-full blur-3xl animate-blob pointer-events-none"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10">
            {error && (
              <div
                className="bg-orange-100 border border-orange-400 text-orange-700 px-5 py-4 rounded-2xl relative mb-6 flex items-center gap-3 animate-slideDown shadow-lg shadow-orange-100/50"
                role="alert"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                <div>
                  <strong className="font-bold">Error: </strong>
                  {/* NOTE: This was already well-optimized for mobile! */}
                  <span className="block sm:inline">{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:bg-orange-200/50 rounded-r-2xl transition-colors"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            )}

            {!originalImageSrc ? (
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragExit={cancel}
                // CHANGED: Reduced padding on mobile
                className={`flex flex-col items-center justify-center p-8 sm:p-14 border-2 border-dashed rounded-3xl transition-all duration-300 relative overflow-hidden ${
                  isDragging ? "border-[#F25912] bg-orange-50 scale-105" : "border-gray-300 hover:border-gray-400 bg-gray-50/50"
                }`}
              >
                <div className={`transition-all duration-300 ${isDragging ? "scale-110" : "scale-100"}`}>
                  {/* CHANGED: Smaller icon box on mobile */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#F25912] to-[#F25912] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#F25912]/30">
                    {/* CHANGED: Smaller icon on mobile */}
                    <UploadIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>

                {/* CHANGED: Smaller heading on mobile */}
                <h2 className="text-center text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-[#1D1616] to-[#F25912] bg-clip-text text-transparent">
                  Drag & Drop Image Here
                </h2>
                {/* CHANGED: Smaller text and margin on mobile */}
                <p className="text-gray-500 mb-6 sm:mb-8 text-center text-sm sm:text-base">Supports PNG, JPEG, WebP (max 10MB)</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  // CHANGED: Smaller padding on mobile
                  className="group relative bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#F25912] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-3 px-6 sm:py-3.5 sm:px-9 rounded-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#F25912]/50 shadow-xl shadow-[#F25912]/30"
                >
                  <span className="relative z-10">Select Image</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* NOTE: This grid was already perfectly responsive! */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Original */}
                  <div className="flex flex-col items-center group">
                    <h3 className="text-lg font-semibold text-[#1D1616] mb-4">Original</h3>
                    <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200/50 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center p-5 relative">
                      {originalImageSrc && (
                        <Image src={originalImageSrc} alt="Original" className="object-contain" fill sizes="(max-width: 768px) 100vw, 50vw" />
                      )}
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex flex-col items-center group">
                    <h3 className="text-lg font-semibold text-[#1D1616] mb-4">Result</h3>
                    <div
                      className="w-full aspect-square rounded-3xl overflow-hidden flex items-center justify-center relative border border-gray-200/50 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-300 group-hover:scale-[1.02] p-5"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' x='0' y='0' fill='%23f3f4f6'/%3E%3Crect width='10' height='10' x='10' y='10' fill='%23f3f4f6'/%3E%3Crect width='10' height='10' x='0' y='10' fill='white'/%3E%3Crect width='10' height='10' x='10' y='0' fill='white'/%3E%3C/svg%3E\")",
                      }}
                    >
                      {isLoading && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center z-20">
                          <Spinner />
                          {/* CHANGED: Smaller text and margin on mobile */}
                          <p className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-[#F25912] to-[#F25912] bg-clip-text text-transparent animate-pulse">
                            Processing Magic...
                          </p>{/* --- THIS IS THE FIX --- */}
                        </div>
                      )}

                      {processedImageSrc && !isLoading && (
                        <Image src={processedImageSrc} alt="Processed" className="object-contain" fill sizes="(max-width: 768px) 100vw, 50vw" />
                      )}

                      {!processedImageSrc && !isLoading && (
                        <div className="text-center text-gray-400 p-4 flex flex-col items-center gap-3">
                          {/* CHANGED: Smaller icon on mobile */}
                          <SparklesIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" />
                          {/* CHANGED: Smaller text on mobile */}
                          <p className="font-medium text-sm sm:text-base">Ready for transformation</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {/* NOTE: This flex-wrap was already perfectly responsive! */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                  <button
                    onClick={handleRemoveBackground}
                    disabled={isLoading || processedImageSrc !== null}
                    // CHANGED: Smaller padding on mobile
                    className="group relative bg-gradient-to-r from-[#F25912] via-[#F25912] to-[#F25912] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold py-3 px-6 sm:py-3.5 sm:px-9 rounded-2xl transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 disabled:hover:shadow-xl hover:shadow-2xl hover:shadow-[#F25912]/50 shadow-xl shadow-[#F25912]/30"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? "Processing..." : <><SparklesIcon /> Remove Background</>}
                    </span>
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={!processedImageSrc || isLoading}
                    // CHANGED: Smaller padding on mobile
                    className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-[#F25912] hover:bg-white text-[#1D1616] font-bold py-3 px-6 sm:py-3.5 sm:px-9 rounded-2xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50"
                  >
                    <DownloadIcon className="w-5 h-5 group-hover:animate-bounce" /> Download
                  </button>

                  <button
                    onClick={resetState}
                    // CHANGED: Smaller padding on mobile
                    className="bg-transparent text-gray-500 hover:text-gray-800 font-semibold py-3 px-6 sm:py-3.5 sm:px-8 rounded-2xl transition-all duration-200 hover:bg-gray-200/50"
                  >
                    Upload New
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}