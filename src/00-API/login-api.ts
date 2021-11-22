import {instance} from "./api";

export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        const promise= instance.post(`auth/login`, {email, password, rememberMe})
        return promise
    },
    logout() {
        return instance.delete('auth/me')
    }
}
