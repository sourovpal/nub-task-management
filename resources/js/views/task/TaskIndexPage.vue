<script setup lang="ts">
import ToolsBar from './sections/ToolsBar.vue';
</script>

<template>
  <tools-bar/>
  <section>
    <router-view />
  </section>
</template>