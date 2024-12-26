<script setup>
</script>

<template>
  <section-scroll-bar>
    <section class="overflow-y-auto sticky top-0">
      <div class="bg-gray-200 h-auto p-4">
        <div class="container mx-auto">
          <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <!-- Card 1 -->
            <a
              href="#"
              v-for="item in 100"
              :key="item"
              class="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src="https://via.placeholder.com/200x130"
                alt="Card Image"
                class="rounded-lg w-full"
              />
              <h2 class="text-md font-semibold mt-2 text-gray-800">
                Todo Task
              </h2>
              <p class="text-gray-500">Last Update: 12:25 AM</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section-scroll-bar>
</template>