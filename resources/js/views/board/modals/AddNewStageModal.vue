<script setup>
import { ref, computed } from "vue";
const validationErrors = ref({});
import Http from "@services";
import toast from "vue3-hot-toast";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const { headers, projectsData, currentProject } = storeToRefs(projectStore);

const attributes = ref({
  name: "",
  color: "ff003c",
  project_id: null,
});
const isLoading = ref(false);
function handleProjectStatus() {
  isLoading.value = true;
  Http.project
    .createStatus({ ...attributes.value, project_id: currentProject.value.id })
    .then(({ message }) => {
      toast.success(message);
      projectStore.handleFetchStage();
    })
    .catch(({ errors }) => {
      if (errors) return (validationErrors.value = errors);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <custom-modal
    position="center"
    :style="{ width: '20vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '95vw' }"
    pt:header:class="!py-2 dark:bg-neutral-900"
    pt:content:class="!p-0 dark:bg-neutral-900"
    pt:root:class="!rounded-[0.8rem] !overflow-hidden dark:!border-neutral-700"
  >
    <template #header>
      <div class="grid grid-cols-12 w-full">
        <div
          class="col-span-4 font-semibold text-lg dark:text-gray-200 flex flex-row items-center justify-between"
        >
          <span> Add New </span>
        </div>
      </div>
    </template>
    <div class="px-4">
      <div class="w-full mb-3">
        <form-input
          label="Name"
          error-name="name"
          v-model="attributes['name']"
          :errors="validationErrors"
        />
      </div>
      <div class="w-full mb-3 flex flex-row">
        <form-label>Color:</form-label>
        <ColorPicker
          v-model="attributes['color']"
          inputId="cp-hex"
          format="hex"
          class="ml-4"
        />
      </div>
      <div class="mb-3 text-end">
        <Button
          label="Create"
          :loading="isLoading"
          @click="handleProjectStatus"
        ></Button>
      </div>
    </div>
  </custom-modal>
</template>