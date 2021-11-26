import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {authReducer, AuthReducerActionType} from "./auth-reducer";
import {RegisterReducerActionType, registrationReducer} from "./registration-reducer";
import {recoveryReducer, RecoveryReducerActionType} from "./recovery-password-reducer";
import {profileReducer, ProfileReducerActionType} from "./profile-reducer";
import {EnterNewPasswordReducerActionType, newPasswordReducer} from "./new-password-reducer";
import {testReducer} from "./test-reducer";
import {packsReducer, PacksReducerActionType} from "./packs-reducer";
import {cardsReducer, CardsReducerActionType} from "./cards-reducer";
import {appReducer, AppReducerActionType} from "./app-reducer";
import {filterReducer} from "../03-Components/c5-Search/filter-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    registration: registrationReducer,
    newPassword: recoveryReducer,
    profile: profileReducer,
    resetPassword: newPasswordReducer,
    test: testReducer,
    packs: packsReducer,
    cards: cardsReducer,
    filter: filterReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppActionType =AppReducerActionType | AuthReducerActionType
    | RegisterReducerActionType | RecoveryReducerActionType | EnterNewPasswordReducerActionType
    | PacksReducerActionType | CardsReducerActionType | ProfileReducerActionType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionType>

// @ts-ignore
window.store = store;
