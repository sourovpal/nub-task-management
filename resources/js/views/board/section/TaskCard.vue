<script setup>
import { formatTimeAgo } from "@helpers";
import AddNewTaskModal from "../modals/AddNewTaskModal.vue";
import CommantBoxModal from "../modals/CommantBoxModal.vue";
import { ref } from "vue";

const props = defineProps({
  task: Object,
  stage: Object,
});

const emits = defineEmits(["fetch"]);
const is_open = ref(false);
const is_open_chat = ref(false);
</script>

<template>
  <AddNewTaskModal
    v-if="is_open"
    v-model:visible="is_open"
    :task="task"
    :stage="stage"
  />

  <CommantBoxModal
    v-if="is_open_chat"
    v-model:visible="is_open_chat"
    :task="task"
    :stage="stage"
  />

  <div
    class="flex flex-col bg-white border border-gray-300 shadow-2xs rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 mb-4"
    :data-attr_stage_id="stage.id"
    :data-attr_task_id="task.id"
  >
    <div class="p-2">
      <h3 class="text-sm font-semibold text-gray-600 dark:text-white">
        {{ task.name }}
      </h3>
      <div class="grid grid-cols-6 items-center">
        <div class="col-span-2 flex mt-3 items-center">
          <input
            type="checkbox"
            class="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            id="hs-checkbox-group-2"
          />
          <label
            for="hs-checkbox-group-2"
            class="text-xs text-gray-500 ms-2 dark:text-neutral-400"
          >
            KAN-{{ task.sl_id }}
          </label>
        </div>
        <div class="col-span-4">
          <AvatarGroup>
            <Avatar
              image="https://static.vecteezy.com/system/resources/thumbnails/019/495/015/small/business-man-boy-avatar-user-person-people-beard-glasses-flat-style-vector.jpg"
              shape="circle"
              size="small"
              class="ml-auto border-gray-200 !border"
            />
            <!-- <Avatar label="+2" shape="circle" size="small" /> -->
          </AvatarGroup>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-200 border-t border-gray-300 rounded-b-md py-1.5 px-2 flex flex-row justify-between items-center"
    >
      <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">
        Modify: {{ formatTimeAgo(task.updated_at) }}
      </p>
      <div>
        <i
          @click="is_open_chat=true"
          class="pi pi-send me-4 text-gray-500 !text-sm cursor-pointer hover:text-gray-700"
        ></i>
        <i
          class="pi pi-pen-to-square text-gray-500 !text-sm cursor-pointer hover:text-gray-700"
          @click="is_open = true"
        ></i>
      </div>
    </div>
  </div>
</template>