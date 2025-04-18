<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";
import { Menu } from "primevue";
import { departmentStore } from "@stores";
import { formatTimeAgo } from "@helpers";

import DepartmentUpdateOrCreateModal from "./DepartmentUpdateOrCreateModal.vue";

import { ref } from "vue";
import { storeToRefs } from "pinia";

interface Header {
  id: string;
  label: string;
  width: string;
}

const { departments } = storeToRefs(departmentStore);

const headers = ref<Header[]>([
  { id: "checkbox", label: "", width: "2rem" },
  { id: "department-name", label: "Department", width: "15rem" },
  { id: "short-name", label: "Short Name", width: "10rem" },
  { id: "last-update", label: "Last Update", width: "10rem" },
  { id: "first-create", label: "First Create", width: "10rem" },
  { id: "action", label: "", width: "5rem" },
]);

const is_open = ref<Boolean>(false);
const edit_row = ref<Object | null>(null);

const menu = ref();
const items = ref([
  {
    label: "Edit",
    icon: "pi pi-pen-to-square",
    command: () => {
      is_open.value = true;
    },
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    class: "color-red",
  },
]);

function handleEdit(row: {}, open: Boolean = false) {
  edit_row.value = row;
  is_open.value = open;
}

const toggleMenu = (event: Event, row: {}) => {
  handleEdit(row);
  menu.value.toggle(event);
};
</script>

<template>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />

  <department-update-or-create-modal
    v-if="is_open"
    v-model:visible="is_open"
    :edit="edit_row"
  />

  <section-scroll-bar>
    <data-tree :headers="headers" :rows="departments.data">
      <template #td-checkbox>
        <form-checkbox :checked="false" />
      </template>

      <template #td-department-name="{ row }">
        <span
          @click="handleEdit(row, true)"
          class="hover:text-green-500 cursor-pointer"
        >
          {{ row.name }}
        </span>
      </template>

      <template #td-short-name="{ row }">
        {{ row.short_name }}
      </template>

      <template #td-last-update="{ row }">
        {{ formatTimeAgo(row.updated_at) }}
      </template>

      <template #td-first-create="{ row }">
        {{ formatTimeAgo(row.created_at) }}
      </template>

      <template #td-action="{ row }">
        <div class="flex items-center justify-end">
          <circel-button @click="toggleMenu($event, row)" class="me-3">
            <i class="pi pi-ellipsis-v"></i>
          </circel-button>
        </div>
      </template>
    </data-tree>
  </section-scroll-bar>
</template>