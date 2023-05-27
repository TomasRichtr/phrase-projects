import i18n from "@/i18n";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import "./index.css";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount("#app");
