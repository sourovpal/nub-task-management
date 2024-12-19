// import "./bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import registerGlobalComponents from "@plugins/register-global-components";
import "../css/app.css";

const app = createApp(App, {});

registerGlobalComponents(app);

app.mount("#app");
