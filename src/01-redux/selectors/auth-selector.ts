import {AppRootStateType} from "../store";
import {UserDataType} from "../profile-reducer";

export const selectorUserData = (state: AppRootStateType):UserDataType => state.profile.userData
export const selectorIsLoggedIn = (state: AppRootStateType) => state.login.isLoggedIn
