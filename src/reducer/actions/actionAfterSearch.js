export const ACTION_AFTER_SEARCH_LIST = 'action-after-search-list';

export const getActionAfterSearchList = (lists) => {
    return {
        type: ACTION_AFTER_SEARCH_LIST,
        lists: lists
    }
};

export const actionAfterSearchListReducer = (state, action) => {
    let lists = [];
    let items = [];

    action.lists.forEach((list) => {
        let lid = list.id;
        let l = {id: lid, name: list.name};

        lists.push(l);

        list.items.forEach((item) => {
            let i = {id: item.id, listId: item.listId, completed: item.completed, name: item.name};

            items.push(i);
        });
    })

    return Object.assign({}, state, {items: items}, {lists: lists});
}

