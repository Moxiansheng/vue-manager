import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";

import axios from "./http/axios";

import "ant-design-vue/dist/antd.css";

const app = createApp(App)
    .use(store)
    .use(router)
    .use(Antd)

app.config.globalProperties.$http = axios

app.mount("#app");
