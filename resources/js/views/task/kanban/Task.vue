<script setup>
import { AvatarGroup, Avatar } from "primevue";
</script>

<template>
  <div :draggable="true" class="bg-white shadow-sm rounded-lg p-4 block mb-4">
    <h2 class="text-md font-semibold text-gray-800">Todo Task</h2>
    <p class="text-gray-500 text-xs">Last Update: 12:25 AM</p>
    <div class="mt-3 flex justify-between items-center">
      <div>
        <span class="font-bold text-gray-500 text-sm">KB-1</span>
      </div>
      <div>
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
    </div>
  </div>
</template>