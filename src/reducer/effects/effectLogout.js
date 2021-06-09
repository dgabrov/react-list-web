import service from '../../services/service'
import {getActionLogout} from "../actions/actionLogout";

export const getEffectLogout = () => {
    return (dispatch, getState) => {
        let p = service.logout();

        p
            .then(() => {
                dispatch(getActionLogout())
            })
            .catch(() => {
                console.log("error while logging out...")
            });
    };
}
