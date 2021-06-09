import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterSaveItem} from "../actions/actionAfterSaveItem";

export const getEffectSaveItem = (adding, id, listId, name) => {
    return (dispatch, getState) => {
        let p = null;

        if (adding) {
            p = service.addItem(id, listId, name);
        }
        else {
            p = service.updateItem(id, name);
        }

        p.then(() => {
            dispatch(getActionAfterSaveItem(id, listId, adding, name));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
