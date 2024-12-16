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
            // {
            //     find: "@http",
            //     replacement: fileURLToPath(
            //         new URL("./src/services", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@assets",
            //     replacement: fileURLToPath(
            //         new URL("./src/assets", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@views",
            //     replacement: fileURLToPath(
            //         new URL("./src/views", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@errors",
            //     replacement: fileURLToPath(
            //         new URL("./src/components/Errors", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@helpers",
            //     replacement: fileURLToPath(
            //         new URL("./src/helpers", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@utils",
            //     replacement: fileURLToPath(
            //         new URL("./src/utils", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@plugins",
            //     replacement: fileURLToPath(
            //         new URL("./src/plugins", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@stores",
            //     replacement: fileURLToPath(
            //         new URL("./src/stores", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@config",
            //     replacement: fileURLToPath(
            //         new URL("./src/config.js", import.meta.url)
            //     ),
            // },
            // {
            //     find: "@actions",
            //     replacement: fileURLToPath(
            //         new URL("./src/actions", import.meta.url)
            //     ),
            // },
        ],
    },
});
