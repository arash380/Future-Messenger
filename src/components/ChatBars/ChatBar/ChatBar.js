import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './ChatBar.module.css';
import {Avatar} from '@material-ui/core';

const ChatBar = (props) => {
    const history = useHistory();
    
    const chatSelector = () => {
        history.push('/chat/' + props.id);
        props.messageSelected();
        props.msgShowingHandler();
    }

    let msgPreview = null;
    if (props.lastMsg) {
        if (props.lastMsg.length > 40) {
            msgPreview = props.lastMsg.slice(0, 37) + "...";
        } else {
            msgPreview = props.lastMsg;
        }
    }

    let chatBar = <div className={classes.ChatBar} onClick={chatSelector}>
                <div className={classes.ChatInfo}>
                    <div>
                        <Avatar src={props.img} />
                        <h4>{props.name}</h4>
                    </div>
                    <p>{props.lastMsgTime}</p>
                </div>
                <p className={classes.ChatPreview}>{msgPreview}</p>
            </div>;

    if (props.chatSearch) {
        if (!props.name.toLowerCase().includes(props.chatSearch.toLowerCase())) {
            chatBar = null
        }
    }

    return chatBar;
}

export default ChatBar;