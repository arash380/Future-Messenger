import React, {useEffect, useState} from 'react';
import ChatBar from './ChatBar/ChatBar';
import db from '../../firebase/firebase';
import {useStateValue} from '../../containers/Store/StateProvider';
import classes from './ChatBars.module.css';

const ChatBars = (props) => {
    const [chats, setChats] = useState();
    const [{user}] = useStateValue();

    useEffect(() => {
        const timeOption = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
            timeZoneName: 'short'
        }

        db.collection('chats').orderBy('lastMsgTime', 'desc').onSnapshot(snap => (
            setChats(
                snap.docs.map(doc => {
                    if (doc.data().users[0] === user.uid) {
                        return {
                            correctChat: true,
                            id: doc.id,
                            name: doc.data().username2,
                            imgUrl: doc.data().photo2,
                            lastMsgTime: doc.data().lastMsgTime.toDate().toLocaleString("en-CA", timeOption),
                            lastMsg: doc.data().lastMsg
                        }
                    } else if (doc.data().users[1] === user.uid) {
                        return {
                            correctChat: true,
                            id: doc.id,
                            name: doc.data().username1,
                            imgUrl: doc.data().photo1,
                            lastMsgTime: doc.data().lastMsgTime.toDate().toLocaleString("en-CA", timeOption),
                            lastMsg: doc.data().lastMsg
                        }
                    } else {
                        return {
                            correctChat: false,
                            id: doc.id,
                            name: doc.data().username1,
                            imgUrl: doc.data().photo1,
                            lastMsgTime: doc.data().lastMsgTime.toDate().toLocaleString("en-CA", timeOption),
                            lastMsg: doc.data().lastMsg
                        }
                    }
                })
            )
        ))
    }, [user.uid]);

    let chatBars = <h3 className={classes.NoChat}>Start a new chat from the sidebar</h3>;
    if (chats?.length !== 0) {
        chatBars = chats?.map((chat) => {
                        if (chat.correctChat) {
                            return (
                                <ChatBar
                                    key={chat.id}
                                    id={chat.id}
                                    name={chat.name}
                                    img={chat.imgUrl}
                                    lastMsgTime={chat.lastMsgTime}
                                    lastMsg={chat.lastMsg}
                                    messageSelected={props.messageSelected}
                                    chatSearch={props.chatSearch}
                                    msgShowingHandler={props.msgShowingHandler} />
                            )
                        }
                        return null;
                    })
    }

    const styleClasses = [classes.ChatBars];
    if (props.msgShowing) {
        styleClasses.push(classes.Hidden);
    }

    return (
        <div className={styleClasses.join(' ')}>
            {chatBars}
        </div>
    );
}

export default ChatBars;