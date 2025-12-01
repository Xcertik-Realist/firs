import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          700: "#166534",
          900: "#14532d",
        },
      },
    },
  },
  plugins: [],
};

export default config;

**File 5 – `.gitignore`**
gitignore
# Dependencies
node_modules/
.next/
.out/

# Environment
.env
.env.local

# Private data
private/
salesman.txt
waitlist.txt

# Vercel
.vercel

# Misc
.DS_Store

Reply **next** for files 6 & 7
