import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterDeleteLists} from "../actions/actionAfterDeleteLists";

export const getEffectDeleteLists = (ids) => {
    return (dispatch, getState) => {
        let p = service.deleteLists(ids);

        p.then((lists) => {
            dispatch(getActionAfterDeleteLists(ids));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
