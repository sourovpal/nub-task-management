<script setup lang="ts">
import { ref } from "vue";

import AddNewColumnModal from "./AddNewColumnModal.vue";

const is_open = ref<Boolean>(false);
</script>

<template>
  <add-new-column-modal v-if="is_open" v-model:visible="is_open" />
  <div class="p-4 whitespace-normal bg-gray-200">
    <div
      @click="is_open = true"
      class="bg-blue-500 cursor-pointer text-white flex items-center justify-between shadow-sm rounded-lg py-2 px-4 block mb-5 me-5"
    >
      <h2 class="text-md font-semibold">Add New column</h2>
      <div class="px-2 py-1 cursor-pointer">
        <i class="pi pi-plus"></i>
      </div>
    </div>
  </div>
</template>