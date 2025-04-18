<script setup>
import { useSlots } from "vue";

const props = defineProps({
  position: { type: String, default: "top" },
});

const slotNames = Object.keys(useSlots());
</script>

<template>
  <Dialog
    modal
    :position="position"
    pt:header:class="dark:text-gray-200"
    pt:root:class="!border-0 dark:bg-neutral-800"
    pt:mask:class="backdrop-blur-sm"
    :pt="{
      pcCloseButton: {
        root: {
          class: 'dark:hover:!bg-gray-700 dark:hover:!text-gray-200',
        },
      },
    }"
  >
    <template v-if="slotNames.includes('header')" #header>
      <slot name="header" />
    </template>

    <template v-if="slotNames.includes('container')" #container>
      <slot name="container" />
    </template>

    <slot />
  </Dialog>
</template>