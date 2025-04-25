<script setup>
import { ref, computed, onMounted } from "vue";
const validationErrors = ref({});
import toast from "vue3-hot-toast";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
import Http from "@services/clients";
import { formatTimeAgo } from "@helpers";

const { headers, projectsData, currentProject } = storeToRefs(projectStore);

const props = defineProps({
  task: Object,
});

const commants = ref([]);
const isLoading = ref(false);
const message = ref("");
function handleFetchCommant() {
  Http.get("/tasks/commants?id=" + props.task.id)
    .then((data) => {
      commants.value = data;
    })
    .catch(() => {});
}

function handleSendCommant() {
  if (!message.value) return;
  isLoading.value = true;
  Http.post("/tasks/commants", { id: props.task.id, message: message.value })
    .then((data) => {
      message.value = "";
      handleFetchCommant();
    })
    .catch(() => {})
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => handleFetchCommant());
</script>

<template>
  <custom-modal
    position="center"
    :style="{ width: '30vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '95vw' }"
    pt:header:class="!py-2 dark:bg-neutral-900"
    pt:content:class="!p-0 dark:bg-neutral-900"
    pt:root:class="!rounded-[0.8rem] !overflow-hidden dark:!border-neutral-700"
  >
    <template #header>
      <div class="grid grid-cols-12 w-full">
        <div
          class="col-span-4 font-semibold text-lg dark:text-gray-200 flex flex-row items-center justify-between"
        >
          <span> Chats </span>
        </div>
      </div>
    </template>
    <div class="px-4">
      <div class="w-full mb-3">
        <custom-scroll class="!h-[25rem]">
          <!-- Chat Bubble -->
          <ul class="space-y-5">
            <!-- Chat Bubble -->
            <li
              v-for="item in commants"
              :key="item"
              class="max-w-lg block me-11"
            >
              <div class="mb-3 flex flex-row gap-x-3">
                <img
                  class="inline-block size-9 rounded-full"
                  :src="`https://avatar.iran.liara.run/public/boy?refresh=${item.id}`"
                  alt="Avatar"
                />
                <div class="leading-[18px]">
                  <span class="block">
                    {{ item.user.first_name }} {{ item.user.last_name }}
                  </span>
                  <span class="block text-xs text-gray-500">
                    {{ formatTimeAgo(item.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Card -->
              <div
                class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700"
              >
                <p class="text-sm text-gray-800 dark:text-white">
                  {{ item.message }}
                </p>
              </div>
              <!-- End Card -->
            </li>
            <!-- End Chat Bubble -->
          </ul>
          <!-- End Chat Bubble -->
        </custom-scroll>
      </div>
      <div class="grid grid-cols-12 gap-x-2 mb-6">
        <div class="col-span-9">
          <form-input v-model="message"></form-input>
        </div>
        <div class="col-span-3 text-end">
          <Button
            icon="pi pi-send"
            label="Send"
            :loading="isLoading"
            @click="handleSendCommant"
          />
        </div>
      </div>
    </div>
  </custom-modal>
</template>