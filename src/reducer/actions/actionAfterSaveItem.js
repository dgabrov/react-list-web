import {STATE_ITEMS} from "../../store";

export const ACTION_AFTER_SAVE_ITEM = 'action-after-save-item';

export const getActionAfterSaveItem = (id, listId, adding, name) => {

    return {
        type: ACTION_AFTER_SAVE_ITEM,
        id: id,
        adding: adding,
        name: name,
        listId: listId
    };
};

export const actionAfterSaveItemReducer = (state, action) => {
    let id = action.id;
    let adding = action.adding;
    let name = action.name;
    let listId = action.listId;

    let items = [];

    if (adding) {
        items = state.items.slice();
        items.push({id, name, listId});
    }
    else {
        items = state.items.map((item) => {
            let res = item;

            if (item.id === id) {
                res = Object.assign({}, item, {id, name});
            }

            return res;
        });
    }

    return Object.assign({}, state, {items}, {state: STATE_ITEMS});
}

