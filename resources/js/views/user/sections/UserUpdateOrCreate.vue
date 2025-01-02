<script setup lang="ts">
import { Dialog } from "primevue";
import { useToast } from "primevue/usetoast";
import { onMounted, PropType, reactive, ref } from "vue";
import Http from "@services";
import { departmentStore, userStore } from "@stores";
import { formatToast } from "@helpers";
import { storeToRefs } from "pinia";

const props = defineProps({
  edit: {
    type: Object as PropType<{
      id: Number;
      first_name: String;
      last_name: String;
      email: String;
      password: String;
      department: Number | null;
    } | null>,
    default: null,
  },
});

const { departments, is_fatching: is_fatching_department } =
  storeToRefs(departmentStore);

const toast = useToast();

const attributes = reactive<{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department: Object | null;
  join_date: String | null;
  role: Object | null;
}>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department: null,
  join_date: null,
  role: null,
});

let errors = ref({});

const is_loading = ref<Boolean>(false);

function handleUpdateOrCreate() {
  is_loading.value = true;

  Http.user[props.edit ? "update" : "create"](
    {
      ...attributes,
      department: attributes.department?.id,
    },
    {
      id: props.edit?.id,
    }
  )
    .then(({ data }) => {
      userStore.handleFetchUser();

      toast.add(formatToast(data));
    })
    .catch((error: Error) => {
      const { errors: v_errors, alert } = Http.error(error);

      errors.value = v_errors;

      if (!v_errors) toast.add(formatToast(alert));
    })
    .finally(() => (is_loading.value = false));
}

onMounted(() => {
  if (props.edit) Object.assign(attributes, props.edit);
  departmentStore.handleFetchDepartmentList();
});
</script>

<template>
  <Dialog
    modal
    dismissableMask
    :header="`${edit ? 'Edit User' : 'Add New'}`"
    :style="{ width: '35rem' }"
  >
    <div class="grid grid-cols-2 gap-6">
      <div class="mb-4">
        <form-label>First Name:</form-label>
        <form-input
          v-model="attributes.first_name"
          class="w-full"
          autocomplete="off"
          :errors="errors"
          error-name="first_name"
        />
      </div>

      <div class="mb-4">
        <form-label>Last Name:</form-label>

        <form-input
          v-model="attributes.last_name"
          class="w-full"
          autocomplete="off"
          :errors="errors"
          error-name="last_name"
        />
      </div>
    </div>

    <div class="mb-4">
      <form-label>Email:</form-label>

      <form-input
        v-model="attributes.email"
        class="w-full"
        autocomplete="off"
        :errors="errors"
        error-name="email"
      />
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="mb-4">
        <form-label>Department:</form-label>
        <form-select
          filter
          :filterFields="['name', 'short_name']"
          :loading="is_fatching_department"
          :disabled="is_fatching_department"
          v-model="attributes.department"
          :options="departments"
          optionLabel="name"
          class="w-full"
          :errors="errors"
          error-name="department"
        />
      </div>

      <div class="mb-4">
        <form-label>Role & Access:</form-label>

        <form-input
          v-model="attributes.role"
          class="w-full"
          autocomplete="off"
          :errors="errors"
          error-name="password"
        />
      </div>
    </div>

    <div class="mb-4">
      <form-label>Join Date:</form-label>

      <form-input
        v-model="attributes.join_date"
        class="w-full"
        autocomplete="off"
        :errors="errors"
        error-name="password"
      />
    </div>

    <div class="mb-4">
      <form-label>Password:</form-label>

      <form-input
        v-model="attributes.password"
        class="w-full"
        autocomplete="off"
        :errors="errors"
        error-name="password"
      />
    </div>

    <div class="flex justify-between pt-3">
      <danger-button @click="$emit('update:visible', false)">
        Close
      </danger-button>

      <success-button @click="handleUpdateOrCreate" :loading="is_loading">
        {{ edit ? "Update" : "Create" }}
      </success-button>
    </div>
  </Dialog>
</template>