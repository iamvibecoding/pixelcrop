import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: allow importing global CSS in Next.js layout
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = "https://pixelcrop.app"; // change to your canonical domain
  const logoUrl = `${siteUrl}/pixelcrop-logo.jpg`; // update if different
  const twitter = "@pixelcrop"; // optional, if you have one

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebSite", "Organization"],
    "@id": `${siteUrl}#website`,
    "url": siteUrl,
    "name": "Pixelcrop",
    "description": "Remove image backgrounds online—fast, precise, and privacy‑first.",
    "inLanguage": "en",
    "logo": {
      "@type": "ImageObject",
      "url": logoUrl
    },
    "sameAs": [
      "https://github.com/iamvibecoding/pixelcrop"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixelcrop – Background Remover",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "url": siteUrl,
    "image": logoUrl,
    "description": "AI background remover for PNG/JPEG/WebP with high‑fidelity cutouts and instant downloads.",
    "softwareVersion": "1.0.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Free"
    }
    // Optionally add aggregateRating and review if/when you have real data:
    // "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "127" }
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c")
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd).replace(/</g, "\\u003c")
          }}
        />
        {children}
      </body>
    </html>
  );
}
