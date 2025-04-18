import { defineStore } from "pinia";
import { useEnv, useStorage } from "@helpers";
import { ref } from "vue";
import { usePush } from "@routers";

const userStore = useStorage(useEnv("user_store"));
const tokenStore = useStorage(useEnv("token_store"));

export const checkAuthenticated = (path = null) => {
    const user = userStore.get();
    const token = tokenStore.get();
    if (!!(user && token)) return true;
    else if (path) return usePush(path);
    return false;
};

export const checkUnAuthenticated = (path = null) => {
    const check = checkAuthenticated();
    if (!check) return true;
    else if (path) return usePush(path);
};

export const useAuthStore = defineStore("auth", () => {
    const user = ref(userStore.get());
    const token = ref(userStore.get());

    function setUser(payload: object | null) {
        console.log("payload", payload);
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
