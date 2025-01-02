<script setup lang="ts">
import RightSidebarNav from "./RightSidebarNav.vue";
import TopHeaderToolsBar from "./TopHeaderToolsBar.vue";
import ContainerBody from "./ContainerBody.vue";
import Toast from "primevue/toast";
</script>

<template>
  <main class="flex">
    <Toast group="bc" position="bottom-center" />
    <right-sidebar-nav />
    <section class="flex flex-col overflow-x-hidden w-full">
      <top-header-tools-bar />
      <container-body />
    </section>
  </main>
</template>

