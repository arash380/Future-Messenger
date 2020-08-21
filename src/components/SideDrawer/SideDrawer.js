import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import {Avatar} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import {useStateValue} from '../../containers/Store/StateProvider';

const SideDrawer = (props) => {
    const [{user}] = useStateValue();

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.SideDrawerTop}>
                    <Avatar src={user?.photoURL} />
                    <div className={classes.Name}>
                        <FiberManualRecordIcon style={{color: 'green'}} />
                        <p>{user?.displayName}</p>
                    </div>
                </div>
                <div className={classes.SideDrawerDown}>
                    <div className={classes.IconText} onClick={props.openUsersModal}>
                        <ChatIcon />
                        <p>New Private Chat</p>
                    </div>
                    <div className={classes.IconText} onClick={props.logout}>
                        <ExitToAppIcon />
                        <p>Log out</p>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default SideDrawer;