
<script setup>
import { ref } from "vue";

const menu = ref();
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<template>
  <div>
    <dot-button @click="toggle" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>
