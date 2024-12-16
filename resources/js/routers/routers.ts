import type { RouteRecordRaw } from "vue-router";
import { isAuthorized } from "@helpers";

function checkPermissions() {
    return !0;
}

const routes: Array<RouteRecordRaw> = [
    {
        name: "login",
        path: "/login",
        component: () => import("@views/auth/LoginPage.vue"),
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@views/auth/RegisterPage.vue"),
    },
    {
        name: "forgot",
        path: "/forgot",
        component: () => import("@views/auth/ForgotPage.vue"),
    },
    {
        name: "reset",
        path: "/reset",
        component: () => import("@views/auth/ResetPage.vue"),
    },
    {
        name: "root",
        path: "/",
        component: () => import("@components/layouts/MasterPage.vue"),
        beforeEnter: () => isAuthorized(),
        children: [
            {
                name: "dashboard",
                path: "/",
                component: () => import("@views/dashboard/DashboardPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
        ],
    },
];

export default routes;
