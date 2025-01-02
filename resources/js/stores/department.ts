import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";

export const useDepartmentStore = defineStore("department", () => {
    const is_fatching = ref<Boolean>(false);

    const pagination = reactive<Pagination>({
        from: 0,
        to: 0,
        current_page: null,
        next_page: null,
        prev_page: null,
        last_page: null,
        total: 0,
    });

    const departments = reactive([]);

    function handleFetchDepartment(
        payload: { limit?: Number; page?: Number } = {}
    ) {
        is_fatching.value = true;

        const query = router.currentRoute.value.query;

        if (!payload["page"] && query["page"]) {
            payload["page"] = query["page"];
        } else if (!payload["page"]) {
            payload["page"] = 1;
        }

        usePush({ name: "departments-index-page", query: payload });

        payload = { ...query, ...payload };

        if (!payload["limit"]) payload["limit"] = 20;

        Http.department
            .all(payload)
            .then(({ data }) => {
                Object.assign(pagination, data.pagination);
                Object.assign(departments, data.departments);
            })
            .catch((error: Error) => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    function handleFetchDepartmentList() {
        is_fatching.value = true;
        Http.department
            .list()
            .then(({ data }) => {
                Object.assign(departments, data);
            })
            .catch((error: Error) => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    return {
        is_fatching,
        pagination,
        departments,
        handleFetchDepartment,
        handleFetchDepartmentList,
    };
});
