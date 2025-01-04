<script setup lang="ts">
import { formatTimeAgo } from "@helpers";
import { AvatarGroup, Avatar } from "primevue";
import { ref } from "vue";
import { kanbanStore } from "@stores";
import { storeToRefs } from "pinia";
const emits = defineEmits(["handleFetch"]);
const props = defineProps({
  task: { type: Object },
});

const is_dragging = ref(false);

function handleDragStart(event: DragEvent) {
  kanbanStore.handleDragStart(event);
  is_dragging.value = true;
}

function handleDragStop(event: DragEvent) {
  kanbanStore.handleDragStop(event);
  is_dragging.value = false;
  emits("handleFetch", true);
}
</script>

<template>
  <div
    @dragstart.self="handleDragStart"
    @dragend.self="handleDragStop"
    :draggable="true"
    :class="{
      'is-dragging bg-blue-600 text-white cursor-move': is_dragging,
      'bg-white': !is_dragging,
    }"
    class="shadow-sm rounded-lg p-4 block mb-4 drag-item task"
  >
    <h2
      class="text-md font-semibold"
      :class="{ 'text-gray-500': !is_dragging, 'text-white': is_dragging }"
    >
      {{ task.title }}
    </h2>
    <p
      class="text-gray-500 text-xs"
      :class="{ 'text-gray-500': !is_dragging, 'text-white': is_dragging }"
    >
      Last Update: {{ formatTimeAgo(task.updated_at) }}
    </p>
    <div class="mt-3 flex justify-between items-center">
      <div>
        <span
          class="font-bold text-gray-500 text-sm"
          :class="{ 'text-gray-500': !is_dragging, 'text-white': is_dragging }"
        >
          KB-{{ task.id }}
        </span>
      </div>
      <div>
        <AvatarGroup>
          <Avatar
            v-for="item in 4"
            :key="item"
            :image="`https://avatar.iran.liara.run/public?id=${item}`"
            shape="circle"
          />
          <Avatar class="font-bold" label="+2" shape="circle" />
        </AvatarGroup>
      </div>
    </div>
  </div>
</template>

<style>
.task {
  /* cursor: move; */
}
</style>