import * as React from 'react';

import Loading from "./loading";
import App from "../app";
import {connect} from "react-redux";

const getLoading = () => {
    return <Loading/>;
}

const getApp = () => {
    return <App/>;
}


class Root extends React.Component {


    render = () => {
        let renderFunction = this.props.settingsLoaded === true ? getApp : getLoading;

        return (renderFunction());
    }
}

const storeToProps = (store) => {
    return {
        settingsLoaded: store.settingsLoaded
    }
}

export default connect(storeToProps, null)(Root);
