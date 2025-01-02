import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";

export const useUserStore = defineStore("user", () => {
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

    const users = reactive([]);

    function handleFetchUser(payload: { limit?: Number; page?: Number } = {}) {
        is_fatching.value = true;

        const query = router.currentRoute.value.query;

        if (!payload["page"] && query["page"]) {
            payload["page"] = query["page"];
        } else if (!payload["page"]) {
            payload["page"] = 1;
        }

        usePush({ name: "users-index-page", query: payload });

        payload = { ...query, ...payload };

        if (!payload["limit"]) payload["limit"] = 20;

        Http.user
            .all(payload)
            .then(({ data }) => {
                Object.assign(pagination, data.pagination);
                Object.assign(users, data.users);
            })
            .catch((error: Error) => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    function handleFetchUserList() {
        is_fatching.value = true;
        Http.department
            .list()
            .then(({ data }) => {
                Object.assign(users, data);
            })
            .catch((error: Error) => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    return {
        is_fatching,
        pagination,
        users,
        handleFetchUser,
        handleFetchUserList,
    };
});
