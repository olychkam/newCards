import {APIResponseType, instance} from "./api";

export type PasswordRecoveryType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
const forgotMessage = `<div style="background-color: #00ff00; padding: 15px">
                            password recovery link: 
                     <a href='http://localhost:3000/?#/reset-password/$token$'>Click</a>
                     </div>`
export const passwordAPI = {
    forgotPassword(email: string) {
        return instance.post<APIResponseType<PasswordRecoveryType>>('auth/forgot', {
            email: email,
            from: 'test-front-admin <olgamartynovaaa@gmail.com>',
            message: forgotMessage
        });
    },
    newPassword(password: string, resetPasswordToken: {}) {
        return instance.post(`auth/set-new-password`, {
            password, resetPasswordToken
        })
    }
}
