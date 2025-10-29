import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@redux": path.resolve(__dirname, "./src/redux"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@myTypes": path.resolve(__dirname, "./src/@types"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@/features": path.resolve(__dirname, "./src/features"),
            "@/core": path.resolve(__dirname, "./src/core"),
        },
    },
});
