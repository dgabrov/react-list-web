import {STATE_CD_LIST} from "../../store";

export const ACTION_REMOVE_LISTS = 'action-remove-lists';

export const getActionRemoveLists = (ids) => {
    return {
        type: ACTION_REMOVE_LISTS,
        ids: ids
    }
};

export const actionRemoveListsReducer = (state, action) => {
    let ids = action.ids;

    return Object.assign(
        {},
        state,
        {deleteListId: ids},
        {state: STATE_CD_LIST});
}

