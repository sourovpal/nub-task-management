<script setup lang="ts">
import { Dialog } from "primevue";
</script>

<template>
  <Dialog modal dismissableMask header="Add New" :style="{ width: '25rem' }">
    <div class="mb-4">
      <form-label for="username">Title:</form-label>
      <form-input id="username" class="w-full" autocomplete="off" />
    </div>
    <div class="mb-4">
      <form-label for="username">Type:</form-label>
      <form-input id="username" class="w-full" autocomplete="off" />
    </div>
    <div class="flex justify-between pt-3">
      <danger-button @click="$emit('update:visible', false)">
        Close
      </danger-button>
      <success-button>Create</success-button>
    </div>
  </Dialog>
</template>