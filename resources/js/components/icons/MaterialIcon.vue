<script setup lang="ts">
const props = defineProps({
  name: { type: String },
});
</script>

<template>
  <i class="">{{ name }}</i>
</template>