<script setup>
import { ref, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";
import Column from "./Column.vue";

const screenshot = ref(null);

const captureScreenshot = () => {
  nextTick(async () => {
    const canvas = await html2canvas(document.getElementById("captureArea"));
    screenshot.value = canvas.toDataURL("image/png");
  });
};

const items = [
  { style_class:'bg-blue-500 text-white'},
  { style_class:'bg-red-500 text-white'},
  { style_class:'bg-green-500 text-white'},
  { style_class:'bg-orange-500 text-white'},
  { style_class:'bg-yellow-500 text-white'},
];


</script>

<template>
  <section-scroll-bar id="captureArea" class="kanban-body-scroll">
    <div class="whitespace-nowrap w-full">
      <div class="grid grid-flow-col auto-cols-[22rem] gap-0">
        <column v-for="item in items" :key="item" :status="item"></column>
      </div>
    </div>
  </section-scroll-bar>
</template>
<style lang="scss">
</style>