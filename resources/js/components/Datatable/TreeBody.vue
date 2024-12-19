<script setup lang="ts">
import { PropType } from "vue";

interface Rows {
  [key: string]: any;
}

const props = defineProps({
  rows: { type: Array as PropType<Rows[]>, default: () => [] },
});

</script>

<template>
  
</template>
