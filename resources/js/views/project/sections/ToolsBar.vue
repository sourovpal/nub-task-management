<script setup>
import { onMounted, ref } from "vue";
import ProjectCreateModal from "./ProjectCreateModal.vue";
import { Tab, TabList, Tabs } from "primevue";
import { useRoute } from "vue-router";
const route = useRoute();
const is_open = ref(false);

const items = ref([
  { route: "/projects", label: "Recent", icon: "pi pi-objects-column" },
  { route: "/projects?type=archived", label: "Archived", icon: "pi pi-qrcode" },
  { route: "/projects?type=kanban", label: "Kanban", icon: "pi pi-table" },
  {
    route: "/projects?type=calculate",
    label: "Cost Calculate",
    icon: "pi pi-calculator",
  },
  { route: "/projects?type=notes", label: "Notes", icon: "pi pi-file-plus" },
  { route: "/projects?type=trash", label: "Trash", icon: "pi pi-trash" },
]);
</script>

<template>
  <project-create-modal v-if="is_open" v-model:visible="is_open" />

  <header-tools-bar>
    <div class="flex items-center">
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
    <div class="ms-auto flex items-center">
      <primary-button
        @click="is_open = true"
        size="small"
        class="me-4 flex items-center"
      >
        <i class="pi pi-plus me-2"></i>
        Add New
      </primary-button>
    </div>
  </header-tools-bar>
</template>