<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";
import Column from "./Column.vue";
import AddColumn from "./AddColumn.vue";
import { storeToRefs } from "pinia";
import { kanbanStore } from "@stores";
import { useRoute } from "vue-router";

const items = [
  { style_class: "bg-blue-500 text-white" },
  { style_class: "bg-red-500 text-white" },
  { style_class: "bg-green-500 text-white" },
  { style_class: "bg-orange-500 text-white" },
  { style_class: "bg-yellow-500 text-white" },
];

const { statuses } = storeToRefs(kanbanStore);

const route = useRoute();

onMounted(() => kanbanStore.handleFetchStatus(route.params.id));
</script>

<template>
  <section-scroll-bar
    :auto-height="false"
    style="height: 88vh"
    id="captureArea"
    class="kanban-body-scroll"
  >
    <div class="whitespace-nowrap w-full">
      <div class="grid grid-flow-col auto-cols-[20rem] gap-0">
        <column v-for="item in statuses" :key="item.id" :status="item" />
        <add-column />
      </div>
    </div>
  </section-scroll-bar>
</template>
<style lang="scss">
</style>