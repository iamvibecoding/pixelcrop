/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // *** THIS IS THE KEY PART ***
        // Map Tailwind's 'font-sans' to use your Poppins variable first.
        // It will fall back to Geist (from layout) or system sans-serif if Poppins isn't available.
        sans: ['var(--font-poppins)', 'var(--font-geist-sans)', 'sans-serif'],
        
        // Keep Geist available if needed elsewhere
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      // Your other theme extensions (animations, colors, etc.)
      animation: {
          blob: 'blob 7s infinite',
      },
      keyframes: {
          blob: {
              '0%': { transform: 'translate(0px, 0px) scale(1)', opacity: 0.7 },
              '33%': { transform: 'translate(30px, -50px) scale(1.1)', opacity: 0.6 },
              '66%': { transform: 'translate(-20px, 20px) scale(0.9)', opacity: 0.8 },
              '100%': { transform: 'translate(0px, 0px) scale(1)', opacity: 0.7 },
          },
      },
    },
  },
  plugins: [],
}