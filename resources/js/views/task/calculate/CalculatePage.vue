<script setup>
import { Tab, TabList, Tabs } from "primevue";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const items = ref([
  { route: `${route.path}`, label: "Delay", icon: "pi pi-stopwatch" },
  {
    route: `${route.path}?type=weekly`,
    label: "Weekly",
    icon: "pi pi-calendar-clock",
  },
  {
    route: `${route.path}?type=monthly`,
    label: "Monthly",
    icon: "pi pi-calendar-plus",
  },
  {
    route: `${route.path}?type=yearly`,
    label: "Yearly",
    icon: "pi pi-calendar-times",
  },
  {
    route: `${route.path}?type=chart`,
    label: "Chart",
    icon: "pi pi-chart-bar",
  },
]);
</script>

<template>
  <section class="bg-gray-200 grid grid-cols-4 gap-6 px-5 py-4">
    <div class="col-span-2 bg-white rounded-md">
      <div class="grid grid-cols-6 gap-6 px-5 pt-5 pb-3">
        <div class="col-span-3">
          <form-label>Title:</form-label>
          <form-input></form-input>
        </div>
        <div class="col-span-2">
          <form-label>Amount:</form-label>
          <form-input type="number"></form-input>
        </div>
        <div class="col-span-1 flex justify-end">
          <primary-button size="large" class="mt-8 flex items-center">
            <i class="pi pi-check text-[10px]"></i>
          </primary-button>
        </div>
      </div>
      <section-scroll-bar :auto-height="false" style="height: 70vh">
        <div id="captureArea" class="p-5">
          <ul class="mt-5">
            <li class="pb-3 text-sm text-gray-500">12/04/2024</li>
            <li v-for="item in 10" :key="item">
              <div
                class="border border-gray-200 py-2 px-2 bg-white mb-3 rounded-md flex items-start"
              >
                <div class="me-2">
                  <form-checkbox />
                </div>
                <div class="">
                  <h3 class="text-gray-700 font-semibold">
                    A kanban board is a project management tool that helps teams
                    visualize their work and improve efficiency. A kanban board
                    is a project management tool that helps teams visualize
                    their work and improve efficiency.
                  </h3>
                  <div class="flex">
                    <span class="text-green-600 text-md me-2 font-semibold">
                      $500.00
                    </span>
                    <span class="text-gray-500 text-md me-2">30 min ago</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section-scroll-bar>
    </div>
    <div class="col-span-2 bg-white rounded-md overflow-hidden">
      <div>
        <Tabs :value="route.fullPath" class="-mb-1">
          <TabList>
            <Tab
              class="!p-[0]"
              v-for="tab in items"
              :key="tab.label"
              :value="tab.route"
            >
              <router-link
                v-if="tab.route"
                v-slot="{ href, navigate }"
                :to="tab.route"
                custom
              >
                <a
                  v-ripple
                  :href="href"
                  @click="navigate"
                  class="flex items-center gap-2 text-inherit py-[0.6rem] px-4"
                >
                  <i :class="tab.icon" />
                  <span>{{ tab.label }}</span>
                </a>
              </router-link>
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  </section>
</template>