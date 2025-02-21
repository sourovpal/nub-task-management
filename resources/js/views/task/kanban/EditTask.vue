<script setup lang="ts">
import { ref, computed } from "vue";
import { Ckeditor, useCKEditorCloud } from "@ckeditor/ckeditor5-vue";
import { Drawer } from "primevue";
const props = defineProps({
  task: { type: Object, default: {} },
});

const cloud = useCKEditorCloud({
  version: "44.2.0",
  premium: true,
});

const data = ref("<p>Hello world!</p>");

const editor = computed(() => {
  if (!cloud.data.value) {
    return null;
  }
});

const config = computed(() => {
  if (!cloud.data.value) {
    return null;
  }

  const { Essentials, Paragraph, Bold, Italic } = cloud.data.value.CKEditor;
  const { FormatPainter } = cloud.data.value.CKEditorPremiumFeatures;

  return {
    licenseKey: "<YOUR_LICENSE_KEY>",
    plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
    toolbar: ["undo", "redo", "|", "bold", "italic", "|", "formatPainter"],
  };
});
</script>

<template>
  <Drawer position="right" class="!w-[55rem]">
    <div class="border-t border-gray-200 -mx-6">
      <div class="px-6 mt-6">
        <div class="mb-3">
          <form-label>Title:</form-label>
          <form-input label="Title:" v-model="task.title" />
        </div>
        <div class="mb-3">
          <form-label>Description:</form-label>
          <ckeditor
            v-if="editor"
            v-model="data"
            :editor="editor"
            :config="config"
          />
        </div>
      </div>
    </div>
  </Drawer>
</template>