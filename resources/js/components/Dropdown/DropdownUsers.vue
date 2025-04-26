<script setup>
import { onMounted, ref } from "vue";
import { userStore } from "@stores";
import { storeToRefs } from "pinia";

const { userList } = storeToRefs(userStore);
const popovarRef = ref();
const props = defineProps({
    users: { type: Array, default: [] },
});
const emits = defineEmits(["update:users"]);

function toggler(event) {
    popovarRef.value.toggle(event);
}

onMounted(() => userStore.handleFetchUserList());

const selectedUsers = ref([]);

function handleSelectUser(user) {
    const index = selectedUsers.value.findIndex((u) => u.id === user.id);
    if (index === -1) {
        selectedUsers.value.push(user);
    } else {
        selectedUsers.value.splice(index, 1);
    }
    emits("update:users", selectedUsers.value);
}

function checkedUser(user) {
    const index = selectedUsers.value.findIndex((u) => u.id === user.id);
    if (index == -1) return false;
    return true;
}

onMounted(() => {
    selectedUsers.value = props.users;
});
</script>

<template>
    <div>
        <slot name="toggler" :toggler="toggler"></slot>
        <Popover ref="popovarRef" class="w-[16rem]">
            <div class="flex flex-col gap-4">
                <div>
                    <span class="font-medium block mb-2">Team Members</span>
                    <ul class="list-none p-0 m-0 flex flex-col">
                        <li
                            v-for="(member, index) in userList.data"
                            :key="index"
                            class="flex items-center gap-2 px-2 mb-2 py-1 hover:bg-emphasis cursor-pointer rounded-border hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-md"
                            :class="{
                                'border-emerald-500 hover:!border-emerald-500 !bg-emerald-50':
                                    checkedUser(member),
                            }"
                            @click="handleSelectUser(member)"
                        >
                            <img
                                :src="`https://avatar.iran.liara.run/public/boy?refresh=${member.id}`"
                                style="width: 32px"
                            />
                            <div>
                                <span class="">
                                    {{ member.first_name }}
                                    {{ member.last_name }}
                                </span>
                                <div
                                    class="text-sm text-surface-500 dark:text-surface-400"
                                >
                                    <!-- {{ member.email }} -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Popover>
    </div>
</template>
