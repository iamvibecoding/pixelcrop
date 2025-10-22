/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tells Tailwind to scan these folders for class names
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Makes 'font-sans' use the Poppins font variable from layout.tsx
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      // Defines custom animations used in your classNames
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(0, 40px) scale(1)' },
          '75%': { transform: 'translate(-30px, -20px) scale(0.9)' },
        },
        fadeIn: { // For mobile menu
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: { // For error alert
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // Makes animation classes like 'animate-blob' work
      animation: {
        blob: 'blob 7s infinite ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.5s ease-out forwards',
        // 'spin' and 'pulse' are built-in, no need to define here
      },
      // Defines your specific brand colors for easy reuse
      colors: {
        brand: {
          primary: '#F25912', // Your main orange
          dark: '#1D1616',    // Your dark text color
          light: '#EEEEEE',   // Your light background/text color
        },
        // Allows using Tailwind classes like text-[#F25912], bg-[#1D1616] directly too
      },
      // Adds utilities for gradient button animations
      backgroundSize: {
        'size-200': '200% auto',
      },
      backgroundPosition: {
        'pos-0': '0% center',
        'pos-100': '100% center',
      },
    },
  },
  plugins: [],
};