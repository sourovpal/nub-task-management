<script setup lang="ts">
import { PropType } from "vue";

interface Header {
  id: string;
  label: string;
}

const props = defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    default: () => [],
  },
});

</script>

<template>
  
  <thead>

    <tr>
      
      <th v-for="(item, index) in headers" :key="index">

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
</template>
