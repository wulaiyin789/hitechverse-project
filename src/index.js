import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// COMPONENTS
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
// import { initGA } from './utils/analytics';

import 'bootswatch/dist/lux/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.module.scss';
import GAWrapper from './context/GAWrapper';

// initGA();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <GAWrapper>
                <App />
            </GAWrapper>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();