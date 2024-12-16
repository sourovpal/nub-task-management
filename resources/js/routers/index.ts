import routes from "./routers";
import { createRouter, createWebHistory } from "vue-router";
import { useEnv } from "@helpers";

const router = createRouter({
    history: createWebHistory(useEnv("base_url")),
    routes,
});

export function usePush(to: any) {
    router.push(to);
}

export default router;
