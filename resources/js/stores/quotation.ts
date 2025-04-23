import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import toast from "vue3-hot-toast";

export const useQuotationStore = defineStore("quotation", () => {
    const quotationItems = ref([]);
    const projectQuotations = ref<object[]>([]);
    const currentProject = ref(null);
    const isCreating = ref(false);
    const isUpdating = ref(false);
    const isDelating = ref(false);

    function handleFetchQuotation(payload: { project_id?: string } = {}) {
        console.log(payload);
        Http.quotation
            .all(payload)
            .then((data) => {
                if (payload["project_id"]) {
                    projectQuotations.value = data;
                    return;
                }
                quotationItems.value = data;
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function handleCreate(payload = {}, $success: Function = () => {}) {
        isCreating.value = true;
        Http.quotation
            .create(payload)
            .then(({ message }) => {
                toast.success(message);
                $success();
                if (payload["project_id"]) {
                    handleFetchQuotation({ project_id: currentProject.value });
                } else {
                    handleFetchQuotation();
                }
            })
            .catch(({ message }) => {
                toast.error(message);
            })
            .finally(() => {
                isCreating.value = false;
            });
    }

    function handleUpdate() {
        isUpdating.value = true;
        Http.quotation
            .update(
                { items: projectQuotations.value },
                { id: currentProject.value }
            )
            .then(({ message }) => {
                toast.success(message);
                handleFetchQuotation({ project_id: currentProject.value });
            })
            .catch(({ message }) => {
                toast.error(message);
            })
            .finally(() => {
                isUpdating.value = false;
            });
    }

    function handleDelete(id: number) {
        const check = window.confirm("Are you ready for delete?");
        if (!check) return;
        isDelating.value = true;
        Http.quotation
            .delete({ id })
            .then(({ message }) => {
                toast.success(message);
                handleFetchQuotation({ project_id: currentProject.value });
            })
            .catch(({ message }) => {
                toast.error(message);
            })
            .finally(() => {
                isDelating.value = false;
            });
    }

    return {
        isCreating,
        isUpdating,
        isDelating,
        currentProject,
        quotationItems,
        projectQuotations,
        handleFetchQuotation,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
});
