import {getObjectFromArray} from "../../util/storeUtil";
import {STATE_LISTS} from "../../store";

export const ACTION_AFTER_DELETE_LISTS = 'action-after-delete-lists';

export const getActionAfterDeleteLists = (ids) => {
    return {
        type: ACTION_AFTER_DELETE_LISTS,
        ids: ids
    }
};

export const actionAfterDeleteListsReducer = (state, action) => {

    let ids = action.ids;
    let obj = getObjectFromArray(ids, () => {return "";});

    let lists = state.lists.filter((list) => {
        return !obj.hasOwnProperty(list.id);
    });

    let items = state.items.filter((item) => {
        return !obj.hasOwnProperty(item.listId);
    });

    return Object.assign({}, state, {items: items}, {lists: lists}, {state: STATE_LISTS});
}

