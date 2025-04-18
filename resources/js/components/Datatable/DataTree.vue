<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  headers: { type: Array, required: true, default: [] },
  payload: { type: Array, required: true, default: [] },
  attributes: {
    type: Object,
    default: {
      "head:class": {},
      "head:style": {},
      "body:class": {},
      "body:style": {},
    },
  },
  selectedRows: { type: Array, default: [] },
  activeColumn: { type: String, default: "id" },
  hiddenColumn: { type: Array, default: [] },
  loading: { type: [Boolean, String], default: false },
  skeleton: { type: Number, default: 30 },
  headerVisible: { type: Boolean, default: true },
});

function handleMatchActiveRow(row, className = null) {
  if (props.loading) return false;

  if (!row[props.activeColumn]) return false;

  const status = props.selectedRows.includes(row[props.activeColumn]);

  if (status && className) return className;

  return status;
}

const selected_header = ref({});

const is_active_sort = ref(null);

function handleColumnSort(header) {
  if (!header?.sorted) return false;

  selected_header.value = header;

  if (is_active_sort.value == "up") {
    is_active_sort.value = "down";
  } else {
    is_active_sort.value = "up";
  }
}

const filterPayload = computed(() => {
  const column = selected_header.value?.sorted;

  if (!column) return props.payload;

  return [...props.payload].sort((a, b) => {
    const first = JSON.stringify(a[column] ?? "");

    const last = JSON.stringify(b[column] ?? "");

    if (is_active_sort.value == "up") {
      if (typeof a[column] == "number" && typeof b[column] == "number")
        return a[column] - b[column];

      return first.localeCompare(last);
    } else {
      if (typeof a[column] == "number" && typeof b[column] == "number")
        return b[column] - a[column];

      return last.localeCompare(first);
    }
  });
});
</script>

<template>
  <section class="h-full bg-white">
    <custom-scroll>
      <section
        id="tree-head"
        class="w-full sticky top-0 z-10"
        :class="attributes['head:class']"
        :style="attributes['head:style']"
        v-if="headerVisible"
      >
        <div class="w-full flex flex-row bg-white" id="tree-row">
          <template v-for="(header, index) in headers" :key="index">
            <div
              id="tree-col"
              v-if="!hiddenColumn.includes(header.unique_id)"
              @click="handleColumnSort(header)"
              class="py-2 px-4 bg-gray-100 dark:bg-neutral-800 flex flex-grow border-b border-gray-300 dark:border-neutral-700 dark:text-gray-200 text-sm font-semibold text-gray-700 whitespace-nowrap items-center select-none"
              :style="{ ...header.style, 'min-width': header.style?.width }"
              :class="{ 'cursor-pointer': header.sorted }"
            >
              <slot :name="`th-${header.unique_id}`" :head="header">
                {{ header.label }}
              </slot>

              <div v-if="header.sorted" class="ms-3 flex items-center">
                <span
                  v-if="
                    is_active_sort == 'up' &&
                    selected_header.unique_id == header.unique_id
                  "
                  class="up"
                >
                  <i class="pi pi-sort-amount-up !text-[0.8rem]"></i>
                </span>

                <span
                  v-else-if="
                    is_active_sort == 'down' &&
                    selected_header.unique_id == header.unique_id
                  "
                  class="down"
                >
                  <i
                    class="pi pi-sort-amount-down-alt !text-[0.8rem]"
                  ></i>
                </span>

                <span v-else class="toggle flex flex-col items-center">
                  <i
                    class="pi pi-chevron-up !text-[0.5rem] !text-gray-400"
                  ></i>

                  <i
                    class="pi pi-chevron-down !text-[0.5rem] -mt- !text-gray-400"
                  ></i>
                </span>
              </div>
            </div>
          </template>
        </div>
      </section>

      <section
        id="tree-body"
        class="min-w-full w-fit bg-white dark:bg-neutral-800 h-full"
        :class="attributes['body:class']"
        :style="attributes['body:style']"
      >
        <template
          v-for="(row, index) in loading ? skeleton : filterPayload"
          :key="index"
        >
          <div
            id="tree-row"
            class="w-full flex flex-row bg-white dark:bg-neutral-800"
            :class="`${handleMatchActiveRow(
              row,
              'bg-yellow-50 dark:!bg-slate-700'
            )}`"
          >
            <template v-for="(header, h_index) in headers" :key="h_index">
              <div
                id="tree-col"
                v-if="!hiddenColumn.includes(header.unique_id)"
                class="py-2 flex flex-grow px-4 border-b border-gray-200 dark:border-neutral-700 whitespace-nowrap items-center text-gray-700 dark:text-gray-200"
                :class="`${handleMatchActiveRow(row, 'dark:!border-gray-800')}`"
                :style="{ ...header.style, 'min-width': header.style?.width }"
              >
                <component
                  v-if="loading && header.skeleton && header.skeleton.is"
                  :is="header.skeleton.is"
                  v-bind="header.skeleton"
                />

                <slot
                  v-else
                  :name="`td-${header.unique_id}`"
                  :row="loading ? {} : row"
                  :head="header"
                >
                  <div class="truncate">
                    <template v-if="header.item">
                      {{ header?.item(loading ? {} : row) }}
                    </template>
                  </div>
                </slot>
              </div>
            </template>
          </div>
        </template>
        <div class="pb-[10rem]"></div>
      </section>
    </custom-scroll>
  </section>
</template>