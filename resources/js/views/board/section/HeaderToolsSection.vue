<script setup>
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DropdownUsers from "@components/Dropdown/DropdownUsers.vue";

const { currentProject } = storeToRefs(projectStore);

function handleSearch(event) {
  projectStore.handleFetchStage({ search: event.target.value });
}

function handleSearchUser(users) {
  const ids = users.map((item) => item.id);
  projectStore.handleFetchStage({ users: ids });
}
</script>
<template>
  <section
    class="h-[2.5rem] w-full border-b border-b-gray-300 flex flex-row items-center px-4 bg-white"
  >
    <div class="left">
      <h3 class="text-gray-700 font-semibold">
        <i class="pi pi-bookmark mr-2"></i>
        {{ currentProject.title ?? "Not added yet!" }}
      </h3>
    </div>
    <div class="right flex flex-row items-center ml-auto">
      <div class="px-4">
        <IconField>
          <InputText
            size="small"
            @input="handleSearch"
            placeholder="Search..."
          />
          <InputIcon class="pi pi-search" />
        </IconField>
      </div>

      <div class="pr-4">
        <dropdown-users :users="[]" @update:users="handleSearchUser">
          <template #toggler="{ toggler }">
            <Button
              @click="toggler"
              icon="pi pi-user"
              label="Filter"
              severity="secondary"
              variant="outlined"
              size="small"
              class="ml-4"
            />
          </template>
        </dropdown-users>
      </div>
    </div>
  </section>
</template>