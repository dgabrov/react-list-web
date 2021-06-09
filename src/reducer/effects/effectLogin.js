import service from '../../services/service'
import {getActionAfterLogin} from "../actions/actionAfterLogin";
import {getActionError} from "../actions/actionError";

export const getEffectLogin = (login, password) => {
    return (dispatch, getState) => {
        let p = service.login(login, password);

        p
            .then((user) => {
                // user contains login, full name and token
                dispatch(getActionAfterLogin(user.login, user.fullName, user.token));
            })
            .catch((error) => {
                dispatch(getActionError(error));
            })
    };
}
