<script setup>
import { quotationStore } from "@stores";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const { isCreating, projectQuotations, currentProject, isDelating, isUpdating } =
  storeToRefs(quotationStore);

function totalCostCalculate() {
  let total = 0;
  projectQuotations.value.map((item) => {
    total += item.quantity * item.cost_amount;
  });
  return total;
}
</script>

<template>
  <div class="col-span-7 bg-white rounded-md shadow-md">
    <div
      class="py-2 px-4 border-b border-b-gray-300 flex flex-row items-center justify-between"
    >
      <h3 class="text-gray-600 text-lg font-medium">Quotations</h3>
      <Button
        size="small"
        icon="pi pi-print"
        label="Print"
        severity="info"
        raised
      />
    </div>
    <div class="py-4">
      <ul class="px-4">
        <li
          v-for="(item, index) in projectQuotations"
          :key="index"
          class="mb-4"
        >
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4">
              <form-input label="Title" v-model="item.title" />
            </div>
            <div class="col-span-2">
              <form-input label="Quantity" v-model="item.quantity" />
            </div>
            <div class="col-span-2">
              <form-input label="Cost Amount" v-model="item.cost_amount" />
            </div>
            <div class="col-span-1">
              <span class="mt-8 block text-center text-2xl">=</span>
            </div>
            <div class="col-span-2">
              <form-input
                label="Total Cost"
                readonly
                disabled
                :value="item.cost_amount * item.quantity"
              />
            </div>
            <div class="col-span-1">
              <Button
                icon="pi pi-trash"
                severity="danger"
                class="mt-8"
                :loading="isDelating"
                @click="quotationStore.handleDelete(item.id)"
              />
            </div>
          </div>
        </li>
        <li v-if="projectQuotations.length" class="mt-6">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-5 text-lg mt-3">
              Total Items:
              {{ projectQuotations.length }}
            </div>
            <div class="col-span-4 text-lg mt-3">
              <span>Total Cost: </span>
              <span>{{ totalCostCalculate() }}</span>
            </div>
            <div class="col-span-3">
              <Button
                :loading="isUpdating"
                label="Save & Update"
                @click="quotationStore.handleUpdate()"
              ></Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>