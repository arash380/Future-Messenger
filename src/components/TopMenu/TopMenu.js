import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import classes from './TopMenu.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const TopMenu = (props) => {

  const styleClasses = [classes.TopMenu];
  if (props.msgShowing) {
    styleClasses.push(classes.Hidden);
  }

  return (
    <Aux>
        <div className={styleClasses.join(' ')}>
            <MenuIcon onClick={props.drawerToggleClicked} fontSize="large" style={{cursor: 'pointer', color: '333333', margin: '15px 0 0 15px'}} />
            <div className={classes.Search}>
                <SearchIcon fontSize="large" style={{cursor: 'pointer'}} />
                <input placeholder="Search for Chats..." onChange={props.inputHandler} value={props.input} />
            </div>
        </div>
    </Aux>
  );
}

export default TopMenu;