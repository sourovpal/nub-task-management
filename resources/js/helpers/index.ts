import Storage, { StorageType } from "../utils/storage";
import { usePush } from "../routers";
import moment from "moment";
import { useToast } from "primevue/usetoast";
import { ToastMessageOptions } from "primevue";

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

export function formatTimeAgo(date: string, show_date: Number) {
    const now = moment();
    const inputDate = moment(date);

    if (now.diff(inputDate, "days") <= 30) return inputDate.fromNow();
    return inputDate.format("YYYY-MM-DD HH:mm");
}

export function dateTimeFormate(date: string, format = "YYYY-MM-DD HH:mm") {
    const time = moment(date);
    return time.format(format);
}

export function formatToast(
    alert: { type: string; message: string } | null = null,
    duration: Number | null = null,
    options: ToastMessageOptions = {
        severity: "success",
        summary: "Success Message",
        life: 3000,
        group: "bc",
        position: "center",
    }
) {
    if (alert) {
        options["summary"] = alert.message;
        options["severity"] = alert.type;
    }

    if (duration) options["life"] = duration;

    return options;
}

export function dataURLToFile(dataUrl: string, fileName: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
}
