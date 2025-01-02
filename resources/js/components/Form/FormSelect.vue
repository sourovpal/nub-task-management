<script setup lang="ts">
import { Select } from "primevue";
import { PropType } from "vue";

const props = defineProps({
  errors: {
    type: Object as PropType<{ [key: string]: string }>,
    default: () => ({}),
  },
  errorName: { type: String, default: null },
});
</script>

<template>
  <Select @click="delete errors[errorName]" v-bind="$attrs" fluid />
  <span
    v-if="errorName && errors[errorName] && errors[errorName].length"
    class="block text-red-600 py-2 text-sm"
  >
    {{ errors[errorName][0] }}
  </span>
</template>

<style>
</style>