<script setup>
import { formatTimeAgo } from "@helpers";

const props = defineProps({
  task: Object,
});

const emits = defineEmits(["fetch"]);
</script>

<template>
  <div
    class="flex flex-col bg-white border border-gray-300 shadow-2xs rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 mb-4"
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
            >KAN-12</label
          >
        </div>
        <div class="col-span-4">
          <AvatarGroup>
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
              size="small"
              class="ml-auto"
            />
            <!-- <Avatar label="+2" shape="circle" size="small" /> -->
          </AvatarGroup>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 border-t border-gray-300 rounded-b-md py-1.5 px-2">
      <p class="mt-1 text-sm text-gray-500 dark:text-neutral-500">
        Last updated: {{ formatTimeAgo(task.updated_at) }}
      </p>
    </div>
  </div>
</template>