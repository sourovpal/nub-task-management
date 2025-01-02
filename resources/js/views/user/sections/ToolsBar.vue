<script setup lang="ts">
import UserUpdateOrCreate from "./UserUpdateOrCreate.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { userStore } from "@stores";

const is_open = ref<Boolean>(false);

const { pagination, is_fatching } = storeToRefs(userStore);
</script>

<template>
  <user-update-or-create v-if="is_open" v-model:visible="is_open" />
  <header-tools-bar>
    <div class="flex items-center">
      <form-checkbox class="me-3" />

      <refresh-button
        :loading="is_fatching"
        @click="userStore.handleFetchUser()"
      />
    </div>
    <div class="ms-auto flex items-center">
      <primary-button @click="is_open = true" size="small" class="me-4">
        <i class="pi pi-user-plus me-1"></i>
        Add New
      </primary-button>

      <data-pagination
        :pagination="pagination"
        @change="userStore.handleFetchUser"
      />
    </div>
  </header-tools-bar>
</template>