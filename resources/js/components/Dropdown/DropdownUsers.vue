<script setup>
import { onMounted, ref } from "vue";
import { userStore } from "@stores";
import { storeToRefs } from "pinia";

const { userList } = storeToRefs(userStore);
const popovarRef = ref();

function toggler(event) {
  popovarRef.value.toggle(event);
}

onMounted(() => userStore.handleFetchUserList());
</script>

<template>
  <div>
    <slot name="toggler" :toggler="toggler"></slot>
    <Popover ref="popovarRef">
      <div class="flex flex-col gap-4">
        <div>
          <span class="font-medium block mb-2">Team Members</span>
          <ul class="list-none p-0 m-0 flex flex-col">
            <li
              v-for="(member, index) in userList.data"
              :key="index"
              class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
            >
              <img
                :src="`https://avatar.iran.liara.run/public/boy?refresh=${member.id}`"
                style="width: 32px"
              />
              <div>
                <span class="font-medium">{{ member.name }}</span>
                <div class="text-sm text-surface-500 dark:text-surface-400">
                  {{ member.email }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>