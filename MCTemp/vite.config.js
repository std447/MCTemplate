import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const wwwRootDir = resolve(__dirname, "wwwroot");



export default defineConfig({
    appType: 'custom',
    root: `${resolve(wwwRootDir,"src")}`,
    publicDir:false,
    build: {
        manifest: true,
        emptyOutDir: true,
        outDir: '../dist',
        assetsDir:"",
        rollupOptions: {
            input: {
                main:`${resolve(wwwRootDir,"src","main.js")}`,
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    plugins: [
        tailwindcss(),
    ],
});