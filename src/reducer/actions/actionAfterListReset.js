import {STATE_VIEW} from "../../store";

export const ACTION_AFTER_LIST_RESET = 'action-after-list-reset';

export const getActionAfterListReset = (listId) => {
    return {
        type: ACTION_AFTER_LIST_RESET,
        id: listId
    }
};

export const actionAfterListResetReducer = (state, action) => {
    let listId = action.id;

    // get items and mark completed as false for the items that belong to this list
    let items = state.items.map((item) => {
        let res = item;

        if (item.listId === listId) {
            res = Object.assign({}, item, {completed: false});
        }

        return res;
    });

    return Object.assign({}, state, {items: items}, {state: STATE_VIEW});

}

