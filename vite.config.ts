import { fileURLToPath, URL } from "node:url";
import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue(), vueI18n({
  include: path.resolve(__dirname, "./path/to/src/locales/**")
 })],
 resolve: {
  alias: {
   "@": fileURLToPath(new URL("./src", import.meta.url))
  }
 },
 server: {
  proxy: {
   "/api/": {
    target: "http://localhost:8090/",
    changeOrigin: true,
    secure: false,
    rewrite: path => path.replace("/api", "")
   }
  }
 }
});
