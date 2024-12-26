<script setup>
import Status from "./Status.vue";
import Task from "./Task.vue";
const props = defineProps({
  status: { type: Object },
});
</script>

<template>
  <div class="p-4 whitespace-normal bg-gray-200">
    <Status :status="status"></Status>

    <section-scroll-bar>
      <task v-for="item in 10" :key="item"></task>
    </section-scroll-bar>
  </div>
</template>