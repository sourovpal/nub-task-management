<script setup lang="ts">
import { Dialog } from "primevue";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { AxiosResponse } from "axios";
import { useRoute } from "vue-router";
import { kanbanStore, projectStore } from "@stores";

const attributes = reactive<{
  name: string;
  color: string;
  project_id: Number | string;
}>({
  name: "",
  color: "",
  project_id: 0,
});
const route = useRoute();

const errors = reactive({ name: [], color: [] });
const is_loading = ref(false);

const colors = reactive([
  {
    color: "text-white bg-red-500",
    title: "Red",
  },
  {
    color: "text-white bg-green-500",
    title: "Green",
  },
  {
    color: "text-white bg-blue-500",
    title: "Blue",
  },
  {
    color: "text-white bg-orange-500",
    title: "Orange",
  },
  {
    color: "text-white bg-yellow-500",
    title: "Yellow",
  },
  {
    color: "text-white bg-amber-500",
    title: "Amber",
  },
  {
    color: "text-white bg-lime-500",
    title: "Lime",
  },
  {
    color: "text-white bg-emerald-500",
    title: "Emerald",
  },
  {
    color: "text-white bg-teal-500",
    title: "Teal",
  },
  {
    color: "text-white bg-cyan-500",
    title: "Cyan",
  },
  {
    color: "text-white bg-sky-500",
    title: "Sky",
  },
  {
    color: "text-white bg-indigo-500",
    title: "Indigo",
  },
  {
    color: "text-white bg-violet-500",
    title: "Violet",
  },
  {
    color: "text-white bg-purple-500",
    title: "Purple",
  },
  {
    color: "text-white bg-fuchsia-500",
    title: "Fuchsia",
  },
  {
    color: "text-white bg-pink-500",
    title: "Pink",
  },
  {
    color: "text-white bg-rose-500",
    title: "Rose",
  },
]);

function handleCreate() {
  is_loading.value = true;

  attributes.project_id = route.params.id;

  Http.kanban
    .createStatus(attributes)
    .then((res: AxiosResponse) => {
      kanbanStore.handleFetchStatus(route.params.id);
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
  <Dialog modal dismissableMask header="Add New" :style="{ width: '25rem' }">
    <span
      class="hidden bg-red-500 bg-green-500 bg-blue-500 bg-orange-500 bg-yellow-500 bg-amber-500 bg-lime-500 bg-emerald-500 bg-teal-500 bg-cyan-500 bg-sky-500 bg-indigo-500 bg-violet-500 bg-purple-500 bg-fuchsia-500 bg-pink-500 bg-rose-500"
    ></span>
    <div class="mb-4">
      <form-label>Name:</form-label>
      <form-input
        class="w-full"
        autocomplete="off"
        v-model="attributes.name"
        :errors="errors"
        error-name="name"
      />
    </div>
    <div class="">
      <form-label>Choose Color:</form-label>
      <div class="w-full border border-gray-300 p-2 rounded-sm">
        <section-scroll-bar style="height: 25rem" :auto-height="false">
          <template v-for="item in colors" :key="item.color">
            <div
              :class="item.color"
              class="p-1 border border-gray-300 mb-2 rounded-sm flex items-center"
            >
              <form-checkbox
                class="text-white hover:bg-transparent"
                @click="attributes['color'] = item.color"
                :checked="item.color == attributes.color"
              />
              <span class="ms-3">{{ item.title }}</span>
            </div>
          </template>
        </section-scroll-bar>
      </div>
    </div>
    <div>
      <span
        v-if="errors['color'] && errors['color'].length"
        class="block text-red-600 py-2 text-sm"
      >
        {{ errors["color"][0] }}
      </span>
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