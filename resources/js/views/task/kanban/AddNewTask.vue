<script setup lang="ts">
import { Dialog } from "primevue";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { AxiosResponse } from "axios";
import { useRoute } from "vue-router";
import { kanbanStore, projectStore } from "@stores";

const props = defineProps({
  statusId: { type: Number, default: 0 },
});
const emits = defineEmits(["fetchTasks", "update:visible"]);

const attributes = reactive<{
  title: string;
  project_id: Number | string;
  status_id: Number | string;
}>({
  title: "",
  project_id: 0,
  status_id: 0,
});
const route = useRoute();

const errors = reactive({ title: [] });
const is_loading = ref(false);

function handleCreate() {
  is_loading.value = true;

  attributes.project_id = Number(route.params.id);
  attributes.status_id = props.statusId;

  Http.kanban
    .createTask(attributes)
    .then((res: AxiosResponse) => {
      emits("fetchTasks", true);
      emits("update:visible", false);
      nextTick(() => projectStore.captureScreenshot());
      setTimeout(() => projectStore.uploadScreenshort(route.params.id), 5000);
    })
    .catch((error: Error) => {
      const { errors: v_errors } = Http.error(error);
      Object.assign(errors, v_errors);
    })
    .finally(() => {
      is_loading.value = false;
    });
}
</script>
  
<template>
  <Dialog
    modal
    dismissableMask
    header="Add New Task"
    :style="{ width: '25rem' }"
  >
    <span
      class="hidden bg-red-500 bg-green-500 bg-blue-500 bg-orange-500 bg-yellow-500 bg-amber-500 bg-lime-500 bg-emerald-500 bg-teal-500 bg-cyan-500 bg-sky-500 bg-indigo-500 bg-violet-500 bg-purple-500 bg-fuchsia-500 bg-pink-500 bg-rose-500"
    ></span>
    <div class="mb-4">
      <form-label>Title:</form-label>
      <form-input
        class="w-full"
        autocomplete="off"
        v-model="attributes.title"
        :errors="errors"
        error-name="title"
      />
    </div>

    <div class="flex justify-between pt-3">
      <danger-button @click="$emit('update:visible', false)">
        Close
      </danger-button>
      <success-button @click="handleCreate" :loading="is_loading">
        Create
      </success-button>
    </div>
  </Dialog>
</template>