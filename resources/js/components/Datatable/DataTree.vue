<script setup lang="ts">
import { PropType } from "vue";

interface Rows {
  [key: string]: any;
}

interface Header {
  id: string;
  label: string;
  width: string;
}

const props = defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    default: () => [],
  },
  rows: {
    type: Array as PropType<Rows[]>,
    default: () => [],
  },
});
</script>

<template>
  <table class="min-w-full leading-normal">
    <thead>
      <tr>
        <th
          v-for="(item, index) in headers"
          :key="index"
          :style="{ width: item.width }"
          class="px-5 py-3 border-b-2 border-gray-150 bg-gray-50 text-sm font-semibold text-gray-700 uppercase tracking-wider text-start"
        >
          <template v-if="$slots[item.id]">
            <slot :name="item.id" :item="item" />
          </template>

          <template v-else>
            <slot name="th" :item="item">
              {{ item.label }}
            </slot>
          </template>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <template v-for="(head, index) in headers" :key="`${head.id}_${index}`">
          <td
            v-if="$slots[`tbody-${head.id}`]"
            class="px-5 py-4 border-b border-gray-200 bg-white text-sm"
          >
            <slot :name="`tbody-${head.id}`" :head="head" :row="row">
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  <div class="py-[6rem]"></div>
</template>
