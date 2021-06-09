import {STATE_VIEW} from "../../store";
import {getItemsByListId} from "../../util/storeUtil";

export const ACTION_VIEW_LIST = 'action-view-list';

export const getActionViewList = (id) => {
    return {
        type: ACTION_VIEW_LIST,
        id: id
    }
};

export const actionViewListReducer = (state, action) => {
    let id = action.id;

    let ids = getItemsByListId(state, id).map((item) => {
        return item.id;
    });

    return Object.assign(
        {}, state,
        {view: {id: id, itemIds: ids}},
        {state: STATE_VIEW})
}

