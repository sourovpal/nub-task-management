<script setup>
import Cards from "./Cards.vue";
import Http from "@services/clients";
import { ref, onMounted } from "vue";

const attributes = ref({
    total_users: 0,
    total_projects: 0,
    total_departments: 0,
    total_tasks: 0,
    tasks: 0,
});

function handleFetch() {
    Http.get("/dashboard")
        .then((res) => {
            attributes.value = res;
        })
        .then(() => {});
}

onMounted(() => handleFetch());
</script>
<template>
    <div class="p-4 md:p-6">
        <div class="grid grid-cols-12 gap-4 md:gap-6">
            <Cards :attributes="attributes" />

            <div class="col-span-12">
                <div
                    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
                >
                    <div
                        class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <h3
                                class="text-lg font-semibold text-gray-800 dark:text-white/90"
                            >
                                Recent Tasks
                            </h3>
                        </div>
                        <div class="flex items-center gap-3">
                            <router-link
                                to="/projects"
                                class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                            >
                                See all
                            </router-link>
                        </div>
                    </div>
                    <div class="max-w-full overflow-x-auto">
                        <table class="min-w-full undefined">
                            <thead
                                class="border-gray-100 dark:border-gray-800 border-y"
                            >
                                <tr>
                                    <th
                                        class="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Task
                                    </th>
                                    <th
                                        class="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Priority
                                    </th>
                                    <th
                                        class="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Due Date
                                    </th>
                                    <th
                                        class="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Status
                                    </th>
                                    <th
                                        class="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-gray-100 dark:divide-gray-800"
                            >
                                <tr
                                    v-for="(item, index) in attributes.tasks"
                                    :key="index"
                                    class=""
                                >
                                    <td class="py-3">
                                        <div class="flex items-center gap-3">
                                            <div>
                                                <p
                                                    class="font-medium text-gray-800 text-theme-sm dark:text-white/90"
                                                >
                                                    {{ item.name }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="py-3 text-gray-500 text-theme-sm dark:text-gray-400 capitalize"
                                    >
                                        {{ item.priority }}
                                    </td>
                                    <td
                                        class="py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                                    >
                                        {{ item.due_date ?? "Today" }}
                                    </td>
                                    <td
                                        class="py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                                    >
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                                        >
                                            {{ item.status.name }}
                                        </span>
                                    </td>
                                    <td
                                        class="py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                                    >
                                        <router-link
                                            class="text-blue-700 px-3 py-1 text-sm rounded-md bg-blue-100 font-medium"
                                            :to="`/projects/${item.status.project_id}/board`"
                                            >View</router-link
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
