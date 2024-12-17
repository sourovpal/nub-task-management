import { defineStore } from "pinia";
import { useEnv, useStorage } from "@helpers";
import { ref } from "vue";
import { usePush } from "@routers";

const userStore = useStorage(useEnv("user_store"));
const tokenStore = useStorage(useEnv("token_store"));

export const useAuthStore = defineStore("auth", () => {
    const user = ref(userStore.get());
    const token = ref(userStore.get());

    function setUser(payload: object | null) {
        if (payload) {
            user.value = payload;
            userStore.set(payload);
            return payload;
        }
        user.value = null;
        token.value = null;
        userStore.remove();
        tokenStore.remove();
    }

    function setToken(payload: string | null) {
        if (payload) {
            token.value = payload;
            tokenStore.set(payload);
            return payload;
        }
        user.value = null;
        token.value = null;
        userStore.remove();
        tokenStore.remove();
    }

    function logout() {
        user.value = null;
        token.value = null;
        userStore.remove();
        tokenStore.remove();
        usePush({ name: "logout" });
    }

    return { user, token, setUser, setToken, logout };
});
