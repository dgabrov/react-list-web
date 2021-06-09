import {FILTER_ALL, FILTER_COMPLETED, FILTER_PENDING} from "../../store";

export const ACTION_LIST_FILTER = 'action-list-filter';

export const getActionListFilter = (strFilter) => {
    return {
        type: ACTION_LIST_FILTER,
        filter: strFilter
    }
};

export const actionListFilterReducer = (state, action) => {
    let filter = action.filter;
    let view = state.view;

    let listId = view.id;

    let newItemIds = state.items
        .filter((item) => {
            return (item.listId === listId) && ((filter === FILTER_ALL)
                    || (filter === FILTER_COMPLETED && item.completed === true)
                    || (filter === FILTER_PENDING && item.completed === false));
        })
        .map((item) => {
            return item.id;
        });

    return Object.assign(
        {},
        state,
        {view: {id: listId, itemIds: newItemIds}});
}

