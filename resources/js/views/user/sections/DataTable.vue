<script setup lang="ts">
import DataTree from "@components/Datatable/DataTree.vue";
import { onMounted, ref } from "vue";
import { userStore } from "@stores";
import { storeToRefs } from "pinia";
import { formatTimeAgo } from "@helpers";
import { Menu } from "primevue";
import UserUpdateOrCreate from "./UserUpdateOrCreate.vue";

interface Header {
  unique_id: string;
  label: string;
  style: object;
}
const headers = ref<Header[]>([
  { unique_id: "checkbox", label: "", style: { width: "3rem" } },
  { unique_id: "employee-id", label: "ID", style: { width: "5rem" } },
  { unique_id: "avatar", label: "Avatar", style: { width: "5rem" } },
  { unique_id: "name", label: "Name", style: { width: "15rem" } },
  { unique_id: "email", label: "Email", style: { width: "15rem" } },
  {
    unique_id: "phone-number",
    label: "Phone Number",
    style: { width: "10rem" },
  },
  { unique_id: "designation", label: "Designation", style: { width: "15rem" } },
  { unique_id: "department", label: "Department", style: { width: "15rem" } },
  { unique_id: "address", label: "Address", style: { width: "20rem" } },
  { unique_id: "join-date", label: "Join Date", style: { width: "8rem" } },
  { unique_id: "last-update", label: "Last Update", style: { width: "10rem" } },
  {
    unique_id: "first-create",
    label: "First Create",
    style: { width: "10rem" },
  },
  { unique_id: "action", label: "", style: { width: "5rem" } },
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
    <data-tree
      :headers="headers"
      :payload="users.data"
    >
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
          src="https://www.ratio-electric.com/media/products/notfound.png"
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