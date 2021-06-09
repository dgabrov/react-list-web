import {STATE_CD_ITEM} from "../../store";

export const ACTION_DELETE_ITEMS = 'action-delete-items';

export const getActionDeleteItems = (ids) => {

    return {
        type: ACTION_DELETE_ITEMS,
        ids: ids
    };
};

export const actionDeleteItemsReducer = (state, action) => {
    let deleteItemId = action.ids;

    return Object.assign({}, state, {deleteItemId}, {state: STATE_CD_ITEM});
}

