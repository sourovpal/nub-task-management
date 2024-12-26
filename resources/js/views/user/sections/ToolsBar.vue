<script setup></script>

<template>
  <header-tools-bar>
    <div class="flex items-center">

      <form-checkbox class="me-3" />

      <refresh-button />

    </div>
    <div class="ms-auto flex items-center">

      <primary-button size="small" class="me-4">
        <i class="pi pi-user-plus me-1"></i>
        Add New
      </primary-button>

      <data-pagination />

    </div>
  </header-tools-bar>
</template>