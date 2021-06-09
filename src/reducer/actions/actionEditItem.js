import {STATE_EDIT_ITEM} from "../../store";
import v1 from 'uuid'

export const ACTION_EDIT_ITEM = 'action-edit-item';

export const getActionEditItem = (id, adding, listId) => {

    let idValue = id;

    if (adding) {
        // generate a new id
        idValue = v1();
    }

    return {
        type: ACTION_EDIT_ITEM,
        id: idValue,
        listId: listId,
        adding: adding
    };
};

export const actionEditItemReducer = (state, action) => {

    let id = action.id;
    let listId = action.listId;
    let adding = action.adding;

    return Object.assign({},
        state,
        {editItem: {id: id, adding: adding, listId: listId}},
        {state: STATE_EDIT_ITEM});
}

