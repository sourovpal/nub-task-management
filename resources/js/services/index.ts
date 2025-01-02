import Client from "./clients";
import auth from "./auth";
import user from "./user";
import department from "./department";
import project from "./project";
import kanban from "./kanban";

export default {
    auth,
    user,
    department,
    project,
    kanban,
    error: Client.error,
};
