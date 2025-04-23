<script setup>
import AddNewProjectModal from "../components/AddNewProjectModal.vue";
import { ref } from "vue";
import { projectStore } from "@stores";

const is_open = ref(false);

function handleSearch(event) {
  projectStore.handleFetchProjects({ search: event.target.value });
}
</script>
<template>
  <header-tools-bar>
    <div class="flex items-center">
      <form-checkbox class="me-3" />

      <refresh-button />
      <!-- :loading="users.loading" -->
      <!-- @click="userStore.handleFetchUser()" -->
    </div>
    <div class="ms-auto flex flex-row items-center">
      <!-- <primary-button @click="is_open = true" size="small" class="me-4">
        <i class="pi pi-user-plus me-1"></i>
        Add New
      </primary-button> -->
      <div class="px-4">
        <IconField>
          <InputText
            size="small"
            @input="handleSearch"
            placeholder="Search..."
          />
          <InputIcon class="pi pi-search" />
        </IconField>
      </div>
      <Button
        @click="is_open = true"
        label="Add New"
        icon="pi pi-plus"
        size="small"
        class="mr-6"
      />
      <data-pagination />
      <!-- @change="userStore.handleFetchUser" -->
      <!-- :pagination="users.pagination" -->
    </div>
  </header-tools-bar>
  <AddNewProjectModal v-if="is_open" v-model:visible="is_open" />
</template>