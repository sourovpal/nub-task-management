<script setup>
import { projectStore } from "@stores";
import DataTree from "@components/Datatable/DataTree.vue";
import { storeToRefs } from "pinia";
import { usePush } from "@routers";
import { onMounted, ref } from "vue";
import EditProjectModal from "../components/EditProjectModal.vue";

const { headers, projectsData } = storeToRefs(projectStore);

function handleDelete({ item }) {
  console.log("Delete clicked", item.row);
}

const toggle_edit_modal = ref(false);
const editAttributes = ref({});

const menuItems = (row) => [
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    row,
    command: (e) => {
      editAttributes.value = row;
      toggle_edit_modal.value = true;
    },
  },
  {
    label: "Quotation",
    icon: "pi pi-dollar",
    row,
    command: ({ item }) => usePush(`/projects/${item.row.id}/quotation`),
  },
  {
    label: "Start Work",
    icon: "pi pi-sitemap",
    row,
    command: ({ item }) => usePush(`/projects/${item.row.id}/board`),
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    row,
    command: handleDelete,
  },
];

onMounted(() => projectStore.handleFetchProjects());
</script>
<template>
  <EditProjectModal
    v-if="toggle_edit_modal"
    v-model:visible="toggle_edit_modal"
    :edit="editAttributes"
  />
  <data-tree
    :headers="headers"
    :payload="projectsData.data"
    style="height: 85vh"
  >
    <template #td-checkbox>
      <form-checkbox />
    </template>
    <template #td-creator="{ row }">
      <div class="flex gap-x-3 items-center">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
        {{ row?.user?.first_name }} {{ row?.user?.last_name }}
      </div>
    </template>
    <template #td-contact="{ row }">
      <div>
        <span class="block">Email: {{ row.email }}</span>
        <span class="block">Phone: {{ row.phone }}</span>
      </div>
    </template>
    <template #td-assignee>
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
    </template>
    <template #td-action="{ row }">
      <action-menu :items="menuItems(row)" />
    </template>
  </data-tree>
</template>