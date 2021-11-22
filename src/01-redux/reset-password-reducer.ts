import {Dispatch} from "redux";
import {passwordAPI} from "../00-API/api-password";

export const SET_RESET_PASSWORD = 'SET-RESET-PASSWORD';


type ActionsType = ReturnType<typeof setResetPassword>
type ResetPasswordStateType = {
    isNewPassword: boolean
}
const initialState = {} as ResetPasswordStateType

export const resetPasswordReducer = (state: ResetPasswordStateType = initialState, action: ActionsType): ResetPasswordStateType => {
    switch (action.type) {
        case "SET-RESET-PASSWORD":
            return {
                ...state,
                isNewPassword: action.isNewPassword
            }
        default:
            return state;
    }
}
export const setResetPassword = (isNewPassword: boolean) => ({
    type: SET_RESET_PASSWORD,
    isNewPassword
} as const)

export const setNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch) => {
    passwordAPI.resetPassword(password, token)
        .then(() => {
            dispatch(setResetPassword(true))
        })
        .catch(res => {
            console.log(res.error)
        })
}


