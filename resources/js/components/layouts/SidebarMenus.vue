<script setup lang="ts">
import { reactive } from "vue";

const menus = reactive<
  ReadonlyArray<{
    icon?: string;
    label: string;
    type: "menu" | "divider";
    url?: string;
    query?: Object;
  }>
>([
  { label: "Dashboard", type: "divider" },
  { icon: "pi pi-home", label: "Home", url: "/", query: {}, type: "menu" },
  { label: "Projects & Tasks", type: "divider" },
  {
    icon: "pi pi-objects-column",
    label: "Projects",
    url: "/projects",
    query: {},
    type: "menu",
  },
  {
    icon: "pi pi-qrcode",
    label: "Archived",
    url: "/projects",
    query: { type: "archived" },
    type: "menu",
  },
  {
    icon: "pi pi-table",
    label: "Kanban",
    url: "/projects",
    query: { type: "kanban" },
    type: "menu",
  },
  {
    icon: "pi pi-calculator",
    label: "Cost Calculate",
    url: "/projects",
    query: { type: "calculate" },
    type: "menu",
  },
  {
    icon: "pi pi-file-plus",
    label: "Notes",
    url: "/projects",
    query: { type: "notes" },
    type: "menu",
  },
  {
    icon: "pi pi-calendar-clock",
    label: "Task Scheduler",
    url: "/schedulers",
    query: {},
    type: "menu",
  },
  {
    icon: "pi pi-chart-line",
    label: "Reports",
    url: "/reports",
    query: {},
    type: "menu",
  },
  { label: "Users & Access", type: "divider" },
  {
    icon: "pi pi-sitemap",
    label: "Departments",
    url: "/departments",
    query: {},
    type: "menu",
  },
  {
    icon: "pi pi-users",
    label: "Users",
    url: "/users",
    query: {},
    type: "menu",
  },
  // {
  //   icon: "pi pi-lock",
  //   label: "User Roles",
  //   url: "/",
  //   query: {},
  //   type: "menu",
  // },
  // { label: "Settings", type: "divider" },
  // { icon: "pi pi-user", label: "Profile", url: "/", query: {}, type: "menu" },
  // { icon: "pi pi-cog", label: "Settings", url: "/", query: {}, type: "menu" },
]);
</script>

<template>
  <div>
    <ul class="mt-3">
      <template v-for="menu in menus" :key="menu.label">
        <li v-if="menu.type == 'menu'" class="flex">
          <router-link
            :to="{ path: menu.url, query: menu.query }"
            class="flex items-center grow py-2 px-3 hover:bg-gray-200 rounded-md"
          >
            <div id="icon" class="w-[1.5rem] flex items-center">
              <i :class="menu.icon" class="text-gray-700"></i>
            </div>

            <div id="label" class="text-gray-700">
              {{ menu.label }}
            </div>
          </router-link>
        </li>
        <li
          v-if="menu.type == 'divider'"
          class="pt-3 pb-2 px-0 text-xs text-gray-700"
        >
          {{ menu.label }}
        </li>
      </template>
    </ul>
  </div>
</template>