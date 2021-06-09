import {STATE_LISTS} from "../../store";
import {setToken} from '../../util/cache'

export const ACTION_AFTER_LOGIN = 'action-after-login';

export const getActionAfterLogin = (login, fullName, token) => {
    return {
        type: ACTION_AFTER_LOGIN,
        user: {
            login: login,
            fullName: fullName,
            token: token
        }
    }
};

export const actionAfterLoginReducer = (state, action) => {
    setToken(action.user.token);

    return Object.assign({}, state, {user: action.user}, {state: STATE_LISTS});
}

