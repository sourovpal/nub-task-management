import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: [
            {
                find: "vue",
                replacement: fileURLToPath(
                    new URL(
                        "node_modules/vue/dist/vue.esm-bundler.js",
                        import.meta.url
                    )
                ),
            },
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
            {
                find: "@components",
                replacement: fileURLToPath(
                    new URL("./resources/js/components", import.meta.url)
                ),
            },
            {
                find: "@helpers",
                replacement: fileURLToPath(
                    new URL("./resources/js/helpers", import.meta.url)
                ),
            },
            {
                find: "@stores",
                replacement: fileURLToPath(
                    new URL("./resources/js/stores", import.meta.url)
                ),
            },
            {
                find: "@routers",
                replacement: fileURLToPath(
                    new URL("./resources/js/routers", import.meta.url)
                ),
            },
            {
                find: "@views",
                replacement: fileURLToPath(
                    new URL("./resources/js/views", import.meta.url)
                ),
            },
            {
                find: "@types",
                replacement: fileURLToPath(
                    new URL("./resources/js/types", import.meta.url)
                ),
            },
            {
                find: "@plugins",
                replacement: fileURLToPath(
                    new URL("./resources/js/plugins", import.meta.url)
                ),
            },
            {
                find: "@services",
                replacement: fileURLToPath(
                    new URL("./resources/js/services", import.meta.url)
                ),
            },
        ],
    },
});
