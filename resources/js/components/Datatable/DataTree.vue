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
    <thead class="top-0 sticky">
      <tr>
        <th
          v-for="(head, index) in headers"
          :key="index"
          :style="{ 'max-width': head.width, 'min-width': head.width }"
          class="px-5 py-3 border-b border-b-2 border-gray-200 bg-gray-50- text-xs font-bold text-gray-700 uppercase tracking-wider text-start whitespace-nowrap bg-gray-100"
        >
          <slot :name="`th-${head.id}`" :item="head">{{ head.label }}</slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <template v-for="(head, index) in headers" :key="`${head.id}_${index}`">
          <td
            v-if="$slots[`td-${head.id}`]"
            class="px-5 py-2 border-b border-gray-200 bg-white text-sm whitespace-nowrap text-gray-700 bg-white"
          >
            <slot
              :name="`td-${head.id}`"
              :head="head"
              :row="row"
              :rowId="index"
            >
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  <div class="py-[6rem]"></div>
</template>
