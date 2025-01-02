<script setup>
import ToolsBar from "./sections/ToolsBar.vue";
import Tabs from "./sections/Tabs.vue";
import ReportView from "./sections/ReportView.vue";
</script>

<template>
  <tools-bar />
  <section class="grid grid-cols-10 h-full relative">
    <Tabs />
    <section-scroll-bar class="w-full col-span-8">
      <report-view />
    </section-scroll-bar>
  </section>
</template>