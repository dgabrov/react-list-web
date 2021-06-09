import React from "react";

import {connect} from "react-redux";
import {getActionState} from "../reducer/actions/actionState";
import {STATE_LISTS} from "../store";
import {getEffectLogout} from "../reducer/effects/effectLogout";

class Header extends React.Component {

    render = () => {

        let messages = this.props.messages.map((message, index) => {
            return <div key={'index_' + index} className="message">{message}</div>
        });

        let errors = this.props.errors.map((error, index) => {
            return <div key={'index_' + index} className="error">{error}</div>
        });

        let controls = null;
        let logged = null;

        if (this.props.loggedIn) {
            controls =
                (<div className="header">
                    <button onClick={this.logout} className="button-link">logout</button>
                    &nbsp;
                    <button onClick={this.lists} className="button-link">lists</button>
                </div>);

            logged = <div>{this.props.user.fullName} ({this.props.user.login})</div>
        }


        return (
            <div>
                <div className="messages">
                    {messages}
                    {errors}
                </div>
                {controls}
                {logged}
            </div>
        );
    }

    logout = () => {
        this.props.onLogout();
    }

    login = () => {
        this.props.onLogin();
    }

    lists = () => {
        this.props.onLists();
    }

}

// sample of how the data props expected looks like
// return {
//     loggedIn : true,
//     messages: ["first message", "second message"],
//     errors: ["error1", "the second error will come here", "the third error, here it is"],
//     user: {
//         login: "login here",
//         fullName: "the full name"
//     }
// };


let stateToProps = (state) => {

    let messages = state.messages.map((message) => {
        return message.message;
    });

    let errors = state.errors.map((error) => {
        return error.message;
    });

    let user = state.user;
    let login = user.login;
    let fullName = user.fullName;

    let loggedIn = login && login.length && login.length > 0;

    return {
        loggedIn: loggedIn,
        messages: messages,
        errors: errors,
        user: {
            login: login,
            fullName: fullName
        }
    };
}

let dispatcher = (dispatch, getState) => {
    return {
        onLogout: () => {
            dispatch(getEffectLogout());
        },
        onLists: () => {
            dispatch(getActionState(STATE_LISTS));
        }
    };
}

export default connect(stateToProps, dispatcher)(Header);

