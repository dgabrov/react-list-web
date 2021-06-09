import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterToggle} from "../actions/actionAfterToggle";

export const getEffectToggle = (id) => {
    return (dispatch, getState) => {
        let p = service.toggleCompleted(id);

        // val has the item id and the new completed value in it
        p.then((val) => {
            dispatch(getActionAfterToggle(val.id, val.completed));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
