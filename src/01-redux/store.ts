import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {ActionsLoginType, authReducer} from "./auth-reducer";
import {registrationReducer} from "./registration-reducer";
import {newPasswordReducer} from "./new-password-reducer";
import {profileReducer} from "./profile-reducer";
import {resetPasswordReducer} from "./reset-password-reducer";
import {testReducer} from "./test-reducer";
import {PacksActionsType, packsReducer} from "./packs-reducer";
import {CardsActionsType, cardsReducer} from "./cards-reducer";

const rootReducer = combineReducers({
        login: authReducer,
        registration: registrationReducer,
        newPassword: newPasswordReducer,
        profile: profileReducer,
        resetPassword: resetPasswordReducer,
        test: testReducer,
        packs: packsReducer,
        cards: cardsReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
type AppActionType = ActionsLoginType | PacksActionsType | CardsActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// @ts-ignore
window.store = store;
