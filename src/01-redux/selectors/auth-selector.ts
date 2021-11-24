import {AppRootStateType} from "../store";
import {UserType} from "../auth-reducer";

export const selectorUserData = (state: AppRootStateType): UserType => state.login.user
export const selectorIsLoggedIn = (state: AppRootStateType) => state.login.isLogin
