<script setup>
import { ref } from "vue";

const props = defineProps({
  size: { type: String, default: "0.4rem" },
  background: { type: String, default: "" },
  style: {
    type: [String, Object],
    default: "width: 100%; min-height: 100%; height: 1px;",
  },
});

const scrollRef = ref(null);

defineExpose({ scrollPanel: scrollRef });
</script>

<template>
  <ScrollPanel
    v-bind="$attrs"
    ref="scrollRef"
    :style="style"
    :dt="{
      bar: { size },
    }"
    :pt="{
      bary: {
        class: '!bg-slate-300 dark:!bg-neutral-700',
      },
      barx: {
        class: '!bg-slate-300 dark:!bg-neutral-700',
      },
    }"
  >
    <slot />
  </ScrollPanel>
</template>