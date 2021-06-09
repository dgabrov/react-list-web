import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterListReset} from "../actions/actionAfterListReset";

export const getEffectReset = (listId) => {
    return (dispatch, getState) => {
        let p = service.resetList(listId);

        p.then(() => {
            dispatch(getActionAfterListReset(listId));
        })
            .catch((error) => {
                dispatch(getActionError(error));
            })
    };
}
