<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();

</script>

<template>
  {{ slots }}
</template>

<style scoped lang="scss">
</style>