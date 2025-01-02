<script setup>
import { Avatar, AvatarGroup } from "primevue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <header-tools-bar>
    <div class="flex items-center">
      <refresh-button></refresh-button>
    </div>
    <div class="ms-auto flex items-center">
      <circel-button>
        <i class="pi pi-ellipsis-v"></i>
      </circel-button>
    </div>
  </header-tools-bar>
</template>