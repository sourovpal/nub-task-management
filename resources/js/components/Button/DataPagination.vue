<script setup lang="ts">
import { PropType } from "vue";
import CircelButton from "./CircelButton.vue";

const props = defineProps({
  pagination: {
    type: Object as PropType<{
      from: Number | String;
      to: Number | String;
      total: Number | String;
      next: Number | String | null;
      prev: Number | String | null;
      current_page: Number | string | null;
    }>,
    default: {
      from: 0,
      to: 0,
      total: 0,
      next: null,
      prev: null,
      current_page: null,
    },
  },
});

const emits = defineEmits(["change"]);
</script>

<template>
  <div class="flex items-center">
    <div class="me-3 font-semibold text-gray-700">
      <span id="from" class="me-1">{{ pagination.from }}</span>
      <span id="hipen" class="me-1">-</span>
      <span id="to" class="me-1">{{ pagination.to }}</span>
      <span id="of" class="me-1">of</span>
      <span id="total">{{ pagination.total }}</span>
    </div>
    <circel-button
      :disabled="!pagination.prev"
      @click="emits('change', { page: pagination.prev })"
      class="me-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"
        />
      </svg>
    </circel-button>
    <circel-button
      :disabled="!pagination.next"
      @click="emits('change', { page: pagination.next })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"
        />
      </svg>
    </circel-button>
  </div>
</template>