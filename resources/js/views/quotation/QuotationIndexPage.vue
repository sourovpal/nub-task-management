<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import ItemSection from "./section/ItemsSection.vue";
import QuotationSection from "./section/QuotationSection.vue";
import { quotationStore } from "@stores";
import { storeToRefs } from "pinia";

const { currentProject } = storeToRefs(quotationStore);

const { params } = useRoute();

onMounted(() => {
  currentProject.value = params.id;
  quotationStore.handleFetchQuotation();
  quotationStore.handleFetchQuotation({ project_id: params.id });
});
</script>

<template>
  <section class="py-2 px-4">
    <h1 class="text-2xl text-gray-700 font-semibold">Generate Quotation</h1>
  </section>
  <section class="grid grid-cols-12 px-4 py-4 gap-x-6">
    <ItemSection />
    <QuotationSection />
  </section>
</template>