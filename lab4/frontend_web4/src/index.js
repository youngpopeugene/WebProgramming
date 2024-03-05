import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux"
import combinedReducer from "./reducers/index"
import {Provider} from "react-redux"
import Helmet from 'react-helmet';

const store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Helmet bodyAttributes={{style: ' background: rgb(238,174,202);\n' +
                '    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);' +
                ' '}}/>
        <App/>
    </Provider>,
);


reportWebVitals();
