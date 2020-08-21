import React from 'react';
import {useStateValue} from '../Store/StateProvider';
import classes from './Message.module.css';
import {Avatar} from '@material-ui/core';

const Message = (props) => {
    const [{user}] = useStateValue();

    const styleClass = [classes.Info];
    const textStyle = [classes.Background];

    if (props.senderId === user.uid) {
        textStyle.push(classes.ThisUser);
    } else {
        textStyle.push(classes.OtherUser);
    }

    if (props.msg.length < 52) {
        textStyle.push(classes.ShortText);
    }

    return (
        <div>
            <div className={styleClass.join(' ')}>
                <Avatar src={props.senderImg} />
                <p className={classes.Name}><strong>{props.sender}</strong></p>
                <p className={classes.Time}>{props.time}</p>
            </div>
            <div className={textStyle.join(' ')}>
                <p className={classes.Text}>{props.msg}</p>
            </div>
        </div>
    );
};

export default Message;