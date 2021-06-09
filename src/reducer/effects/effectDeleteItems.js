import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterDeleteItems} from "../actions/actionAfterDeleteItems";

export const getEffectDeleteItems = (ids) => {
    return (dispatch, getState) => {
        let p = service.deleteItems(ids);

        p.then(() => {
            dispatch(getActionAfterDeleteItems(ids));
        }).catch((err) => {
            dispatch(getActionError(err));
        });
    };
}
