<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import BoardColumn from "./section/BoardColumn.vue";
import HeaderToolsSection from "./section/HeaderToolsSection.vue";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const { params } = useRoute();
const { currentProject, projectStages } = storeToRefs(projectStore);

onMounted(() => {
  currentProject.value.id = params.id;
  projectStore.handleFindProject();
  projectStore.handleFetchStage();
});
</script>
<template>
  <HeaderToolsSection></HeaderToolsSection>
  <custom-scroll style="height: 90.5vh">
    <section class="flex flex-row ps-4 pe-6 w-fit">
      <template v-for="(item, index) in projectStages" :key="index">
        <board-column :stage="item"></board-column>
      </template>
    </section>
  </custom-scroll>
</template>