import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  root: "frontend", // tells Vite where the frontend actually is
  server: {
    host: "localhost",
    port: 5173, // default port Vite uses
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend/src"), // Correct path
    },
  },
}));