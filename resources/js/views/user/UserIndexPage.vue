<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";

import { ref } from "vue";
import ToolsBar from "./sections/ToolsBar.vue";
interface Header {
  id: string;
  label: string;
  width: string;
}
const headers = ref<Header[]>([
  { id: "id", label: "#", width: "5%" },
  { id: "name", label: "Name", width: "20%" },
  { id: "email", label: "Email", width: "20%" },
  { id: "action", label: "", width: "5%" },
]);

const rows = [
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
];
</script>

<template>
  <ToolsBar></ToolsBar>
  <data-tree :headers="headers" :rows="rows">
    <template #tbody-id="{ row }">
      {{ row.id }}
    </template>

    <template #tbody-name="{ row }">
      {{ row.name }}
    </template>

    <template #tbody-email> example@gmail.com </template>

    <template #tbody-action>
      <button
        type="button"
        class="inline-block text-gray-400 hover:text-gray-700 text-sm"
      >
        <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path
            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
          />
        </svg>
      </button>
    </template>
  </data-tree>
</template>