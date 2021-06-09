import {STATE_RS_LIST} from "../../store";

export const ACTION_RESET = 'action-reset';

export const getActionReset = (id) => {

    return {
        type: ACTION_RESET,
        id: id
    };
};

export const actionResetReducer = (state, action) => {
    let id = action.id;

    return Object.assign({}, state, {resetListId: id}, {state: STATE_RS_LIST});
}

