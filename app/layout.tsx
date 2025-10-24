import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css"; // Ensure this imports your updated globals.css

// --- Font Setup ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Constants ---
const siteUrl = "https://pixelcrop.online";
const twitterHandle = "@iamvibecoder";
const mainLogoForSocial = `${siteUrl}/pixelcrop-logo.jpg`; // Ensure public/pixelcrop-logo.jpg exists

// --- Metadata ---
export const metadata: Metadata = {
  title: {
    default: "Pixelcrop – Fast, Private AI Background Remover",
    template: "%s | Pixelcrop",
  },
  description: "Remove image backgrounds online—fast, precise, and privacy‑first.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Pixelcrop – Fast, Private AI Background Remover",
    description: "Remove image backgrounds online—fast, precise, and privacy‑first.",
    url: siteUrl,
    siteName: "Pixelcrop",
    images: [
      {
        url: mainLogoForSocial,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelcrop – Fast, Private AI Background Remover",
    description: "Remove image backgrounds online—fast, precise, and privacy‑first.",
    creator: twitterHandle,
    images: [mainLogoForSocial],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest', // Ensure public/site.webmanifest exists and is configured
};

// --- Root Layout Component ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // --- JSON-LD Schema Data ---
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
      "url": mainLogoForSocial
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
    "image": mainLogoForSocial,
    "description": "AI background remover for PNG/JPEG/WebP with high‑fidelity cutouts and instant downloads.",
    "softwareVersion": "1.0.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Free"
    }
  };

  return (
    // Apply font variables to the HTML tag
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* <head> is managed by Next.js via the metadata object */}
      <body className={`antialiased`}> {/* Body uses CSS variables defined in globals.css */}

        {/* JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c")
          }}
          key="website-jsonld" // Added key prop
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd).replace(/</g, "\\u003c")
          }}
          key="softwareapp-jsonld" // Added key prop
        />

        {/* Google Analytics Scripts (Conditionally Rendered) */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
              key="gtag-script" // Added key prop
            />
            <Script id="google-analytics" strategy="afterInteractive" key="ga-inline-script"> {/* Added key prop */}
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}