import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" permite publicar dist/ en GitHub Pages o abrirla desde cualquier ruta.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        // Separa las librerías grandes para que el navegador las cachee por su cuenta.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("motion") || id.includes("framer")) return "animacion";
          if (id.includes("@mantine") || id.includes("@floating-ui")) return "mantine";
          if (id.includes("prism-react-renderer")) return "codigo";
          if (id.includes("@tabler")) return "iconos";
          if (id.includes("react")) return "react";
        },
      },
    },
  },
});
