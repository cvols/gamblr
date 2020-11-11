import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import fire from './fire';
import { Navbar } from './components';
import {
  AddWagerPage,
  HomePage,
  LoginPage,
  NflScoresPage,
  PendingWagersPage
} from './pages';
import { useGlobalStateValue } from './context/GlobalState';
import { TYPES } from './context/types';

const App = () => {
  const [{ user }, dispatch] = useGlobalStateValue();

  const authListener = () => {
    console.log('authListiner');
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        return dispatch({
          type: TYPES.SET_USER,
          payload: {
            user
          }
        });
      } else {
        return dispatch({
          type: TYPES.CLEAR_USER
        });
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Router>
      <Navbar />
      {user ? (
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Route
            path="/nflScores"
            render={props => <NflScoresPage {...props} />}
          />
          <Route
            path="/addWager"
            render={props => <AddWagerPage {...props} />}
          />
          <Route
            path="/pendingWagers"
            render={props => <PendingWagersPage {...props} />}
          />
        </Switch>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
};

export default App;
