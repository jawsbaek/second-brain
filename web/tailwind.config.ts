import type { Config } from "tailwindcss";
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: { extend: { borderRadius: { xl: "0.9rem", "2xl": "1.25rem" } } },
  plugins: [],
} satisfies Config;
