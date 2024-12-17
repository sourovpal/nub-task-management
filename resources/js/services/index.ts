import Client from "./clients";
import auth from "./auth";
import user from "./user";

export default {
    auth,
    user,
    error: Client.error,
};
