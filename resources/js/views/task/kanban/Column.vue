<script setup lang="ts">
import { AxiosResponse } from "axios";
import Status from "./Status.vue";
import Task from "./Task.vue";
import { onMounted, ref } from "vue";
import Http from "@services";
import { kanbanStore } from "@stores";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  status: { type: Object },
});

const tasks = ref([]);
const pagination = ref({});

function handleFetchTask(reset = false) {
  Http.kanban
    .allTask({ status_id: props.status?.id })
    .then((res: AxiosResponse) => {
      const { tasks: _tasks, pagination: _pagination } = res.data;

      if (reset) tasks.value = _tasks;
      else tasks.value = _tasks.concat(tasks.value);

      pagination.value = _pagination;
    })
    .catch(() => {})
    .finally(() => {});
}

onMounted(() => handleFetchTask());

const handleFetch = useDebounceFn(handleFetchTask, 1000);

</script>

<template>
  <div class="p-4 whitespace-normal bg-gray-200 columns">
    <Status :status="status" :handleFetchTask="handleFetchTask" />

    <section-scroll-bar
      @dragover.stop="kanbanStore.handleDragOver($event, handleFetch)"
      :auto-height="false"
      style="height: 85vh"
      class="drag-over"
    >
      <br />
      <task v-for="item in tasks" :task="item" :key="item.id" @handleFetch="handleFetch"></task>
    </section-scroll-bar>
  </div>
</template>