module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}"
  ],
  theme: {
    extend: {
      // Define custom colors to match CSS variables
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))"
      }
    }
  },
  plugins: []
}
