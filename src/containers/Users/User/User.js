import React from 'react';
import classes from './User.module.css';
import {Avatar} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {useStateValue} from '../../Store/StateProvider';
import db from '../../../firebase/firebase';

const User = (props) => {
    const [{user}] = useStateValue();

    const userSelected = () => {
        props.closeModal();

        db.collection('chats').add({
            username1: user.displayName,
            username2: props.name,
            photo1: user.photoURL,
            photo2: props.photo,
            lastMsg: "No messages have been sent!",
            lastMsgTime: new Date(),
            users: [user.uid, props.id]
        });
    }

    let displayedUser = null;
    if (props.id !== user.uid) {
        displayedUser = <div className={classes.User} onClick={userSelected}>
                            <Avatar src={props.photo} />
                            <p>{props.name}</p>
                            <AddIcon className={classes.AddIcon} />
                        </div>;
    }
    return (
        displayedUser
    );
}

export default User;