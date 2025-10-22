// app/layout.tsx
import './globals.css'; // <-- MUST BE THE FIRST IMPORT
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';

// Font setup
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins', // Creates CSS variable '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Pixelcrop - Free AI Background Remover',
  description: 'Instantly remove the background from any image with a single click, powered by cutting-edge AI. 100% automatically and free.',
  // Add more metadata if needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply font variable to body, use 'font-sans' utility class */}
      <body className={`${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}