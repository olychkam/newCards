import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../01-redux/store";
import {selectorIsLoggedIn, selectorUserData} from "../../01-redux/selectors/auth-selector";
import s from "./Profile.module.css";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import avatar from "../../04-Assets/unnamed.jpg";
import {Redirect} from "react-router-dom";
import {PATH} from "../../03-Components/Routes";
import {UserDataType} from "../../01-redux/profile-reducer";

function Profile() {
    const user = useSelector<AppRootStateType, UserDataType>(selectorUserData)
    const isAuth = useSelector<AppRootStateType>(selectorIsLoggedIn)
    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={s.container}>

            <img className={s.avatar} src={avatar} alt="" />

            <div className={s.dataUser}>
                <div>Email:{user.email}</div>
                <span>Hello,{user.name}</span>
                <span>You have {user.publicCardPacksCount} pack</span>
                <SuperButton>Edit Name</SuperButton>
            </div>
        </div>
    );
}

export default Profile;
