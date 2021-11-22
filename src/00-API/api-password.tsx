import {instance} from "./api";

export const passwordAPI = {
    recoveryPassword(email: string) {
        return instance.post<{ info: string, error?: string }>('auth/forgot', {
            email: email,
            from: 'test-front-admin <olkaaamartynova@gmail.com>',
            message: `<div style="background-color: #00ff00; padding: 15px">
                            password recovery link: 
                     <a href='http://localhost:3000/Cards?#/new-password/$token$'>Click</a>
                     </div>`
        })
            .then(res => res.data)
    },
    resetPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string, error?: string }>
        ('auth/set-new-password', {password, resetPasswordToken})
            .then(response => response.data)
    }
}
