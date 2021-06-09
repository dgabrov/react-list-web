import {STATE_ITEMS} from "../../store";

export const ACTION_AFTER_BULK_ADD = 'action-after-bulk-add';

export const getActionAfterBulkAdd = (items) => {
    return {
        type: ACTION_AFTER_BULK_ADD,
        items: items
    }
};

export const actionAfterBulkAddReducer = (state, action) => {
    let newItems = action.items;

    // now prepare the new array of items to be added to the list
    let items = state.items.concat(newItems);

    return Object.assign(
        {},
        state,
        {items},
        {state: STATE_ITEMS},
        {bulkInsert: ''});

}

