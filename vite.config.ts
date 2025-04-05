/// <reference types="vitest" />
import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/combat-ratio-calc',
    test: {
        environment: "jsdom",
    },
    plugins: [
        preact(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Combat Ratio Calc",
                short_name: 'combat-ratio-calc',
                description: "Combat Ratio Calc",
                theme_color: "#FFFFE0",
                icons: [{
                    src: "pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png"
                }, {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                }, {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }, {
                    src: "maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                }]
            }
        })
    ],
})
