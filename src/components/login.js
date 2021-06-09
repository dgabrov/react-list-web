import * as React from "react";
import {connect} from "react-redux";
import {getEffectLogin} from "../reducer/effects/effectLogin";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };

        this.edtLogin = null;
        this.edtPassword = null;
        this.btnSubmit = null;
    }

    componentDidMount = () => {
        this.edtLogin.focus();
        this.edtLogin.select();
    };

    kd = (event) => {
        let kc = event.keyCode;

        if (kc === 13) {
            this.btnSubmit.click();

            event.stopPropagation();
            event.preventDefault();
        }
    };

    submit = (event) => {
        // this is a form submit, prevent the page postback
        event.stopPropagation();
        event.preventDefault();

        let login = this.state.login;
        let password = this.state.password;

        this.props.onLogin(login, password);
    };

    changeLogin = (event) => {
        let login = event.target.value;

        this.updateState({login: login});
    };

    changePassword = (event) => {
        let password = event.target.value;

        this.updateState({password: password});
    };

    updateState = (update) => {
        this.setState(Object.assign({}, this.state, update));
    };

    render = () => {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h3>Login</h3>
                    <p>Please provide the credentials</p>
                    <table className="layout">
                        <tbody>
                        <tr>
                            <td>Login:</td>
                            <td><input onKeyDown={this.kd} ref={(edt) => this.edtLogin = edt} type="text"
                                       value={this.state.login} onChange={this.changeLogin}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input onKeyDown={this.kd} ref={(edt) => this.edtPassword = edt} type="password"
                                       value={this.state.password} onChange={this.changePassword}/></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="margin-top">
                        <button ref={(button) => this.btnSubmit = button} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    };
}

let onLogin = (dispatch) => {
    return {
        onLogin: (login, password) => {
            dispatch(getEffectLogin(login, password));
        }
    };
};

export default connect(null, onLogin)(Login);
