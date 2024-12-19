import type { App } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import form from "@components/Form";
import router from "../routers/index";
import { createPinia } from "pinia";

export default function registerGlobalComponents(app: App) {
    app.use(createPinia());

    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: "white",
            },
        },
    });

    Object.entries(form).forEach(([name, component]) => {
        app.component(name, component);
    });

    app.use(router);
}
