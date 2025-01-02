<script setup>
import { reactive } from "vue";

const tabs = reactive([
  {
    label: "Today Report",
    icon: "pi pi-calendar-clock",
    path: "/",
  },
  {
    label: "Weekly Report",
    icon: "pi pi-calendar",
    path: "/",
  },
  {
    label: "Monthly Report",
    icon: "pi pi-calendar-minus",
    path: "/",
  },
  {
    label: "Yearly Report",
    icon: "pi pi-calendar-plus",
    path: "/",
  },
]);
</script>

<template>
  <div class="col-span-2 bg-gray-200 h-full sticky top-0 left-0 px-3 pt-5">
    <ul
      class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 mb-4 md:mb-0"
    >
      <li v-for="item in tabs" :key="item">
        <a
          href="#"
          class="group hover:bg-green-600 hover:text-gray-100 active:bg-green-600 active:text-gray-100 inline-flex items-center px-4 py-4 text-gray-700 bg-white rounded-md active w-full"
          aria-current="page"
        >
          <i
            :class="item.icon"
            class="w-4 h-4 me-2 text-gray-700 group-hover:text-gray-100"
          >
          </i>
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>