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

      Object.assign(props.status, {
        ...props.status,
        tasks_count: _pagination?.total ?? 0,
      });
    })
    .catch(() => {})
    .finally(() => {});
}

onMounted(() => handleFetchTask());

const listRef = ref(null);

function handleDrop() {
  const items = listRef.value?.querySelectorAll(".task");
  const tasks_id = [];

  items.forEach((item, index) => {
    let id = item.getAttribute("data-id");
    if (id) tasks_id.push(id);
  });

  const attributes = {
    tasks: tasks_id,
    status_id: props.status?.id,
  };

  Http.kanban
    .updatePosition(attributes)
    .then(() => {
      handleFetchTask(true);
    })
    .catch(() => {})
    .finally(() => {});
}

const handleFetchTaskDelay = useDebounceFn(() => handleFetchTask(true), 100);
</script>

<template>
  <div class="p-4 whitespace-normal bg-gray-200 columns w-[20rem]">
    <Status :status="status" :handleFetchTask="handleFetchTask" />

    <section-scroll-bar
      :auto-height="false"
      style="height: 85vh"
      class="drag-over"
    >
      <div
        :key="`${tasks?.length}-${status?.id}`"
        ref="listRef"
        :id="`status-${status?.id}`"
        class="task-list pt-4 h-full"
        @dragover.stop="kanbanStore.handleDragOver($event, handleFetch)"
        @dragend="handleDrop"
      >
        <task
          v-for="item in tasks"
          :task="item"
          :key="item.id"
          :data-id="item.id"
          :data-position="item.position"
          @handleFetch="handleFetchTaskDelay"
        />
      </div>
    </section-scroll-bar>
  </div>
</template>