import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/", // Change this from "/" to "./" for relative paths
  build: {
    outDir: "dist"
  }
});
