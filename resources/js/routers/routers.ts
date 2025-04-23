import type { RouteRecordRaw } from "vue-router";
import { checkAuthenticated, checkUnAuthenticated } from "@stores/auth";
import { usePush } from ".";

function checkPermissions() {
    return !0;
}

const routes: Array<RouteRecordRaw> = [
    {
        name: "login",
        path: "/login",
        component: () => import("@views/auth/LoginPage.vue"),
        beforeEnter: () => checkUnAuthenticated("/"),
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@views/auth/RegisterPage.vue"),
        beforeEnter: () => checkUnAuthenticated("/"),
    },
    {
        name: "forgot",
        path: "/forgot",
        component: () => import("@views/auth/ForgotPage.vue"),
        beforeEnter: () => checkUnAuthenticated("/"),
    },
    {
        name: "reset",
        path: "/reset",
        component: () => import("@views/auth/ResetPage.vue"),
        beforeEnter: () => checkUnAuthenticated("/"),
    },
    {
        name: "root",
        path: "/",
        component: () => import("@components/layouts/MasterPage.vue"),
        beforeEnter: () => checkAuthenticated("/login"),
        children: [
            {
                name: "dashboard-index-page",
                path: "/",
                component: () => import("@views/dashboard/DashboardPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "project-index-page",
                path: "/projects",
                component: () => import("@views/projects/ProjectIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "board-index-page",
                path: "/projects/:id/board",
                component: () => import("@views/board/BoardIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "quotation-index-page",
                path: "/projects/:id/quotation",
                component: () => import("@views/quotation/QuotationIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "schedulers-index-page",
                path: "/schedulers",
                component: () =>
                    import("@views/scheduler/SchedulerIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "users-index-page",
                path: "/users",
                component: () => import("@views/user/UserIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "departments-index-page",
                path: "/departments",
                component: () =>
                    import("@views/department/DepartmentIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
        ],
    },
];

export default routes;
