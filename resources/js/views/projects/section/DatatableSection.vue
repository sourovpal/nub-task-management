<script setup>
import { projectStore } from "@stores";
import DataTree from "@components/Datatable/DataTree.vue";
import { storeToRefs } from "pinia";
import { usePush } from "@routers";
const { headers } = storeToRefs(projectStore);
const data = [
  {
    id: 1,
    title: "Ecommerce Application Design and Development",
    description: "Description 1",
    status: "active",
    start_date: "2023-01-01",
    due_date: "2023-01-02",
    created_at: "2023-01-01",
    updated_at: "2023-01-02",
  },
];

function handleDelete({ item }) {
  console.log("Delete clicked", item.row);
}

const menuItems = (row) => [
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    row,
    command: (e) => {
      console.log("Edit clicked", e, row);
    },
  },
  {
    label: "Start Work",
    icon: "pi pi-sitemap",
    row,
    command:({item})=> usePush(`/projects/${item.row.id}/board`),
  },
  {
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    row,
    command: handleDelete,
  },
];
</script>
<template>
  <data-tree :headers="headers" :payload="data" style="height:85vh;">
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