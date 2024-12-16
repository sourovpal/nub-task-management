import Storage, { StorageType } from "../utils/storage";
import { usePush } from "../routers";

export function useEnv(name: string) {
    const env = import.meta.env;

    name = name?.toUpperCase();

    const key = "VITE_" + name;

    if (env[key]) return env[key];

    if (env[name]) return env[name];

    return null;
}

export function useStorage(
    name: string,
    storageType: StorageType = "localStorage"
) {
    return new Storage(name, storageType);
}

export function isAuthorized() {
    
    const userStore = useStorage(useEnv("user_store"));
    const tokenStore = useStorage(useEnv("token_store"));

    if (userStore.get() && tokenStore.get()) return true;

    return usePush({ name: "login" });
}
