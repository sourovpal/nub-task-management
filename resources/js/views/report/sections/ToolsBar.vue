<script setup>
import { Avatar, AvatarGroup } from "primevue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <header-tools-bar>
    <div class="flex items-center">
      <h1 class="font-bold text-lg text-gray-800">Reports</h1>
    </div>
    <div class="ms-auto flex items-center">
      <circel-button>
        <i class="pi pi-ellipsis-v"></i>
      </circel-button>
    </div>
  </header-tools-bar>
</template>