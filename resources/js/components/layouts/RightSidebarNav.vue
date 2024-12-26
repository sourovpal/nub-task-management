<script setup lang="ts">
import SidebarBrand from "./SidebarBrand.vue";
import SidebarMenus from "./SidebarMenus.vue";
</script>

<template>
  <section
    id="right-sidebar-nav"
    class="px-4 min-w-[18rem] w-[18rem] border-r border-gray-200 h-screen sticky top-0 bg-white"
  >

    <sidebar-brand />

    <sidebar-menus />

  </section>
</template>