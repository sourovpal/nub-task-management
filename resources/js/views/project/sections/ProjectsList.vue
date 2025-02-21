<script setup lang="ts">
import { formatTimeAgo } from "@helpers";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const querys = computed(() => route.query);
const { projects } = storeToRefs(projectStore);
watch(
  querys,
  () => {
    projectStore.handleFetchProject({ type: querys.value.type });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <section-scroll-bar>
    <section class="overflow-y-auto sticky top-0">
      <div class="bg-gray-200 h-auto p-4">
        <div class="w-full">
          <div class="flex flex-wrap gap-5">
            <!-- Card 1 -->
            <template v-for="(project, index) in projects.concat([...projects, ...projects, ...projects, ...projects, ...projects])" :key="project.id">
              <router-link
                :to="{
                  name: `${project.categorie}-page`,
                  params: { id: project.id },
                }"
                class="bg-white shadow-md rounded-lg p-4 w-[18rem]"
              >
                <img
                  v-if="project.screenshort"
                  :src="`http://localhost/task-management/public/storage/${project.screenshort}`"
                  alt="Card Image"
                  class="rounded-lg w-full h-[8rem]"
                />
                <img
                  v-else
                  src="https://via.placeholder.com/200x200"
                  alt="Card Image"
                  class="rounded-lg w-full h-[8rem]"
                />
                <h2 class="text-md font-semibold mt-2 text-gray-800">
                  {{ project.name }}
                </h2>
                <p class="text-gray-500 text-xs">
                  Last Update: {{ formatTimeAgo(project.updated_at) }}
                </p>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </section>
  </section-scroll-bar>
</template>