<script setup>
import { ref } from "vue";
import DepartmentCreateModal from "./DepartmentCreateModal.vue";

const is_open = ref(false);

</script>

<template>
  <department-create-modal v-if="is_open" v-model:visible="is_open" />

  <header-tools-bar>
    <div class="flex items-center">

      <form-checkbox class="me-3" />

      <refresh-button />
    </div>
    <div class="ms-auto flex items-center">
      <primary-button @click="is_open = true" size="small" class="me-4 flex items-center">
        <i class="pi pi-plus me-2"></i>
        Add New
      </primary-button>

      <data-pagination />
    </div>
  </header-tools-bar>
</template>