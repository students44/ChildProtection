/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#EC4899', // Pink 500
        accent: '#8B5CF6', // Violet 500
        background: '#F3F4F6', // Gray 100
        surface: '#FFFFFF',
        text: '#1F2937', // Gray 800
        'text-light': '#6B7280', // Gray 500
        danger: '#EF4444', // Red 500
        success: '#10B981', // Emerald 500
        warning: '#F59E0B', // Amber 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
