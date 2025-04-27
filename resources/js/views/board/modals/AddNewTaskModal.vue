<script setup>
import { ref, computed, onMounted } from "vue";
const validationErrors = ref({});
import Http from "@services";
import toast from "vue3-hot-toast";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
import DropdownUsers from "@components/Dropdown/DropdownUsers.vue";

const props = defineProps({
  stage: Object,
  task: { type: Object, default: null },
});

const emits = defineEmits(["fetch"]);

const attributes = ref({
  name: "",
  description: "",
  priority: "low",
  due_date: "",
  status_id: null,
});

const { projectStages } = storeToRefs(projectStore);

const isLoading = ref(false);

function handleTaskCreate() {
  isLoading.value = true;
  Http.project[props.task ? "updateTask" : "createTask"](attributes.value, {
    id: attributes.value.id,
  })
    .then(({ message }) => {
      projectStore.handleFetchStage();
      toast.success(message);
      emits("fetch", true);
    })
    .catch(({ errors }) => {
      if (errors) return (validationErrors.value = errors);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleUpdateTaskUser(users) {
  const ids = users.map((item) => item.id);
  Http.project
    .taskUserUpdate({ users: ids, id: props.task.id })
    .then(({ message }) => {})
    .catch(({ errors }) => {})
    .finally(() => {});
}

onMounted(() => {
  if (props.task) {
    attributes.value = { ...props.task };
  }
  attributes.value.status_id = props.stage.id;
});
</script>

<template>
  <custom-modal
    position="center"
    :style="{ width: '40vw' }"
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
          <span> {{ task ? "Edit & Update" : "Add New" }} </span>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <div class="col-span-7 pl-4 pb-4">
        <div class="w-full mb-3">
          <form-input
            label="Name"
            error-name="name"
            v-model="attributes['name']"
            :errors="validationErrors"
          />
        </div>
        <div class="w-full mb-3">
          <form-label>Description</form-label>
          <QuillEditor
            theme="snow"
            style="height: 223px"
            :content="attributes['description']"
            @update:content="attributes['description'] = $event"
            contentType="html"
            :toolbar="[
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ]"
          />
        </div>
      </div>
      <div class="col-span-5 px-4">
        <div v-if="task" class="grid grid-cols-2 gap-x-4 mb-3">
          <div class="col-span-2">
            <form-label>Assignee & Communication</form-label>
          </div>
          <div class="col-span-2 mt-1 flex flex-row items-center">
            <AvatarGroup>
              <Avatar
                v-for="(member, index) in task.users"
                :key="index"
                :image="`https://avatar.iran.liara.run/public/boy?refresh=${member.id}`"
                shape="circle"
              />
              <Avatar label="+2" shape="circle" />
            </AvatarGroup>
            <dropdown-users
              :users="task.users"
              @update:users="handleUpdateTaskUser"
            >
              <template #toggler="{ toggler }">
                <Button
                  @click="toggler"
                  icon="pi pi-plus"
                  label="Add Member"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  class="ml-4"
                />
              </template>
            </dropdown-users>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <form-label>Priority</form-label>
            <div class="grid gap-2 grid-flow-col">
              <div
                v-for="(item, index) in ['low', 'medium', 'high']"
                :key="index"
                class="col-span-2 flex items-center"
              >
                <input
                  type="radio"
                  class="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-checkbox-group-2"
                  name="priority"
                  :value="item"
                  v-model="attributes['priority']"
                />
                <label
                  for="hs-checkbox-group-2"
                  class="text-gray-700 ms-2 dark:text-neutral-400 text-base capitalize"
                >
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <form-label>Status</form-label>
            <form-select
              :options="projectStages"
              error-name="due_date"
              type="date"
              v-model="attributes['status_id']"
              optionLabel="name"
              optionValue="id"
              :errors="validationErrors"
            />
          </div>
          <div class="col-span-2">
            <form-input
              label="Due Date"
              error-name="due_date"
              type="date"
              v-model="attributes['due_date']"
              :errors="validationErrors"
            />
          </div>
        </div>

        <div class="flex flex-row justify-between mt-6 pb-4">
          <Button icon="pi pi-refresh" severity="danger" label="Reset" />
          <Button
            icon="pi pi-save"
            :loading="isLoading"
            :label="`${task ? 'Update' : 'Save Change'}`"
            :disabled="!attributes['name']"
            @click="handleTaskCreate"
          />
        </div>
      </div>
    </div>
  </custom-modal>
</template>
