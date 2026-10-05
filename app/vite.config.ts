import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// base './' keeps asset paths relative, so the build works on GitHub Pages (project page or custom domain).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  // the built site goes to the repository root, which GitHub Pages serves
  build: { outDir: "..", emptyOutDir: false },
})
