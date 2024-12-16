<script setup>
import { storeToRefs } from "pinia";
import { authStore } from "@stores";
import { usePush } from "@routers";
const { user, token } = storeToRefs(authStore);
</script>
<template>
  <h1>Login</h1>
</template>