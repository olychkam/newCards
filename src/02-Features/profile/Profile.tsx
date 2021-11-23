import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../01-redux/store";
import {UserType} from "../../01-redux/auth-reducer";
import {selectorUserData} from "../../01-redux/selectors/auth-selector";
import s from "./Profile.module.css";
import SuperButton from "../../03-Components/c2-SuperButton/SuperButton";
import avatar from "../../04-Assets/unnamed.jpg";

function Profile() {
    const user = useSelector<AppRootStateType, UserType>(selectorUserData)
    return (
        <div className={s.container}>

            <img className={s.avatar} src={avatar} alt="" width={'150px'}/>

            <div className={s.dataUser}>
                <div>Email:{user.email}</div>
                <span>Name:{user.name}</span>
                <SuperButton>Edit Name</SuperButton>
            </div>
        </div>
    );
}

export default Profile;
