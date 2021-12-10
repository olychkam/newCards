import React, {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Header from "./Header/Header";
import Routes from './Routes';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../01-redux/store";
import {selectorError, selectorStatus} from "../01-redux/selectors/app-selectors";
import {CircularProgress, LinearProgress} from "@material-ui/core";
import ErrorSnackBar from './c7-ErrorSnackBar/ErrorSnackBar';
import {initializedAppTC} from "../01-redux/app-reducer";
import Error from "../05-utils/u1-error/Error";


function App() {
    const dispatch = useDispatch()
    const appStatus = useSelector<AppRootStateType, string>(selectorStatus)
    const error = useSelector<AppRootStateType, string | null>(selectorError)

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgress/>
    }
    return (
        <div>
            <HashRouter>
                <Header/>
                {appStatus === 'loading' ? <LinearProgress color="primary"/> : null}
                <Routes/>
                {error && <ErrorSnackBar errorMessage={error}/>}
            </HashRouter>
        </div>
    );
}

export default App;
