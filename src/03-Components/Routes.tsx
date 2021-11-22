import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import styles from './Routes.module.css'
import Error404 from "./Header/error404/Error404";
import ModalsPage from "./c6-Modal/ModalsPage";
import LoginContainer from "../02-Features/auth/login/LoginContainer";
import RegistrationContainer from "../02-Features/auth/registration/RegistrationContainer";
import Profile from "../02-Features/profile/Profile";
import ResetPassword from "../02-Features/reset-password/ResetPassword";
import NewPassword from "../02-Features/new-password/NewPassword";
import Packs from "../02-Features/packs/Packs";
import Cards from "../02-Features/cards/Cards";
import {LearningPage} from "../02-Features/learning/LearnPage";
import Test from "../02-Features/test/Test";

export const PATH = {
    LOGIN: "/login",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    RESET_PASSWORD: "/reset-password",
    NEW_PASSWORD: "/new-password",
    TEST: "/test",
    PACKS: "/packs",
    CARDS: "/cards",
    LEARNING: "/learning",
    MODALS: "/modals"
}

function Routes() {
    return (
        <div className={styles.mainContainer}>
            <Switch>

                <Route path={"/"} exact render={() => <Redirect to={PATH.LOGIN}/>}/>

                <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
                <Route path={PATH.REGISTRATION} render={() => <RegistrationContainer/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RESET_PASSWORD} render={() => <ResetPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPassword/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={`${PATH.CARDS}/:id`}  render={() => <Cards />}/>
                <Route path={PATH.LEARNING} render={() => <LearningPage/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.MODALS} render={() => <ModalsPage />}/>

                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    );
}

export default Routes;
