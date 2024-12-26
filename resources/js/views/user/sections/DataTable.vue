<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";

import { ref } from "vue";

interface Header {
  id: string;
  label: string;
  width: string;
}
const headers = ref<Header[]>([
  { id: "checkbox", label: "", width: "3rem" },
  { id: "employee-id", label: "ID", width: "5rem" },
  { id: "avatar", label: "Avatar", width: "5rem" },
  { id: "name", label: "Name", width: "15rem" },
  { id: "email", label: "Email", width: "15rem" },
  { id: "phone-number", label: "Phone Number", width: "10rem" },
  { id: "designation", label: "Designation", width: "15rem" },
  { id: "department", label: "Department", width: "15rem" },
  { id: "address", label: "Address", width: "20rem" },
  { id: "join-date", label: "Join Date", width: "8rem" },
  { id: "last-update", label: "Last Update", width: "10rem" },
  { id: "first-create", label: "First Create", width: "10rem" },
  { id: "action", label: "", width: "5rem" },
]);

const rows = [
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
  { id: 1, name: "Sourov Pal" },
];
</script>

<template>
  <section-scroll-bar>
    <data-tree :headers="headers" :rows="rows">
      <template #td-checkbox>
        <form-checkbox :checked="false" />
      </template>

      <template #td-employee-id> EA15007 </template>
      <template #td-avatar>
        <img src="https://via.placeholder.com/200x200" class="rounded-full size-[2.5rem]" alt="">
      </template>

      <template #td-name="{ row }">
        {{ row.name }}
      </template>

      <template #td-email> example@gmail.com </template>
      <template #td-phone-number> +88 01919-852044 </template>
      <template #td-designation> Software Engineer </template>
      <template #td-department> ECSE </template>
      <template #td-address> Dhaka </template>
      <template #td-join-date> 25/12/2024 </template>
      <template #td-last-update> 29/12/2024 </template>
      <template #td-first-create> 25/12/2024 </template>

      <template #td-action>
        <circel-button class="me-3">
          <i class="pi pi-ellipsis-v"></i>
        </circel-button>
      </template>
    </data-tree>
  </section-scroll-bar>
</template>