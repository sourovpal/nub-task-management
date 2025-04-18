import type { App } from "vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import form from "@components/Form";
import button from "@components/Button";
import router from "../routers/index";
import { createPinia } from "pinia";
import HeaderToolsBar from "@components/layouts/HeaderToolsBar.vue";
import SectionScrollBar from "@components/layouts/SectionScrollBar.vue";
import ToastService from "primevue/toastservice";
import ActionMenu from "@components/Menus/ActionMenu.vue";
import CustomModal from "@components/Modals/CustomModal.vue";
import { QuillEditor } from "@vueup/vue-quill";
import CustomScroll from "@components/layouts/CustomScroll.vue";

import {
    AvatarGroup,
    Avatar,
    Button,
    Menu,
    Dialog,
    Textarea,
    ScrollPanel,
    ColorPicker,
} from "primevue";

export default function registerGlobalComponents(app: App) {
    app.use(createPinia());
    app.use(ToastService);
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

    // PrimeVue components
    app.component("AvatarGroup", AvatarGroup);
    app.component("Avatar", Avatar);
    app.component("Button", Button);
    app.component("Menu", Menu);
    app.component("Dialog", Dialog);
    app.component("Textarea", Textarea);
    app.component("CustomScroll", CustomScroll);

    // Custom components
    app.component("SectionScrollBar", SectionScrollBar);
    app.component("HeaderToolsBar", HeaderToolsBar);
    app.component("ScrollPanel", ScrollPanel);
    app.component("ActionMenu", ActionMenu);
    app.component("CustomModal", CustomModal);
    app.component("ColorPicker", ColorPicker);
    app.component("QuillEditor", QuillEditor);

    app.use(router);
}
