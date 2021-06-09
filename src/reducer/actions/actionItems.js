import {STATE_ITEMS} from "../../store";

export const ACTION_ITEMS = 'action-items';

export const getActionItems = (listId) => {
    return {
        type: ACTION_ITEMS,
        listId: listId
    }
};

export const actionItemsReducer = (state, action) => {
    let listId = action.listId;

    return Object.assign({}, state, {itemListId: listId}, {state: STATE_ITEMS});
}

