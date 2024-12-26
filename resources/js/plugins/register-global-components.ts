import type { App } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import form from "@components/Form";
import button from "@components/Button";
import router from "../routers/index";
import { createPinia } from "pinia";
import ScrollPanel from "primevue/scrollpanel";
import HeaderToolsBar from "@components/layouts/HeaderToolsBar.vue";
import SectionScrollBar from "@components/layouts/SectionScrollBar.vue";

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

    Object.entries(button).forEach(([name, component]) => {
        app.component(name, component);
    });

    app.component("SectionScrollBar", SectionScrollBar);
    app.component("HeaderToolsBar", HeaderToolsBar);
    app.component("ScrollPanel", ScrollPanel);

    app.use(router);
}
