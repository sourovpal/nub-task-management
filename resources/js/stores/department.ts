import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";

interface Departments {
    limit: Number;
    loading: Boolean;
    data: Array<object>;
    pagination: Pagination;
}

export const useDepartmentStore = defineStore("department", () => {
    const is_fatching = ref<Boolean>(false);

    const departments = reactive<Departments>({
        limit: 20,
        loading: false,
        data: [],
        pagination: {
            from: 0,
            to: 0,
            current_page: null,
            next_page: null,
            prev_page: null,
            last_page: null,
            total: 0,
        },
    });

    function handleFetchDepartment(
        payload: { limit?: Number; page?: Number } = {}
    ) {
        departments.loading = true;

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
            .then(({ data, pagination }: { data: Array<object> }) => {
                departments.data = data;
                departments.pagination = pagination;
            })
            .catch((error: Error) => {})
            .finally(() => {
                departments.loading = false;
            });
    }

    function handleFetchDepartmentList() {
        is_fatching.value = true;
        Http.department
            .list({})
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
        departments,
        handleFetchDepartment,
        handleFetchDepartmentList,
    };
});
