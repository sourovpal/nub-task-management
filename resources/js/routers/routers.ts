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
        // beforeEnter: () => isAuthorized(),
        children: [
            {
                name: "dashboard-index-page",
                path: "/",
                component: () => import("@views/dashboard/DashboardPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "projects-index-page",
                path: "/projects",
                component: () => import("@views/project/ProjectIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
            },
            {
                name: "tasks-index-page",
                path: "/tasks",
                component: () => import("@views/task/TaskIndexPage.vue"),
                beforeEnter: () => checkPermissions(),
                children: [
                    {
                        name: "kanban-page",
                        path: "/tasks/kanban/:id",
                        component: () =>
                            import("@views/task/kanban/KanbanPage.vue"),
                        beforeEnter: () => checkPermissions(),
                    },
                    {
                        name: "calculate-page",
                        path: "/tasks/calculate/:id",
                        component: () =>
                            import("@views/task/calculate/CalculatePage.vue"),
                        beforeEnter: () => checkPermissions(),
                    },
                    {
                        name: "notes-index-page",
                        path: "/tasks/notes/:id",
                        component: () =>
                            import("@views/task/sections/NotesPage.vue"),
                        beforeEnter: () => checkPermissions(),
                    },
                ],
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
