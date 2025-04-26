import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";
import { AxiosResponse } from "axios";

// Structure for Users state
interface Users {
    limit: number;
    loading: boolean;
    data: object[];
    pagination: Pagination;
}

// Structure of fetch payload
interface FetchPayload {
    limit?: number;
    page?: number;
}

// Define the shape of the API response
interface UserResponse {
    data: [];
    pagination: Pagination;
}

// The Pinia store
export const useUserStore = defineStore("user", () => {
    const is_fatching = ref<boolean>(false);

    const users = reactive<Users>({
        limit: 20,
        data: [],
        loading: false,
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

    const userList = reactive({
        data: [],
    });

    function handleFetchUser(payload: FetchPayload = {}) {
        users.loading = true;

        const query = router.currentRoute.value.query;

        if (!payload.page && query.page) {
            payload.page = Number(query.page);
        } else if (!payload.page) {
            payload.page = 1;
        }

        usePush({ name: "users-index-page", query: payload });
        payload = { ...query, ...payload };

        if (!payload.limit) payload.limit = 20;

        Http.user
            .all(payload)
            .then((response: AxiosResponse<UserResponse>) => {
                users.data = response.data;
                users.pagination = response.pagination;
            })
            .catch((error: Error) => {
                console.error("Error fetching users:", error);
            })
            .finally(() => {
                users.loading = false;
            });
    }

    function handleFetchUserList() {
        is_fatching.value = true;

        Http.user
            .list({})
            .then((data) => {
                // Assigning fetched users to the reactive users.data
                userList.data = data;
            })
            .catch((error: Error) => {
                console.error("Error fetching user list:", error);
            })
            .finally(() => {
                is_fatching.value = false;
            });
    }

    // handleFetchUserList();

    return {
        is_fatching,
        users,
        userList,
        handleFetchUser,
        handleFetchUserList,
    };
});
