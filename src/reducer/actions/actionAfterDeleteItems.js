import {getObjectFromArray} from "../../util/storeUtil";
import {STATE_ITEMS} from "../../store";

export const ACTION_AFTER_DELETE_ITEMS = 'action-after-delete-items';

export const getActionAfterDeleteItems = (ids) => {
    return {
        type: ACTION_AFTER_DELETE_ITEMS,
        ids: ids
    }
};

export const actionAfterDeleteItemsReducer = (state, action) => {
    let ids = action.ids;

    // adjust the items int the store
    let obj = getObjectFromArray(ids, () => {return "";});

    let items = state.items.filter((item) => {
        let id = item.id;

        return !obj.hasOwnProperty(id);
    });

    return Object.assign({}, state, {items}, {state: STATE_ITEMS});

}

