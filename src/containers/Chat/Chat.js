import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import db from '../../firebase/firebase';
import Message from '../Message/Message';
import SendIcon from '@material-ui/icons/Send'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { animateScroll } from "react-scroll";
import {useStateValue} from '../Store/StateProvider';
import classes from './Chat.module.css';

const Chat = (props) => {
    const [msgs, setMsgs] = useState();
    const [msg, createMsg] = useState('');
    const {chatId} = useParams();
    const [{user}] = useStateValue();
    const history = useHistory();

    const submitMsg = (event) => {
        event.preventDefault();

        db.collection('chats').doc(chatId).update({
            lastMsg: msg,
            lastMsgTime: new Date()
        })

        db.collection('chats').doc(chatId).collection('msgs').add({
            msg: msg,
            time: new Date(),
            sender: user.displayName,
            senderImg: user.photoURL,
            senderId: user.uid
        })
        
        createMsg('');
    }

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
          containerId: 'messages'
        });
    }

    const backHandler = () => {
        props.msgShowingHandler();
        history.push('/');
    }

    useEffect(() => {
        scrollToBottom();
    }, [msgs])

    useEffect(() => {
        db.collection('chats').doc(chatId)
            .collection('msgs').orderBy('time', 'asc')
                .onSnapshot(snap => {
                    setMsgs(snap.docs.map(doc => ({
                        id: doc.id,
                        msg: doc.data().msg,
                        sender: doc.data().sender,
                        senderId: doc.data().senderId,
                        senderImg: doc.data().senderImg,
                        time: doc.data().time.toDate().toLocaleString("en-CA", {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hourCycle: 'h23',
                            timeZoneName: 'short'
                        })
                    })))
                })
    }, [chatId])

    let messages = null;
    if (msgs) {
        messages = msgs.map(message => (
                    <Message
                        key={message.id}
                        id={message.id}
                        msg={message.msg}
                        sender={message.sender}
                        senderId={message.senderId}
                        senderImg={message.senderImg}
                        time={message.time} />
                        ))
    }

    const styleClasses = [classes.Chat];
    if (!props.msgShowing) {
        styleClasses.push(classes.Hidden);
    }

    return (
        <div className={styleClasses.join(' ')}>
            <KeyboardBackspaceIcon
                fontSize="large"
                className={classes.BackIcon}
                onClick={backHandler} />
            <div className={classes.Messages} >
                {messages}
            </div>
            <form className={classes.MsgInput} onSubmit={submitMsg}>
                <input
                    type='text'
                    onChange={event => createMsg(event.target.value)}
                    placeholder="Write a message..."
                    value={msg} />
                <SendIcon
                    onClick={submitMsg}
                    fontSize="large"
                    style={{cursor: 'pointer', color: 'cyan'}} />
            </form>
        </div>
    );
};

export default Chat;