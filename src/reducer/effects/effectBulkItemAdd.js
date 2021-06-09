import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterBulkAdd} from "../actions/actionAfterBulkAdd";

export const getEffectBulkItemAdd = (listId, bulkValue) => {
    return (dispatch, getState) => {
        let p = service.bulkAdd(listId, bulkValue);

        p.then((holder) => {
            dispatch(getActionAfterBulkAdd(holder.items));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
