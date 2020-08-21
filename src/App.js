import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useStateValue} from './containers/Store/StateProvider';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import {auth} from './firebase/firebase';
import {actionTypes} from './containers/Store/reducer';
import './App.css';

const App = () => {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        dispatch({
            type: actionTypes.SET_USER,
            user: user
        })
    });
  }, [dispatch])

  return (
    <div>
      <Redirect to='/' />
      <Switch>
        <Route path="/" component={() => user ? <Main user={user} /> : <Auth />}></Route>
      </Switch>
    </div>
  );
}

export default App;
