import axios from "axios";
import { useEnv } from "@helpers";
import { authStore } from "@stores";
import { HttpRequest } from "@types";
import { storeToRefs } from "pinia";

const instance = axios.create({
    baseURL: useEnv("api_url"),
    timeout: 60000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache",
    },
});

instance.interceptors.request.use(
    async function (config) {
        const { user, token } = storeToRefs(authStore);
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response: any) => response.data,
    function (error) {
        if (error?.status === 401) authStore.logout();
        else return Promise.reject(handleError(error));
    }
);

function handleError(error: any) {
    const payload = {
        name: error.name,
        data: null,
        errors: null,
        alert: null,
        message: error.message,
        request: error.request,
        headers: error.response?.headers,
        status: error.status,
    };

    if (error.status == 422)
        payload["errors"] =
            error.response?.data.errors ?? error.response?.data ?? null;
    else if (error.status == 429)
        payload["alert"] = error.response?.data ?? null;
    else payload["data"] = error.response?.data ?? null;

    if (useEnv("app_env") != "local")
        payload["message"] = "Oops! Something went wrong.";
    else if (error.response?.data && error.response?.data?.message)
        payload["message"] = error.response?.data.message;

    return payload;
}

export default class Client {
    static async get(url: string, params?: object) {
        return await instance.get(url, { params });
    }

    static async post(url: string, payload?: HttpRequest, options?: object) {
        return await instance.post(url, payload, options);
    }

    static async put(url: string, payload?: HttpRequest, options?: object) {
        return await instance.put(url, payload, options);
    }

    static async delete(url: string, params?: HttpRequest) {
        return await instance.delete(url, { params });
    }

    static error(error: { [key: string]: any }): object {
        try {
            const { response, status, message } = error;
            const { errors, message: error_message, success } = response?.data;
            return {
                status,
                success: success ?? false,
                message: error_message || { type: "error", text: message },
                errors,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: { type: "error", text: "Oops! Something went wrong." },
            };
        }
    }
}
