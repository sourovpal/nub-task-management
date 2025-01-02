import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    all: (query: HttpRequest) => Client.get("/departments", query),

    list: (query: HttpRequest) => Client.get("/departments/list", query),

    find: (query: HttpRequest) => Client.get("/departments/" + query.id),

    create: (payload: HttpRequest) => Client.post("/departments", payload),

    update: (payload: HttpRequest, query: HttpRequest) =>
        Client.put("/departments/" + query.id, payload),

    delete: (query: HttpRequest) => Client.post("/departments/" + query.id),
};
