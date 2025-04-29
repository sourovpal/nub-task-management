<script setup lang="ts">
import { Dialog } from "primevue";
import { useToast } from "primevue/usetoast";
import { onMounted, PropType, reactive, ref, watch } from "vue";
import Http from "@services";
import { departmentStore, appStore } from "@stores";
import { formatToast } from "@helpers";

const props = defineProps({
    edit: {
        type: Object as PropType<{
            id: Number;
            name: String;
            short_name: String;
        } | null>,
        default: null,
    },
});

const toast = useToast();

const attributes = reactive<{
    name: string;
    short_name: string;
}>({
    name: "",
    short_name: "",
});

let errors = ref({});

const is_loading = ref<Boolean>(false);

function handleUpdateOrCreate() {
    is_loading.value = true;

    Http.department[props.edit ? "update" : "create"](attributes, {
        id: props.edit?.id,
    })
        .then((res) => {
            departmentStore.handleFetchDepartment();
            toast.add(formatToast(res.data.alert));
        })
        .catch((error) => {})
        .finally(() => (is_loading.value = false));
}

onMounted(() => {
    if (props.edit)
        Object.assign(attributes, {
            id: props.edit.id,
            name: props.edit.name,
            short_name: props.edit.short_name,
        });
});
</script>

<template>
    <Dialog
        modal
        dismissableMask
        :header="`${edit ? 'Edit Department' : 'Add New'}`"
        :style="{ width: '25rem' }"
    >
        <div class="mb-4">
            <form-label>Department Name:</form-label>
            <form-input
                v-model="attributes.name"
                class="w-full"
                autocomplete="off"
                :errors="errors"
                error-name="name"
            />
        </div>

        <div class="mb-4">
            <form-label>Short Name:</form-label>

            <form-input
                v-model="attributes.short_name"
                class="w-full"
                autocomplete="off"
                :errors="errors"
                error-name="short_name"
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
