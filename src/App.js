import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useStateValue} from './containers/Store/StateProvider';
import Main from './containers/Main/Main';
import Auth from './containers/Auth/Auth';
import {auth} from './firebase/firebase';
import {actionTypes} from './containers/Store/reducer';

const App = () => {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        dispatch({
            type: actionTypes.SET_USER,
            user: user
        })
    });
    return () => {
      unsubscribe();
    }
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
