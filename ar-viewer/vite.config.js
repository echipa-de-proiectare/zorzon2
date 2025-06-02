import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 5174,
    // Allow requests from arbitrary Host headers (e.g. Caddy’s proxy)
    // In Vite v4+, “host: true” is enough; in older versions, you can use allowedHosts
    // host: true,
    strictPort: true,
    cors: true,
    host: true,
  },
});
