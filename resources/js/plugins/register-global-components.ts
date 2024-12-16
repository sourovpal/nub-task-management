import type { App } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import form from "@components/form";
import router from "../routers/index";
import { createPinia } from "pinia";

export default async function registerGlobalComponents(app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
        },
    });

    Object.entries(form).forEach(([name, component]) => {
        app.component(name, component);
    });

    app.use(createPinia());
    app.use(router);
}
