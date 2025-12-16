import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/api": {
    //     target: loadEnv("", process.cwd()).VITE_API_URL,
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver(),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver(),
      // 自动注册图标组件
      IconsResolver({
        
        enabledCollections: ["ep"],
      }),
      ],
    }),
    Icons({ 
      autoInstall: true,
      
    }),
  ],
  
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
