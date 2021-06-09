import service from '../../services/service'
import {getActionError} from "../actions/actionError";
import {getActionAfterSearchList} from "../actions/actionAfterSearch";

export const getEffectListSearch = (strValue) => {
    return (dispatch, getState) => {
        let p = service.searchList(strValue);

        p.then((container) => {
            dispatch(getActionAfterSearchList(container.lists));
        })
        .catch((error) => {
            dispatch(getActionError(error));
        })
    };
}
