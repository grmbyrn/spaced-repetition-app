import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'stripe-blue': '#635BFF',
        'stripe-purple': '#845BFF',
        'stripe-gray': '#F6F9FC',
        'stripe-dark': '#0A1128',
      },
    },
  },
  plugins: [],
};

export default config;
