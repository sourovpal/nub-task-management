<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { departmentStore } from "@stores";
import DepartmentUpdateOrCreateModal from "./DepartmentUpdateOrCreateModal.vue";

const is_open = ref(false);
const { departments } = storeToRefs(departmentStore);
</script>

<template>
  <department-update-or-create-modal v-if="is_open" v-model:visible="is_open" />

  <header-tools-bar>
    <div class="flex items-center">
      <form-checkbox class="me-3" />

      <refresh-button
        :loading="departments.loading"
        @click="departmentStore.handleFetchDepartment()"
      />
    </div>
    <div class="ms-auto flex items-center">
      <primary-button
        @click="is_open = true"
        size="small"
        class="me-4 flex items-center"
      >
        <i class="pi pi-plus me-2"></i>
        Add New
      </primary-button>
      <data-pagination
        :pagination="departments.pagination"
        @change="departmentStore.handleFetchDepartment"
      />
    </div>
  </header-tools-bar>
</template>