import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // Tell Vite to accept *any* Host header
    host: true,
    port: 5174,
    strictPort: true,
    cors: true,
  },
});
