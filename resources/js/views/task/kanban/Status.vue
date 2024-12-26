<script setup>
const props = defineProps({
  status: { type: Object },
});
</script>

<template>
  <div
    :class="status.style_class"
    class="flex items-center justify-between shadow-sm rounded-lg py-2 px-4 block mb-5"
  >
    <h2 class="text-md font-semibold">
      Todo
      <span class="px-1">(10)</span>
    </h2>
    <div class="px-2 py-1 cursor-pointer">
      <i class="pi pi-plus"></i>
    </div>
  </div>
</template>