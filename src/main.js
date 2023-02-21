import { createApp, ref } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";

import "@/assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(vuetify);

app.provide("drawer", ref(false));
app.provide("theme", ref(vuetify.theme.global.name));

app.mount("#app");
