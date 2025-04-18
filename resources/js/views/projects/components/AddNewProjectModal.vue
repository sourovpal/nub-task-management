<script setup>
import { ref, computed } from "vue";
const validationErrors = ref({});
const attributes = ref({
  title: "",
  description: "",
  start_date: "",
  due_date: "",
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
          <span> Add New </span>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <div class="col-span-7 pl-4 pb-4">
        <div class="w-full mb-3">
          <form-input
            label="Title"
            name="title"
            v-model="attributes['title']"
            :errors="validationErrors"
          />
        </div>
        <div class="w-full mb-3">
          <form-label>Description</form-label>
          <QuillEditor
            theme="snow"
            style="height: 160px"
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
        <div class="grid grid-cols-2 gap-x-4 mb-3">
          <div class="col-span-2">
            <form-label>Assignee & Communication</form-label>
          </div>
          <div class="col-span-2 mt-1 flex flex-row items-center">
            <AvatarGroup>
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                shape="circle"
              />
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
                shape="circle"
              />
              <Avatar label="+2" shape="circle" />
            </AvatarGroup>
            <Button
              icon="pi pi-plus"
              label="Add Member"
              severity="secondary"
              variant="outlined"
              size="small"
              class="ml-4"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <form-input
              label="Start Date"
              name="start_date"
              type="date"
              v-model="attributes['start_date']"
              :errors="validationErrors"
            />
          </div>
          <div class="col-span-2">
            <form-input
              label="Due Date"
              name="due_date"
              type="date"
              v-model="attributes['due_date']"
              :errors="validationErrors"
            />
          </div>
        </div>

        <div class="flex flex-row justify-between mt-6">
          <Button icon="pi pi-refresh" severity="danger" label="Reset" />
          <Button
            icon="pi pi-save"
            :label="`${attributes.uuid ? 'Update' : 'Save Change'}`"
            :disabled="!attributes['first_name']"
          />
        </div>
      </div>
    </div>
  </custom-modal>
</template>