import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GlobalState } from './context/GlobalState';
import reducer, { initialState } from './context/reducer';

ReactDOM.render(
  <GlobalState initialState={initialState} reducer={reducer}>
    <App />
  </GlobalState>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
