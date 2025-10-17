import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // Example primary color
        secondary: '#D0021B', // Example secondary color
        accent: '#F5A623', // Example accent color
      },
    },
  },
  plugins: [],
}

export default config
