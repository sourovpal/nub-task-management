<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";
import { Menu } from "primevue";

import { ref } from "vue";

interface Header {
  id: string;
  label: string;
  width: string;
}

const headers = ref<Header[]>([
  { id: "checkbox", label: "", width: "2rem" },
  { id: "department-name", label: "Department", width: "15rem" },
  { id: "short-name", label: "Short Name", width: "10rem" },
  { id: "last-update", label: "Last Update", width: "10rem" },
  { id: "first-create", label: "First Create", width: "10rem" },
  { id: "action", label: "", width: "5rem" },
]);

const edit_row = ref<Object | null>(null);

const rows = [
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
];

const menu = ref();
const items = ref([
  {
    label: "Edit",
    icon: "pi pi-pen-to-square",
    command: () => {},
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    class: "color-red",
  },
]);

const toggle = (event: Event, row: {}) => {
  edit_row.value = row;
  menu.value.toggle(event);
};
</script>

<template>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />

  <section-scroll-bar>
    <data-tree :headers="headers" :rows="rows">
      <template #td-checkbox>
        <form-checkbox :checked="false" />
      </template>

      <template #td-department-name> Software Engineer </template>
      <template #td-short-name> ECSE </template>
      <template #td-last-update> 29/12/2024 </template>
      <template #td-first-create> 25/12/2024 </template>

      <template #td-action="{ row }">
        <div class="flex items-center justify-end">
          <circel-button @click="toggle($event, row.id)" class="me-3">
            <i class="pi pi-ellipsis-v"></i>
          </circel-button>
        </div>
      </template>
    </data-tree>
  </section-scroll-bar>
</template>