import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// // https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {

  const devOnlyBaseURL = import.meta?.env?.VITE_DEV_ONLY_BASE_URL || "http://localhost:5000";
  const prodBaseURL = import.meta?.env?.VITE_PROD_BASE_URL || process?.env?.VITE_PROD_BASE_URL || "https://www.face-rec-app.yatrik.dev";

  const baseURL = mode !== "production" ? prodBaseURL : devOnlyBaseURL

  return {
    plugins: [react()],
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      manifest: true
    },
    server: {
      proxy: {
        "/api": {
          target: `${baseURL}/api`
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  };
});
