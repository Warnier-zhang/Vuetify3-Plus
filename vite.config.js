// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

// Utilities
import {defineConfig} from 'vite';
import {fileURLToPath, URL} from 'node:url';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
        ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
    ],
    define: {'process.env': {}},
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    build: {
        minify: false,
        lib: {
            entry: './src/lib.js',
            name: 'Vuetify3Plus',
            fileName: 'vuetify3-plus',
        },
        rollupOptions: {
            external: [
                "axios",
                "v-viewer",
                "viewerjs",
                "vue",
                "vue-axios",
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    axios: 'Axios',
                },
            },
        },
    },
    server: {
        proxy: {
            '/api/file-explorer': {
                target: 'http://localhost:28080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/file-explorer/, ''),
            },
        }
    },
})
