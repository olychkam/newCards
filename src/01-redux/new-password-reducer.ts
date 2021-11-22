import {passwordAPI} from "../00-API/api-password";
import {Dispatch} from "redux";

export const SET_RECOVERY_PASSWORD = 'SET-RECOVERY-PASSWORD';


type ActionsType = ReturnType<typeof setRecoveryPassword>
type NewPasswordStateType = {
    isForgot: boolean
}
const initialState = {} as NewPasswordStateType

export const newPasswordReducer = (state: NewPasswordStateType = initialState, action: ActionsType): NewPasswordStateType => {
    switch (action.type) {
        case "SET-RECOVERY-PASSWORD":
            return {
                ...state,
                isForgot: action.isForgot
            }
        default:
            return state;
    }
}
export const setRecoveryPassword = (isForgot: boolean) => ({
    type: SET_RECOVERY_PASSWORD,
    isForgot
}as const)

export const recoveryPasswordTC = (email: string) => (dispatch: Dispatch) => {
    passwordAPI.recoveryPassword(email)
        .then(() => {
            dispatch(setRecoveryPassword(true))
        })
        .catch(res => {
            console.log(res.error)
        })
}
