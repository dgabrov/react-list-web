import {STATE_LISTS} from "../../store";

export const ACTION_AFTER_SAVE_LIST = 'action-after-save-list';

export const getActionAfterSaveList = (id, adding, name) => {

    return {
        type: ACTION_AFTER_SAVE_LIST,
        id: id,
        adding: adding,
        name: name
    };
};

export const actionAfterSaveListReducer = (state, action) => {

    let id = action.id;
    let name = action.name;
    let adding = action.adding;

    let lists = null;

    if (adding) {
        lists = state.lists.slice();
        lists.push({id: id, name: name});
    }
    else {
        lists = state.lists.map((list) => {
            let res = list;

            if (res.id === id) {
                res = {id: id, name: name};
            }

            return res;
        });
    }

    return Object.assign({}, state, {lists: lists}, {state: STATE_LISTS});
}

