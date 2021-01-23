import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Firebase, {FirebaseContext} from './api/Firebase';
import './index.css';
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({forceRefresh: false});

ReactDOM.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}>
        <Router history={history}>
          <App/>
        </Router>
      </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
