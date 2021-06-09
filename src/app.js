import React from 'react';
import Header from "./components/header";
import {connect} from 'react-redux';

import * as appStore from './store';
import ConfirmDeleteItem from "./components/confirmdeleteitem";
import ConfirmDeleteList from "./components/confirmdeletelist";
import ConfirmResetList from "./components/confirmresetlist";
import EditItem from "./components/edititem";
import Lists from "./components/lists";
import View from "./components/view";
import Login from "./components/login";
import EditList from "./components/editlist";
import Items from "./components/items";
import constants from '../src/util/constants';

import {getActionRemoveExpiredMessages} from "./reducer/actions/actionRemoveExpiredMessages";

let stateMatrix = {};

stateMatrix[appStore.STATE_LOGIN] = () => {return <Login/>;};
stateMatrix[appStore.STATE_CD_ITEM] = () => {return <ConfirmDeleteItem/>;};
stateMatrix[appStore.STATE_CD_LIST] = () => {return <ConfirmDeleteList/>;};
stateMatrix[appStore.STATE_RS_LIST] = () => {return <ConfirmResetList/>;};
stateMatrix[appStore.STATE_EDIT_ITEM] = () => {return <EditItem/>;};
stateMatrix[appStore.STATE_EDIT_LIST] = () => {return <EditList/>;};
stateMatrix[appStore.STATE_LISTS] = () => {return <Lists/>;};
stateMatrix[appStore.STATE_VIEW] = () => {return <View/>;};
stateMatrix[appStore.STATE_ITEMS] = () => {return <Items/>;};



class App extends React.Component {


    render = () => {
        const version = constants.version;

        let component = stateMatrix[this.props.state]();

        return (<div>
            <Header/>
            {component}
            <div style={{marginTop: "40px"}}>Version: {version}</div>
        </div>);
    };


    trigger = () => {
        this.props.onTrigger();
    }

    componentDidMount = () => {
        let interval = setInterval(this.trigger, this.props.settings.checkMessageEveryMs);

        this.setState(Object.assign({}, this.state, {interval}))
    }


    componentWillUnmount = () => {
        let interval = this.state.interval; // get the interval

        clearInterval(interval);
    }
}

const stateToProps = (store) => {
    return {
        settingsLoaded: store.settingsLoaded,
        settings: store.settings,
        state: store.state
    }
}

const dispatch = (dispatch) => {
    return {
        onTrigger: () => {
            dispatch(getActionRemoveExpiredMessages());
        }
    }
}

export default connect(stateToProps, dispatch)(App);
