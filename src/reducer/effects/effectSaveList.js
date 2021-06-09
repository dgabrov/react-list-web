import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterSaveList} from "../actions/actionAfterSaveList";

export const getEffectSaveList = (adding, id, name) => {
    return (dispatch, getState) => {
        let p = null;

        if (adding) {
            p = service.addList(id, name);
        }
        else {
            p = service.updateList(id, name);
        }

        p.then((lists) => {
            dispatch(getActionAfterSaveList(id, adding, name));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
