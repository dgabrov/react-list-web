import {STATE_EDIT_LIST} from "../../store";
import v1 from 'uuid'

export const ACTION_EDIT_LIST = 'action-edit-list';

export const getActionEditList = (id, adding) => {

    let idValue = id;

    if (adding) {
        // generate a new id
        idValue = v1();
    }

    return {
        type: ACTION_EDIT_LIST,
        id: idValue,
        adding: adding
    };
};

export const actionEditListReducer = (state, action) => {

    let id = action.id;
    let adding = action.adding;

    return Object.assign({},
        state,
        {editList: {id: id, adding: adding}},
        {state: STATE_EDIT_LIST});
}

