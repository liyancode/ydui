import {userService} from "../_services/user.service";

export const userActions = {
    login,
    logout: tokenExpired,
    register,
    getAll,
    delete: _delete
};