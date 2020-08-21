import React, {Component} from 'react';
import classes from './ChatBoxBackground.module.css';

class ChatBoxBackground extends Component {
    render () {
        const styleClasses = [classes.ChatBoxBackground];
        if (!this.props.msgShowing) {
            styleClasses.push(classes.Hidden);
        }

        return (
            <div className={styleClasses.join(' ')}>
                {!this.props.haveSelected ? <p>Please select a chat or start a new one</p> : null}
            </div>
        );
    };
};

export default ChatBoxBackground;