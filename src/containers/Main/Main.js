import React, {Component} from 'react';
import ChatBars from '../../components/ChatBars/ChatBars';
import ChatBoxBackground from '../../components/ChatBox/ChatBoxBackground';
import TopMenu from '../../components/TopMenu/TopMenu';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Chat from '../Chat/Chat';
import Modal from '../../components/UI/Modal/Modal';
import Users from '../Users/Users';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import {auth} from '../../firebase/firebase';
import {Switch, Route, withRouter} from 'react-router-dom';

class Main extends Component {
    state = {
        showSideDrawer: false,
        showUsersModal: false,
        haveSelected: false,
        msgShowing: false,
        chatSearch: ''
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    openUsersModal = () => {
        this.setState({showUsersModal: true, showSideDrawer:false});
    }

    closeUsersModal = () => {
        this.setState({showUsersModal: false});
    }

    messageSelected = () => {
        this.setState({haveSelected: true});
    }

    enterHome = () => {
        this.props.history.push('/');
        this.setState({
            haveSelected: false,
            msgShowing: false,
            showSideDrawer: false
        });
    }

    logout = () => {
        this.props.history.push('/');
        auth.signOut();
    }

    searchChatHandler = (event) => {
        this.setState({
            chatSearch: event.target.value
        })
    }

    MsgShowingHandler = () => {
        this.setState(prevState => {
            return {msgShowing: !prevState.msgShowing}
        });
    }

    render () {
        return (
            <Aux>
                <TopMenu
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    inputHandler={this.searchChatHandler} 
                    input={this.state.chatSearch}
                    msgShowing={this.state.msgShowing} />
                <ChatBars
                    messageSelected={this.messageSelected}
                    chatSearch={this.state.chatSearch}
                    msgShowing={this.state.msgShowing}
                    msgShowingHandler={this.MsgShowingHandler} />
                <ChatBoxBackground
                    haveSelected={this.state.haveSelected} 
                    msgShowing={this.state.msgShowing} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    enterHome={this.enterHome}
                    openUsersModal={this.openUsersModal}
                    logout={this.logout} />
                <Modal
                    show={this.state.showUsersModal}
                    modalClosed={this.closeUsersModal} >
                    <Users closeModal={this.closeUsersModal}
                           messageSelected={this.messageSelected}
                           msgShowingHandler={this.MsgShowingHandler} />
                </Modal>
                <Switch>
                    <Route path='/chat/:chatId'>
                        <Chat
                            msgShowing={this.state.msgShowing}
                            msgShowingHandler={this.MsgShowingHandler} />
                    </Route>
                </Switch>
            </Aux>
        );
    }
}

export default withRouter(Main);