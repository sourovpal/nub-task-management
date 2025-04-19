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

    statusAll: (query: HttpRequest) => Client.get("/status?id=" + query.id),
    createStatus: (payload: HttpRequest) => Client.post("/status", payload),

    tasksAll: (query: HttpRequest) => Client.get("/tasks?id=" + query.id),
    createTask: (payload: HttpRequest) => Client.post("/tasks", payload),
    updateTask: (payload: HttpRequest, params: HttpRequest) =>
        Client.put("/tasks/" + params.id, payload),
    taskPositionUpdate: (payload: HttpRequest) =>
        Client.post("/tasks/position", payload),
};
