import {instance} from "./api";

export const registrationAPI = {
    registerUser(email: string, password: string) {
        const promise = instance.post('auth/register', {email, password});
        return promise;
    }
}
