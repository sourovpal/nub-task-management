<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BoardColumn from "./section/BoardColumn.vue";
import AddColumn from "./section/AddColumn.vue";
import HeaderToolsSection from "./section/HeaderToolsSection.vue";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const { params } = useRoute();
const { currentProject, projectStages } = storeToRefs(projectStore);
import { Container, Draggable } from "vue-dndrop";

onMounted(() => {
  currentProject.value.id = params.id;
  projectStore.handleFindProject();
  projectStore.handleFetchStage();
});
</script>
<template>
  <HeaderToolsSection></HeaderToolsSection>
  <custom-scroll style="height: 90.5vh">
    <section class="flex flex-row ps-4 pe-6 w-fit min-w-full">
      <template v-for="(stage, index) in projectStages" :key="index">
        <board-column :stage="stage"></board-column>
      </template>
      <add-column></add-column>
      <div v-if="!projectStages.length" class="w-full flex justify-center items-center mt-24 opacity-40">
        <img
          class="w-[30rem]"
          src="https://cdn-icons-png.freepik.com/512/7486/7486744.png"
          alt=""
        />
      </div>
    </section>
  </custom-scroll>
</template>