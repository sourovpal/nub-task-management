<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import AddNewTask from "./AddNewTask.vue";
import Http from "@services";
import { AxiosResponse } from "axios";

const props = defineProps({
  status: { type: Object },
  handleFetchTask: { type: Function, default: () => {} },
});

const is_open = ref<Boolean>(false);
</script>

<template>
  <add-new-task
    v-if="is_open"
    v-model:visible="is_open"
    :status-id="status?.id"
    @fetchTasks="handleFetchTask"
  />

  <div
    :class="status.color"
    class="flex items-center justify-between shadow-sm rounded-lg py-2 px-4 block mb-5"
  >
    <h2 class="text-md font-semibold">
      {{ status.name }}
      <span class="px-1">(10)</span>
    </h2>
    <div @click="is_open = true" class="px-2 py-1 cursor-pointer">
      <i class="pi pi-plus"></i>
    </div>
  </div>
</template>