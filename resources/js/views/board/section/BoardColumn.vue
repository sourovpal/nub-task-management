<script setup>
import TaskCard from "./TaskCard.vue";
import AddNewTaskModal from "../modals/AddNewTaskModal.vue";
import Http from "@services";
import { onMounted, ref } from "vue";
const props = defineProps({
  stage: Object,
});
const is_open = ref(false);
const tasks = ref([]);

function handleFetchTasks() {
  Http.project
    .tasksAll({ id: props.stage.id })
    .then((data) => {
      tasks.value = data;
    })
    .catch(() => {})
    .finally(() => {});
}

const menuItems = [
  {
    label: "Add Task",
    icon: "pi pi-plus",
    command: (e) => {
      is_open.value = true;
    },
  },
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    command: (e) => {},
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    command: () => {},
  },
];

onMounted(() => {
  handleFetchTasks();
});
</script>
<template>
  <AddNewTaskModal v-if="is_open" v-model:visible="is_open" @fetch="handleFetchTasks" :stage="stage" />
  <div class="min-w-[16rem] mt-6">
    <header class="grid grid-flow-col grid-cols-6 items-center mx-2.5 mb-3">
      <div class="col-span-5">
        <div
          class="inline-flex items-center ps-2 pe-3 py-0.5 border border-gray-300 rounded-md bg-gray-50"
        >
          <span
            class="w-[0.4rem] h-[0.8rem] inline-block mr-2 rounded-sm"
            :style="{ 'background-color': `#${stage.color}` }"
          ></span>
          <span class="text-sm font-medium text-gray-600">
            {{ stage.name }}
            <span class="font-medium text-gray-600 ml-2">{{ stage.id }}</span>
          </span>
        </div>
      </div>
      <div class="col-span-1 text-center">
        <action-menu :items="menuItems" />
      </div>
    </header>
    <custom-scroll style="height: 83vh">
      <div class="px-2.5">
        <template v-for="(item, index) in tasks" :key="index">
          <TaskCard :task="item" @fetch="handleFetchTasks" />
        </template>
      </div>
    </custom-scroll>
  </div>
</template>