<script setup>
import { quotationStore } from "@stores";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const attributes = reactive({
  title: null,
  cost_amount: 0.0,
});

const { isCreating, quotationItems, currentProject } =
  storeToRefs(quotationStore);

const toggle_add_new = ref(false);

function handleCreate() {
  quotationStore.handleCreate(attributes, () => {
    toggle_add_new.value = false;
    attributes.title = null;
    attributes.cost_amount = 0;
  });
}

function handleAddedForProject(payload) {
  quotationStore.handleCreate({
    title: payload.title,
    cost_amount: payload.cost_amount,
    project_id: currentProject.value,
  });
}
</script>

<template>
  <div class="col-span-5 bg-white rounded-md shadow-md">
    <div
      class="py-2 px-4 border-b border-b-gray-300 flex flex-row items-center justify-between"
    >
      <h3 class="text-gray-600 text-lg font-medium">Items</h3>
      <Button
        @click="toggle_add_new = true"
        size="small"
        icon="pi pi-plus"
        label="Add New"
        raised
      />
    </div>
    <div class="py-4 px-2">
      <ul>
        <li v-if="toggle_add_new" class="mb-6 px-4">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6">
              <form-input label="Title" v-model="attributes.title" />
            </div>
            <div class="col-span-3">
              <form-input
                label="Cost Amount"
                v-model="attributes.cost_amount"
              />
            </div>
            <div class="col-span-3 text-end">
              <Button
                @click="handleCreate"
                :loading="isCreating"
                :disabled="isCreating || !attributes.title"
                class="mt-8"
                label="Save"
              />
              <Button
                icon="pi pi-times"
                severity="danger"
                class="ml-2"
                @click="toggle_add_new = false"
              />
            </div>
          </div>
        </li>
        <li
          v-for="(item, index) in quotationItems"
          :key="index"
          class="flex flex-row items-center justify-between py-1 px-2 hover:bg-gray-50 rounded-md border border-transparent hover:border-gray-300 duration-300"
        >
          <h5>{{ index + 1 }}. {{ item.title }}</h5>
          <Button
            icon="pi pi-plus"
            size="small"
            @click="handleAddedForProject(item)"
          ></Button>
        </li>
      </ul>
    </div>
  </div>
</template>