<script setup lang="ts">
import { onMounted } from "vue";
import DataTable from "./sections/DataTable.vue";
import ToolsBar from "./sections/ToolsBar.vue";
import { departmentStore } from "@stores";

onMounted(() => departmentStore.handleFetchDepartment());

</script>

<template>
  <tools-bar />
  <data-table />
</template>