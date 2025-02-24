import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// import { generatedotNetCertificate } from "./Src/js/certs.js";

export default defineConfig(async ({ mode }) => {
  console.log(`Configuring Vite for ${mode} mode`);
  const config = {
    apptype: "custom",
    root: "Src",
    publicDir: false,
    css: {
      devSourceMap: true
    },
    plugins: [tailwindcss()],
    build: {
      outDir: "../wwwroot/dist",
      emptyOutDir: true,
      manifest: true,
      assetsDir: "",
      rollupOptions: {
        input: "Assets/main.js",
        output: {
          entryFileNames: "js/[name]-[hash:6].js",
          chunkFileNames: "js/[name]-chunk.js",
        }
      },
    },
  };

  if (mode == "development") {
    // get certificate and key
    // const { certificate, privateKey } = generatedotNetCertificate();

    config.server = {
      strictPort: true,
      hmr: {
        clientPort: 5173
      },
      //https: {
      //  cert: certificate,
      //  key: privateKey,
      //},
    };
  }
  return config;
});