import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@assets": path.resolve(__dirname, "./src/app/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@feature": path.resolve(__dirname, "./src/feature"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),
      "@shadcdn": path.resolve(__dirname, "./src/shared/shadcdn"),
    },
  },
});
