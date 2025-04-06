import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global:true,
        process:true,
      },
      protocolImports:true
    }),
  ],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", secure: false }, // replace with your backend server}
    },
  },
});
