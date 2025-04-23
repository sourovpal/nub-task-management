import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    all: (query: HttpRequest) => Client.get("/quotations", query),

    create: (payload: HttpRequest) => Client.post("/quotations", payload),

    update: (payload: HttpRequest, query: HttpRequest) =>
        Client.put("/quotations/" + query.id, payload),

    delete: (query: HttpRequest) => Client.delete("/quotations/" + query.id),
};
