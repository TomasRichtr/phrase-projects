import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import cs from "./locales/cs.json";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

export const i18n = createI18n({
 locale: "en",
 messages: {
  en,
  cs
 }
});

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount("#app");
