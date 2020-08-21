import React from 'react';
import classes from './Auth.module.css';
import icon from '../../assets/icon.png';
import {Button} from '@material-ui/core';
import db, {auth, provider} from '../../firebase/firebase';
import { useStateValue } from '../Store/StateProvider';
import {actionTypes} from '../Store/reducer';

const Auth = () => {
    const [state, dispatch] = useStateValue();

    const login = () => {
        auth.signInWithPopup(provider)
            .then(res => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user
                })
                db.collection('users').doc(res.user.uid).set({
                    name: res.user.displayName,
                    photo: res.user.photoURL
                })
            })
    }
    return (
        <div className={classes.Auth}>
            <div className={classes.LoginBox}>
                <img 
                    src={icon}
                    alt="APP ICON"/>
                <h1>Sign in to Future Messenger</h1>
                <p>{state.websiteLink}</p>
                <Button onClick={login}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Auth;