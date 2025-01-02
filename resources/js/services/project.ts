import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    all: (query: HttpRequest) => Client.get("/projects", query),

    list: (query: HttpRequest) => Client.get("/projects/list", query),

    find: (query: HttpRequest) => Client.get("/projects/" + query.id),

    create: (payload: HttpRequest) => Client.post("/projects", payload),

    update: (payload: HttpRequest, query: HttpRequest) =>
        Client.put("/projects/" + query.id, payload),

    delete: (query: HttpRequest) => Client.post("/projects/" + query.id),

    screenshot: (
        payload: HttpRequest,
        query: HttpRequest,
        options: HttpRequest
    ) => Client.post("/projects/screenshot/" + query.id, payload, options),
};
