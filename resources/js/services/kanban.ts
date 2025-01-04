import Client from "./clients";
import { HttpRequest } from "@types";

export default {
    allStatus: (query: HttpRequest) => Client.get("/kanban/statuses", query),

    createStatus: (payload: HttpRequest) =>
        Client.post("/kanban/status", payload),

    allTask: (query: HttpRequest) => Client.get("/kanban/tasks", query),

    createTask: (payload: HttpRequest) => Client.post("/kanban/task", payload),

    updatePosition: (payload: HttpRequest) =>
        Client.put("/kanban/task/position", payload),

    // list: (query: HttpRequest) => Client.get("/users/list", query),

    // find: (query: HttpRequest) => Client.get("/users/" + query.id),

    // update: (payload: HttpRequest, query: HttpRequest) =>
    //     Client.put("/users/" + query.id, payload),

    // delete: (query: HttpRequest) => Client.post("/users/" + query.id),
};
