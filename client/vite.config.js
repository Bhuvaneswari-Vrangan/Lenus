import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/lenusapp/",
  plugins: [react()],
  server: { /* keep your existing server/proxy block */ },
});


