import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import classes from './User.module.css';
import {Avatar} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {useStateValue} from '../../Store/StateProvider';
import db from '../../../firebase/firebase';

const User = (props) => {
    const history = useHistory();
    const [{user}] = useStateValue();
    const [chats, setChats] = useState();
    let chatId = '';

    useEffect(() => {
        db.collection('chats').onSnapshot(snap =>
            setChats(snap.docs.map(doc => ({
                id: doc.id,
                users: doc.data().users
            }))
        ))
    }, [])

    const noRoomExist = () => {
        for (let i = 0; i < chats.length; i++) {
            if ((chats[i].users[0] === user.uid && chats[i].users[1] === props.id) ||
                (chats[i].users[1] === user.uid && chats[i].users[0] === props.id)) {
                    chatId = chats[i].id;
                    return false;
                }
        }
        return true;
    }

    const userSelected = () => {
        props.closeModal();

        if (noRoomExist()) {
            db.collection('chats').add({
                username1: user.displayName,
                username2: props.name,
                photo1: user.photoURL,
                photo2: props.photo,
                lastMsg: "No messages have been sent!",
                lastMsgTime: new Date(),
                users: [user.uid, props.id]
            }).then(docRef => {
                chatId = docRef.id;
                
                db.collection('chats').doc(docRef.id).collection('msgs').add({
                    msg: 'This is the start of this chat',
                    time: new Date(),
                    autoGenerated: true
                })

                history.push('/chat/' + chatId);
                props.messageSelected();
                props.msgShowingHandler();
            });
        } else {
            history.push('/chat/' + chatId);
            props.messageSelected();
            props.msgShowingHandler();
        }        
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