<script setup>
import TaskCard from "./TaskCard.vue";
</script>
<template>
  <div class="w-[16rem] mt-6">
    <header class="grid grid-flow-col grid-cols-6 items-center mx-2.5 mb-3">
      <div class="col-span-5">
        <div
          class="inline px-3 py-0.5 border border-gray-300 rounded-md bg-gray-50"
        >
          <span
            class="w-[0.4rem] h-[0.8rem] bg-rose-600 inline-block mr-2 rounded-sm"
          ></span>
          <span class="text-sm font-medium text-gray-600">
            Header
            <span class="font-medium text-gray-600 ml-2">25</span>
          </span>
        </div>
      </div>
      <div class="col-span-1 text-center">
        <action-menu />
      </div>
    </header>
    <custom-scroll style="height: 83vh">
      <div class="px-2.5">
        <TaskCard v-for="(item, index) in 10" :key="index" />
      </div>
    </custom-scroll>
  </div>
</template>