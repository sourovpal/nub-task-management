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
    <template #td-assignee>
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
          image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png"
          shape="circle"
        />
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png"
          shape="circle"
        />
        <Avatar label="+2" shape="circle" />
      </AvatarGroup>
    </template>
    <template #td-action="{ row }">
      <action-menu :items="menuItems(row)" />
    </template>
  </data-tree>
</template>