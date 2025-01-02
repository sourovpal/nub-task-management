import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    all: (query: HttpRequest) => Client.get("/users", query),

    list: (query: HttpRequest) => Client.get("/users/list", query),

    find: (query: HttpRequest) => Client.get("/users/" + query.id),

    create: (payload: HttpRequest) => Client.post("/users", payload),

    update: (payload: HttpRequest, query: HttpRequest) =>
        Client.put("/users/" + query.id, payload),

    delete: (query: HttpRequest) => Client.post("/users/" + query.id),
};
