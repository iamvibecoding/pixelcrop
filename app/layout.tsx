import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css"; // Ensure this file exists

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
const mainLogoForSocial = `${siteUrl}/pixelcrop-logo.jpg`; // Keep for social media
const organizationLogo = `${siteUrl}/pixelcrop-logo-square.png`; // New square logo for Google

// --- Metadata ---
export const metadata: Metadata = {
  title: {
    default: "Pixelcrop AI – Fast, Private AI Background Remover",
    template: "%s | Pixelcrop AI",
  },
  description:
    "Remove image backgrounds online—fast, precise, and privacy-first.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Pixelcrop AI – Fast, Private AI Background Remover",
    description:
      "Remove image backgrounds online—fast, precise, and privacy-first.",
    url: siteUrl,
    siteName: "Pixelcrop AI",
    images: [
      {
        url: mainLogoForSocial,
        width: 1200,
        height: 630,
        alt: "Pixelcrop AI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelcrop AI – Fast, Private AI Background Remover",
    description:
      "Remove image backgrounds online—fast, precise, and privacy-first.",
    creator: twitterHandle,
    images: [mainLogoForSocial],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// --- Root Layout Component ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // --- JSON-LD: Organization ---
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Pixelcrop AI",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: organizationLogo, // Changed to square logo
      width: 512, // Square dimensions for Google
      height: 512, // Square dimensions for Google
    },
    sameAs: ["https://github.com/iamvibecoding/pixelcrop"],
  };

  // --- JSON-LD: WebSite ---
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Pixelcrop AI",
    description:
      "Remove image backgrounds online—fast, precise, and privacy-first.",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // --- JSON-LD: Software Application ---
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pixelcrop AI – Background Remover",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, iOS, Android, macOS, Windows",
    url: siteUrl,
    image: mainLogoForSocial,
    description:
      "AI background remover for PNG/JPEG/WebP with high-fidelity cutouts and instant downloads.",
    softwareVersion: "1.0.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
    },
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };

  return (
    <html lang="en">
      <head>
        {/* --- Structured Data (JSON-LD) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd),
          }}
        />

        {/* --- Google Analytics (optional) --- */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* --- Page Content --- */}
        {children}
      </body>
    </html>
  );
}
