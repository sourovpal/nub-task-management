<script setup>
import { Chart, registerables } from "chart.js";
import { DoughnutChart, BarChart, LineChart } from "vue-chart-3";
Chart.register(...registerables);

const options = {
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
};
</script>

<template>
  <div class="bg-gray-200 w-full p-5 grid grid-cols-2 gap-4">
    <div class="p-4 shadow-sm rounded-md bg-white col-span-2">
      <LineChart :chart-data="options"></LineChart>
    </div>
    <div class="p-4 shadow-sm rounded-md bg-white">
      <DoughnutChart :chart-data="options"></DoughnutChart>
    </div>
    <div class="p-4 shadow-sm rounded-md bg-white">
      <BarChart :chart-data="options"></BarChart>
    </div>
    <br><br>
  </div>
</template>