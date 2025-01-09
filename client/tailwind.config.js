/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    width: ["responsive", "hover", "focus"]
}
}

