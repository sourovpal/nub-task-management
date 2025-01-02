<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import ToolsBar from "./sections/ToolsBar.vue";
import { projectStore } from "@stores";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <tools-bar />
  <section>
    <router-view />
  </section>
</template>