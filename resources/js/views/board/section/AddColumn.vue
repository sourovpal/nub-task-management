<script setup>
import { ref } from "vue";
import AddNewStageModal from "../modals/AddNewStageModal.vue";
const is_open = ref(false);
</script>
<template>
  <div class="min-w-[16rem] max-w-[16rem] mt-6">
    <AddNewStageModal v-if="is_open" v-model:visible="is_open" />
    <header class="grid grid-flow-col grid-cols-6 items-center mx-2.5 mb-3">
      <div class="col-span-5">
        <div
          @click="is_open = true"
          class="inline-flex items-center ps-2 pe-3 py-0.5 border border-gray-300 rounded-md bg-blue-500 cursor-pointer"
        >
          <span class="text-sm font-medium text-white">
            <i class="pi pi-plus mr-2 !text-sm"></i>
            Add New
          </span>
        </div>
      </div>
      <div class="col-span-1 text-center"></div>
    </header>
  </div>
</template>