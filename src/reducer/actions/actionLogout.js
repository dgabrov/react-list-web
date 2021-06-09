import initialStore from "../../store";
import {setToken} from '../../util/cache'

export const ACTION_LOGOUT = 'action-logout';

export const getActionLogout = () => {
    return {
        type: ACTION_LOGOUT
    }
};

export const actionLogoutReducer = (state, action) => {
    setToken(''); // make sure you delete the token there upon logout

    return Object.assign({}, initialStore);
}


