import {useFormik} from "formik";
import {useState} from "react";
import s from './CommonForm.module.css';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import {AppRootStateType} from "../../01-redux/store";
import {RequestStatusType} from "../../01-redux/app-reducer";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import SuperButton from "../c2-SuperButton/SuperButton";
import {CircularProgress} from "@material-ui/core";
import SuperCheckbox from "../c3-SuperCheckbox/SuperCheckbox";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type FormPropsType = {
    type: 'Login' | 'Register' | 'Recovery password' | 'New password'
    callBack: (values: any) => void
}

export const CommonForm = (props: FormPropsType) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const [typeIcon, setTypeIcon] = useState<string>('password')

    const showHide = () => {
        setTypeIcon(typeIcon === 'text' ? 'password' : 'text')
    }

    // SET initial values for Formik start
    let initialValues: any = null

    if (props.type === 'Login') {
        initialValues = {
            email: '',
            password: '',
            rememberMe: false,
        }
    }

    if (props.type === 'Register') {
        initialValues = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    if (props.type === 'Recovery password') {
        initialValues = {
            email: '',
        }
    }

    if (props.type === 'New password') {
        initialValues = {
            email: 'test@gmail.com',
            password: '',
            confirmPassword: '',
        }
    }

    // SET initial values for Formik end
    const formik = useFormik({

        initialValues,

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (props.type === 'Login' || props.type === 'Register' || props.type === 'New password') { // Check PASSWORD field only if form for Login or Register or New password
                if (!values.password) {
                    errors.password = 'Password is required';
                } else if (!/(?=.*[0-9])/gi.test(values.password)) {
                    errors.password = 'The password must contain at least one number'
                } else if (!/(?=.*[a-z])(?=.*[A-Z])/gi.test(values.password)) {
                    errors.password = 'The password  must contain at least one lowercase or uppercase Latin letter'
                } else if (!/[0-9a-zA-Z!@#$%^&*]{8,}/gi.test(values.password)) {
                    errors.password = 'The password must have a minimum 8 characters'
                }
            }

            if (props.type === 'Register' || props.type === 'New password'
            ) { // Check CONFIRM PASSWORD field only if form for Register or New password
                if (!values.confirmPassword) {
                    errors.confirmPassword = 'Confirm password is required';
                } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = 'The password and confirm password fields do not match.';
                }
            }

            return errors;
        },
        onSubmit: values => {
            props.callBack(values)
            formik.resetForm();
        },
    });

    // Reusable Email Field
    const emailField = () => {
        return <>
            <div className={s.inputFormCommon}>
                <label htmlFor="email"/>
                <SuperInputText
                    id="email"
                    type="email"
                    placeholder='e-mail'
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email &&
                <div className={s.errorMessage}>{formik.errors.email}</div>}
            </div>
        </>
    }
    // Reusable Password Field
    const passwordField = () => {
        return <>
            <div className={s.inputFormCommon}>
                <label htmlFor="password"/>
                <SuperInputText
                    id="password"
                    placeholder='password'
                    type={typeIcon}
                    {...formik.getFieldProps('password')}
                />
                <span className={s.showHideMenu}
                      onClick={showHide}>{typeIcon === 'text' ? '🔒' : '🔑'}</span>
                {formik.errors.password && formik.touched.password &&
                <div className={s.errorMessage}>{formik.errors.password}</div>}
            </div>
        </>
    }
    // Reusable Confirm Password Field
    const confirmPasswordField = () => {
        return <>
            <div className={s.inputFormCommon}>
                <label htmlFor="confirmPassword"/>
                <SuperInputText
                    type="password"
                    placeholder='confirm password'
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                <div className={s.errorMessage}>{formik.errors.confirmPassword}</div>}
            </div>
        </>
    }
    // Reusable Checkbox Field
    const checkBoxField = () => {
        return <>
            <div className={s.checkBoxFormCommon}>
                <label htmlFor="rememberMe"/>
                <SuperCheckbox
                    id="rememberMe"
                    type="checkbox"
                    children={'Remember me'}
                    //placeholder='confirm password'
                    {...formik.getFieldProps('rememberMe')}
                />
            </div>
        </>
    }
    // Reusable Button
    const submitButton = (title: string) => {
        return <>
            <div className={s.commonFormButton}>
                <SuperButton
                    disabled={status === "loading"}
                    className={s.button}
                    type="submit">{title}
                </SuperButton>
            </div>
        </>
    }

    // Form Generator
    const formGenerator = () => {
        switch (props.type) {
            case 'Login' :
                return <>
                    {emailField()}
                    {passwordField()}
                    {checkBoxField()}
                    {submitButton('Login')}
                </>
            case 'Register' :
                return <>
                    {emailField()}
                    {passwordField()}
                    {confirmPasswordField()}
                    {submitButton('Register')}
                </>
            case 'Recovery password' :
                return <>
                    {emailField()}
                    {submitButton('Send')}
                </>
            case 'New password' :
                return <>
                    {passwordField()}
                    {confirmPasswordField()}
                    {submitButton('Send')}
                </>
            default :
                return <>
                    {emailField()}
                    {passwordField()}
                    {confirmPasswordField()}
                    {submitButton('N/A')}
                </>
        }
    }

    const formTitle = (type: string) => {
        switch (type) {
            case 'Login':
                return 'Sign In'
            case 'Register':
                return 'Sign Up'
            case 'Recovery password':
                return 'Recover Password'
            case 'New password':
                return 'New Password'
            default:
                return ''
        }
    }

    const formDescription = (type: string) => {
        switch (type) {
            case 'Register':
                return 'Please fill in the form below'
            case 'Recovery password':
                return 'Please, enter your email';
            case 'New password':
                return 'Please, enter and confirm your new password'
            default:
                return ''
        }
    }

    const loginAdditionalField = (type: string) => {
        switch (type) {
            case 'Login':
                return <div className={s.loginAdditionalField}>
                    <NavLink to='/recovery'>Forgot your password?</NavLink>
                    <NavLink to='/register'>Go to sign up</NavLink>
                </div>
            default:
                return null;
        }
    }

    return (
        <>
            <div><Toaster/></div>
            {status === "loading" && <CircularProgress/>}
            <div className={s.commonForm}>
                <div className={s.wrapper}>
                    {/* Form Title */}
                    <span className={s.formTitle}>{formTitle(props.type)}</span>
                    {/* Form Description */}
                    <span className={s.formDescription}>{formDescription(props.type)}</span>

                    <form onSubmit={formik.handleSubmit}>
                        {/* Form generator function */}
                        {formGenerator()}
                    </form>
                    {/* Form additional field*/}
                    {loginAdditionalField(props.type)}
                </div>
            </div>
        </>
    )
}
