<script setup>
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import AddNewStageModal from "../modals/AddNewStageModal.vue";

const { currentProject } = storeToRefs(projectStore);
const is_open = ref(false);

function handleSearch(event) {
  console.log(event.target.value);
  projectStore.handleFetchStage({ search: event.target.value });
}
</script>
<template>
  <section
    class="h-[2.5rem] w-full border-b border-b-gray-300 flex flex-row items-center px-4 bg-white"
  >
    <div class="left">
      <h3 class="text-gray-700 font-semibold">
        <i class="pi pi-bookmark mr-2"></i>
        {{ currentProject.title ?? "Not added yet!" }}
      </h3>
    </div>
    <div class="right flex flex-row items-center ml-auto">
      <div class="px-4">
        <IconField>
          <InputText
            size="small"
            @input="handleSearch"
            placeholder="Search..."
          />
          <InputIcon class="pi pi-search" />
        </IconField>
      </div>
      <AddNewStageModal v-if="is_open" v-model:visible="is_open" />
      <Button
        @click="is_open = true"
        label="Add Stage"
        icon="pi pi-plus"
        size="small"
        class="!py-1 !rounded-[0.2rem]"
      />
    </div>
  </section>
</template>