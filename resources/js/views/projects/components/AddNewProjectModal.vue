<script setup>
import { ref, computed } from "vue";
const validationErrors = ref({});
import Http from "@services";
import toast from "vue3-hot-toast";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const { headers, projectsData } = storeToRefs(projectStore);
import DropdownUsers from "@components/Dropdown/DropdownUsers.vue";

const attributes = ref({
    title: "",
    description: "",
    start_date: "",
    due_date: "",
    users: [],
});
const isLoading = ref(false);
function handleProjectCreate() {
    isLoading.value = true;
    Http.project
        .create(attributes.value)
        .then(({ message }) => {
            toast.success(message);
            projectStore.handleFetchProjects();
        })
        .catch(({ errors }) => {
            if (errors) return (validationErrors.value = errors);
        })
        .finally(() => {
            isLoading.value = false;
        });
}
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
                        error-name="title"
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
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                        <form-input
                            label="Start Date"
                            error-name="start_date"
                            type="date"
                            v-model="attributes['start_date']"
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

                <div class="flex flex-row justify-between mt-6">
                    <Button
                        icon="pi pi-refresh"
                        severity="danger"
                        label="Reset"
                    />
                    <Button
                        icon="pi pi-save"
                        :loading="isLoading"
                        label="Save Change"
                        :disabled="!attributes['title']"
                        @click="handleProjectCreate"
                    />
                </div>
            </div>
        </div>
    </custom-modal>
</template>
