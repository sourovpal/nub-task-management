<script setup>
import { Avatar, AvatarGroup } from "primevue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <header-tools-bar>
    <div class="flex items-center">
      <h3 class="font-semibold text-gray-700 text-lg">Todo new projects</h3>
    </div>
    <div class="ms-auto flex items-center">
      <div class="me-3">
        <AvatarGroup>
          <Avatar
            v-for="item in 4"
            :key="item"
            :image="`https://avatar.iran.liara.run/public?id=${item}`"
            shape="circle"
          />
          <Avatar class="font-bold" label="+2" shape="circle" />
        </AvatarGroup>
      </div>
      <circel-button>
        <i class="pi pi-ellipsis-v"></i>
      </circel-button>
    </div>
  </header-tools-bar>
</template>