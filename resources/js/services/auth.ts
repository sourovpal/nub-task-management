import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    login: (payload: HttpRequest) => Client.post("/auth/login", payload),

    register: (payload: HttpRequest) => Client.post("/auth/register", payload),

    forgot: (payload: HttpRequest) => Client.post("/auth/forgot", payload),

    matchToken: (query: HttpRequest) => Client.get("/auth/reset", query),

    reset: (payload: HttpRequest) => Client.post("/auth/reset", payload),
};
