<script setup lang="ts">
import { Dialog, useToast } from "primevue";
import { reactive, ref } from "vue";
import Http from "@services";
import { formatToast } from "@helpers";

const categories = reactive(["kanban", "calculate", "notes"]);

const attributes = reactive<{
  name: string;
  categorie: string;
}>({
  name: "",
  categorie: "",
});

const errors = reactive({});
const is_loading = ref<Boolean>(false);
const toast = useToast();

function handleCreate() {
  is_loading.value = true;

  Http.project
    .create(attributes)
    .then((res: {}) => {
      toast.add(formatToast(res.data));
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
    <div class="mb-4">
      <form-label>Categorie:</form-label>
      <form-select
        :options="categories"
        class="w-full"
        autocomplete="off"
        v-model="attributes.categorie"
        :errors="errors"
        error-name="categorie"
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