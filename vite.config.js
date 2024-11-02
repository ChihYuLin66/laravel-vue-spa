import {defineConfig, loadEnv} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig((({command, mode}) => {

    // 取得 .env 的資訊
    const env = loadEnv(mode, process.cwd(), '');

    return {
        server: {
            host: '0.0.0.0',
            port: 5173,
            strictPort: true,
            hmr: {
                host: env.APP_DOMAIN || 'localhost',
                port: 5173,
            },
            watch: {
                usePolling: true,
            },
        },
        // server: {
        //     port,
        //     hmr,
        //
        //     watch: {
        //         usePolling: true
        //     }
        // },
        plugins: [
            laravel({
                input: [
                    'resources/js/main-app.js',
                    'resources/js/admin-app.js',
                ],
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
            alias: {
                '@': '/resources',
            },
        },
    }
}));