<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";
import { onMounted, ref } from "vue";
import { userStore } from "@stores";
import { storeToRefs } from "pinia";
import { formatTimeAgo } from "@helpers";
import { Menu } from "primevue";
import UserUpdateOrCreate from "./UserUpdateOrCreate.vue";

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

const { users } = storeToRefs(userStore);

onMounted(() => userStore.handleFetchUser());

const is_open = ref<Boolean>(false);
const edit_row = ref<Object | null>(null);

const menu = ref();
const items = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: () => {},
  },
  {
    label: "Login Account",
    icon: "pi pi-lock",
    command: () => {},
  },
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

  <user-update-or-create
    v-if="is_open"
    v-model:visible="is_open"
    :edit="edit_row"
  />

  <section-scroll-bar>
    <data-tree :headers="headers" :rows="users">
      <template #td-checkbox>
        <form-checkbox :checked="false" />
      </template>

      <template #td-employee-id="{ row }">
        <span
          @click="handleEdit(row, true)"
          class="hover:text-green-500 cursor-pointer"
        >
          {{ `${row.department?.short_name}${row.id}` }}
        </span>
      </template>
      <template #td-avatar>
        <img
          src="https://via.placeholder.com/200x200"
          class="rounded-full size-[2.5rem]"
          alt=""
        />
      </template>

      <template #td-name="{ row }">
        {{ row.first_name }}
        {{ row.last_name }}
      </template>

      <template #td-email="{ row }">
        {{ row.email }}
      </template>

      <template #td-phone-number="{ row }">
        {{ row.phone_number ?? "-" }}
      </template>

      <template #td-designation="{ row }">
        {{ row.designation ?? "-" }}
      </template>

      <template #td-department="{ row }">
        {{ row.department?.name }}
        <span v-if="row.department"> ({{ row.department?.short_name }}) </span>
      </template>

      <template #td-address="{ row }">
        {{ row.address ?? "-" }}
      </template>

      <template #td-join-date="{ row }">
        {{ row.join_date ?? "-" }}
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