<script setup lang="ts">
import { reactive } from "vue";

const menus = reactive<
  ReadonlyArray<{
    icon?: string;
    label: string;
    type: "menu" | "divider";
    url?: string;
  }>
>([
  { label: "Dashboard", type: "divider" },
  { icon: "pi pi-home", label: "Home", url: "/", type: "menu" },
  { label: "Projects & Tasks", type: "divider" },
  { icon: "pi pi-objects-column", label: "Projects", url: "/projects", type: "menu" },
  { icon: "pi pi-qrcode", label: "Archive", url: "/", type: "menu" },
  { icon: "pi pi-calendar-clock", label: "Calendars", url: "/", type: "menu" },
  { icon: "pi pi-chart-line", label: "Reports", url: "/", type: "menu" },
  { label: "Users & Access", type: "divider" },
  { icon: "pi pi-sitemap", label: "Departments", url: "/departments", type: "menu" },
  { icon: "pi pi-users", label: "Users", url: "/users", type: "menu" },
  { icon: "pi pi-lock", label: "User Roles", url: "/", type: "menu" },
  { label: "Settings", type: "divider" },
  { icon: "pi pi-user", label: "Profile", url: "/", type: "menu" },
  { icon: "pi pi-cog", label: "Settings", url: "/", type: "menu" },
]);
</script>

<template>
  <div>
    <ul class="mt-3">
      <template v-for="menu in menus" :key="menu.label">
        <li
          v-if="menu.type == 'menu'"
          class="flex py-2 cursor-pointer px-3 hover:bg-gray-200 rounded-md"
        >
          <router-link :to="{ path: menu.url }" class="flex items-center grow">
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