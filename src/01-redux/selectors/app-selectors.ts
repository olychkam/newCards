import {AppRootStateType} from "../store";

export const selectorError = (state: AppRootStateType) => state.login.loginError
export const selectorStatus = (state: AppRootStateType) => state.app.status