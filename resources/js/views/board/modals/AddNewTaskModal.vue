<script setup>
import { ref, computed } from "vue";
const validationErrors = ref({});
import Http from "@services";
import toast from "vue3-hot-toast";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const props = defineProps({
  stage: Object,
});
const emits = defineEmits(["fetch"]);
const attributes = ref({
  name: "",
  description: "",
  priority: "low",
  due_date: "",
});

const isLoading = ref(false);
function handleTaskCreate() {
  isLoading.value = true;
  Http.project
    .createTask({ ...attributes.value, status_id: props.stage.id })
    .then(({ message }) => {
      toast.success(message);
      emits("fetch", true);
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
    :style="{ width: '40vw' }"
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
    <div class="grid grid-cols-12">
      <div class="col-span-7 pl-4 pb-4">
        <div class="w-full mb-3">
          <form-input
            label="Name"
            error-name="name"
            v-model="attributes['name']"
            :errors="validationErrors"
          />
        </div>
        <div class="w-full mb-3">
          <form-label>Description</form-label>
          <QuillEditor
            theme="snow"
            style="height: 160px"
            :content="attributes['description']"
            @update:content="attributes['description'] = $event"
            contentType="html"
            :toolbar="[
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ]"
          />
        </div>
      </div>
      <div class="col-span-5 px-4">
        <div class="grid grid-cols-2 gap-x-4 mb-3">
          <div class="col-span-2">
            <form-label>Assignee & Communication</form-label>
          </div>
          <div class="col-span-2 mt-1 flex flex-row items-center">
            <AvatarGroup>
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
                shape="circle"
              />
              <Avatar label="+2" shape="circle" />
            </AvatarGroup>
            <Button
              icon="pi pi-plus"
              label="Add Member"
              severity="secondary"
              variant="outlined"
              size="small"
              class="ml-4"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <form-label>Priority</form-label>
            <div class="grid gap-2 grid-flow-col">
              <div
                v-for="(item, index) in ['low', 'medium', 'high']"
                :key="index"
                class="col-span-2 flex items-center"
              >
                <input
                  type="radio"
                  class="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-checkbox-group-2"
                  name="priority"
                  :value="item"
                  v-model="attributes['priority']"
                />
                <label
                  for="hs-checkbox-group-2"
                  class="text-gray-700 ms-2 dark:text-neutral-400 text-base capitalize"
                >
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <form-input
              label="Due Date"
              error-name="due_date"
              type="date"
              v-model="attributes['due_date']"
              :errors="validationErrors"
            />
          </div>
        </div>

        <div class="flex flex-row justify-between mt-6">
          <Button icon="pi pi-refresh" severity="danger" label="Reset" />
          <Button
            icon="pi pi-save"
            :loading="isLoading"
            label="Save Change"
            :disabled="!attributes['name']"
            @click="handleTaskCreate"
          />
        </div>
      </div>
    </div>
  </custom-modal>
</template>