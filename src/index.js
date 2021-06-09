import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import reducerFunction from "./reducer/reducer";
import initialStore from "./store";
import Root from "./components/root";

let store = createStore(reducerFunction, initialStore, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>
    , document.getElementById('root'));

