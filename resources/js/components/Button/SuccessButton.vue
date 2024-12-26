<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  size: {
    type: String as PropType<"small" | "base" | "large">,
    default: "base",
  },
});

const sizes: {
  small: string;
  base: string;
  large: string;
} = {
  small: "px-3 py-2 text-sm rounded-md",
  base: "px-5 py-2.5 text-sm rounded-md",
  large: "px-5 py-3 text-base rounded-lg",
};
</script>

<template>
  <button
    type="button"
    :class="sizes[size]"
    class="text-white bg-green-700 hover:bg-green-800 font-medium shadow-black"
  >
    <slot />
  </button>
</template>