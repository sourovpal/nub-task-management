<script setup>
import BoardColumn from "./section/BoardColumn.vue";
import HeaderToolsSection from "./section/HeaderToolsSection.vue";
</script>
<template>
  <HeaderToolsSection></HeaderToolsSection>
  <custom-scroll style="height: 90.5vh">
    <section class="grid grid-flow-col px-4 mr-12">
      <template v-for="(item, index) in 10" :key="index">
        <board-column></board-column>
      </template>
    </section>
  </custom-scroll>
</template>