<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  bg: { type: String, default: "#b2babb" },
  autoHeight: { type: Boolean, default: true },
});
const section = ref();
const height = ref<Number>(0);

function getVisibleHeight(element: any) {
  if (!props.autoHeight) return;
  const rect = element.getBoundingClientRect();
  return Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  );
}

function setHeight() {
  height.value = getVisibleHeight(section.value);
}

onMounted(() => {
  setHeight();
});
</script>

<template>
  <section v-if="autoHeight" ref="section" class="overflow-x-auto grow">
    <scroll-panel
      class="overflow-y-hidden"
      :style="{ height: height ? `${height}px` : `auto` }"
      :dt="{
        bar: {
          background: bg,
        },
      }"
    >
      <slot />
    </scroll-panel>
  </section>
  <scroll-panel
    v-else
    :dt="{
      bar: {
        background: bg,
      },
    }"
  >
    <slot />
  </scroll-panel>
</template>