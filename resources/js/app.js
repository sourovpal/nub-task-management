// import "./bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import registerGlobalComponents from "@plugins/register-global-components";
import "../css/app.css";
import { setAuthorizationHeader } from "@services/clients";

const app = createApp(App, {});

setAuthorizationHeader();
registerGlobalComponents(app);

app.mount("#app");
