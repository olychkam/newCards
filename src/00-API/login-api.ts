import {instance} from "./api";

export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me')
    },
    me() {
        return instance.post(`auth/me`)
    },
}
