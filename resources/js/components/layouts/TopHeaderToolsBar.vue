<script setup>
import { ref } from "vue";
import { authStore } from "@stores";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(authStore);
const popovarRef = ref();

function handleToggle(event) {
    popovarRef.value.toggle(event);
}

function handleLogout() {}
</script>

<template>
    <section
        class="sticky top-0 h-[3rem] border-b border-b-gray-300 bg-white flex items-center"
    >
        <div class="ml-auto px-4 text-end flex items-center">
            <Avatar
                @click="handleToggle"
                image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                shape="circle"
            />
            <Popover ref="popovarRef" class="w-[16rem]">
                <div class="flex flex-col gap-4">
                    <div>
                        <ul class="list-none p-0 m-0 flex flex-col">
                            <li
                                class="flex items-center py-2 border-b border-b-gray-300 mb-3"
                            >
                                <Avatar
                                    image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
                                    shape="circle"
                                    class="min-w-[2rem]"
                                />
                                <div class="ml-3 leading-5">
                                    <span class="block text-md text-gray-600">
                                        {{ user.first_name }}
                                        {{ user.last_name }}
                                    </span>
                                    <span class="block text-md text-gray-500">
                                        {{ user.email }}
                                    </span>
                                </div>
                            </li>
                            <li
                                class="flex items-center gap-2 px-2 py-2 hover:bg-emphasis cursor-pointer rounded-border hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-md duration-300"
                            >
                                <i class="pi pi-user"></i>
                                <span class=""> My Profile </span>
                            </li>
                            <li
                                @click="authStore.logout()"
                                class="flex items-center gap-2 px-2 py-2 hover:bg-emphasis cursor-pointer rounded-border hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-md duration-300"
                            >
                                <i class="pi pi-lock"></i>
                                <span class="">Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Popover>
        </div>
    </section>
</template>
